-- Script de test pour vérifier l'accès admin
-- À exécuter dans Supabase Studio (SQL Editor)

-- 1. Vérifier l'utilisateur admin
SELECT 'VÉRIFICATION UTILISATEUR ADMIN:' as info;
SELECT 
    au.id,
    au.email,
    au.created_at as auth_created,
    p.role,
    p.first_name,
    p.last_name,
    p.created_at as profile_created
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE au.email = 'houssnair4@proton.me';

-- 2. Vérifier les politiques RLS
SELECT 'VÉRIFICATION POLITIQUES RLS:' as info;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. Tester l'accès aux données
SELECT 'TEST ACCÈS DONNÉES:' as info;

-- Test accès profiles
SELECT 'Profiles:' as table_name, COUNT(*) as count FROM profiles;

-- Test accès articles
SELECT 'Articles:' as table_name, COUNT(*) as count FROM articles;

-- Test accès events
SELECT 'Events:' as table_name, COUNT(*) as count FROM events;

-- 4. Vérifier les permissions
SELECT 'VÉRIFICATION PERMISSIONS:' as info;
SELECT COUNT(*) as total_permissions FROM permissions;
SELECT COUNT(*) as admin_permissions 
FROM role_permissions 
WHERE role = 'admin';

-- 5. Test de création d'un article (simulation)
SELECT 'TEST CRÉATION ARTICLE:' as info;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM profiles 
            WHERE email = 'houssnair4@proton.me' 
            AND role = 'admin'
        ) 
        THEN 'AUTORISÉ - Utilisateur admin trouvé'
        ELSE 'REFUSÉ - Utilisateur admin non trouvé'
    END as creation_status;

-- 6. Résumé final
SELECT 'RÉSUMÉ FINAL:' as info;
SELECT 
    (SELECT COUNT(*) FROM auth.users WHERE email = 'houssnair4@proton.me') as auth_user_exists,
    (SELECT COUNT(*) FROM profiles WHERE email = 'houssnair4@proton.me' AND role = 'admin') as admin_profile_exists,
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as rls_policies_count,
    (SELECT COUNT(*) FROM articles) as articles_count,
    (SELECT COUNT(*) FROM events) as events_count; 