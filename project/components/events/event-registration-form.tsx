'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';

interface EventRegistrationFormProps {
  event: Event;
}

export function EventRegistrationForm({ event }: EventRegistrationFormProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleContactForRegistration = () => {
    // Rediriger vers la page contact avec les informations de l'événement
    const eventInfo = encodeURIComponent(`Inscription à l'événement : ${event.title} - ${new Date(event.date).toLocaleDateString('fr-FR')}`);
    router.push(`/contact?subject=${eventInfo}`);
  };

  const handleCallForRegistration = () => {
    // Ouvrir l'application téléphone
    window.location.href = 'tel:+33139611234';
  };

  const isFull = event.max_participants && event.current_participants >= event.max_participants;

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-xl font-semibold">Inscription à l'événement</h3>
      
      {isFull ? (
        <div className="text-center py-4">
          <p className="text-red-600 font-medium mb-4">Événement complet</p>
          <p className="text-sm text-gray-600">
            Contactez-nous pour être mis sur liste d'attente
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-700">
            Pour vous inscrire à cet événement, vous pouvez :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              onClick={handleContactForRegistration}
              className="flex items-center gap-2"
              size="lg"
            >
              <Mail className="h-4 w-4" />
              Nous contacter
            </Button>
            
            <Button 
              onClick={handleCallForRegistration}
              variant="outline"
              className="flex items-center gap-2"
              size="lg"
            >
              <Phone className="h-4 w-4" />
              Appeler
            </Button>
          </div>
        </div>
      )}

      <div className="border-t pt-4 space-y-2">
        <h4 className="font-medium text-gray-900">Informations pratiques</h4>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>01 39 61 12 34</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>contact@atmf-argenteuil.org</span>
        </div>
        
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 mt-0.5" />
          <span>25 rue Gabriel Péri, 95100 Argenteuil</span>
        </div>
        
        <div className="text-xs text-gray-500 mt-3">
          <p>Horaires d'accueil :</p>
          <p>Mardi et jeudi : 14h - 17h</p>
          <p>Ou sur rendez-vous</p>
        </div>
      </div>
    </div>
  );
} 