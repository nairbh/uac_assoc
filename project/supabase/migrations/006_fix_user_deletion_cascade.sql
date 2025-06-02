-- Migration pour corriger la suppression d'utilisateurs
-- Cette migration modifie la contrainte de clé étrangère pour permettre la suppression en cascade

-- Supprimer l'ancienne contrainte
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Ajouter la nouvelle contrainte avec ON DELETE CASCADE
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Ajouter un commentaire explicatif
COMMENT ON CONSTRAINT profiles_id_fkey ON public.profiles IS 
'Contrainte de clé étrangère avec suppression en cascade - supprime automatiquement le profil quand l''utilisateur est supprimé'; 