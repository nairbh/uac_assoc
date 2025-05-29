-- Ajouter la colonne banned à la table profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT FALSE;

-- Commentaire pour la documentation
COMMENT ON COLUMN public.profiles.banned IS 'Indique si l''utilisateur est banni (true) ou actif (false)';

-- Index pour améliorer les performances des requêtes de bannissement
CREATE INDEX IF NOT EXISTS idx_profiles_banned ON public.profiles(banned) WHERE banned = true; 