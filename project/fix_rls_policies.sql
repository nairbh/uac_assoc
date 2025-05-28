-- Script pour corriger les politiques RLS et éviter la récursion infinie
-- À exécuter dans Supabase Studio (SQL Editor)

-- 1. Désactiver temporairement RLS pour corriger les politiques
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE donations DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can do everything" ON profiles;
DROP POLICY IF EXISTS "Only admins can ban users" ON profiles;
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
DROP POLICY IF EXISTS "Authors can create articles" ON articles;
DROP POLICY IF EXISTS "Authors can update their own articles" ON articles;
DROP POLICY IF EXISTS "Authors can delete their own articles" ON articles;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Users can create events" ON events;
DROP POLICY IF EXISTS "Users can update events" ON events;
DROP POLICY IF EXISTS "Users can delete events" ON events;
DROP POLICY IF EXISTS "Users can view their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Users can register for events" ON event_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Users can delete their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Only admins can manage finances" ON donations;
DROP POLICY IF EXISTS "Only admins can modify permissions" ON permissions;
DROP POLICY IF EXISTS "Only admins can modify role permissions" ON role_permissions;

-- 3. Créer des politiques simplifiées sans récursion

-- Politiques pour les profils (simplifiées)
CREATE POLICY "profiles_select_policy" ON profiles
FOR SELECT USING (true); -- Tout le monde peut voir les profils

CREATE POLICY "profiles_insert_policy" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id); -- Les utilisateurs peuvent créer leur propre profil

CREATE POLICY "profiles_update_policy" ON profiles
FOR UPDATE USING (
  auth.uid() = id OR -- L'utilisateur peut modifier son propre profil
  auth.role() = 'service_role' OR -- Service role a tous les droits
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) -- Les admins peuvent modifier tous les profils
);

CREATE POLICY "profiles_delete_policy" ON profiles
FOR DELETE USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les articles
CREATE POLICY "articles_select_policy" ON articles
FOR SELECT USING (true); -- Tout le monde peut voir les articles

CREATE POLICY "articles_insert_policy" ON articles
FOR INSERT WITH CHECK (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'create_article'
  )
);

CREATE POLICY "articles_update_policy" ON articles
FOR UPDATE USING (
  auth.role() = 'service_role' OR
  (auth.uid() = author_id AND EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'edit_article'
  )) OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "articles_delete_policy" ON articles
FOR DELETE USING (
  auth.role() = 'service_role' OR
  (auth.uid() = author_id AND EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'delete_article'
  )) OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les événements
CREATE POLICY "events_select_policy" ON events
FOR SELECT USING (true); -- Tout le monde peut voir les événements

CREATE POLICY "events_insert_policy" ON events
FOR INSERT WITH CHECK (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'create_event'
  )
);

CREATE POLICY "events_update_policy" ON events
FOR UPDATE USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'edit_event'
  ) OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "events_delete_policy" ON events
FOR DELETE USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    JOIN permissions perm ON rp.permission_id = perm.id
    WHERE p.id = auth.uid() AND perm.name = 'delete_event'
  ) OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les inscriptions aux événements
CREATE POLICY "event_registrations_select_policy" ON event_registrations
FOR SELECT USING (
  auth.uid() = user_id OR
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "event_registrations_insert_policy" ON event_registrations
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "event_registrations_update_policy" ON event_registrations
FOR UPDATE USING (
  auth.uid() = user_id OR
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "event_registrations_delete_policy" ON event_registrations
FOR DELETE USING (
  auth.uid() = user_id OR
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les dons
CREATE POLICY "donations_policy" ON donations
FOR ALL USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les permissions (lecture seule pour les utilisateurs authentifiés)
CREATE POLICY "permissions_select_policy" ON permissions
FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "permissions_modify_policy" ON permissions
FOR ALL USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour les rôles-permissions
CREATE POLICY "role_permissions_select_policy" ON role_permissions
FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "role_permissions_modify_policy" ON role_permissions
FOR ALL USING (
  auth.role() = 'service_role' OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Réactiver RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- 5. Vérifier que l'utilisateur admin existe et a le bon rôle
UPDATE profiles
SET role = 'admin'
WHERE email = 'houssnair4@proton.me';

-- 6. Vérifier les données
SELECT 'PROFILS ADMIN:' as info;
SELECT id, email, role FROM profiles WHERE role = 'admin';

SELECT 'PERMISSIONS ADMIN:' as info;
SELECT p.name as permission 
FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
WHERE rp.role = 'admin'; 