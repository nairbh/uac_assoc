'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, User, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface MemberGuardProps {
  children: React.ReactNode;
}

export function MemberGuard({ children }: MemberGuardProps) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [securityCheck, setSecurityCheck] = useState<'checking' | 'authorized' | 'denied'>('checking');
  const [securityReason, setSecurityReason] = useState<string>('');

  useEffect(() => {
    const performSecurityCheck = async () => {
      console.log('🔒 DÉMARRAGE DU CONTRÔLE DE SÉCURITÉ MEMBRE');
      
      // Étape 1: Vérifier si l'utilisateur est connecté
      if (!user) {
        console.log('❌ SÉCURITÉ: Aucun utilisateur connecté');
        setSecurityReason('Vous devez être connecté pour accéder à cette page');
        setSecurityCheck('denied');
        router.push('/signin?message=session_required&redirect=/member');
        return;
      }

      // Étape 2: Vérifier si on a un profil
      if (!profile) {
        console.log('❌ SÉCURITÉ: Aucun profil utilisateur');
        setSecurityReason('Profil utilisateur inaccessible');
        setSecurityCheck('denied');
        router.push('/signin?message=profile_missing&redirect=/member');
        return;
      }

      // Étape 3: Vérification CÔTÉ SERVEUR de l'existence du profil (anti-manipulation)
      try {
        console.log('🔍 SÉCURITÉ: Vérification côté serveur du profil membre...');
        const { data: serverProfile, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email, role, banned')
          .eq('id', user.id)
          .single();

        if (error) {
          console.log('❌ SÉCURITÉ: Erreur lors de la vérification serveur:', error);
          setSecurityReason('Impossible de vérifier votre profil côté serveur');
          setSecurityCheck('denied');
          router.push('/signin?message=profile_error&redirect=/member');
          return;
        }

        // Étape 4: Vérifier que le profil n'est pas banni
        if (serverProfile.banned) {
          console.log('🚨 SÉCURITÉ: Utilisateur banni tente d\'accéder à l\'espace membre');
          setSecurityReason('Votre compte a été suspendu. Contactez l\'administration.');
          setSecurityCheck('denied');
          router.push('/unauthorized');
          return;
        }

        // Étape 5: Vérifier que le profil côté serveur correspond au profil local
        if (serverProfile.email !== profile.email || serverProfile.role !== profile.role) {
          console.log('🚨 SÉCURITÉ: INCOHÉRENCE DÉTECTÉE entre profil local et serveur!');
          console.log('Profil local:', { email: profile.email, role: profile.role });
          console.log('Profil serveur:', { email: serverProfile.email, role: serverProfile.role });
          setSecurityReason('Incohérence détectée dans vos données de profil');
          setSecurityCheck('denied');
          router.push('/signin?message=profile_inconsistency');
          return;
        }

        // ✅ TOUTES LES VÉRIFICATIONS PASSÉES
        console.log('✅ SÉCURITÉ: Accès espace membre autorisé pour:', profile.email, 'avec rôle:', profile.role);
        setSecurityCheck('authorized');

      } catch (error: any) {
        console.log('🚨 SÉCURITÉ: Erreur critique lors du contrôle membre:', error);
        setSecurityReason('Erreur de sécurité critique');
        setSecurityCheck('denied');
        router.push('/signin?message=security_error');
      }
    };

    if (!isLoading) {
      performSecurityCheck();
    }
  }, [user, profile, isLoading, router]);

  // Affichage pendant la vérification
  if (isLoading || securityCheck === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <User className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Vérification d'accès</h2>
            <p className="text-muted-foreground">Contrôle de vos permissions d'accès...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage si accès refusé
  if (securityCheck === 'denied') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="max-w-md mx-auto text-center space-y-6 p-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900">
              <Lock className="h-10 w-10 text-red-600 dark:text-red-300" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-red-600">Accès Refusé</h1>
            <p className="text-muted-foreground">Connexion requise pour accéder à votre espace</p>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Raison:</strong> {securityReason}
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/signin')}
              className="w-full"
            >
              Se connecter
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Si vous rencontrez des difficultés, contactez notre support.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Accès autorisé - afficher le contenu membre
  return <>{children}</>;
} 