-- Script de test pour vérifier l'accès admin
-- À exécuter dans Supabase Studio (SQL Editor)

-- 1. Vérifier que l'utilisateur admin existe
SELECT 'VÉRIFICATION UTILISATEUR ADMIN:' as info;
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created_at,
  p.role,
  p.created_at as profile_created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE au.email = 'houssnair4@proton.me';

-- 2. Si l'utilisateur n'a pas de profil, le créer
INSERT INTO profiles (id, first_name, last_name, email, role)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'first_name', 'Admin'),
  COALESCE(au.raw_user_meta_data->>'last_name', 'ATMF'),
  au.email,
  'admin'
FROM auth.users au
WHERE au.email = 'houssnair4@proton.me'
  AND NOT EXISTS (SELECT 1 FROM profiles WHERE id = au.id)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = CURRENT_TIMESTAMP;

-- 3. S'assurer que le rôle est admin
UPDATE profiles
SET role = 'admin', updated_at = CURRENT_TIMESTAMP
WHERE email = 'houssnair4@proton.me';

-- 4. Vérifier les permissions admin
SELECT 'PERMISSIONS ADMIN:' as info;
SELECT p.name as permission, p.description
FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
WHERE rp.role = 'admin'
ORDER BY p.name;

-- 5. Test des politiques RLS
SELECT 'TEST POLITIQUES RLS:' as info;

-- Tester l'accès aux profils
SELECT 'Nombre de profils visibles:' as test, COUNT(*) as count FROM profiles;

-- Tester l'accès aux articles
SELECT 'Nombre d''articles visibles:' as test, COUNT(*) as count FROM articles;

-- Tester l'accès aux événements
SELECT 'Nombre d''événements visibles:' as test, COUNT(*) as count FROM events;

-- 6. Vérifier l'état final
SELECT 'ÉTAT FINAL:' as info;
SELECT 
  'Utilisateur: ' || email || ' | Rôle: ' || role || ' | ID: ' || id as status
FROM profiles 
WHERE email = 'houssnair4@proton.me'; 