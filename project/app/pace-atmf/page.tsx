import { Metadata } from 'next';
import { Heart, Users, BookOpen, Shield, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PACE ATMF Argenteuil | PACE ATMF Association Laïque Démocratique 95100',
  description: 'PACE ATMF Argenteuil : Association PACE ATMF laïque, démocratique et indépendante depuis 1985. Découvrez PACE ATMF Argenteuil Val d\'Argent Sud, nos services PACE ATMF.',
  keywords: 'PACE ATMF Argenteuil, PACE ATMF association, PACE ATMF laïque, PACE ATMF démocratique, PACE ATMF 95100, PACE ATMF Val d\'Argent Sud, association PACE ATMF Argenteuil',
  openGraph: {
    title: 'PACE ATMF Argenteuil | Association PACE ATMF Laïque et Démocratique',
    description: 'PACE ATMF Argenteuil, association laïque, démocratique et indépendante depuis 1985. Découvrez les actions de PACE ATMF dans le quartier Val d\'Argent Sud.',
    url: 'https://atmf-argenteuil.org/pace-atmf',
  },
  alternates: {
    canonical: 'https://atmf-argenteuil.org/pace-atmf',
  },
};

export default function PaceATMFPage() {
  const paceValues = [
    {
      icon: Heart,
      title: "PACE : Proximité",
      description: "PACE ATMF Argenteuil privilégie la proximité avec les habitants du Val d'Argent Sud. Notre association PACE ATMF est ancrée dans le quartier depuis 1985.",
      color: "red"
    },
    {
      icon: Users,
      title: "PACE : Associatif",
      description: "Le caractère associatif de PACE ATMF Argenteuil favorise la participation citoyenne. Notre structure PACE ATMF est démocratique et collaborative.",
      color: "rose"
    },
    {
      icon: BookOpen,
      title: "PACE : Citoyen",
      description: "PACE ATMF Argenteuil développe la citoyenneté active. Notre approche PACE ATMF forme des citoyens responsables et engagés dans la République.",
      color: "red"
    },
    {
      icon: Shield,
      title: "PACE : Espace",
      description: "PACE ATMF Argenteuil offre un espace de rencontre et d'échange. Notre local PACE ATMF accueille tous les habitants sans distinction.",
      color: "rose"
    }
  ];

  const paceServices = [
    {
      title: "Services Éducatifs PACE ATMF",
      items: [
        "Accompagnement scolaire PACE ATMF pour collégiens et lycéens",
        "Cours de français langue étrangère PACE ATMF",
        "Ateliers sociolinguistiques PACE ATMF",
        "Soutien méthodologique PACE ATMF"
      ]
    },
    {
      title: "Services Sociaux PACE ATMF", 
      items: [
        "Aide aux démarches administratives PACE ATMF",
        "Accompagnement juridique PACE ATMF",
        "Soutien aux personnes âgées (chibanis) PACE ATMF",
        "Médiation sociale PACE ATMF"
      ]
    },
    {
      title: "Services Culturels PACE ATMF",
      items: [
        "Animation de quartier PACE ATMF",
        "Événements interculturels PACE ATMF",
        "Sorties et découvertes PACE ATMF",
        "Échanges intergénérationnels PACE ATMF"
      ]
    },
    {
      title: "Services Citoyens PACE ATMF",
      items: [
        "Formation à la citoyenneté PACE ATMF",
        "Lutte contre les discriminations PACE ATMF",
        "Sensibilisation aux droits PACE ATMF",
        "Participation démocratique PACE ATMF"
      ]
    }
  ];

  const paceImpact = [
    {
      number: "500+",
      label: "Personnes accompagnées par PACE ATMF chaque année"
    },
    {
      number: "40+",
      label: "Bénévoles engagés dans PACE ATMF Argenteuil"
    },
    {
      number: "8",
      label: "Services permanents proposés par PACE ATMF"
    },
    {
      number: "40",
      label: "Années d'engagement PACE ATMF à Argenteuil"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-red-50/30 dark:to-red-950/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-rose-600/10"></div>
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">PACE</span> ATMF
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                Argenteuil
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                PACE ATMF Argenteuil : Espace Associatif et Citoyen de Proximité depuis octobre 1985. 
                Découvrez notre association PACE ATMF laïque, démocratique et indépendante dans le quartier Val d'Argent Sud.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Qu'est-ce que PACE ATMF ?</h3>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong className="text-red-600">PACE</strong> signifie "Espace Associatif et Citoyen de Proximité". 
                  PACE ATMF Argenteuil incarne cette approche depuis sa création en octobre 1985.
                </p>
                <p>
                  Notre association PACE ATMF se définit comme <strong>citoyenne</strong> dans sa démarche, 
                  <strong> laïque</strong> et tolérante dans son esprit, <strong>démocratique</strong> dans son fonctionnement 
                  et <strong>indépendante</strong> dans sa réflexion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACE Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Les 4 Piliers de <span className="text-red-600">PACE ATMF</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {paceValues.map((value, index) => (
                <div key={index} className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border group">
                  <div className="flex items-start gap-6">
                    <div className={`bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold group-hover:text-red-600 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACE Services */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Services <span className="text-red-600">PACE ATMF</span> Argenteuil
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {paceServices.map((service, index) => (
                <div key={index} className="bg-background rounded-2xl p-8 shadow-lg border border-border">
                  <h3 className="text-2xl font-bold mb-6 text-red-600">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACE Impact */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Impact <span className="text-red-600">PACE ATMF</span> Argenteuil
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {paceImpact.map((stat, index) => (
                <div key={index} className="text-center bg-background p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all">
                  <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold">PACE ATMF : Un Engagement Durable</h3>
              <p className="text-lg text-muted-foreground">
                Depuis 40 ans, PACE ATMF Argenteuil accompagne les habitants du quartier Val d'Argent Sud. 
                Notre association PACE ATMF continue de développer de nouveaux services pour répondre 
                aux besoins évolutifs de la population argenteuillaise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact PACE ATMF */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-rose-600 text-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Contactez PACE ATMF Argenteuil
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center space-y-4">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mx-auto">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Adresse PACE ATMF</h3>
                  <p className="opacity-90">
                    PACE ATMF Argenteuil<br/>
                    26 Boulevard du Général Leclerc<br/>
                    95100 Argenteuil<br/>
                    Quartier Val d'Argent Sud
                  </p>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mx-auto">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Téléphone PACE ATMF</h3>
                  <p className="opacity-90 text-lg">
                    01.39.80.45.40
                  </p>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mx-auto">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email PACE ATMF</h3>
                  <p className="opacity-90 text-lg">
                    atmfargent@gmail.com
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-6 w-6" />
                <h3 className="text-2xl font-bold">Horaires PACE ATMF Argenteuil</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div>
                  <p><strong>Lundi au Vendredi :</strong></p>
                  <p>10h00 - 12h30</p>
                  <p>14h30 - 19h30</p>
                </div>
                <div>
                  <p><strong>Week-end :</strong></p>
                  <p>Fermé (événements ponctuels)</p>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Rejoignez PACE ATMF Argenteuil</h3>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                PACE ATMF Argenteuil recrute des bénévoles motivés pour rejoindre notre équipe. 
                Participez aux actions de PACE ATMF dans le quartier Val d'Argent Sud.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link 
                  href="/membership" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-600 rounded-full hover:bg-gray-100 transition-all text-lg font-medium shadow-lg"
                >
                  Devenir bénévole PACE ATMF
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full hover:bg-white/10 transition-all text-lg font-medium"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACE ATMF Network */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              PACE ATMF dans le Réseau <span className="text-red-600">ATMF National</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              PACE ATMF Argenteuil fait partie du réseau national ATMF composé de 20 associations 
              réparties dans toute la France. Ce réseau ATMF coordonne les actions et partage 
              les bonnes pratiques entre toutes les associations ATMF membres.
            </p>
            
            <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Réseau ATMF France</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">20</div>
                  <p className="text-sm text-muted-foreground">Associations ATMF en France</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">1985</div>
                  <p className="text-sm text-muted-foreground">Création PACE ATMF Argenteuil</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">Paris</div>
                  <p className="text-sm text-muted-foreground">Siège du réseau ATMF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 