'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  User, 
  Heart, 
  Calendar, 
  CreditCard, 
  FileText, 
  TrendingUp,
  LogOut,
  Home,
  Gift,
  DollarSign,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { getUserDonations, getUserDonationStats, type Donation, type DonationStats } from '@/lib/db/donations';
import { useToast } from '@/components/ui/use-toast';

export default function MemberDashboard() {
  const { profile, signOut, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // États pour les données
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donationStats, setDonationStats] = useState<DonationStats | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Charger les données
  useEffect(() => {
    if (user?.id) {
      loadMemberData();
    }
  }, [user?.id]);

  const loadMemberData = async () => {
    if (!user?.id) return;
    
    setIsLoadingData(true);
    try {
      const [donationsData, statsData] = await Promise.all([
        getUserDonations(user.id),
        getUserDonationStats(user.id)
      ]);
      
      setDonations(donationsData);
      setDonationStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement de vos données",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      'card': 'Carte bancaire',
      'bank_transfer': 'Virement',
      'paypal': 'PayPal',
      'cash': 'Espèces',
      'check': 'Chèque'
    };
    return methods[method] || method;
  };

  const getDonationTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'general': 'Don général',
      'event': 'Événement',
      'project': 'Projet spécifique',
      'membership': 'Adhésion'
    };
    return types[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any, label: string }> = {
      'completed': { variant: 'default', label: 'Complété' },
      'pending': { variant: 'secondary', label: 'En attente' },
      'failed': { variant: 'destructive', label: 'Échoué' },
      'refunded': { variant: 'outline', label: 'Remboursé' }
    };
    const config = variants[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mon Espace Membre</h1>
            <p className="text-muted-foreground">
              Bienvenue {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <User className="h-4 w-4 mr-1" />
              Membre
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
              <CardTitle className="text-sm font-medium">Total des dons</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {donationStats?.totalAmount.toFixed(2)} €
              </div>
              <p className="text-xs text-muted-foreground">
                {donationStats?.donationCount} don{donationStats?.donationCount !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dons {new Date().getFullYear()}</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {donationStats?.yearlyAmount.toFixed(2)} €
              </div>
              <p className="text-xs text-muted-foreground">
                Cette année
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réduction d'impôt</CardTitle>
              <Receipt className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {donationStats?.taxDeduction.toFixed(2)} €
              </div>
              <p className="text-xs text-muted-foreground">
                66% déductibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Don moyen</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {donationStats?.averageDonation ? donationStats.averageDonation.toFixed(2) : '0.00'} €
              </div>
              <p className="text-xs text-muted-foreground">
                Par don
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Mon Profil
            </TabsTrigger>
            <TabsTrigger value="donations">
              <Heart className="h-4 w-4 mr-2" />
              Mes Dons
            </TabsTrigger>
            <TabsTrigger value="tax-info">
              <Receipt className="h-4 w-4 mr-2" />
              Réductions d'impôt
            </TabsTrigger>
          </TabsList>

          {/* Profil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Vos informations de membre</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Prénom</label>
                    <p className="text-lg">{profile?.first_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nom</label>
                    <p className="text-lg">{profile?.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-lg">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Membre depuis</label>
                    <p className="text-lg">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/donate">
                      <Heart className="h-4 w-4 mr-2" />
                      Faire un don
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/events">
                      <Calendar className="h-4 w-4 mr-2" />
                      Voir les événements
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/">
                      <Home className="h-4 w-4 mr-2" />
                      Retour au site
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Résumé de mes contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  {donationStats && donationStats.donationCount > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total des dons :</span>
                        <span className="font-medium">{donationStats.totalAmount.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nombre de dons :</span>
                        <span className="font-medium">{donationStats.donationCount}</span>
                      </div>
                      {donationStats.lastDonation && (
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Dernier don :</span>
                          <span>{new Date(donationStats.lastDonation.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Aucun don enregistré</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Commencez à soutenir notre association
                      </p>
                      <Button asChild>
                        <Link href="/donate">
                          <Heart className="h-4 w-4 mr-2" />
                          Faire mon premier don
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Historique des dons */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Historique de mes dons</h2>
                <p className="text-muted-foreground">Tous vos dons et contributions</p>
              </div>
              <Button asChild>
                <Link href="/donate">
                  <Heart className="h-4 w-4 mr-2" />
                  Faire un don
                </Link>
              </Button>
            </div>

            {donations.length > 0 ? (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Reçu fiscal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          {new Date(donation.created_at).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {donation.amount.toFixed(2)} {donation.currency}
                        </TableCell>
                        <TableCell>
                          {getDonationTypeLabel(donation.donation_type)}
                        </TableCell>
                        <TableCell>
                          {getPaymentMethodLabel(donation.payment_method)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(donation.status)}
                        </TableCell>
                        <TableCell>
                          {donation.tax_receipt_sent ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Envoyé
                            </div>
                          ) : donation.tax_receipt_requested ? (
                            <div className="flex items-center text-orange-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              En cours
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Non demandé</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Gift className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucun don enregistré</h3>
                    <p className="text-muted-foreground mb-6">
                      Vous n'avez pas encore fait de don à notre association.
                      Votre soutien nous aide à réaliser nos missions.
                    </p>
                    <Button asChild size="lg">
                      <Link href="/donate">
                        <Heart className="h-5 w-5 mr-2" />
                        Faire mon premier don
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Informations fiscales */}
          <TabsContent value="tax-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 mr-2" />
                  Réductions d'impôt {new Date().getFullYear()}
                </CardTitle>
                <CardDescription>
                  Informations sur vos avantages fiscaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                {donationStats && donationStats.yearlyAmount > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {donationStats.yearlyAmount.toFixed(2)} €
                        </div>
                        <div className="text-sm text-muted-foreground">Dons {new Date().getFullYear()}</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {donationStats.taxDeduction.toFixed(2)} €
                        </div>
                        <div className="text-sm text-muted-foreground">Réduction d'impôt</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {((donationStats.yearlyAmount - donationStats.taxDeduction)).toFixed(2)} €
                        </div>
                        <div className="text-sm text-muted-foreground">Coût réel</div>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Comment ça marche :</strong> Vos dons à l'ATMF Argenteuil vous donnent droit à une réduction d'impôt de 66% du montant versé, dans la limite de 20% de votre revenu imposable.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Exemple de calcul :</h4>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span>Don de 100 €</span>
                          <span className="font-medium">100,00 €</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Réduction d'impôt (66%)</span>
                          <span className="font-medium">- 66,00 €</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Coût réel de votre don</span>
                          <span>34,00 €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Receipt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aucun don cette année</h3>
                    <p className="text-muted-foreground mb-6">
                      Faites un don pour bénéficier d'une réduction d'impôt de 66%
                    </p>
                    <div className="space-y-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Exemple :</strong> Un don de 50 € ne vous coûte réellement que 17 € après réduction d'impôt !
                        </AlertDescription>
                      </Alert>
                      <Button asChild size="lg">
                        <Link href="/donate">
                          <Heart className="h-5 w-5 mr-2" />
                          Faire un don déductible
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reçus fiscaux</CardTitle>
                <CardDescription>
                  Vos attestations de dons pour votre déclaration d'impôt
                </CardDescription>
              </CardHeader>
              <CardContent>
                {donations.filter(d => d.tax_receipt_requested && d.status === 'completed').length > 0 ? (
                  <div className="space-y-3">
                    {donations
                      .filter(d => d.tax_receipt_requested && d.status === 'completed')
                      .map(donation => (
                        <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">
                              Reçu pour {donation.amount.toFixed(2)} € - {new Date(donation.created_at).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {donation.tax_receipt_number || 'Numéro en cours d\'attribution'}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {donation.tax_receipt_sent ? (
                              <Badge variant="default">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Envoyé
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                En préparation
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Aucun reçu fiscal demandé pour le moment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 