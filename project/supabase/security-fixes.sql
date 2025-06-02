-- CORRECTIONS DE SÉCURITÉ SUPABASE POUR PACE ATMF ARGENTEUIL
-- À exécuter dans Supabase Dashboard > SQL Editor

-- 1. CORRECTION DU PROBLÈME DE SUPPRESSION D'UTILISATEUR
-- Créer une fonction pour supprimer en cascade les profils liés

CREATE OR REPLACE FUNCTION delete_user_safely(user_id_to_delete UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- D'abord supprimer le profil associé
  DELETE FROM public.profiles WHERE id = user_id_to_delete;
  
  -- Puis supprimer l'utilisateur de auth.users (nécessite des privilèges service_role)
  -- Cette partie sera gérée côté application avec le service role
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$;

-- 2. ACTIVER RLS SUR LA TABLE ROLES
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Créer des politiques pour la table roles
CREATE POLICY "Admins can view all roles" ON public.roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only system can insert roles" ON public.roles
  FOR INSERT WITH CHECK (false); -- Seules les insertions via service role

CREATE POLICY "Admins can update roles" ON public.roles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only system can delete roles" ON public.roles
  FOR DELETE USING (false); -- Seules les suppressions via service role

-- 3. CORRIGER LES FONCTIONS AVEC SEARCH_PATH MUTABLE

-- Fonction update_donations_updated_at
CREATE OR REPLACE FUNCTION public.update_donations_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Fonction is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role = 'admin'
    );
END;
$$;

-- Fonction secure_new_user_profile
CREATE OR REPLACE FUNCTION public.secure_new_user_profile() 
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.role := 'member';
  RAISE LOG 'SÉCURITÉ: Nouveau profil créé pour % avec rôle forcé à member', NEW.email;
  RETURN NEW;
END;
$$;

-- Fonction auto_confirm_user
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public
AS $$
BEGIN
  -- Auto-confirmer seulement en développement ou pour des domaines spécifiques
  IF NEW.email LIKE '%@atmf-argenteuil.org' THEN
    NEW.email_confirmed_at = NOW();
    NEW.confirmed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$;

-- Fonction can_update_profile
CREATE OR REPLACE FUNCTION public.can_update_profile(profile_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Un utilisateur peut modifier son propre profil ou un admin peut modifier n'importe quel profil
    RETURN (
        auth.uid() = profile_id OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );
END;
$$;

-- Fonction update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Fonction handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'member', -- Toujours membre par défaut
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- 4. CRÉER DES POLITIQUES POUR LA TABLE FINANCIAL_DATA
-- (Table avec RLS activé mais sans politiques)

-- Politique pour voir les données financières (admins seulement)
CREATE POLICY "Only admins can view financial data" ON public.financial_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Politique pour insérer des données financières (admins seulement)
CREATE POLICY "Only admins can insert financial data" ON public.financial_data
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Politique pour modifier des données financières (admins seulement)
CREATE POLICY "Only admins can update financial data" ON public.financial_data
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Politique pour supprimer des données financières (admins seulement)
CREATE POLICY "Only admins can delete financial data" ON public.financial_data
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- 5. FONCTION UTILITAIRE POUR SUPPRIMER UN UTILISATEUR PROPREMENT
-- (À utiliser côté application avec le service role)

CREATE OR REPLACE FUNCTION admin_delete_user(user_email TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public
AS $$
DECLARE
  user_record RECORD;
  result JSON;
BEGIN
  -- Vérifier que l'utilisateur actuel est admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Unauthorized');
  END IF;

  -- Trouver l'utilisateur à supprimer
  SELECT * INTO user_record 
  FROM auth.users 
  WHERE email = user_email;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'User not found');
  END IF;

  -- Supprimer le profil d'abord
  DELETE FROM public.profiles WHERE id = user_record.id;
  
  -- Note: La suppression de auth.users doit se faire côté application
  -- avec les privilèges service_role car cette fonction n'y a pas accès
  
  RETURN json_build_object(
    'success', true, 
    'message', 'Profile deleted, user deletion pending',
    'user_id', user_record.id
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- 6. TRIGGER POUR FORCER LE RÔLE MEMBER SUR LES NOUVEAUX PROFILS
-- (Remplacer le trigger existant)

DROP TRIGGER IF EXISTS trigger_secure_new_user ON public.profiles;
CREATE TRIGGER trigger_secure_new_user
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION secure_new_user_profile();

-- 7. FONCTION POUR VÉRIFIER LA SÉCURITÉ (DEBUG)
CREATE OR REPLACE FUNCTION check_security_status()
RETURNS TABLE (
  table_name TEXT,
  rls_enabled BOOLEAN,
  policies_count BIGINT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    schemaname||'.'||tablename as table_name,
    rowsecurity as rls_enabled,
    (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = t.tablename) as policies_count
  FROM pg_tables t 
  WHERE schemaname = 'public'
  ORDER BY table_name;
$$;

-- COMMENTAIRES POUR L'ADMIN :
-- 1. Exécuter ce script dans Supabase Dashboard > SQL Editor
-- 2. Activer la protection des mots de passe compromis dans Auth > Settings
-- 3. Vérifier la sécurité avec : SELECT * FROM check_security_status();
-- 4. Pour supprimer un utilisateur : utiliser la fonction admin_delete_user('email@example.com')
--    puis supprimer manuellement dans auth.users via le dashboard Supabase 