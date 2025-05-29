'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, Shield, Lock, Edit } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ModeratorGuardProps {
  children: React.ReactNode;
}

export function ModeratorGuard({ children }: ModeratorGuardProps) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [securityCheck, setSecurityCheck] = useState<'checking' | 'authorized' | 'denied'>('checking');
  const [securityReason, setSecurityReason] = useState<string>('');

  useEffect(() => {
    const performSecurityCheck = async () => {
      console.log('🔒 DÉMARRAGE DU CONTRÔLE DE SÉCURITÉ MODÉRATEUR');
      
      // Étape 1: Vérifier si l'utilisateur est connecté
      if (!user) {
        console.log('❌ SÉCURITÉ: Aucun utilisateur connecté');
        setSecurityReason('Aucune session utilisateur détectée');
        setSecurityCheck('denied');
        router.push('/signin');
        return;
      }

      // Étape 2: Vérifier si on a un profil
      if (!profile) {
        console.log('❌ SÉCURITÉ: Aucun profil utilisateur');
        setSecurityReason('Profil utilisateur inaccessible');
        setSecurityCheck('denied');
        router.push('/unauthorized');
        return;
      }

      // Étape 3: Vérification CÔTÉ SERVEUR du rôle (anti-manipulation)
      try {
        console.log('🔍 SÉCURITÉ: Vérification côté serveur du rôle modérateur...');
        const { data: serverProfile, error } = await supabase
          .from('profiles')
          .select('role, id, email')
          .eq('id', user.id)
          .single();

        if (error) {
          console.log('❌ SÉCURITÉ: Erreur lors de la vérification serveur:', error);
          setSecurityReason('Impossible de vérifier les permissions côté serveur');
          setSecurityCheck('denied');
          router.push('/unauthorized');
          return;
        }

        // Étape 4: Vérifier que le rôle côté serveur correspond au rôle local
        if (serverProfile.role !== profile.role) {
          console.log('🚨 SÉCURITÉ: TENTATIVE DE MANIPULATION DÉTECTÉE!');
          console.log('Rôle local:', profile.role, 'Rôle serveur:', serverProfile.role);
          setSecurityReason('Incohérence détectée entre les permissions locales et serveur');
          setSecurityCheck('denied');
          router.push('/unauthorized');
          return;
        }

        // Étape 5: Vérifier que l'utilisateur est modérateur OU admin
        if (serverProfile.role !== 'editor' && serverProfile.role !== 'admin') {
          console.log('❌ SÉCURITÉ: Utilisateur non-modérateur tente d\'accéder à la modération');
          console.log('Rôle détecté:', serverProfile.role);
          setSecurityReason(`Accès refusé. Rôle requis: modérateur ou admin, rôle actuel: ${serverProfile.role}`);
          setSecurityCheck('denied');
          router.push('/unauthorized');
          return;
        }

        // ✅ TOUTES LES VÉRIFICATIONS PASSÉES
        console.log('✅ SÉCURITÉ: Accès modérateur autorisé pour:', profile.email, 'avec rôle:', serverProfile.role);
        setSecurityCheck('authorized');

      } catch (error) {
        console.log('🚨 SÉCURITÉ: Erreur critique lors du contrôle modérateur:', error);
        setSecurityReason('Erreur de sécurité critique');
        setSecurityCheck('denied');
        router.push('/unauthorized');
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
            <Edit className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Contrôle de sécurité</h2>
            <p className="text-muted-foreground">Vérification des permissions de modération...</p>
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
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900">
              <Lock className="h-10 w-10 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-orange-600">Accès Refusé</h1>
            <p className="text-muted-foreground">Permissions de modération requises</p>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Raison:</strong> {securityReason}
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button 
              onClick={() => router.push('/member')}
              className="w-full"
            >
              Retour à mon espace
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
            Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Accès autorisé - afficher le contenu modérateur
  return <>{children}</>;
} 