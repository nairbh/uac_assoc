'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ModeratorGuard } from '@/components/auth/moderator-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { 
  Edit3, 
  FileText, 
  Calendar, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2,
  LogOut,
  Home,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import { Article, getAllArticles, deleteArticle } from '@/lib/db/articles';
import { Event, getAllEvents, deleteEvent } from '@/lib/db/events';
import { useToast } from '@/components/ui/use-toast';
import { formatUserName } from '@/lib/utils';

export default function ModeratorDashboard() {
  const { profile, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // États pour les données
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // États pour les filtres
  const [articleSearch, setArticleSearch] = useState('');
  const [eventSearch, setEventSearch] = useState('');

  // Charger les données
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      await Promise.all([
        loadArticles(),
        loadEvents()
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des données",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadArticles = async () => {
    try {
      const data = await getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    }
  };

  // Gestion des articles
  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const success = await deleteArticle(id);
      if (success) {
        toast({
          title: "Succès",
          description: "Article supprimé",
        });
        loadArticles();
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  // Gestion des événements
  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      const success = await deleteEvent(id);
      if (success) {
        toast({
          title: "Succès",
          description: "Événement supprimé",
        });
        loadEvents();
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Filtres
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(articleSearch.toLowerCase())
  );

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(eventSearch.toLowerCase())
  );

  // Statistiques
  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter(a => a.status === 'published').length,
    draftArticles: articles.filter(a => a.status === 'draft').length,
    totalEvents: events.length,
    publishedEvents: events.filter(e => e.status === 'published').length,
    draftEvents: events.filter(e => e.status === 'draft').length,
  };

  if (isLoadingData) {
    return (
      <ModeratorGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </ModeratorGuard>
    );
  }

  return (
    <ModeratorGuard>
      <div className="min-h-screen pt-4 bg-background">
        <div className="container py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Espace Modération</h1>
              <p className="text-muted-foreground">
                Bienvenue {formatUserName(profile?.first_name, profile?.last_name, profile?.email)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Edit3 className="h-4 w-4 mr-1" />
                {profile?.role === 'admin' ? 'Administrateur' : 'Modérateur'}
              </Badge>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles Total</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalArticles}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.publishedArticles} publiés, {stats.draftArticles} brouillons
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Événements Total</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.publishedEvents} publiés, {stats.draftEvents} brouillons
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actions rapides</CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button size="sm" className="w-full" onClick={() => router.push('/admin/articles/new')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Nouvel article
                  </Button>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => router.push('/admin/events/new')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Nouvel événement
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Navigation</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-1" />
                      Site public
                    </Link>
                  </Button>
                  {profile?.role === 'admin' && (
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href="/admin">
                        <Shield className="h-4 w-4 mr-1" />
                        Admin complet
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="articles">
                <FileText className="h-4 w-4 mr-2" />
                Gestion des Articles
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="h-4 w-4 mr-2" />
                Gestion des Événements
              </TabsTrigger>
            </TabsList>

            {/* Gestion des articles */}
            <TabsContent value="articles" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Gestion des articles</h2>
                  <p className="text-muted-foreground">Créez, modifiez et gérez le contenu éditorial</p>
                </div>
                <Button onClick={() => router.push('/admin/articles/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel article
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un article..."
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArticles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {article.excerpt?.slice(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>
                          <Badge variant={
                            article.status === 'published' ? 'default' :
                            article.status === 'draft' ? 'secondary' : 'outline'
                          }>
                            {article.status === 'published' ? 'Publié' :
                             article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(article.created_at).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/news/${article.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Gestion des événements */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Gestion des événements</h2>
                  <p className="text-muted-foreground">Organisez les activités de l'association</p>
                </div>
                <Button onClick={() => router.push('/admin/events/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel événement
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un événement..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Événement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">{event.category}</div>
                        </TableCell>
                        <TableCell>
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          {event.max_participants ? 
                            `${event.current_participants}/${event.max_participants}` : 
                            event.current_participants
                          }
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            event.status === 'published' ? 'default' :
                            event.status === 'draft' ? 'secondary' :
                            event.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {event.status === 'published' ? 'Publié' :
                             event.status === 'draft' ? 'Brouillon' :
                             event.status === 'cancelled' ? 'Annulé' : 'Terminé'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/events/${event.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModeratorGuard>
  );
} 