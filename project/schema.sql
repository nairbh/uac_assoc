-- Table des rôles
CREATE TABLE IF NOT EXISTS roles (
  name TEXT PRIMARY KEY,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insérer les rôles de base
INSERT INTO roles (name, description) VALUES
('admin', 'Administrateur avec tous les privilèges'),
('editor', 'Éditeur de contenu'),
('moderator', 'Modérateur de commentaires'),
('member', 'Membre standard'),
('guest', 'Visiteur avec accès limité')
ON CONFLICT (name) DO NOTHING;

-- Table des permissions
CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insérer les permissions de base
INSERT INTO permissions (name, description) VALUES
('create_article', 'Créer des articles'),
('edit_article', 'Modifier des articles'),
('delete_article', 'Supprimer des articles'),
('publish_article', 'Publier des articles'),
('create_event', 'Créer des événements'),
('edit_event', 'Modifier des événements'),
('delete_event', 'Supprimer des événements'),
('publish_event', 'Publier des événements'),
('manage_users', 'Gérer les utilisateurs'),
('view_analytics', 'Voir les statistiques'),
('manage_donations', 'Gérer les dons'),
('system_settings', 'Configurer les paramètres système'),
('moderate_comments', 'Modérer les commentaires')
ON CONFLICT (name) DO NOTHING;

-- Table d'association rôles <-> permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role TEXT REFERENCES roles(name),
  permission_id INTEGER REFERENCES permissions(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  granted_by UUID,
  PRIMARY KEY (role, permission_id)
);

-- Associer les permissions aux rôles
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions 
WHERE name IN ('create_article', 'edit_article', 'delete_article', 'publish_article',
               'create_event', 'edit_event', 'delete_event', 'publish_event',
               'moderate_comments', 'view_analytics')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO role_permissions (role, permission_id)
SELECT 'moderator', id FROM permissions 
WHERE name IN ('edit_article', 'edit_event', 'moderate_comments', 'view_analytics')
ON CONFLICT (role, permission_id) DO NOTHING;

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT REFERENCES roles(name) DEFAULT 'member',
  banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour créer un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    'member'
  );
  RETURN NEW;
END;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Table des articles
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des événements
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des inscriptions aux événements
CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended')),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

-- Table des dons/finances (optionnel)
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -------------------
-- RLS & POLICIES
-- -------------------

-- Activer RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Profils
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can do everything" ON profiles;
DROP POLICY IF EXISTS "Only admins can ban users" ON profiles;

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  (role = (SELECT role FROM profiles WHERE id = auth.uid()) OR auth.role() = 'service_role')
);

CREATE POLICY "Admins can do everything" 
ON profiles
USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p WHERE p.role = 'admin'
  ) OR auth.role() = 'service_role'
);

CREATE POLICY "Only admins can ban users"
ON profiles FOR UPDATE USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p WHERE p.role = 'admin'
  ) OR auth.role() = 'service_role'
);

-- Articles
DROP POLICY IF EXISTS "Authors can create articles" ON articles;
DROP POLICY IF EXISTS "Authors can update their own articles" ON articles;
DROP POLICY IF EXISTS "Authors can delete their own articles" ON articles;

CREATE POLICY "Articles are viewable by everyone"
ON articles FOR SELECT USING (true);

CREATE POLICY "Authors can create articles"
ON articles FOR INSERT WITH CHECK (
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'create_article'
  )
);

CREATE POLICY "Authors can update their own articles"
ON articles FOR UPDATE USING (
  auth.uid() = author_id AND
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'edit_article'
  )
);

CREATE POLICY "Authors can delete their own articles"
ON articles FOR DELETE USING (
  auth.uid() = author_id AND
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'delete_article'
  )
);

-- Events
DROP POLICY IF EXISTS "Users can create events" ON events;
DROP POLICY IF EXISTS "Users can update events" ON events;
DROP POLICY IF EXISTS "Users can delete events" ON events;

CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT USING (true);

CREATE POLICY "Users can create events"
ON events FOR INSERT WITH CHECK (
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'create_event'
  )
);

CREATE POLICY "Users can update events"
ON events FOR UPDATE USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'edit_event'
  )
);

CREATE POLICY "Users can delete events"
ON events FOR DELETE USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p 
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE perm.name = 'delete_event'
  )
);

-- Event registrations
DROP POLICY IF EXISTS "Users can view their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Users can register for events" ON event_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Users can delete their own registrations" ON event_registrations;

CREATE POLICY "Users can view their own registrations"
ON event_registrations FOR SELECT USING (
  auth.uid() = user_id
);

CREATE POLICY "Users can register for events"
ON event_registrations FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Users can update their own registrations"
ON event_registrations FOR UPDATE USING (
  auth.uid() = user_id
);

CREATE POLICY "Users can delete their own registrations"
ON event_registrations FOR DELETE USING (
  auth.uid() = user_id
);

-- Finances/dons
DROP POLICY IF EXISTS "Only admins can manage finances" ON donations;
CREATE POLICY "Only admins can manage finances"
ON donations FOR ALL USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p WHERE p.role = 'admin'
  ) OR auth.role() = 'service_role'
);

-- Permissions et rôles
DROP POLICY IF EXISTS "Only admins can modify permissions" ON permissions;
CREATE POLICY "Only admins can modify permissions"
ON permissions USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p WHERE p.role = 'admin'
  ) OR auth.role() = 'service_role'
);

DROP POLICY IF EXISTS "Only admins can modify role permissions" ON role_permissions;
CREATE POLICY "Only admins can modify role permissions"
ON role_permissions USING (
  auth.uid() IN (
    SELECT p.id FROM profiles p WHERE p.role = 'admin'
  ) OR auth.role() = 'service_role'
);

-- Grants
GRANT ALL ON profiles TO service_role;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

GRANT ALL ON articles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON articles TO authenticated;

GRANT ALL ON events TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON events TO authenticated;

GRANT ALL ON event_registrations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registrations TO authenticated;

GRANT ALL ON permissions TO service_role;
GRANT SELECT ON permissions TO authenticated;

GRANT ALL ON role_permissions TO service_role;
GRANT SELECT ON role_permissions TO authenticated;

GRANT ALL ON donations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON donations TO authenticated;

-- Séquences
GRANT USAGE, SELECT ON SEQUENCE articles_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE events_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE event_registrations_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE permissions_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE donations_id_seq TO service_role; 