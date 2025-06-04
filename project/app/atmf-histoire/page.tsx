import { Metadata } from 'next';
import { Calendar, Users, MapPin, Heart, Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Histoire ATMF Argenteuil | PACE ATMF depuis 1985 - Association ATMF Val d\'Argent Sud',
  description: 'Histoire ATMF Argenteuil : PACE ATMF créée en octobre 1985. 40 ans d\'engagement ATMF à Argenteuil, quartier Val d\'Argent Sud. Découvrez l\'histoire de notre association ATMF.',
  keywords: 'histoire ATMF Argenteuil, ATMF depuis 1985, création ATMF Argenteuil, PACE ATMF histoire, association ATMF Val d\'Argent Sud histoire, ATMF 40 ans, fondation ATMF Argenteuil 1985',
  openGraph: {
    title: 'Histoire ATMF Argenteuil | PACE ATMF depuis 1985',
    description: 'Découvrez l\'histoire de PACE ATMF Argenteuil, créée en octobre 1985. 40 ans d\'engagement associatif ATMF dans le quartier Val d\'Argent Sud.',
    url: 'https://atmf-argenteuil.org/atmf-histoire',
  },
  canonical: 'https://atmf-argenteuil.org/atmf-histoire',
};

export default function ATMFHistoirePage() {
  const timelineEvents = [
    {
      year: "1985",
      title: "Création PACE ATMF Argenteuil",
      description: "Fondation officielle de PACE ATMF Argenteuil en octobre 1985. Notre association ATMF naît de la volonté d'accompagner les habitants du quartier Val d'Argent Sud.",
      icon: Users,
      highlight: true
    },
    {
      year: "1987",
      title: "Premiers Services ATMF",
      description: "Lancement des premiers services ATMF : aide administrative et accompagnement social. PACE ATMF Argenteuil commence son travail d'intégration.",
      icon: Heart
    },
    {
      year: "1990",
      title: "Cours de Français ATMF",
      description: "Démarrage des ateliers ATMF de français langue étrangère. Ces cours ATMF deviennent rapidement un pilier de notre action à Argenteuil.",
      icon: BookOpen
    },
    {
      year: "1995",
      title: "Reconnaissance ATMF",
      description: "10 ans après sa création, PACE ATMF Argenteuil obtient ses premiers agréments officiels. L'association ATMF est reconnue d'utilité publique.",
      icon: Trophy
    },
    {
      year: "2000",
      title: "Extension Services ATMF",
      description: "Développement de nouveaux services ATMF : accompagnement scolaire et soutien aux personnes âgées (chibanis). PACE ATMF diversifie ses actions.",
      icon: Users
    },
    {
      year: "2005",
      title: "Réseau National ATMF",
      description: "Intégration officielle au réseau national ATMF. PACE ATMF Argenteuil rejoint les 20 associations ATMF de France.",
      icon: MapPin
    },
    {
      year: "2010",
      title: "Modernisation ATMF",
      description: "25 ans après sa création, PACE ATMF Argenteuil modernise ses locaux et ses services. L'association ATMF s'adapte aux nouveaux besoins.",
      icon: Trophy
    },
    {
      year: "2015",
      title: "30 ans ATMF Argenteuil",
      description: "Célébration des 30 ans de PACE ATMF Argenteuil. L'association ATMF a accompagné des milliers de personnes depuis 1985.",
      icon: Heart,
      highlight: true
    },
    {
      year: "2020",
      title: "ATMF Digital",
      description: "Adaptation ATMF au numérique : visioconférences, accompagnement à distance. PACE ATMF Argenteuil innove pendant la pandémie.",
      icon: BookOpen
    },
    {
      year: "2025",
      title: "40 ans ATMF Argenteuil",
      description: "2025 marque les 40 ans de PACE ATMF Argenteuil. 4 décennies d'engagement ATMF au service des habitants du Val d'Argent Sud.",
      icon: Calendar,
      highlight: true
    }
  ];

  const achievements = [
    {
      number: "40",
      text: "Années d'engagement ATMF à Argenteuil depuis 1985"
    },
    {
      number: "500+",
      text: "Personnes accompagnées chaque année par PACE ATMF"
    },
    {
      number: "8",
      text: "Services ATMF permanents proposés à Argenteuil"
    },
    {
      number: "40+",
      text: "Bénévoles ATMF engagés dans notre association"
    },
    {
      number: "20",
      text: "Associations ATMF partenaires dans le réseau national"
    },
    {
      number: "1000+",
      text: "Familles ATMF aidées depuis la création en 1985"
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
                Histoire <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">ATMF</span> Argenteuil
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez l'histoire de PACE ATMF Argenteuil depuis octobre 1985. 
                40 ans d'engagement ATMF au service des habitants du quartier Val d'Argent Sud.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">PACE ATMF Argenteuil - 40 Ans d'Histoire</h2>
              <p className="text-muted-foreground">
                Depuis sa création en octobre 1985, PACE ATMF Argenteuil écrit son histoire 
                dans le quartier Val d'Argent Sud. Notre association ATMF a évolué avec Argenteuil, 
                s'adaptant aux besoins de ses habitants tout en restant fidèle à ses valeurs fondatrices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Chronologie <span className="text-red-600">ATMF Argenteuil</span>
            </h2>
            
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-start gap-6 p-6 rounded-2xl transition-all ${
                  event.highlight 
                    ? 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-2 border-red-200 dark:border-red-800' 
                    : 'bg-background border border-border hover:shadow-lg'
                }`}>
                  <div className={`flex-shrink-0 p-4 rounded-2xl ${
                    event.highlight
                      ? 'bg-gradient-to-br from-red-600 to-rose-600'
                      : 'bg-gradient-to-br from-red-500 to-red-600'
                  }`}>
                    <event.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`text-3xl font-bold ${
                        event.highlight ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {event.year}
                      </span>
                      <h3 className={`text-xl font-bold ${
                        event.highlight ? 'text-red-700' : 'text-foreground'
                      }`}>
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Bilan <span className="text-red-600">40 ans ATMF</span> Argenteuil
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-border text-center">
                  <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
                    {achievement.number}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {achievement.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto text-center space-y-6">
              <h3 className="text-2xl font-bold">L'Héritage ATMF Argenteuil</h3>
              <p className="text-lg text-muted-foreground">
                Depuis octobre 1985, PACE ATMF Argenteuil construit son héritage dans le Val d'Argent Sud. 
                Notre association ATMF a traversé 4 décennies en restant fidèle à ses valeurs : 
                laïcité, démocratie, solidarité et indépendance.
              </p>
              <p className="text-lg text-muted-foreground">
                L'histoire de PACE ATMF Argenteuil continue à s'écrire avec de nouveaux projets, 
                de nouveaux bénévoles et toujours la même ambition : accompagner chaque habitant 
                vers plus d'autonomie et de citoyenneté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Valeurs <span className="text-red-600">ATMF</span> depuis 1985
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-red-600">🏛️ Laïcité ATMF</h3>
                <p className="text-muted-foreground">
                  Depuis 1985, PACE ATMF Argenteuil défend la laïcité comme valeur fondamentale. 
                  Notre association ATMF accueille tous les habitants, quelles que soient leurs convictions.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-red-600">🗳️ Démocratie ATMF</h3>
                <p className="text-muted-foreground">
                  La démocratie participative guide PACE ATMF Argenteuil depuis sa création. 
                  Chaque bénévole ATMF contribue aux décisions de l'association.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-red-600">🤝 Solidarité ATMF</h3>
                <p className="text-muted-foreground">
                  La solidarité est l'ADN de PACE ATMF Argenteuil depuis 1985. 
                  Notre association ATMF accompagne chaque personne dans ses difficultés.
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-red-600">🔓 Indépendance ATMF</h3>
                <p className="text-muted-foreground">
                  L'indépendance politique et religieuse définit PACE ATMF Argenteuil. 
                  Notre association ATMF reste libre dans ses choix et ses actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-rose-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Rejoignez l'Histoire ATMF Argenteuil
            </h2>
            <p className="text-xl opacity-90">
              40 ans après sa création, PACE ATMF Argenteuil continue son engagement. 
              Participez à l'écriture de la prochaine page de notre histoire ATMF.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                href="/membership" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-600 rounded-full hover:bg-gray-100 transition-all text-lg font-medium shadow-lg"
              >
                Devenir bénévole ATMF
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full hover:bg-white/10 transition-all text-lg font-medium"
              >
                En savoir plus sur PACE ATMF
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 