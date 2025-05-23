-- Script pour créer un utilisateur administrateur
-- À exécuter dans la console SQL de Supabase

-- 1. Créez un utilisateur en utilisant l'API d'authentification Supabase ou l'interface Web
-- 2. Ensuite, exécutez ce script en remplaçant l'email par celui que vous avez utilisé

-- Ajouter un flag is_admin pour l'utilisateur
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": "true"}'
WHERE email = 'admin@example.com'; -- Remplacez par l'email de votre admin

-- S'assurer que l'utilisateur admin a le rôle 'admin' dans la table des profils
UPDATE profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com'); -- Remplacez par l'email de votre admin

-- Vérifier que l'utilisateur a bien été configuré
SELECT 
  au.id, 
  au.email,
  au.raw_user_meta_data->>'is_admin' as is_admin,
  p.role
FROM 
  auth.users au
JOIN 
  profiles p ON au.id = p.id
WHERE 
  au.email = 'admin@example.com'; -- Remplacez par l'email de votre admin 