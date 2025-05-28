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
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { Event } from '@/types';
import { getEventById, updateEvent } from '@/lib/db/events';
import { toast } from 'sonner';

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      const data = await getEventById(parseInt(params.id));
      setEvent(data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'événement:', error);
      toast.error('Erreur lors du chargement de l\'événement');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setIsSaving(true);
    try {
      await updateEvent(event.id, event);
      toast.success('Événement mis à jour avec succès');
      router.push('/admin/events');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour de l\'événement');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!event) {
    return <div>Événement non trouvé</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Modifier l'événement</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Retour
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={event.date.split('T')[0]}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">
              Heure
            </label>
            <Input
              id="time"
              type="time"
              value={event.time}
              onChange={(e) => setEvent({ ...event, time: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Lieu
            </label>
            <Input
              id="location"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="max_participants" className="text-sm font-medium">
              Nombre maximum de participants
            </label>
            <Input
              id="max_participants"
              type="number"
              value={event.max_participants || ''}
              onChange={(e) => setEvent({ ...event, max_participants: parseInt(e.target.value) || null })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Statut
            </label>
            <Select
              value={event.status}
              onValueChange={(value) => setEvent({ ...event, status: value })}
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
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
            required
            rows={5}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
} 