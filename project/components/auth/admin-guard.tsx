'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, Shield, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, profile, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [securityCheck, setSecurityCheck] = useState<'checking' | 'authorized' | 'denied'>('checking');
  const [securityReason, setSecurityReason] = useState<string>('');

  useEffect(() => {
    const performSecurityCheck = async () => {
      console.log('🔒 DÉMARRAGE DU CONTRÔLE DE SÉCURITÉ ADMIN');
      
      // Étape 1: Vérifier si l'utilisateur est connecté
      if (!user) {
        console.log('❌ SÉCURITÉ: Aucun utilisateur connecté');
        setSecurityReason('Aucune session utilisateur détectée');
        setSecurityCheck('denied');
        router.push('/signin?message=session_expired&redirect=/admin');
        return;
      }

      // Étape 2: Vérifier si on a un profil
      if (!profile) {
        console.log('❌ SÉCURITÉ: Aucun profil utilisateur');
        setSecurityReason('Profil utilisateur inaccessible');
        setSecurityCheck('denied');
        router.push('/signin?message=profile_missing&redirect=/admin');
        return;
      }

      // Étape 3: Vérifier si l'utilisateur est admin
      if (!isAdmin) {
        console.log('❌ SÉCURITÉ: Utilisateur non admin');
        setSecurityReason('Permissions administrateur requises');
        setSecurityCheck('denied');
        router.push('/unauthorized');
        return;
      }

      // Si toutes les vérifications sont passées
      console.log('✅ SÉCURITÉ: Accès admin autorisé');
      setSecurityCheck('authorized');
    };

    if (!isLoading) {
      performSecurityCheck();
    }
  }, [user, profile, isLoading, isAdmin, router]);

  if (isLoading || securityCheck === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (securityCheck === 'denied') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full space-y-4 p-6">
          <div className="text-center space-y-2">
            <Shield className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">Accès Refusé</h1>
            <p className="text-muted-foreground">
              {securityReason}
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full">
              <a href="/signin">Retour à la connexion</a>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur système.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 