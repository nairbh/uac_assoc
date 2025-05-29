'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, AlertCircle, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface SignInFormProps {
  redirect?: string | null;
}

export function SignInForm({ redirect }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading, error: authError, user, profile, isAdmin } = useAuth();
  const [error, setError] = useState('');
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  // Redirection sécurisée basée sur le rôle après connexion
  useEffect(() => {
    if (user && profile && !isLoading) {
      console.log('Utilisateur connecté avec le rôle:', profile.role);
      
      // Si une redirection est spécifiée, l'utiliser
      if (redirect) {
        console.log('Redirection vers:', redirect);
        router.push(redirect);
        return;
      }
      
      // Sinon, redirection sécurisée selon le rôle
      if (profile.role === 'admin') {
        console.log('Redirection vers admin dashboard');
        router.push('/admin');
      } else if (profile.role === 'editor') {
        console.log('Redirection vers espace modérateur');
        router.push('/moderator');
      } else {
        console.log('Redirection vers espace membre');
        router.push('/member');
      }
    }
  }, [user, profile, isLoading, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowResendEmail(false);
    setEmailSent(false);

    try {
      await signIn(email, password);
      // Pas de redirection automatique ici - elle sera gérée par un useEffect
      // qui vérifie le rôle de l'utilisateur connecté
    } catch (error: any) {
      const errorMessage = error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.';
      setError(errorMessage);
      
      // Si l'erreur concerne la confirmation d'email, afficher l'option de renvoyer l'email
      if (errorMessage.includes('confirm') || errorMessage.includes('email')) {
        setShowResendEmail(true);
      }
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    setResendingEmail(true);
    setError('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        setError('Erreur lors de l\'envoi de l\'email : ' + error.message);
      } else {
        setEmailSent(true);
        setShowResendEmail(false);
      }
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email de confirmation');
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="exemple@email.com"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Button variant="link" className="px-0 text-xs" type="button">
              Mot de passe oublié?
            </Button>
          </div>
          <Input
            id="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
          />
          <Label
            htmlFor="remember-me"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Se souvenir de moi
          </Label>
        </div>
        
        {(error || authError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || authError}</AlertDescription>
          </Alert>
        )}

        {emailSent && (
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription className="text-green-600">
              Email de confirmation renvoyé ! Vérifiez votre boîte mail.
            </AlertDescription>
          </Alert>
        )}

        {showResendEmail && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p>Votre email n'est pas encore confirmé.</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleResendConfirmation}
                  disabled={resendingEmail}
                >
                  {resendingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Renvoyer l'email de confirmation
                    </>
                  )}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <p className="text-muted-foreground">
          Vous n'avez pas encore de compte? Contactez l'administrateur.
        </p>
        <div className="text-muted-foreground mt-4 text-xs border-t border-border pt-4 space-y-2">
          <p className="font-medium">Pour tester l'interface admin :</p>
          <p className="font-mono bg-muted px-2 py-1 rounded">admin@atmf-argenteuil.org / admin</p>
          <p className="text-xs">Ou désactivez la confirmation d'email dans Supabase</p>
        </div>
      </div>
    </div>
  );
} 