'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    
    // Simulate form submission
    setTimeout(() => {
      setFormState({
        ...formState,
        submitted: true,
        loading: false
      });
    }, 1500);
  };
  
  if (formState.submitted) {
    return (
      <Card className="p-8 text-center space-y-4">
        <div className="mx-auto bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-full w-16 h-16 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Message envoyé !</h2>
        <p className="text-muted-foreground">
          Merci de nous avoir contacté. Notre équipe va étudier votre message et
          vous répondra dans les plus brefs délais.
        </p>
        <Button onClick={() => setFormState({ ...formState, submitted: false })}>
          Envoyer un autre message
        </Button>
      </Card>
    );
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Formulaire de contact</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input 
              id="name" 
              placeholder="Votre nom" 
              required 
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Votre email" 
              required 
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Sujet *</Label>
          <Select 
            value={formState.subject}
            onValueChange={(value) => setFormState({ ...formState, subject: value })}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Question générale</SelectItem>
              <SelectItem value="membership">Adhésion</SelectItem>
              <SelectItem value="donation">Don</SelectItem>
              <SelectItem value="partnership">Partenariat</SelectItem>
              <SelectItem value="event">Événement</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea 
            id="message" 
            placeholder="Votre message" 
            rows={6} 
            required 
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={formState.loading}>
          {formState.loading ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>
      </form>
    </Card>
  );
}