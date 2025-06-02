-- Migration sécurisée pour la suppression d'utilisateurs avec cascade protégée
-- Cette migration ajoute des protections pour éviter les suppressions malveillantes

-- 1. Créer une fonction de sécurité pour vérifier les permissions avant suppression
CREATE OR REPLACE FUNCTION check_deletion_permission()
RETURNS TRIGGER AS $$
DECLARE
    current_user_role TEXT;
    target_user_role TEXT;
BEGIN
    -- Récupérer le rôle de l'utilisateur qui fait la suppression
    SELECT role INTO current_user_role 
    FROM public.profiles 
    WHERE id = auth.uid();
    
    -- Si l'utilisateur n'est pas admin, bloquer la suppression
    IF current_user_role != 'admin' THEN
        RAISE EXCEPTION 'Seuls les administrateurs peuvent supprimer des utilisateurs';
    END IF;
    
    -- Récupérer le rôle de l'utilisateur à supprimer
    SELECT role INTO target_user_role 
    FROM public.profiles 
    WHERE id = OLD.id;
    
    -- Empêcher la suppression d'admins par d'autres admins (sauf si c'est lui-même)
    IF target_user_role = 'admin' AND OLD.id != auth.uid() THEN
        RAISE EXCEPTION 'Impossible de supprimer un autre administrateur';
    END IF;
    
    -- Log de sécurité
    INSERT INTO public.security_logs (
        event_type,
        severity,
        message,
        user_id,
        target_user_id,
        ip_address,
        created_at
    ) VALUES (
        'USER_DELETION_AUTHORIZED',
        'low',
        'Suppression d''utilisateur autorisée par admin: ' || COALESCE(target_user_role, 'unknown'),
        auth.uid(),
        OLD.id,
        inet_client_addr()::text,
        NOW()
    );
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Créer la table de logs de sécurité si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.security_logs (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    target_user_id UUID,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS security_logs_created_at_idx ON public.security_logs(created_at);
CREATE INDEX IF NOT EXISTS security_logs_event_type_idx ON public.security_logs(event_type);
CREATE INDEX IF NOT EXISTS security_logs_user_id_idx ON public.security_logs(user_id);

-- 3. Activer RLS sur la table security_logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Politique pour que seuls les admins voient les logs
CREATE POLICY "Admins can view security logs" ON public.security_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 4. Créer le trigger de sécurité AVANT la suppression
DROP TRIGGER IF EXISTS trigger_check_deletion_permission ON public.profiles;
CREATE TRIGGER trigger_check_deletion_permission
    BEFORE DELETE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION check_deletion_permission();

-- 5. Supprimer l'ancienne contrainte si elle existe
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 6. Ajouter la nouvelle contrainte avec CASCADE sécurisée
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- 7. Créer une fonction pour nettoyer les anciens logs (optionnel)
CREATE OR REPLACE FUNCTION cleanup_old_security_logs()
RETURNS void AS $$
BEGIN
    -- Supprimer les logs de plus de 90 jours
    DELETE FROM public.security_logs 
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    -- Log du nettoyage
    INSERT INTO public.security_logs (
        event_type,
        severity,
        message,
        created_at
    ) VALUES (
        'LOG_CLEANUP',
        'low',
        'Nettoyage automatique des anciens logs de sécurité',
        NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commentaires explicatifs
COMMENT ON FUNCTION check_deletion_permission() IS 
'Fonction de sécurité qui vérifie les permissions avant la suppression d''un utilisateur. Seuls les admins peuvent supprimer, et ils ne peuvent pas supprimer d''autres admins.';

COMMENT ON TABLE public.security_logs IS 
'Table de logs de sécurité pour tracer toutes les actions sensibles comme les suppressions d''utilisateurs.';

COMMENT ON CONSTRAINT profiles_id_fkey ON public.profiles IS 
'Contrainte de clé étrangère avec suppression en cascade sécurisée - supprime automatiquement le profil quand l''utilisateur est supprimé, mais seulement après vérification des permissions.';

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Migration sécurisée appliquée avec succès. Les suppressions d''utilisateurs sont maintenant protégées et loggées.';
END
$$; 