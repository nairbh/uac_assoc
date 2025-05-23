'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Heart } from 'lucide-react';

interface DonationFormProps {
  type: 'onetime' | 'monthly';
}

export function DonationForm({ type }: DonationFormProps) {
  const [amount, setAmount] = useState<string>('50');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [receiptRequested, setReceiptRequested] = useState<boolean>(true);
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value !== 'custom') {
      setCustomAmount('');
    }
  };
  
  const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(event.target.value);
  };
  
  const getDisplayAmount = () => {
    if (amount === 'custom') {
      return customAmount ? `${customAmount}€` : '0€';
    }
    return `${amount}€`;
  };
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Montant du don</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={amount}
              onValueChange={handleAmountChange}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div>
                <RadioGroupItem value="20" id="amount-20" className="peer sr-only" />
                <Label
                  htmlFor="amount-20"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-2xl font-bold">20€</span>
                  {type === 'monthly' && <span className="text-xs text-muted-foreground">par mois</span>}
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="50" id="amount-50" className="peer sr-only" />
                <Label
                  htmlFor="amount-50"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-2xl font-bold">50€</span>
                  {type === 'monthly' && <span className="text-xs text-muted-foreground">par mois</span>}
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="100" id="amount-100" className="peer sr-only" />
                <Label
                  htmlFor="amount-100"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-2xl font-bold">100€</span>
                  {type === 'monthly' && <span className="text-xs text-muted-foreground">par mois</span>}
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="custom" id="amount-custom" className="peer sr-only" />
                <Label
                  htmlFor="amount-custom"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-lg font-medium">Montant libre</span>
                </Label>
              </div>
            </RadioGroup>
            
            {amount === 'custom' && (
              <div className="mt-4">
                <Label htmlFor="custom-amount">Montant personnalisé</Label>
                <div className="relative mt-1">
                  <Input
                    id="custom-amount"
                    type="number"
                    min="1"
                    placeholder="Entrez un montant"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    €
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vos coordonnées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénom</Label>
                <Input id="firstname" placeholder="Votre prénom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Nom</Label>
                <Input id="lastname" placeholder="Votre nom" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Votre email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" placeholder="Votre adresse" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal">Code postal</Label>
                <Input id="postal" placeholder="Code postal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input id="city" placeholder="Ville" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="receipt" 
                checked={receiptRequested}
                onCheckedChange={(checked) => setReceiptRequested(checked as boolean)}
              />
              <Label htmlFor="receipt">Je souhaite recevoir un reçu fiscal</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Montant du don:</span>
                <span className="font-bold">{getDisplayAmount()}</span>
              </div>
              {type === 'monthly' && (
                <div className="text-sm text-muted-foreground">
                  Votre don sera prélevé chaque mois jusqu'à annulation
                </div>
              )}
              {receiptRequested && (
                <div className="text-sm text-muted-foreground">
                  Un reçu fiscal vous sera envoyé par email
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-5 w-5" />
                Procéder au paiement
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              En effectuant ce don, vous acceptez nos <a href="/legal/terms" className="text-primary hover:underline">conditions générales</a> et notre <a href="/legal/privacy" className="text-primary hover:underline">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}