import { Metadata } from 'next';
import { ArrowRight, BookOpen, Languages, Users, Heart, Shield, Coffee, Pen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services ATMF Argenteuil | PACE ATMF - Association ATMF Services 95100',
  description: 'Services ATMF Argenteuil : Accompagnement scolaire ATMF, FLE ATMF, aide administrative ATMF, soutien chibanis ATMF. PACE ATMF Argenteuil services complets depuis 1985.',
  keywords: 'services ATMF Argenteuil, ATMF accompagnement scolaire, ATMF FLE, ATMF aide administrative, ATMF chibanis, PACE ATMF services, services association ATMF 95100, ATMF Val d\'Argent Sud services',
  openGraph: {
    title: 'Services ATMF Argenteuil | PACE ATMF Association Services',
    description: 'Découvrez tous les services ATMF proposés par PACE ATMF Argenteuil : accompagnement scolaire, FLE, aide administrative, soutien aux chibanis.',
    url: 'https://atmf-argenteuil.org/atmf-services',
  },
  alternates: {
    canonical: 'https://atmf-argenteuil.org/atmf-services',
  },
};

export default function ATMFServicesPage() {
  const services = [
    {
      icon: BookOpen,
      title: "Accompagnement Scolaire ATMF",
      description: "PACE ATMF Argenteuil propose un accompagnement scolaire complet pour les collégiens et lycéens. Notre service ATMF d'aide aux devoirs bénéficie à plus de 50 jeunes chaque année.",
      details: [
        "Aide aux devoirs ATMF quotidienne",
        "Soutien méthodologique ATMF", 
        "Préparation examens ATMF",
        "Suivi personnalisé ATMF"
      ]
    },
    {
      icon: Languages,
      title: "Cours de Français ATMF (FLE)",
      description: "Les ateliers ATMF de français langue étrangère sont au cœur de notre mission d'intégration. PACE ATMF Argenteuil forme des centaines d'apprenants.",
      details: [
        "Apprentissage français ATMF débutant",
        "Français professionnel ATMF",
        "Ateliers sociolinguistiques ATMF",
        "Préparation DELF ATMF"
      ]
    },
    {
      icon: Pen,
      title: "Aide Administrative ATMF",
      description: "L'accompagnement administratif ATMF aide les résidents dans leurs démarches. Notre service ATMF traite plus de 300 dossiers annuellement.",
      details: [
        "Démarches administratives ATMF",
        "Aide naturalisation ATMF",
        "Accompagnement CAF ATMF",
        "Soutien juridique ATMF"
      ]
    },
    {
      icon: Coffee,
      title: "Soutien Chibanis ATMF",
      description: "PACE ATMF Argenteuil accompagne spécialement les personnes âgées d'origine maghrébine. Notre service ATMF chibanis est reconnu dans le Val d'Oise.",
      details: [
        "Accompagnement médical ATMF",
        "Sorties culturelles ATMF",
        "Aide démarches retraite ATMF",
        "Rencontres conviviales ATMF"
      ]
    },
    {
      icon: Users,
      title: "Espace Femmes ATMF",
      description: "L'espace femmes ATMF favorise l'émancipation et la participation citoyenne. Notre programme ATMF femmes citoyennes est unique à Argenteuil.",
      details: [
        "Ateliers émancipation ATMF",
        "Formation citoyenneté ATMF",
        "Groupes de parole ATMF",
        "Projets collectifs ATMF"
      ]
    },
    {
      icon: Heart,
      title: "Solidarité Internationale ATMF",
      description: "PACE ATMF Argenteuil développe des projets de solidarité internationale. Nos actions ATMF touchent le Maghreb et l'Afrique subsaharienne.",
      details: [
        "Projets développement ATMF",
        "Partenariats internationaux ATMF",
        "Collectes humanitaires ATMF",
        "Échanges culturels ATMF"
      ]
    },
    {
      icon: Shield,
      title: "Lutte Anti-Discriminations ATMF",
      description: "La lutte contre les discriminations est un pilier ATMF. PACE ATMF Argenteuil forme et sensibilise sur les droits civiques.",
      details: [
        "Formations anti-discrimination ATMF",
        "Accompagnement victimes ATMF",
        "Sensibilisation citoyenne ATMF",
        "Médiation sociale ATMF"
      ]
    },
    {
      icon: Users,
      title: "Animation Quartier ATMF",
      description: "L'animation du quartier Val d'Argent Sud par PACE ATMF crée du lien social. Nos événements ATMF rassemblent toute la communauté argenteuillaise.",
      details: [
        "Fête de quartier ATMF",
        "Animations familiales ATMF",
        "Sorties découverte ATMF",
        "Événements interculturels ATMF"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/30 dark:to-red-950/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-rose-600/10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Services <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">ATMF</span> Argenteuil
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez tous les services ATMF proposés par PACE ATMF Argenteuil depuis 1985. 
                Une gamme complète de services ATMF pour accompagner les habitants du Val d'Argent Sud.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">PACE ATMF Argenteuil - Services d'Excellence</h2>
              <p className="text-muted-foreground">
                Depuis octobre 1985, PACE ATMF Argenteuil développe des services ATMF de qualité. 
                Notre association ATMF propose 8 services principaux touchant plus de 500 personnes par an 
                dans le quartier Val d'Argent Sud et au-delà.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border group">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Bénéficiez des Services <span className="text-red-600">ATMF Argenteuil</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              PACE ATMF Argenteuil vous accueille du lundi au vendredi pour tous ses services ATMF. 
              Contactez notre association ATMF pour plus d'informations sur nos programmes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-background p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-red-600">📍 Adresse ATMF</h3>
                <p className="text-sm text-muted-foreground">
                  PACE ATMF Argenteuil<br/>
                  26 Boulevard du Général Leclerc<br/>
                  95100 Argenteuil
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-red-600">📞 Contact ATMF</h3>
                <p className="text-sm text-muted-foreground">
                  Téléphone: 01.39.80.45.40<br/>
                  Email: atmfargent@gmail.com<br/>
                  Site: www.atmf-argenteuil.org
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-red-600">🕒 Horaires ATMF</h3>
                <p className="text-sm text-muted-foreground">
                  Lundi au Vendredi<br/>
                  10h00 - 12h30<br/>
                  14h30 - 19h30
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full hover:opacity-90 transition-all text-lg font-medium shadow-lg"
              >
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/membership" 
                className="inline-flex items-center justify-center px-8 py-3 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition-all text-lg font-medium"
              >
                Devenir bénévole ATMF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 