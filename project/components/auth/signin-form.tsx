'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading, error: authError } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer plus tard.');
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
          <div className="text-red-500 text-sm">{error || authError}</div>
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
        <p className="text-muted-foreground mt-4 text-xs border-t border-border pt-4">
          Pour tester l'interface admin: admin@atmf-argenteuil.org / admin
        </p>
      </div>
    </div>
  );
} 