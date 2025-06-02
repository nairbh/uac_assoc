import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getEventById, getAllEvents } from '@/lib/db/events';
import { EventRegistrationForm } from '@/components/events/event-registration-form';

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(parseInt(params.id));
  
  if (!event) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux événements
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        {event.image_url && (
          <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4">
              {event.category}
            </Badge>
          </div>
        )}

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {event.time_start} - {event.time_end}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              {event.current_participants} / {event.max_participants || '∞'} participants
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg font-medium">{event.description}</p>
            {event.details && (
              <div className="whitespace-pre-line mt-4">
                {event.details}
              </div>
            )}
          </div>

          <EventRegistrationForm event={event} />
        </div>
      </article>
    </div>
  );
} 