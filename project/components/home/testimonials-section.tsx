'use client';

import { motion } from 'framer-motion';
import { Check, BookOpen, Users, Heart, Pen, Calendar, Languages, Coffee, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function TestimonialsSection() {
  const activities = [
    {
      name: "La cordée du Val",
      description: "Contrat local d'accompagnement à la scolarité (CLAS) pour soutenir les élèves dans leur parcours éducatif",
      icon: BookOpen
    },
    {
      name: "Ateliers d'apprentissage du français",
      description: "ASL+Citoyen T+ Fai'R pour favoriser l'intégration sociale et professionnelle",
      icon: Languages
    },
    {
      name: "Espace jeunes",
      description: "Activités et accompagnement dédiés aux jeunes du quartier pour favoriser leur épanouissement",
      icon: Users
    },
    {
      name: "Espace Femmes citoyennes",
      description: "Soutien aux femmes dans leurs démarches d'émancipation et de participation citoyenne",
      icon: Heart
    },
    {
      name: "Retrait'actifs et accès aux droits",
      description: "AIAS - Accompagnement des personnes retraitées et aide dans l'accès aux droits",
      icon: Coffee
    },
    {
      name: "Réseau d'appui aux parents",
      description: "REAAP - Soutien à la parentalité et renforcement des compétences familiales",
      icon: Users
    },
    {
      name: "Vie Val Cité",
      description: "Promotion des valeurs de la République et de la citoyenneté active",
      icon: Shield
    },
    {
      name: "Val en vacances",
      description: "Quartiers d'été - Activités récréatives et animations pendant les vacances",
      icon: Calendar
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-red-50/30 dark:to-red-950/20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Nos <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">actions</span> à Argenteuil
          </h2>
          <p className="text-muted-foreground text-lg">
            PACE ATMF est une association laïque, citoyenne, démocratique et indépendante qui conduit des projets visant à favoriser l'accès aux droits des populations du quartier Val d'Argent Sud et au-delà.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-border relative group"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-md">
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-8 md:p-10 mt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-center">Notre mission</h3>
            <p className="text-muted-foreground">
              PACE ATMF, une association historique sur le quartier, développe des liens forts avec sa population et bénéficie d'une connaissance fine des questions sociales sur le territoire. Notre but est d'organiser les habitants dans le cadre associatif propice à l'émergence d'une citoyenneté active et participative.
            </p>
            <p className="text-muted-foreground">
              Nous sommes une association citoyenne, démocratique, laïque et indépendante, qui œuvre pour une citoyenneté active et participative des habitants d'Argenteuil et au-delà. Nous mettons en place des activités socioculturelles et luttons contre toute forme d'exclusion, de discrimination, de racisme, d'antisémitisme et de xénophobie.
            </p>
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90" asChild>
                <Link href="/about">
                  En savoir plus sur nos activités
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Découvrez également nos événements ponctuels: Fête de la Réussite, Fête des bénévoles, sorties familiales et bien plus encore.
          </p>
        </div>
      </div>
    </section>
  );
} 