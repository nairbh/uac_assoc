import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
  BookOpen, 
  Languages, 
  Pen, 
  Calendar, 
  Users, 
  Heart, 
  ChevronRight,
  Clock,
  MapPin
} from "lucide-react";

export default function MembershipPage() {
  const volunteerOpportunities = [
    {
      title: "Écrivain public - Aide aux démarches administratives",
      category: "Exclusion & Pauvreté",
      type: "Écrivain public, Aide aux démarches administratives",
      icon: Pen,
      location: "ARGENTEUIL (95100)",
      availability: "Quelques heures par semaine",
      description: "Accompagner les usagers dans leurs démarches administratives, les aider à comprendre et remplir des formulaires, rédiger des courriers et faciliter leurs interactions avec les administrations."
    },
    {
      title: "Accompagnement scolaire - Primaire",
      category: "Exclusion & Pauvreté",
      type: "Accompagnement scolaire",
      icon: BookOpen,
      location: "ARGENTEUIL (95100)",
      availability: "Quelques heures par semaine",
      description: "Apporter un soutien scolaire aux élèves de primaire, les aider dans leurs devoirs et contribuer à l'amélioration de leur méthodologie d'apprentissage."
    },
    {
      title: "Accompagnement scolaire - Collégiens",
      category: "Exclusion & Pauvreté",
      type: "Accompagnement scolaire",
      icon: BookOpen,
      location: "ARGENTEUIL (95100)",
      availability: "Quelques heures par semaine",
      description: "Soutenir les collégiens dans leur scolarité, les aider à comprendre les matières où ils rencontrent des difficultés et les accompagner dans leurs révisions."
    },
    {
      title: "Animation pour enfants",
      category: "Exclusion & Pauvreté",
      type: "Animation culturelle",
      icon: Calendar,
      location: "ARGENTEUIL (95100)",
      availability: "Quelques heures le mercredi",
      description: "Organiser et animer des activités ludiques, créatives et éducatives pour les enfants, favorisant leur épanouissement et leur développement."
    },
    {
      title: "Animation pour jeunes pendant les vacances",
      category: "Exclusion & Pauvreté",
      type: "Animation culturelle",
      icon: Calendar,
      location: "ARGENTEUIL (95100)",
      availability: "De quelques heures à une journée",
      description: "Proposer et encadrer des activités récréatives, sportives et culturelles pour les jeunes pendant les périodes de vacances scolaires."
    },
    {
      title: "Apprentissage de la langue française",
      category: "Exclusion & Pauvreté",
      type: "Alphabétisation, Français Langue Étrangère",
      icon: Languages,
      location: "ARGENTEUIL (95100)",
      availability: "6 heures par semaine",
      description: "Enseigner le français à des personnes non-francophones ou en situation d'alphabétisation, adapter les méthodes pédagogiques selon les niveaux et besoins spécifiques."
    },
    {
      title: "Animation / Accompagnement d'un groupe de seniors",
      category: "Éducation & Formation",
      type: "Animation culturelle",
      icon: Users,
      location: "ARGENTEUIL (95100)",
      availability: "Mercredi après-midi + éventuelles sorties ponctuelles",
      description: "Animer des rencontres pour les seniors, organiser des activités adaptées et les accompagner lors de sorties culturelles ou récréatives."
    },
    {
      title: "Animation d'ateliers de travaux manuels pour femmes",
      category: "Exclusion & Pauvreté",
      type: "Animation culturelle, Travaux manuels",
      icon: Heart,
      location: "ARGENTEUIL (95100)",
      availability: "Quelques heures par semaine",
      description: "Concevoir et animer des ateliers créatifs et de travaux manuels destinés aux femmes, favorisant les échanges et le développement de compétences."
    },
    {
      title: "Assistance lors d'événements festifs",
      category: "Exclusion & Pauvreté",
      type: "Animation culturelle, Travaux manuels",
      icon: Calendar,
      location: "ARGENTEUIL (95100)",
      availability: "Selon les événements et les possibilités des bénévoles",
      description: "Participer à l'organisation et à la mise en place d'événements festifs, aider à l'accueil du public et au bon déroulement des activités."
    },
    {
      title: "Participation à la préparation d'événements festifs",
      category: "Exclusion & Pauvreté",
      type: "Animation culturelle",
      icon: Calendar,
      location: "ARGENTEUIL (95100)",
      availability: "Selon les événements et les possibilités des bénévoles",
      description: "Contribuer à la conception, la planification et la préparation logistique des événements organisés par l'association."
    }
  ];

  return (
    <div className="container py-16 space-y-12">
      {/* En-tête */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Devenir <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">bénévole</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Rejoignez l'ATMF Argenteuil et participez à nos actions pour aider la communauté locale
        </p>
        <Button size="lg" className="mt-6 bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90">
          <Link href="/contact">Nous contacter</Link>
        </Button>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto bg-red-50 dark:bg-red-950/20 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Pourquoi devenir bénévole à l'ATMF Argenteuil ?</h2>
        <div className="space-y-4">
          <p>
            En devenant bénévole à l'ATMF Argenteuil, vous contribuez directement à améliorer la vie des habitants d'Argenteuil et à promouvoir les valeurs d'entraide, de respect et de solidarité.
          </p>
          <p>
            Selon vos compétences, vos centres d'intérêt et votre disponibilité, vous pouvez vous engager dans différentes missions. Notre association est toujours à la recherche de bénévoles motivés pour renforcer ses actions et développer de nouveaux projets.
          </p>
          <p>
            L'engagement bénévole est une expérience enrichissante qui vous permettra de développer de nouvelles compétences, de rencontrer des personnes aux parcours variés et de vous impliquer concrètement dans la vie locale.
          </p>
        </div>
      </div>

      {/* Liste des missions */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Nos missions bénévoles</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {volunteerOpportunities.map((opportunity, index) => (
            <Card key={index} className="overflow-hidden group hover:border-red-300 dark:hover:border-red-800 transition-colors">
              <div className="p-6 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-md">
                    <opportunity.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-red-600 mb-1">
                      {opportunity.category}
                    </div>
                    <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {opportunity.description}
                </p>
                
                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span>Disponibilité demandée : {opportunity.availability}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="ghost" className="text-red-600 p-0 group-hover:text-red-700 group-hover:underline flex items-center">
                    En savoir plus
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Comment devenir bénévole */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Comment devenir bénévole ?</h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold">Contactez-nous</h3>
            <p className="text-muted-foreground">
              Prenez contact par téléphone, email ou en vous rendant directement à notre local pour exprimer votre intérêt.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold">Rencontre & échange</h3>
            <p className="text-muted-foreground">
              Nous discuterons ensemble de vos motivations, compétences et disponibilités pour identifier les missions adaptées.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold">Début de l'engagement</h3>
            <p className="text-muted-foreground">
              Vous serez accompagné(e) dans vos premières missions par des bénévoles expérimentés de l'association.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-8 md:p-12 rounded-2xl mt-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Prêt(e) à nous rejoindre ?</h2>
          <p className="text-lg opacity-90">
            Votre temps et vos compétences sont précieux pour notre association et pour les habitants d'Argenteuil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button size="lg" className="bg-white text-red-600 hover:bg-white/90">
              <Link href="http://www.atmf-argenteuil.org" target="_blank">
                Visiter notre site web
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}