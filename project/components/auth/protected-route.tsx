'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions, Permission, Role } from '@/hooks/usePermissions';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: Permission[];
  requiredRole?: Role;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredPermissions,
  requiredRole,
  redirectTo = '/signin'
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isLoading: authLoading, user } = useAuth();
  const { hasPermission, hasRole, hasAllPermissions, loading: permissionsLoading } = usePermissions();
  
  const isLoading = authLoading || permissionsLoading;
  
  useEffect(() => {
    if (!isLoading && !user) {
      // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
      router.push(redirectTo);
      return;
    }
    
    if (!isLoading && user) {
      let hasAccess = true;
      
      // Vérifier le rôle si requis
      if (requiredRole && !hasRole(requiredRole)) {
        hasAccess = false;
      }
      
      // Vérifier les permissions si requises
      if (requiredPermissions && requiredPermissions.length > 0) {
        if (!hasAllPermissions(requiredPermissions)) {
          hasAccess = false;
        }
      }
      
      // Rediriger si l'utilisateur n'a pas les permissions ou le rôle requis
      if (!hasAccess) {
        router.push('/unauthorized');
      }
    }
  }, [
    isLoading, 
    user, 
    router, 
    redirectTo, 
    requiredPermissions, 
    requiredRole,
    hasRole,
    hasAllPermissions
  ]);
  
  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }
  
  // Afficher les enfants si tout est bon
  return <>{children}</>;
} 