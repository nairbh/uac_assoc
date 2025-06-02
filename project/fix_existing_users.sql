-- Script pour corriger les utilisateurs existants avec first_name et last_name à null
-- À exécuter dans Supabase SQL Editor

-- Mettre à jour l'utilisateur houssnair666@proton.me avec de vraies valeurs
UPDATE profiles 
SET 
  first_name = 'Houssnar',
  last_name = 'Bennani',  -- Changez par votre vrai nom de famille
  updated_at = NOW()
WHERE email = 'houssnair666@proton.me' 
  AND (first_name IS NULL OR last_name IS NULL);

-- Vérifier le résultat
SELECT id, first_name, last_name, email, role, created_at, updated_at 
FROM profiles 
WHERE email = 'houssnair666@proton.me';

-- Pour tous les autres utilisateurs avec des noms null, on peut aussi les corriger
-- (optionnel - seulement si vous voulez corriger tous les utilisateurs existants)
/*
UPDATE profiles 
SET 
  first_name = COALESCE(
    first_name, 
    INITCAP(SPLIT_PART(email, '@', 1)) -- Utilise la partie email avec une majuscule
  ),
  last_name = COALESCE(
    last_name, 
    'Utilisateur'
  ),
  updated_at = NOW()
WHERE first_name IS NULL OR last_name IS NULL;
*/ 