'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import PasswordInput from '@/components/PasswordInput';

export function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    // Validation de base côté client
    if (!firstName.trim() || !lastName.trim()) {
      setError('Le prénom et le nom sont obligatoires');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Tentative d\'inscription...');
      console.log('Données formulaire:', { firstName: firstName.trim(), lastName: lastName.trim(), email });
      const result = await signUp(email, password, firstName.trim(), lastName.trim());
      console.log('Résultat de l\'inscription:', result);

      if (!result) {
        setError('Erreur inattendue: aucune réponse reçue');
        return;
      }

      if (!result.success) {
        // Gestion des erreurs spécifiques
        let errorMessage = result.error || 'Une erreur s\'est produite lors de l\'inscription';
        
        if (errorMessage.includes('User already registered')) {
          errorMessage = 'Un compte existe déjà avec cette adresse email. Essayez de vous connecter.';
        } else if (errorMessage.includes('Invalid email')) {
          errorMessage = 'Adresse email invalide. Veuillez vérifier le format.';
        } else if (errorMessage.includes('Password')) {
          errorMessage = 'Le mot de passe ne respecte pas les critères requis.';
        }
        
        setError(errorMessage);
      } else {
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        console.log('Inscription réussie !');
        
        // Rediriger vers un espace membre normal, PAS vers admin
        setTimeout(() => {
          router.push('/member'); // Redirection vers l'espace membre
        }, 2000);
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'inscription:', err);
      setError('Une erreur inattendue s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">
            Inscription réussie ! Redirection vers votre espace membre...
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input 
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input 
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <PasswordInput
        value={password}
        onChange={setPassword}
        label="Mot de passe"
        placeholder="Choisissez un mot de passe sécurisé"
        required
        showStrength={true}
      />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || password.length < 8 || !firstName.trim() || !lastName.trim() || !email.trim()}
      >
        {isLoading ? 'Inscription...' : 'S\'inscrire'}
      </Button>
      
      <div className="mt-4 text-center text-sm space-y-2">
        <p className="text-muted-foreground">
          Votre compte sera créé immédiatement après inscription.
        </p>
      </div>
    </form>
  );
} 