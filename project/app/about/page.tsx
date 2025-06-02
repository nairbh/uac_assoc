import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Target,
  Lightbulb,
  Check,
  BookOpen,
  Languages,
  Pen,
  Calendar,
  MapPin,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container py-16 space-y-16">
      {/* En-tête de la page */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          À propos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">PACE ATMF Argenteuil</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Une association engagée au service de la communauté d'Argenteuil
        </p>
      </div>
      
      {/* Histoire et présentation */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Notre Histoire</h2>
          <div className="space-y-4">
            <p>
              L'Espace Associatif et Citoyen de Proximité (PACE ATMF) est une association créée officiellement en octobre 1985.
            </p>
            <p>
              Elle se définit comme citoyenne dans sa démarche, laïque et tolérante dans son esprit, démocratique dans son fonctionnement et indépendante dans sa réflexion.
            </p>
            <p>
              Elle est ancrée au cœur du quartier Val d'Argent Sud, à Argenteuil.
            </p>
            <p>
              Notre association est affiliée à un réseau national composé de vingt associations membres réparties dans toute l'Hexagone, dont le siège se trouve à Paris.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80" 
            alt="L'équipe de PACE ATMF Argenteuil" 
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>
      </div>
      
      {/* Nos Valeurs */}
      <div className="bg-red-50 dark:bg-red-950/30 py-16 px-6 rounded-3xl my-16 relative overflow-hidden">
        <div className="absolute -z-10 bottom-0 right-0 w-96 h-96 rounded-full bg-rose-200/20 dark:bg-rose-800/10 blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground">
              PACE ATMF Argenteuil est guidée par des principes fondamentaux qui orientent toutes nos actions
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-red-100 dark:bg-red-950/50 rounded-bl-full -mr-8 -mt-8"></div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl w-fit shadow-md z-10">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Démocratique et indépendante</h3>
              <p className="text-muted-foreground">
                Association laïque, démocratique et indépendante de tous pouvoirs. PACE ATMF est porteuse de valeurs de fraternité, d'égalité et de liberté, engagée contre toute forme de racisme et discrimination.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-red-100 dark:bg-red-950/50 rounded-bl-full -mr-8 -mt-8"></div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl w-fit shadow-md z-10">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Oeuvrer contre l'exclusion</h3>
              <p className="text-muted-foreground">
                PACE ATMF est une association qui oeuvre contre toutes les formes d'exclusion, de racisme, d'islamophobie, d'antisémitisme, de discriminations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-red-100 dark:bg-red-950/50 rounded-bl-full -mr-8 -mt-8"></div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl w-fit shadow-md z-10">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Citoyenneté active</h3>
              <p className="text-muted-foreground">
                Elle prône une citoyenneté active notamment pour les immigrés réfugiés de France et œuvre pour le respect des droits humains.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-red-100 dark:bg-red-950/50 rounded-bl-full -mr-8 -mt-8"></div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl w-fit shadow-md z-10">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Solidarité internationale</h3>
              <p className="text-muted-foreground">
                PACE ATMF oeuvre pour de nouveaux rapports Nord/Sud, basés sur la solidarité et pour un monde de paix entre les peuples.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nos Missions */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Nos Missions à Argenteuil</h2>
          <p className="text-lg text-muted-foreground">
            PACE ATMF Argenteuil propose une large gamme de services et d'activités pour les citoyens d'Argenteuil de toutes générations
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accompagnement scolaire</h3>
            <p className="text-muted-foreground mb-4">
              Soutien aux élèves du collège au lycée dans leur parcours scolaire.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Disponibilité :</span> Quelques heures par semaine
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ateliers sociolinguistiques</h3>
            <p className="text-muted-foreground mb-4">
              Apprentissage de la langue française et alphabétisation pour favoriser l'intégration.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Disponibilité :</span> 6 heures par semaine
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <Pen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Écrivain public</h3>
            <p className="text-muted-foreground mb-4">
              Aide aux démarches administratives et accompagnement social pour tous les habitants.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Disponibilité :</span> Quelques heures par semaine
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Animation culturelle</h3>
            <p className="text-muted-foreground mb-4">
              Animation pour les enfants, jeunes et seniors. Organisation d'événements festifs et culturels.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Disponibilité :</span> Mercredi et vacances scolaires
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Activités pour seniors</h3>
            <p className="text-muted-foreground mb-4">
              Animation et accompagnement d'un groupe de seniors, sorties et activités adaptées.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Disponibilité :</span> Mercredi après-midi + sorties ponctuelles
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 hover:border-red-300 dark:hover:border-red-800 transition-colors group">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-md w-fit mb-4 group-hover:shadow-lg transition-all duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Devenir bénévole</h3>
            <p className="text-muted-foreground mb-4">
              Rejoignez notre équipe pour participer à nos différentes missions et apporter votre aide.
            </p>
            <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90" asChild>
              <Link href="/membership">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bloc d'adresse et contact */}
      <div className="mt-16 border-t border-border pt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Nous rendre visite</h2>
            <p className="text-lg text-muted-foreground">
              Venez nous rencontrer et découvrir nos activités
            </p>
            <div className="space-y-2 mt-4">
              <p className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5" /> 
                <span>26 Boulevard du Général Leclerc, 95 100 Argenteuil</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-600" /> 
                <a href="http://www.atmf-argenteuil.org" target="_blank" className="hover:text-red-600 transition-colors">
                  www.atmf-argenteuil.org
                </a>
              </p>
            </div>
            <div className="mt-6">
              <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90" asChild>
                <Link href="/contact">Contactez-nous</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.9033345158473!2d2.2488978!3d48.9424356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6674c38b064e3%3A0xda0778de77e59ccf!2s26%20Bd%20du%20G%C3%A9n%C3%A9ral%20Leclerc%2C%2095100%20Argenteuil!5e0!3m2!1sfr!2sfr!4v1660000000000!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Carte PACE ATMF Argenteuil"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}