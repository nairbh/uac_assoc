'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

// Définir les types
export type Permission = 
  | 'create_article' | 'edit_article' | 'delete_article' | 'publish_article'
  | 'create_event' | 'edit_event' | 'delete_event' | 'publish_event'
  | 'manage_users' | 'view_analytics' | 'manage_donations'
  | 'system_settings' | 'moderate_comments';

export type Role = 'admin' | 'editor' | 'moderator' | 'member' | 'guest';

export const usePermissions = () => {
  const { user, profile, isAdmin } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Définir l'ordre hiérarchique des rôles pour les vérifications
  const roleHierarchy: Record<Role, number> = {
    'admin': 4,
    'editor': 3,
    'moderator': 2,
    'member': 1,
    'guest': 0
  };

  // Charger les permissions depuis la base de données
  useEffect(() => {
    const loadPermissions = async () => {
      if (!user || !profile) {
        setPermissions([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('role_permissions')
          .select(`
            permission_id,
            permissions(name)
          `)
          .eq('role', profile.role);

        if (error) throw error;

        const userPermissions = data?.map(item => item.permissions.name as Permission) || [];
        setPermissions(userPermissions);
        setError(null);
      } catch (err: any) {
        console.error('Erreur lors du chargement des permissions:', err);
        setError(err.message || 'Erreur lors du chargement des permissions');
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [user, profile]);

  // Vérifier si l'utilisateur a une permission spécifique
  const hasPermission = (permission: Permission): boolean => {
    if (!user || !profile) return false;
    if (isAdmin) return true; // Les admins ont toutes les permissions
    return permissions.includes(permission);
  };

  // Vérifier si l'utilisateur a un rôle au moins égal à celui spécifié
  const hasRole = (requiredRole: Role): boolean => {
    if (!user || !profile) return false;
    const userRoleLevel = roleHierarchy[profile.role as Role] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole];
    return userRoleLevel >= requiredRoleLevel;
  };

  // Vérifier si l'utilisateur possède toutes les permissions spécifiées
  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    if (!user || !profile) return false;
    if (isAdmin) return true;
    return requiredPermissions.every(permission => permissions.includes(permission));
  };

  // Vérifier si l'utilisateur possède au moins une des permissions spécifiées
  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    if (!user || !profile) return false;
    if (isAdmin) return true;
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  // Liste de toutes les permissions disponibles pour référence
  const allPermissions: Record<Permission, string> = useMemo(() => ({
    create_article: 'Créer des articles',
    edit_article: 'Modifier des articles',
    delete_article: 'Supprimer des articles',
    publish_article: 'Publier des articles',
    create_event: 'Créer des événements',
    edit_event: 'Modifier des événements',
    delete_event: 'Supprimer des événements',
    publish_event: 'Publier des événements',
    manage_users: 'Gérer les utilisateurs',
    view_analytics: 'Voir les statistiques',
    manage_donations: 'Gérer les dons',
    system_settings: 'Configurer les paramètres système',
    moderate_comments: 'Modérer les commentaires',
  }), []);

  return {
    permissions,
    hasPermission,
    hasRole,
    hasAllPermissions,
    hasAnyPermission,
    allPermissions,
    loading,
    error,
  };
}; 