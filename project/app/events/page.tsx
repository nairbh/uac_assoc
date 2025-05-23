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
import { Separator } from '@/components/ui/separator';
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

// Données d'événements basées sur les activités réelles de l'ATMF Argenteuil
const events = [
  {
    id: 1,
    title: "Fête de la Réussite",
    date: "25 juin 2025",
    time: "14:00 - 18:00",
    location: "Centre social ATMF, Argenteuil",
    category: "Célébration",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Célébration de fin d'année scolaire pour mettre à l'honneur les réussites des jeunes accompagnés par l'ATMF Argenteuil. Remise de diplômes, animations et goûter festif."
  },
  {
    id: 2,
    title: "Atelier sociolinguistique - Démarches administratives",
    date: "10 mai 2025",
    time: "14:00 - 16:30",
    location: "Salle ASL, 26 bd du Général Leclerc, Argenteuil",
    category: "Formation",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Atelier d'apprentissage du français orienté sur les démarches administratives quotidiennes. Vocabulaire spécifique et simulation de situations réelles pour favoriser l'autonomie."
  },
  {
    id: 3,
    title: "Sortie familiale au Musée du Louvre",
    date: "28 mai 2025",
    time: "10:00 - 17:00",
    location: "Départ du centre ATMF, Argenteuil",
    category: "Sortie culturelle",
    image: "https://images.unsplash.com/photo-1603966520549-66ac4166be99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Journée de découverte culturelle pour les familles du quartier. Transport organisé depuis Argenteuil, visite guidée adaptée et moments d'échanges conviviaux."
  },
  {
    id: 4,
    title: "Fête des bénévoles",
    date: "15 juin 2025",
    time: "18:00 - 22:00",
    location: "Centre social ATMF, Argenteuil",
    category: "Célébration",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Soirée conviviale pour remercier tous les bénévoles qui s'investissent dans les actions de l'ATMF Argenteuil. Repas partagé, animations et moments d'échange."
  },
  {
    id: 5,
    title: "Permanence d'accès aux droits",
    date: "Tous les mardis",
    time: "14:00 - 17:00",
    location: "Bureau AIAS, 26 bd du Général Leclerc, Argenteuil",
    category: "Accompagnement",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Permanence hebdomadaire pour accompagner les habitants dans leurs démarches administratives. Aide à la compréhension des documents, rédaction de courriers et orientation vers les services compétents."
  },
  {
    id: 6,
    title: "Val en vacances - Activités jeunesse",
    date: "10 juillet - 25 août 2025",
    time: "10:00 - 17:00",
    location: "Espace Jeunes, Argenteuil",
    category: "Jeunesse",
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Programme d'animations estivales pour les jeunes du quartier Val d'Argent. Activités sportives, culturelles, sorties et ateliers créatifs pendant les vacances scolaires d'été."
  }
];

export default function EventsPage() {
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
              <SelectItem value="celebration">Célébration</SelectItem>
              <SelectItem value="formation">Formation</SelectItem>
              <SelectItem value="sortie">Sortie culturelle</SelectItem>
              <SelectItem value="accompagnement">Accompagnement</SelectItem>
              <SelectItem value="jeunesse">Jeunesse</SelectItem>
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
            <CardContent className="space-y-2 flex-1">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
              <p className="text-muted-foreground line-clamp-3 mt-2">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <a href={`/events/${event.id}`}>
                  S'inscrire
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={`/events/${event.id}`}>
                  Détails
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 py-8 border-t">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Une idée d'activité ?</h2>
            <p className="text-muted-foreground">
              Si vous souhaitez proposer une activité ou participer à l'organisation d'un événement avec l'ATMF Argenteuil, n'hésitez pas à nous contacter.
            </p>
            <Button className="gap-1" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Proposer une activité
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
                  <h3 className="font-medium">La cordée du Val</h3>
                  <p className="text-sm text-muted-foreground">Accompagnement scolaire - Lundi, mardi, jeudi</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Ateliers sociolinguistiques</h3>
                  <p className="text-sm text-muted-foreground">Apprentissage du français - Mardi, jeudi, vendredi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}