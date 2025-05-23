-- Create a table for user profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'editor', 'moderator', 'member', 'guest')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a function to handle updating the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a function to automatically create a profile when a new user signs up
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

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Setup Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can do everything" ON profiles;

-- Créer d'abord une table des rôles (pour les permissions)
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

-- Modifier la table profiles pour référencer la table roles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_fkey;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_fkey FOREIGN KEY (role) REFERENCES roles(name);

-- Create policies
-- Public profiles are viewable by everyone
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile (excluding role)
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  (auth.role() = 'service_role' OR 
   (SELECT true))  -- Permettre toujours la mise à jour sans vérifier le rôle
);

-- Admins can do everything - version simplifiée sans récursion
CREATE POLICY "Admins can do everything" 
ON profiles
USING (
  auth.role() = 'service_role' OR
  auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'is_admin' = 'true'
  )
);

-- Grant necessary privileges to the service_role and authenticated users
GRANT ALL ON profiles TO service_role;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- Add permissions table to track fine-grained permissions
CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to associate roles with permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role TEXT REFERENCES roles(name),
  permission_id INTEGER REFERENCES permissions(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  granted_by UUID REFERENCES auth.users(id),
  PRIMARY KEY (role, permission_id)
);

-- Insert base permissions
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

-- Associate permissions with roles
-- Admin permissions (all)
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

-- Editor permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions 
WHERE name IN ('create_article', 'edit_article', 'delete_article', 'publish_article',
               'create_event', 'edit_event', 'delete_event', 'publish_event',
               'moderate_comments', 'view_analytics')
ON CONFLICT (role, permission_id) DO NOTHING;

-- Moderator permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'moderator', id FROM permissions 
WHERE name IN ('edit_article', 'edit_event', 'moderate_comments', 'view_analytics')
ON CONFLICT (role, permission_id) DO NOTHING;

-- Enable RLS on permissions tables
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for permissions tables
DROP POLICY IF EXISTS "Permissions are viewable by authenticated users" ON permissions;
DROP POLICY IF EXISTS "Only admins can modify permissions" ON permissions;
DROP POLICY IF EXISTS "Role permissions are viewable by authenticated users" ON role_permissions;
DROP POLICY IF EXISTS "Only admins can modify role permissions" ON role_permissions;

-- Permissions policies
CREATE POLICY "Permissions are viewable by authenticated users"
ON permissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can modify permissions"
ON permissions USING (
  auth.role() = 'service_role' OR
  auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'is_admin' = 'true'
  )
);

-- Role permissions policies
CREATE POLICY "Role permissions are viewable by authenticated users"
ON role_permissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can modify role permissions"
ON role_permissions USING (
  auth.role() = 'service_role' OR
  auth.uid() IN (
    SELECT id FROM auth.users WHERE raw_user_meta_data->>'is_admin' = 'true'
  )
);

-- Grant permissions on new tables
GRANT ALL ON permissions TO service_role;
GRANT SELECT ON permissions TO authenticated;

GRANT ALL ON role_permissions TO service_role;
GRANT SELECT ON role_permissions TO authenticated;

GRANT ALL ON roles TO service_role;
GRANT SELECT ON roles TO authenticated;

GRANT USAGE, SELECT ON SEQUENCE permissions_id_seq TO service_role;

-- INSTRUCTIONS FOR CREATING AN ADMIN USER:
-- 1. First, create a user through the Supabase Authentication UI or API
-- 2. Get the user's UUID from the auth.users table
-- 3. Execute the following SQL (replacing the email with the actual user's email):
--    UPDATE profiles
--    SET role = 'admin'
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com'); 