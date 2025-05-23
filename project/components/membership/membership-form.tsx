'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export function MembershipForm() {
  return (
    <Card className="p-6">
      <form className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informations personnelles</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom *</Label>
              <Input id="firstname" placeholder="Votre prénom" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Nom *</Label>
              <Input id="lastname" placeholder="Votre nom" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthdate">Date de naissance *</Label>
              <Input id="birthdate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationalité *</Label>
              <Select defaultValue="algerian">
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Choisir une nationalité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algerian">Algérienne</SelectItem>
                  <SelectItem value="french">Française</SelectItem>
                  <SelectItem value="dual">Double nationalité</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" placeholder="Votre email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input id="phone" type="tel" placeholder="Votre numéro de téléphone" required />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Adresse</h3>
          
          <div className="space-y-2">
            <Label htmlFor="address">Adresse *</Label>
            <Input id="address" placeholder="Votre adresse" required />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal">Code postal *</Label>
              <Input id="postal" placeholder="Code postal" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="city">Ville *</Label>
              <Input id="city" placeholder="Ville" required />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Centres d'intérêt</h3>
          <p className="text-sm text-muted-foreground">
            Pour mieux vous connaître et vous proposer des activités qui vous correspondent
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-culture" />
              <Label htmlFor="interest-culture">Culture et patrimoine</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-solidarity" />
              <Label htmlFor="interest-solidarity">Solidarité et humanitaire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-education" />
              <Label htmlFor="interest-education">Éducation et formation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-entrepreneurship" />
              <Label htmlFor="interest-entrepreneurship">Entrepreneuriat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-arts" />
              <Label htmlFor="interest-arts">Arts et spectacles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="interest-sports" />
              <Label htmlFor="interest-sports">Sports et loisirs</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motivations">
              Vos motivations pour rejoindre l'association
            </Label>
            <Textarea 
              id="motivations" 
              placeholder="Partagez-nous vos motivations pour rejoindre l'ATMF Argenteuil" 
              rows={4}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm">
              J'accepte les <a href="/legal/terms" className="text-primary hover:underline">statuts de l'association</a> et la <a href="/legal/privacy" className="text-primary hover:underline">politique de confidentialité</a> *
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter" className="text-sm">
              Je souhaite recevoir la newsletter de l'association
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="volunteer" />
            <Label htmlFor="volunteer" className="text-sm">
              Je souhaite devenir bénévole pour l'association
            </Label>
          </div>
        </div>
        
        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Soumettre ma demande d'adhésion
          </Button>
        </div>
      </form>
    </Card>
  );
}