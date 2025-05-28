-- Script pour mettre à jour l'author_id des articles avec un UUID valide
-- À exécuter après avoir inséré les articles

-- 1. Voir tous les utilisateurs disponibles dans la base
SELECT id, email, first_name, last_name, role 
FROM profiles 
ORDER BY role, created_at;

-- 2. Trouver un utilisateur admin
SELECT id, email, first_name, last_name 
FROM profiles 
WHERE role = 'admin' 
LIMIT 1;

-- 3. Mettre à jour tous les articles sans auteur avec le premier admin trouvé
UPDATE articles 
SET author_id = (
  SELECT id 
  FROM profiles 
  WHERE role = 'admin' 
  LIMIT 1
) 
WHERE author_id IS NULL;

-- 4. Vérifier que la mise à jour a fonctionné
SELECT a.id, a.title, a.author_id, p.email as author_email
FROM articles a
LEFT JOIN profiles p ON a.author_id = p.id
ORDER BY a.created_at DESC;

-- 5. Si aucun admin n'existe, créer un utilisateur admin temporaire
-- (Décommentez les lignes suivantes si nécessaire)
/*
INSERT INTO profiles (id, first_name, last_name, email, role)
VALUES (
  gen_random_uuid(),
  'Admin',
  'ATMF',
  'admin@atmf-argenteuil.org',
  'admin'
);

-- Puis mettre à jour les articles
UPDATE articles 
SET author_id = (
  SELECT id 
  FROM profiles 
  WHERE email = 'admin@atmf-argenteuil.org'
) 
WHERE author_id IS NULL;
*/ 