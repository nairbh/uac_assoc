'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, AlertTriangle, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function DeleteAccountButton() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'SUPPRIMER') {
      setError('Veuillez taper exactement "SUPPRIMER" pour confirmer');
      return;
    }

    if (!user) {
      setError('Aucun utilisateur connecté');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      // Déconnexion et redirection
      await signOut();
      router.push('/');
      
    } catch (error: any) {
      console.error('Erreur suppression:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="bg-red-100 p-3 rounded-full">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Suppression du compte
          </h3>
          <p className="text-red-700 text-sm mb-4">
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </p>
          
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer mon compte
              </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <AlertDialogTitle className="text-red-900">
                    Confirmer la suppression
                  </AlertDialogTitle>
                </div>
                
                <AlertDialogDescription className="text-gray-600">
                  Cette action supprimera définitivement votre compte et toutes vos données. 
                  Cette opération ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-sm font-medium">
                    Tapez <span className="font-bold text-red-600">&quot;SUPPRIMER&quot;</span> pour confirmer :
                  </Label>
                  <Input
                    id="confirm"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value);
                      setError(null);
                    }}
                    placeholder="SUPPRIMER"
                    className="font-mono"
                  />
                </div>
              </div>

              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel 
                  onClick={() => {
                    setConfirmText('');
                    setError(null);
                  }}
                  className="flex-1"
                >
                  Annuler
                </AlertDialogCancel>
                
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting || confirmText !== 'SUPPRIMER'}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Suppression...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer définitivement
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
} 