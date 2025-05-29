import EditEventClient from './edit-event-client';
import { getAllEvents } from '@/lib/db/events';

// Générer les paramètres statiques pour tous les événements existants
export async function generateStaticParams() {
  try {
    const events = await getAllEvents();
    return events.map((event) => ({
      id: event.id.toString(),
    }));
  } catch (error) {
    console.error('Erreur lors de la génération des paramètres statiques:', error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  return <EditEventClient params={params} />;
} 