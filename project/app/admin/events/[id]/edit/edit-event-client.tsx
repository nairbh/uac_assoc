'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { Event, getEventById, updateEvent } from '@/lib/db/events';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  'Assemblée Générale',
  'Formation',
  'Conférence',
  'Événement culturel',
  'Action solidaire',
  'Réunion',
  'Célébration',
  'Autre'
];

interface EditEventClientProps {
  params: { id: string };
}

export default function EditEventClient({ params }: EditEventClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      const data = await getEventById(parseInt(params.id));
      if (data) {
        setEvent(data);
      } else {
        toast({
          title: "Erreur",
          description: "Événement non trouvé",
          variant: "destructive",
        });
        router.push('/admin?tab=events');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'événement:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement de l'événement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (!event.title || !event.description || !event.date || !event.time_start || !event.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const updateData = {
        title: event.title,
        slug: generateSlug(event.title),
        description: event.description,
        details: event.details,
        image_url: event.image_url,
        category: event.category,
        date: event.date,
        time_start: event.time_start,
        time_end: event.time_end,
        location: event.location,
        max_participants: event.max_participants,
        status: event.status,
        updated_at: new Date().toISOString()
      };

      const success = await updateEvent(event.id, updateData);
      
      if (success) {
        toast({
          title: "Succès",
          description: "Événement mis à jour avec succès",
        });
        router.push('/admin?tab=events');
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'événement",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement de l'événement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <Button onClick={() => router.push('/admin?tab=events')}>
            Retour aux événements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Modifier l'événement</h1>
          <p className="text-muted-foreground">Modifiez les informations de l'événement</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Détails principaux de l'événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                    placeholder="Titre de l'événement"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    placeholder="Description de l'événement"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Détails supplémentaires</Label>
                  <Textarea
                    id="details"
                    value={event.details || ''}
                    onChange={(e) => setEvent({ ...event, details: e.target.value })}
                    placeholder="Informations complémentaires (optionnel)"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date et lieu</CardTitle>
                <CardDescription>Informations pratiques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={event.date.split('T')[0]}
                        onChange={(e) => setEvent({ ...event, date: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_start">Heure de début *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time_start"
                        type="time"
                        value={event.time_start}
                        onChange={(e) => setEvent({ ...event, time_start: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_end">Heure de fin</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time_end"
                        type="time"
                        value={event.time_end || ''}
                        onChange={(e) => setEvent({ ...event, time_end: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max_participants">Participants max</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="max_participants"
                        type="number"
                        value={event.max_participants || ''}
                        onChange={(e) => setEvent({ ...event, max_participants: parseInt(e.target.value) || null })}
                        placeholder="Illimité"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={event.location}
                      onChange={(e) => setEvent({ ...event, location: e.target.value })}
                      placeholder="Adresse ou lieu de l'événement"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
                <CardDescription>Paramètres de publication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut *</Label>
                  <Select
                    value={event.status}
                    onValueChange={(value) => setEvent({ ...event, status: value as 'draft' | 'published' | 'cancelled' | 'completed' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={event.category}
                    onValueChange={(value) => setEvent({ ...event, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={event.image_url || ''}
                    onChange={(e) => setEvent({ ...event, image_url: e.target.value })}
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Participants actuels : {event.current_participants}</div>
                  <div>Créé le : {new Date(event.created_at).toLocaleDateString('fr-FR')}</div>
                  <div>Modifié le : {new Date(event.updated_at).toLocaleDateString('fr-FR')}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`/events/${event.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 