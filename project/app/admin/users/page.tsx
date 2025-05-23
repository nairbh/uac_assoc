'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Shield, 
  Edit, 
  User, 
  BookOpen, 
  MessageSquare, 
  X,
  AlertTriangle,
  Check
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions, Role } from '@/hooks/usePermissions';
import { cn } from '@/lib/utils';

type UserWithRole = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: Role;
  createdAt: string;
};

export default function UsersManagement() {
  const { toast } = useToast();
  const router = useRouter();
  const { profile: adminProfile, user: currentUser } = useAuth();
  const { hasPermission, hasRole } = usePermissions();
  
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<Role | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFinancialAccess, setShowFinancialAccess] = useState(false);

  const roles: Record<Role, { label: string, color: string, icon: React.ElementType }> = {
    admin: { 
      label: 'Administrateur', 
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      icon: Shield
    },
    editor: { 
      label: 'Éditeur', 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      icon: BookOpen 
    },
    moderator: { 
      label: 'Modérateur', 
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      icon: MessageSquare 
    },
    member: { 
      label: 'Membre', 
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      icon: User 
    },
    guest: { 
      label: 'Invité', 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
      icon: User 
    }
  };

  // Vérifier si l'utilisateur a les permissions nécessaires
  useEffect(() => {
    if (!adminProfile || !hasPermission('manage_users')) {
      router.push('/unauthorized');
    }
  }, [adminProfile, hasPermission, router]);

  // Charger les utilisateurs depuis Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      if (!adminProfile) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        const formattedUsers = data.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: `${user.first_name} ${user.last_name}`,
          role: user.role as Role,
          createdAt: new Date(user.created_at).toLocaleDateString('fr-FR'),
        }));
        
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (err: any) {
        console.error('Erreur lors du chargement des utilisateurs:', err);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les utilisateurs.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [adminProfile, toast]);

  // Filtrer les utilisateurs en fonction de la recherche
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(user => 
      user.fullName.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Ouvrir la boîte de dialogue d'édition du rôle
  const handleEditRole = (user: UserWithRole) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsEditDialogOpen(true);
  };

  // Enregistrer le nouveau rôle
  const handleSaveRole = async () => {
    if (!selectedUser || !newRole || !adminProfile) return;
    
    // Vérifier si l'utilisateur essaie de modifier son propre rôle
    if (selectedUser.id === currentUser?.id) {
      toast({
        title: 'Action non autorisée',
        description: 'Vous ne pouvez pas modifier votre propre rôle.',
        variant: 'destructive',
      });
      return;
    }
    
    // Vérifier si l'utilisateur essaie de définir un rôle d'administrateur
    if (newRole === 'admin' && selectedUser.role !== 'admin') {
      toast({
        title: 'Action non autorisée',
        description: 'Vous ne pouvez pas promouvoir un utilisateur en administrateur via cette interface.',
        variant: 'destructive',
      });
      return;
    }
    
    // Vérifier si l'utilisateur essaie de modifier un administrateur
    if (selectedUser.role === 'admin') {
      toast({
        title: 'Action non autorisée',
        description: 'Vous ne pouvez pas modifier le rôle d\'un administrateur.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Mettre à jour le rôle dans la base de données
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', selectedUser.id);
        
      if (error) throw error;
      
      // Mettre à jour l'état local
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: newRole as Role } : user
      ));
      
      toast({
        title: 'Rôle mis à jour',
        description: `Le rôle de ${selectedUser.fullName} a été mis à jour avec succès.`,
      });
      
      setIsEditDialogOpen(false);
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du rôle:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le rôle.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les rôles et les permissions des utilisateurs de PACE-ATMF
          </p>
        </div>
        <Button 
          onClick={() => setShowFinancialAccess(!showFinancialAccess)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {showFinancialAccess ? <X className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
          {showFinancialAccess ? 'Masquer les accès' : 'Voir les accès financiers'}
        </Button>
      </div>

      {showFinancialAccess && (
        <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Accès aux données financières</AlertTitle>
          <AlertDescription>
            Seuls les utilisateurs avec le rôle <Badge variant="outline" className="font-semibold text-amber-600">Administrateur</Badge> ont 
            accès aux données financières de l'association. Cette restriction est configurée au niveau de la base de données 
            et ne peut pas être modifiée via cette interface.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader className="space-y-0 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un utilisateur..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const RoleIcon = roles[user.role]?.icon || User;
                  const isCurrentUser = user.id === currentUser?.id;
                  const isAdmin = user.role === 'admin';
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("flex w-fit items-center gap-1", roles[user.role]?.color)}>
                          <RoleIcon className="h-3.5 w-3.5" />
                          {roles[user.role]?.label || user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditRole(user)}
                          disabled={isCurrentUser || isAdmin}
                          className={cn(
                            "flex items-center gap-1",
                            (isCurrentUser || isAdmin) && "cursor-not-allowed opacity-50"
                          )}
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Boîte de dialogue d'édition du rôle */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le rôle de l'utilisateur</DialogTitle>
            <DialogDescription>
              Choisissez un nouveau rôle pour {selectedUser?.fullName}.
              Cette action modifiera les permissions accordées à cet utilisateur.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Utilisateur: {selectedUser?.fullName}</p>
              <p className="text-sm text-muted-foreground">Email: {selectedUser?.email}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Rôle actuel:</p>
              <Badge variant="outline" className={cn("flex w-fit items-center gap-1", roles[selectedUser?.role as Role]?.color)}>
                {roles[selectedUser?.role as Role]?.icon && 
                  React.createElement(roles[selectedUser?.role as Role]?.icon as React.ElementType, { className: "h-3.5 w-3.5" })}
                {roles[selectedUser?.role as Role]?.label || selectedUser?.role}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Nouveau rôle:</p>
              <Select value={newRole} onValueChange={(value) => setNewRole(value as Role)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roles)
                    .filter(([role]) => role !== 'admin') // Exclure le rôle admin
                    .map(([role, { label, icon: Icon }]) => (
                      <SelectItem key={role} value={role} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button 
              onClick={handleSaveRole} 
              disabled={!newRole || isSubmitting || newRole === selectedUser?.role}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 