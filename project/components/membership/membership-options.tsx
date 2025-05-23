'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export function MembershipOptions() {
  const [selectedOption, setSelectedOption] = useState<string>('standard');
  
  const membershipTypes = [
    {
      id: 'standard',
      title: 'Membre Standard',
      price: '30€',
      period: 'par an',
      description: 'Adhésion de base pour soutenir et participer aux activités de l\'association',
      features: [
        'Participation aux assemblées générales',
        'Accès à la communauté en ligne',
        'Réductions sur les événements',
        'Newsletter mensuelle'
      ]
    },
    {
      id: 'family',
      title: 'Membre Famille',
      price: '50€',
      period: 'par an',
      description: 'Adhésion pour toute la famille (jusqu\'à 5 membres)',
      features: [
        'Tous les avantages du membre standard',
        'Jusqu\'à 5 cartes de membres',
        'Réductions familiales aux événements',
        'Accès prioritaire aux activités enfants'
      ]
    },
    {
      id: 'benefactor',
      title: 'Membre Bienfaiteur',
      price: '100€',
      period: 'par an',
      description: 'Adhésion avec un soutien financier plus important pour nos actions',
      badge: 'Recommandé',
      features: [
        'Tous les avantages du membre standard',
        'Mention dans notre rapport annuel',
        'Invitations aux événements VIP',
        'Accès prioritaire à toutes les activités'
      ]
    }
  ];
  
  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={setSelectedOption}
      className="grid md:grid-cols-3 gap-6 pt-4"
    >
      {membershipTypes.map((type) => (
        <div key={type.id}>
          <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
          <Label htmlFor={type.id}>
            <Card className="h-full cursor-pointer border-2 peer-data-[state=checked]:border-primary">
              <CardHeader>
                {type.badge && (
                  <Badge className="w-fit mb-2">{type.badge}</Badge>
                )}
                <CardTitle>{type.title}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">{type.price}</span>
                  <span className="text-sm text-muted-foreground"> {type.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={selectedOption === type.id ? "default" : "outline"}
                >
                  {selectedOption === type.id ? "Sélectionné" : "Sélectionner"}
                </Button>
              </CardFooter>
            </Card>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block h-full cursor-pointer">
      {children}
    </label>
  );
}