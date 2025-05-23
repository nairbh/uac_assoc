'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-300" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold">Accès refusé</h1>
        
        <p className="text-muted-foreground">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <Button 
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <Button 
            onClick={() => router.push('/')}
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  );
} 