'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteAccountButtonProps {
  userId: string;
}

export default function DeleteAccountButton({ userId }: DeleteAccountButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (confirmText !== 'SUPPRIMER') {
      alert('Veuillez taper "SUPPRIMER" pour confirmer');
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch('/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        // Déconnexion de l'utilisateur
        await supabase.auth.signOut();
        alert('Votre compte a été supprimé avec succès');
        router.push('/');
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error('Erreur suppression compte:', error);
      alert('Une erreur est survenue lors de la suppression');
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
      setConfirmText('');
    }
  };

  if (!showConfirmation) {
    return (
      <button
        onClick={() => setShowConfirmation(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <Trash2 size={16} />
        Supprimer mon compte
      </button>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center gap-2 text-red-800 mb-4">
        <AlertTriangle size={20} />
        <h3 className="font-semibold">Suppression définitive du compte</h3>
      </div>
      
      <div className="text-red-700 mb-4">
        <p className="mb-2">⚠️ Cette action est irréversible !</p>
        <p className="mb-2">En supprimant votre compte :</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Toutes vos données personnelles seront supprimées</li>
          <li>Vous perdrez l'accès à votre profil</li>
          <li>Cette action ne peut pas être annulée</li>
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-red-800 mb-2">
          Pour confirmer, tapez "SUPPRIMER" ci-dessous :
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Tapez SUPPRIMER"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setShowConfirmation(false);
            setConfirmText('');
          }}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          disabled={isDeleting}
        >
          Annuler
        </button>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting || confirmText !== 'SUPPRIMER'}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
        >
          {isDeleting ? 'Suppression...' : 'Confirmer la suppression'}
        </button>
      </div>
    </div>
  );
} 