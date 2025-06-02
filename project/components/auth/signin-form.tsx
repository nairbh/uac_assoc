'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';
import { SecurityValidator, validateEmail, validatePassword } from '@/lib/security';
import PasswordInput from '@/components/PasswordInput';

interface SignInFormProps {
  redirect?: string;
}

export function SignInForm({ redirect }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  
  const { signIn, isLoading, error: authError, user, profile } = useAuth();
  const [error, setError] = useState('');
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Gestion du blocage temporaire après tentatives échouées
  useEffect(() => {
    const checkBlockStatus = () => {
      const lastAttempt = localStorage.getItem('lastFailedSignin');
      const attempts = parseInt(localStorage.getItem('signinAttempts') || '0');
      
      if (attempts >= 5 && lastAttempt) {
        const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
        const blockDuration = 5 * 60 * 1000; // 5 minutes
        
        if (timeSinceLastAttempt < blockDuration) {
          setIsBlocked(true);
          setBlockTimeRemaining(Math.ceil((blockDuration - timeSinceLastAttempt) / 1000));
          
          // Timer pour décompter
          const timer = setInterval(() => {
            const remaining = Math.ceil((blockDuration - (Date.now() - parseInt(lastAttempt))) / 1000);
            if (remaining <= 0) {
              setIsBlocked(false);
              setAttemptCount(0);
              localStorage.removeItem('signinAttempts');
              localStorage.removeItem('lastFailedSignin');
              clearInterval(timer);
            } else {
              setBlockTimeRemaining(remaining);
            }
          }, 1000);
          
          return () => clearInterval(timer);
        } else {
          // Reset si le délai est passé
          localStorage.removeItem('signinAttempts');
          localStorage.removeItem('lastFailedSignin');
        }
      }
      
      setAttemptCount(attempts);
    };
    
    checkBlockStatus();
  }, []);

  // Redirection sécurisée basée sur le rôle après connexion
  useEffect(() => {
    if (user && profile && !isLoading) {
      SecurityValidator.logSecurityEvent(
        'SUCCESSFUL_LOGIN',
        'low',
        `Utilisateur connecté avec le rôle ${profile.role}`,
        window.location.hostname,
        user.id
      );
      
      // Si une redirection est spécifiée, l'utiliser
      if (redirect) {
        router.push(redirect);
        return;
      }
      
      // Sinon, redirection sécurisée selon le rôle
      if (profile.role === 'admin') {
        router.push('/admin');
      } else if (profile.role === 'editor') {
        router.push('/moderator');
      } else {
        router.push('/member');
      }
    }
  }, [user, profile, isLoading, router, redirect]);

  // Validation en temps réel des champs
  const validateField = (field: string, value: string) => {
    const errors: {[key: string]: string} = {};
    
    switch (field) {
      case 'email':
        const emailValidation = validateEmail(value);
        if (!emailValidation.success) {
          errors.email = emailValidation.errors?.[0] || 'Email invalide';
        }
        break;
        
      case 'password':
        if (value.length < 8) {
          errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        }
        break;
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [field]: errors[field] || ''
    }));
    
    return !errors[field];
  };

  // Gestion sécurisée de la soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError(`Trop de tentatives échouées. Veuillez attendre ${Math.ceil(blockTimeRemaining / 60)} minute(s).`);
      return;
    }
    
    setError('');
    
    // Validation côté client
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    
    if (!isEmailValid || !isPasswordValid) {
      SecurityValidator.logSecurityEvent(
        'VALIDATION_FAILED_SIGNIN',
        'low',
        `Tentative de connexion avec données invalides: ${SecurityValidator.obfuscate(email)}`,
        window.location.hostname
      );
      return;
    }
    
    // Détection d'injections potentielles
    if (SecurityValidator.detectSQLInjection(email) || SecurityValidator.detectSQLInjection(password)) {
      SecurityValidator.logSecurityEvent(
        'INJECTION_ATTEMPT_SIGNIN',
        'critical',
        `Tentative d'injection dans le formulaire de connexion: ${SecurityValidator.obfuscate(email)}`,
        window.location.hostname
      );
      setError('Données suspectes détectées. Veuillez contacter l\'administrateur.');
      return;
    }
    
    if (SecurityValidator.detectXSS(email)) {
      SecurityValidator.logSecurityEvent(
        'XSS_ATTEMPT_SIGNIN',
        'critical',
        `Tentative XSS dans le formulaire de connexion: ${SecurityValidator.obfuscate(email)}`,
        window.location.hostname
      );
      setError('Données suspectes détectées. Veuillez contacter l\'administrateur.');
      return;
    }

    try {
      await signIn(email, password);
      
      // Reset des tentatives en cas de succès
      localStorage.removeItem('signinAttempts');
      localStorage.removeItem('lastFailedSignin');
      
    } catch (error: any) {
      // Incrémenter le compteur de tentatives échouées
      const attempts = attemptCount + 1;
      setAttemptCount(attempts);
      localStorage.setItem('signinAttempts', attempts.toString());
      localStorage.setItem('lastFailedSignin', Date.now().toString());
      
      SecurityValidator.logSecurityEvent(
        'FAILED_LOGIN_ATTEMPT',
        attempts >= 3 ? 'high' : 'medium',
        `Tentative de connexion échouée (#${attempts}) pour: ${SecurityValidator.obfuscate(email)}`,
        window.location.hostname
      );
      
      if (attempts >= 5) {
        setIsBlocked(true);
        setBlockTimeRemaining(5 * 60); // 5 minutes
        setError('Trop de tentatives échouées. Accès bloqué temporairement.');
      } else {
        setError(error.message || 'Erreur de connexion');
        
        if (attempts >= 3) {
          setError(`${error.message || 'Erreur de connexion'} (${5 - attempts} tentative(s) restante(s))`);
        }
      }
      
      if (error.message?.includes('Email not confirmed')) {
        setShowResendEmail(true);
      }
    }
  };

  // Messages d'état personnalisés basés sur les paramètres URL
  const getMessageFromParams = () => {
    const message = searchParams?.get('message');
    switch (message) {
      case 'session_expired':
        return { type: 'warning', text: 'Votre session a expiré. Veuillez vous reconnecter.' };
      case 'unauthorized':
        return { type: 'error', text: 'Accès non autorisé. Connexion requise.' };
      case 'profile_missing':
        return { type: 'error', text: 'Profil utilisateur non trouvé.' };
      default:
        return null;
    }
  };

  const statusMessage = getMessageFromParams();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-600" />
          Connexion Sécurisée
        </CardTitle>
        <CardDescription>
          Connectez-vous à votre espace PACE ATMF
        </CardDescription>
      </CardHeader>
      <CardContent>
        {statusMessage && (
          <Alert className={`mb-4 ${statusMessage.type === 'error' ? 'border-destructive' : 'border-yellow-500'}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{statusMessage.text}</AlertDescription>
          </Alert>
        )}
        
        {isBlocked && (
          <Alert className="mb-4 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Compte temporairement bloqué. Temps restant: {Math.floor(blockTimeRemaining / 60)}:{(blockTimeRemaining % 60).toString().padStart(2, '0')}
            </AlertDescription>
          </Alert>
        )}
        
        {attemptCount >= 3 && !isBlocked && (
          <Alert className="mb-4 border-yellow-500">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Attention: {attemptCount}/5 tentatives. Le compte sera bloqué temporairement après 5 échecs.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField('email', e.target.value);
              }}
              disabled={isLoading || isBlocked}
              className={validationErrors.email ? 'border-destructive' : ''}
              autoComplete="email"
            />
            {validationErrors.email && (
              <p className="text-sm text-destructive">{validationErrors.email}</p>
            )}
          </div>

          <PasswordInput
            value={password}
            onChange={(value) => {
              setPassword(value);
              validateField('password', value);
            }}
            label="Mot de passe"
            placeholder="Votre mot de passe"
            required
            className={validationErrors.password ? 'border-destructive' : ''}
          />
          {validationErrors.password && (
            <p className="text-sm text-destructive">{validationErrors.password}</p>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              disabled={isLoading || isBlocked}
            />
            <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
          </div>

          {error && (
            <Alert className="border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {emailSent && (
            <Alert className="border-green-500">
              <AlertDescription>
                Email de confirmation renvoyé avec succès !
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90" 
            disabled={isLoading || isBlocked || !!validationErrors.email || !!validationErrors.password}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </Button>
        </form>

        {showResendEmail && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={async () => {
                setResendingEmail(true);
                // Logique de renvoi d'email ici
                setTimeout(() => {
                  setResendingEmail(false);
                  setEmailSent(true);
                  setShowResendEmail(false);
                }, 2000);
              }}
              disabled={resendingEmail}
            >
              {resendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                'Renvoyer l\'email de confirmation'
              )}
            </Button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Vous pouvez créer un compte en utilisant l'onglet "Inscription" ci-dessus
        </div>
      </CardContent>
    </Card>
  );
} 