-- Script simplifié pour corriger l'accès admin
-- À exécuter dans Supabase Studio (SQL Editor)

-- 1. DÉSACTIVER TEMPORAIREMENT RLS pour déboguer
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE donations DISABLE ROW LEVEL SECURITY;

-- 2. Supprimer TOUTES les politiques existantes
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Supprimer toutes les politiques sur toutes les tables
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.schemaname || '.' || r.tablename;
    END LOOP;
END $$;

-- 3. Vérifier et créer l'utilisateur admin
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Récupérer l'UUID de l'utilisateur
    SELECT id INTO user_uuid FROM auth.users WHERE email = 'houssnair4@proton.me';
    
    IF user_uuid IS NOT NULL THEN
        -- Créer ou mettre à jour le profil
        INSERT INTO profiles (id, first_name, last_name, email, role)
        VALUES (user_uuid, 'Admin', 'ATMF', 'houssnair4@proton.me', 'admin')
        ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            email = 'houssnair4@proton.me',
            updated_at = CURRENT_TIMESTAMP;
            
        RAISE NOTICE 'Profil admin créé/mis à jour pour UUID: %', user_uuid;
    ELSE
        RAISE NOTICE 'Utilisateur avec email houssnair4@proton.me non trouvé dans auth.users';
    END IF;
END $$;

-- 4. Créer des politiques TRÈS PERMISSIVES pour déboguer
CREATE POLICY "allow_all_profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_events" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_registrations" ON event_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_permissions" ON permissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_role_permissions" ON role_permissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_donations" ON donations FOR ALL USING (true) WITH CHECK (true);

-- 5. Réactiver RLS avec les politiques permissives
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- 6. Vérifications
SELECT 'VÉRIFICATION UTILISATEUR:' as info;
SELECT 
    au.id,
    au.email,
    au.created_at,
    p.role,
    p.first_name,
    p.last_name
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE au.email = 'houssnair4@proton.me';

SELECT 'VÉRIFICATION PERMISSIONS:' as info;
SELECT COUNT(*) as total_permissions FROM permissions;
SELECT COUNT(*) as admin_permissions 
FROM role_permissions 
WHERE role = 'admin';

SELECT 'VÉRIFICATION DONNÉES:' as info;
SELECT 
    (SELECT COUNT(*) FROM profiles) as profiles_count,
    (SELECT COUNT(*) FROM articles) as articles_count,
    (SELECT COUNT(*) FROM events) as events_count; 