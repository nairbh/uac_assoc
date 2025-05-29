'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/components/auth/signin-form';
import { SignUpForm } from '@/components/auth/signup-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const redirect = searchParams.get('redirect');

  const getMessage = () => {
    switch (message) {
      case 'session_expired':
        return 'Votre session a expiré. Veuillez vous reconnecter.';
      case 'profile_missing':
        return 'Votre profil n\'est pas accessible. Veuillez vous reconnecter.';
      default:
        return null;
    }
  };

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