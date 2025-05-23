'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  CalendarDays,
  FileText,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
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
import { useAuth } from '@/hooks/useAuth';
import { usePermissions, Permission, Role } from '@/hooks/usePermissions';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || "dashboard");
  
  // Mettre à jour l'URL quand l'onglet change
  useEffect(() => {
    if (activeTab !== "dashboard") {
      router.push(`/admin?tab=${activeTab}`);
    } else {
      router.push('/admin');
    }
  }, [activeTab, router]);

  // Synchroniser l'onglet actif avec l'URL
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  
  // Exemple de données
  const recentEvents = [
    { id: 1, title: "Fête nationale algérienne 2025", date: "05/07/2025", location: "Paris", status: "À venir" },
    { id: 2, title: "Conférence sur la culture berbère", date: "15/03/2025", location: "Lyon", status: "À venir" },
    { id: 3, title: "Soirée caritative", date: "22/11/2024", location: "Marseille", status: "En préparation" },
    { id: 4, title: "Rencontre des membres", date: "10/06/2024", location: "Lille", status: "À venir" },
  ];

  const recentArticles = [
    { id: 1, title: "Succès de notre collecte humanitaire", date: "02/05/2024", author: "Mohammed Cherif", status: "Publié" },
    { id: 2, title: "Rétrospective des événements 2023", date: "15/01/2024", author: "Sarah Benali", status: "Publié" },
    { id: 3, title: "Interview avec notre président", date: "22/04/2024", author: "Karim Boudjema", status: "Brouillon" },
    { id: 4, title: "Notre engagement pour l'éducation", date: "10/03/2024", author: "Leïla Hamdi", status: "Publié" },
  ];

  const { profile: adminProfile } = useAuth();
  const { allPermissions, hasPermission } = usePermissions();
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [realMembers, setRealMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const donations = [
    { id: 1, amount: "50€", donor: "Anonyme", date: "Aujourd'hui", recurring: "Mensuel" },
    { id: 2, amount: "100€", donor: "Fatiha Kadir", date: "Hier", recurring: "Unique" },
    { id: 3, amount: "75€", donor: "Youcef Mansouri", date: "03/05/2024", recurring: "Unique" },
    { id: 4, amount: "25€", donor: "Anonyme", date: "01/05/2024", recurring: "Mensuel" },
  ];

  const { toast } = useToast();

  // Charger les membres réels depuis Supabase
  useEffect(() => {
    const fetchMembers = async () => {
      if (!adminProfile) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('role', 'admin'); // Ne pas afficher les admins dans la liste

        if (error) throw error;

        // Formater les données pour l'affichage
        const formattedMembers = data.map(member => ({
          id: member.id,
          name: `${member.first_name} ${member.last_name}`,
          email: member.email,
          role: member.role,
          joinDate: new Date(member.created_at).toLocaleDateString('fr-FR')
        }));

        setRealMembers(formattedMembers);
      } catch (err) {
        console.error("Erreur lors du chargement des membres:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [adminProfile, activeTab]);

  // Récupérer les permissions d'un utilisateur
  const fetchUserPermissions = async (userId: string, role: string) => {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select(`
          permission_id,
          permissions(name)
        `)
        .eq('role', role);

      if (error) throw error;

      // Corriger le typage
      const permissions = data?.map(item => {
        // S'assurer que permissions existe et a une propriété name
        if (item.permissions && typeof item.permissions === 'object' && 'name' in item.permissions) {
          return item.permissions.name as Permission;
        }
        return null;
      }).filter(Boolean) as Permission[] || [];
      
      return permissions;
    } catch (err) {
      console.error("Erreur lors du chargement des permissions:", err);
      return [];
    }
  };

  // Ouvrir la boîte de dialogue d'édition
  const openEditUserDialog = async (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role as Role);
    const permissions = await fetchUserPermissions(user.id, user.role);
    setUserPermissions(permissions);
    setIsEditUserDialogOpen(true);
  };

  // Mettre à jour le rôle et les permissions
  const updateUserRole = async () => {
    if (!selectedUser || !adminProfile) return;

    setIsSubmitting(true);
    try {
      // Mise à jour du rôle
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: selectedRole })
        .eq('id', selectedUser.id);

      if (updateError) throw updateError;

      // Rafraîchir la liste des membres
      const updatedMembers = realMembers.map(member => {
        if (member.id === selectedUser.id) {
          return { ...member, role: selectedRole };
        }
        return member;
      });
      setRealMembers(updatedMembers);

      // Fermer la boîte de dialogue
      setIsEditUserDialogOpen(false);
      toast({
        title: "Rôle mis à jour",
        description: `Le rôle de ${selectedUser.name} a été mis à jour.`,
      });
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour du rôle:", err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">
          Gérez le contenu, les membres et les événements de PACE-ATMF Argenteuil
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="members">Membres</TabsTrigger>
          <TabsTrigger value="donations">Dons</TabsTrigger>
        </TabsList>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Membres actifs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,274</div>
            <p className="text-xs text-muted-foreground">
              +12% depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Événements à venir
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Articles publiés
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +4 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dons ce mois
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,280€</div>
            <p className="text-xs text-muted-foreground">
              +18% depuis le mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Dernières actions effectuées sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  title: "Nouvel événement créé",
                  description: "Fête nationale algérienne 2025",
                  timestamp: "Il y a 2 heures",
                  type: "success"
                },
                {
                  title: "Nouveau membre",
                  description: "Sarah Benali a rejoint l'association",
                  timestamp: "Il y a 4 heures",
                  type: "success"
                },
                {
                  title: "Don reçu",
                  description: "Don mensuel de 50€ reçu",
                  timestamp: "Il y a 6 heures",
                  type: "success"
                },
                {
                  title: "Article publié",
                  description: "Succès de notre collecte humanitaire",
                  timestamp: "Il y a 12 heures",
                  type: "success"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    item.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  )}>
                    {item.type === "success" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {item.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => router.push("/admin/events/new")}
                >
              Créer un événement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => router.push("/admin/articles/new")}
                >
              Publier un article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                >
              Gérer les membres
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                >
              Voir les statistiques
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        {/* ARTICLES TAB */}
        <TabsContent value="articles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des articles</h2>
            <Button asChild>
              <Link href="/admin/articles/new">
                <Plus className="mr-2 h-4 w-4" /> Créer un article
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Articles</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.date}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          article.status === "Publié" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        )}>
                          {article.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EVENTS TAB */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des événements</h2>
            <Button asChild>
              <Link href="/admin/events/new">
                <Plus className="mr-2 h-4 w-4" /> Créer un événement
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Événements</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          event.status === "À venir" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        )}>
                          {event.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MEMBERS TAB */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des membres</h2>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" /> Gestion complète des utilisateurs
                </Link>
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Ajouter un membre
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Membres</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Chargement des membres...
                      </TableCell>
                    </TableRow>
                  ) : realMembers.length > 0 ? (
                    realMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <div className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            member.role === "admin" 
                              ? "bg-purple-100 text-purple-800" 
                              : member.role === "editor"
                                ? "bg-blue-100 text-blue-800"
                                : member.role === "moderator"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                          )}>
                            {member.role === "admin" ? "Administrateur" :
                             member.role === "editor" ? "Éditeur" :
                             member.role === "moderator" ? "Modérateur" :
                             member.role === "member" ? "Membre" : "Invité"}
                          </div>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditUserDialog(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        Aucun membre trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Modal de modification du rôle utilisateur */}
          <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Modifier les privilèges utilisateur</DialogTitle>
                <DialogDescription>
                  Modifiez le rôle et les permissions accordées à cet utilisateur.
                </DialogDescription>
              </DialogHeader>
              
              {selectedUser && (
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Utilisateur</Label>
                    <div className="font-medium">{selectedUser.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select 
                      value={selectedRole} 
                      onValueChange={(value) => setSelectedRole(value as Role)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="editor">Éditeur</SelectItem>
                        <SelectItem value="moderator">Modérateur</SelectItem>
                        <SelectItem value="member">Membre</SelectItem>
                        <SelectItem value="guest">Invité</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground pt-1">
                      {selectedRole === 'editor' && "Peut créer, éditer et publier du contenu"}
                      {selectedRole === 'moderator' && "Peut modérer les commentaires et éditer du contenu"}
                      {selectedRole === 'member' && "Accès standard aux fonctionnalités membres"}
                      {selectedRole === 'guest' && "Accès limité en lecture seule"}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="permissions">Permissions accordées par ce rôle</Label>
                    </div>
                    <div className="border rounded-md p-4 max-h-48 overflow-y-auto">
                      <div className="space-y-2">
                        {userPermissions.length > 0 ? (
                          Object.entries(allPermissions)
                            .filter(([key]) => userPermissions.includes(key as Permission))
                            .map(([key, label]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={key} 
                                  checked={true}
                                  disabled
                                />
                                <Label htmlFor={key}>{label}</Label>
                              </div>
                            ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Aucune permission accordée pour ce rôle.
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Les permissions sont définies par rôle. Pour modifier les permissions individuelles, 
                      contactez un administrateur système.
                    </p>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditUserDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={updateUserRole}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* DONATIONS TAB */}
        <TabsContent value="donations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des dons</h2>
          </div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Dons récents</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Montant</TableHead>
                    <TableHead>Donateur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.amount}</TableCell>
                      <TableCell>{donation.donor}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          donation.recurring === "Mensuel" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        )}>
                          {donation.recurring}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}