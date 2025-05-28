import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Users,
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { getEvents } from '@/lib/db/events';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container py-12">
      <div className="space-y-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Événements</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez les activités organisées par l'ATMF Argenteuil dans le cadre de nos différentes missions
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un événement..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="Institutionnel">Institutionnel</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Éducation">Éducation</SelectItem>
              <SelectItem value="Religieux">Religieux</SelectItem>
              <SelectItem value="Culture">Culture</SelectItem>
              <SelectItem value="Solidarité">Solidarité</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden h-full flex flex-col">
            <div className="aspect-video relative">
              <img 
                src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
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
                {new Date(event.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex-1">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {event.time_start} - {event.time_end}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              {event.max_participants && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {event.current_participants} / {event.max_participants} participants
                </div>
              )}
              <p className="text-muted-foreground line-clamp-3 mt-2">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <Link href={`/events/${event.id}`}>
                  S'inscrire
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/events/${event.id}`}>
                  Détails
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun événement disponible pour le moment.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Revenez bientôt pour découvrir nos prochaines activités !
          </p>
        </div>
      )}
      
      <div className="mt-16 py-8 border-t">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Une idée d'activité ?</h2>
            <p className="text-muted-foreground">
              Si vous souhaitez proposer une activité ou participer à l'organisation d'un événement avec l'ATMF Argenteuil, n'hésitez pas à nous contacter.
            </p>
            <Button className="gap-1" variant="outline" asChild>
              <Link href="/contact">
                <Users className="mr-2 h-4 w-4" />
                Proposer une activité
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Activités régulières</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Permanence d'aide administrative</h3>
                  <p className="text-sm text-muted-foreground">Accompagnement aux démarches - Mardi et jeudi 14h-17h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Cours de français</h3>
                  <p className="text-sm text-muted-foreground">Apprentissage du français - Lundi, mercredi, vendredi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}