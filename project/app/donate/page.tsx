import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Mail, Phone, MapPin, Users, Target, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Soutenir PACE ATMF Argenteuil | Dons et Adhésions',
  description: 'Soutenez PACE ATMF Argenteuil dans ses actions de solidarité et citoyenneté. Page de dons en préparation.',
  keywords: 'soutien PACE ATMF Argenteuil, don association ATMF, adhésion ATMF, solidarité Argenteuil',
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Soutenez PACE ATMF Argenteuil
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre soutien nous permet de continuer nos actions de solidarité et de citoyenneté 
            dans le quartier Val d'Argent Sud depuis 1985.
          </p>
        </div>

        {/* Annonce temporaire */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-full mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-red-800">
                Plateforme de don en cours de préparation
              </CardTitle>
              <CardDescription className="text-red-700 text-lg">
                Nous mettons actuellement en place un système de don sécurisé pour mieux vous servir.
                En attendant, découvrez nos actions et contactez-nous directement.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Nos actions financées par vos dons */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Vos dons financent nos actions concrètes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Accompagnement Scolaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Soutien scolaire du collège au lycée pour les jeunes du quartier. 
                  Matériel pédagogique, espace d'étude, accompagnement personnalisé.
                </p>
                <div className="text-sm font-medium text-red-600">
                  Coût annuel : ~2 500€
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Aide aux Démarches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Accompagnement administratif, traduction, orientation vers les services publics. 
                  Formation numérique pour l'autonomie.
                </p>
                <div className="text-sm font-medium text-red-600">
                  Coût annuel : ~1 800€
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Solidarité Internationale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Projets de solidarité, aide d'urgence, sensibilisation aux enjeux internationaux. 
                  Partenariats avec d'autres associations.
                </p>
                <div className="text-sm font-medium text-red-600">
                  Coût annuel : ~3 000€
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Avantages fiscaux */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <CardTitle className="text-green-800">Déduction fiscale</CardTitle>
                  <CardDescription className="text-green-700">
                    PACE ATMF Argenteuil est reconnue d'intérêt général
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">66%</div>
                  <div className="font-medium text-green-800">de déduction fiscale</div>
                  <div className="text-sm text-green-600 mt-2">
                    Un don de 100€ ne vous coûte que 34€
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">1000€</div>
                  <div className="font-medium text-green-800">plafond annuel</div>
                  <div className="text-sm text-green-600 mt-2">
                    20% du revenu imposable maximum
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact en attendant */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">En attendant, contactez-nous directement</CardTitle>
              <CardDescription>
                Notre équipe se tient à votre disposition pour tout renseignement sur nos actions 
                et les modalités de soutien.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Informations de contact */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Coordonnées PACE ATMF Argenteuil
                  </h3>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Adresse</div>
                      <div className="text-gray-600">
                        26 Boulevard du Général Leclerc<br />
                        95100 Argenteuil
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <a href="tel:0139804540" className="text-red-600 hover:underline">
                        01.39.80.45.40
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:atmfargent@gmail.com" className="text-red-600 hover:underline">
                        atmfargent@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900 mb-2">Horaires d'ouverture</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Lundi au vendredi : 10h00 - 12h30</div>
                      <div>Lundi au vendredi : 14h30 - 19h30</div>
                      <div>Week-ends : Fermé</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Comment nous soutenir dès maintenant
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900 mb-2">🤝 Devenir bénévole</div>
                      <div className="text-sm text-gray-600">
                        Rejoignez nos équipes pour l'accompagnement scolaire, l'aide administrative ou nos événements.
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900 mb-2">📋 Prendre une adhésion</div>
                      <div className="text-sm text-gray-600">
                        Soutenez durablement nos actions en devenant membre de l'association (cotisation annuelle).
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900 mb-2">📢 Faire connaître nos actions</div>
                      <div className="text-sm text-gray-600">
                        Partagez nos actualités, parlez de nous autour de vous, aidez-nous à toucher plus de personnes.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90">
                      <Link href="/contact">
                        <Mail className="w-4 h-4 mr-2" />
                        Nous contacter
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/about">
                        Découvrir nos actions
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message de remerciement */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-lg text-gray-600">
            <strong className="text-red-600">Merci</strong> pour votre intérêt et votre futur soutien ! 
            Ensemble, nous continuerons à oeuvrer pour une société plus solidaire et plus juste.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            La plateforme de don sera disponible très prochainement. 
            Nous vous tiendrons informés par email et sur notre site.
          </div>
        </div>
      </div>
    </div>
  );
}