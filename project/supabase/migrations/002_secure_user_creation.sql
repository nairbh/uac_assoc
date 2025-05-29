-- 🔒 SÉCURITÉ CRITIQUE: Trigger pour forcer le rôle 'member' par défaut
-- Ce trigger empêche la création d'utilisateurs avec des rôles élevés via manipulation

-- Fonction pour sécuriser la création d'utilisateurs
CREATE OR REPLACE FUNCTION secure_new_user_profile() 
RETURNS trigger AS $$
BEGIN
  -- Force le rôle à 'member' pour tous les nouveaux utilisateurs
  -- Seuls les administrateurs existants peuvent modifier les rôles ultérieurement
  NEW.role := 'member';
  
  -- Log de sécurité
  RAISE LOG 'SÉCURITÉ: Nouveau profil créé pour % avec rôle forcé à member', NEW.email;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer le trigger existant s'il existe
DROP TRIGGER IF EXISTS trigger_secure_new_user ON public.profiles;

-- Créer le trigger qui s'exécute AVANT l'insertion
CREATE TRIGGER trigger_secure_new_user
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION secure_new_user_profile();

-- Fonction pour confirmer automatiquement les emails en développement (optionnel)
-- ATTENTION: NE PAS UTILISER EN PRODUCTION si vous voulez la confirmation d'email
CREATE OR REPLACE FUNCTION auto_confirm_user() 
RETURNS trigger AS $$
BEGIN
  -- Auto-confirmer seulement en mode développement
  -- Vous pouvez commenter ces lignes si vous voulez la confirmation d'email
  IF current_setting('app.environment', true) = 'development' THEN
    NEW.email_confirmed_at = NOW();
    NEW.confirmed_at = NOW();
    RAISE LOG 'DÉVELOPPEMENT: Email auto-confirmé pour %', NEW.email;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour auto-confirmation (UNIQUEMENT si vous voulez désactiver la confirmation d'email)
-- Décommentez les lignes suivantes si vous voulez désactiver la confirmation d'email:

-- DROP TRIGGER IF EXISTS trigger_auto_confirm_user ON auth.users;
-- CREATE TRIGGER trigger_auto_confirm_user
--   BEFORE INSERT ON auth.users
--   FOR EACH ROW
--   EXECUTE FUNCTION auto_confirm_user();

-- Supprimer l'ancienne politique s'il existe
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les rôles" ON public.profiles;

-- Fonction pour vérifier si l'utilisateur peut modifier un profil
CREATE OR REPLACE FUNCTION can_update_profile(profile_id uuid, target_role text)
RETURNS boolean AS $$
DECLARE
  current_user_role text;
  current_user_id uuid;
BEGIN
  -- Récupérer l'ID et le rôle de l'utilisateur actuel
  current_user_id := auth.uid();
  
  -- Si pas d'utilisateur connecté, refuser
  IF current_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Récupérer le rôle de l'utilisateur actuel
  SELECT role INTO current_user_role 
  FROM public.profiles 
  WHERE id = current_user_id;
  
  -- Les admins peuvent tout modifier
  IF current_user_role = 'admin' THEN
    RETURN true;
  END IF;
  
  -- Les utilisateurs normaux peuvent modifier leur profil mais pas changer leur rôle
  IF current_user_id = profile_id THEN
    -- Récupérer le rôle actuel du profil
    DECLARE
      current_profile_role text;
    BEGIN
      SELECT role INTO current_profile_role 
      FROM public.profiles 
      WHERE id = profile_id;
      
      -- L'utilisateur peut modifier son profil seulement si le rôle ne change pas
      RETURN current_profile_role = target_role;
    END;
  END IF;
  
  -- Dans tous les autres cas, refuser
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Nouvelle politique de sécurité corrigée
CREATE POLICY "Contrôle sécurisé des modifications de profil" ON public.profiles
  FOR UPDATE USING (
    can_update_profile(id, role)
  );

-- Index pour améliorer les performances des requêtes de sécurité
CREATE INDEX IF NOT EXISTS idx_profiles_role_security ON public.profiles(role, id);

-- Commentaires de sécurité
COMMENT ON FUNCTION secure_new_user_profile() IS 'SÉCURITÉ: Force le rôle member pour tous les nouveaux utilisateurs. Empêche l''élévation de privilèges via manipulation.';
COMMENT ON TRIGGER trigger_secure_new_user ON public.profiles IS 'SÉCURITÉ: Trigger qui force le rôle member pour tous les nouveaux profils utilisateur.';
COMMENT ON FUNCTION can_update_profile(uuid, text) IS 'SÉCURITÉ: Vérifie si un utilisateur peut modifier un profil et changer un rôle.'; 