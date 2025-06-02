'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/components/auth/signin-form';
import { SignUpForm } from '@/components/auth/signup-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile, isLoading } = useAuth();
  const message = searchParams.get('message');
  const redirect = searchParams.get('redirect');

  // Rediriger les utilisateurs déjà connectés
  useEffect(() => {
    if (!isLoading && user && profile) {
      console.log('Utilisateur déjà connecté, redirection...');
      
      // Si une redirection spécifique est demandée, l'utiliser
      if (redirect) {
        router.push(redirect);
        return;
      }
      
      // Sinon, redirection selon le rôle
      if (profile.role === 'admin') {
        router.push('/admin');
      } else if (profile.role === 'editor') {
        router.push('/moderator');
      } else {
        router.push('/member');
      }
    }
  }, [user, profile, isLoading, router, redirect]);

  const getMessage = () => {
    switch (message) {
      case 'session_expired':
        return 'Votre session a expiré. Veuillez vous reconnecter.';
      case 'profile_missing':
        return 'Votre profil n\'est pas accessible. Veuillez vous reconnecter.';
      case 'session_required':
        return 'Vous devez être connecté pour accéder à cette page.';
      case 'profile_error':
        return 'Erreur lors de la vérification de votre profil. Reconnectez-vous.';
      case 'profile_inconsistency':
        return 'Incohérence détectée dans vos données. Veuillez vous reconnecter.';
      case 'security_error':
        return 'Erreur de sécurité. Reconnectez-vous pour continuer.';
      default:
        return null;
    }
  };

  // Afficher un loader pendant la vérification d'auth
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-md space-y-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Vérification...</p>
          </div>
        </div>
      </div>
    );
  }

  // Ne pas afficher la page si l'utilisateur est connecté (sera redirigé)
  if (user && profile) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bienvenue</h1>
          <p className="text-muted-foreground">
            Connectez-vous ou créez un compte pour accéder à votre espace membre
          </p>
        </div>

        {getMessage() && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{getMessage()}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignInForm redirect={redirect} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}