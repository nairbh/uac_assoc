import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for events
const upcomingEvents = [
  {
    id: 1,
    title: "Fête nationale algérienne",
    date: "5 juillet 2025",
    time: "18:00 - 23:00",
    location: "Espace culturel, Paris",
    category: "Célébration",
    image: "https://images.pexels.com/photos/3983743/pexels-photo-3983743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Conférence: Diaspora algérienne",
    date: "15 juin 2025",
    time: "14:00 - 16:30",
    location: "Université de la Sorbonne, Paris",
    category: "Conférence",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Collecte pour l'aide humanitaire",
    date: "28 mai 2025",
    time: "10:00 - 18:00",
    location: "Siège de l'association, Argenteuil",
    category: "Solidarité",
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function EventsPreview() {
  return (
    <section className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Événements à venir</h2>
          <p className="text-muted-foreground">
            Rejoignez-nous lors de nos prochains événements et activités
          </p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/events">
            Voir tous les événements
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map(event => (
          <Card key={event.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4">
                {event.category}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/events/${event.id}`}>
                  S'inscrire
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}