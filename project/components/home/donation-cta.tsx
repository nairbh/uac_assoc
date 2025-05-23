import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Heart,
  ArrowRight,
  Calendar,
  CreditCard,
  Coffee
} from 'lucide-react';

export function DonationCTA() {
  return (
    <section className="container py-16">
      <div className="rounded-2xl bg-gradient-to-r from-green-100 to-red-50 dark:from-green-900/20 dark:to-red-900/20 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500 dark:bg-green-500/20">
              <Heart className="h-4 w-4" />
              <span>Soutenez notre cause</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Votre don fait la différence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Grâce à vos dons, nous pouvons mener des actions concrètes pour la communauté 
              algérienne en France. Chaque contribution, même modeste, nous aide à accomplir notre mission.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm">
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg w-fit">
                <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Don ponctuel</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Faites un don unique pour soutenir nos actions humanitaires et culturelles.
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/donate?type=one-time">
                  Je donne
                </Link>
              </Button>
            </div>
            
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm">
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg w-fit">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Don mensuel</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Soutenez-nous chaque mois pour un impact durable et des actions régulières.
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/donate?type=monthly">
                  Je m'engage
                </Link>
              </Button>
            </div>
            
            <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-sm">
              <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg w-fit">
                <Coffee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Devenir membre</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Rejoignez notre association et participez activement à nos projets.
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/membership">
                  Je rejoins
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Faire un don maintenant
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}