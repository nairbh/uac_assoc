'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Pen, 
  Languages, 
  ArrowRight,
  Calendar,
  Coffee
} from 'lucide-react';
import { motion } from 'framer-motion';

const HandHeart = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 14H9a2 2 0 1 0 0 4h6a2 2 0 1 0 0-4h-1" />
    <path d="M10 14v-3" />
    <path d="M7 9h.01" />
    <path d="M17 9h.01" />
    <path d="M12 2a9 9 0 0 1 9 9c0 2.5-1 3.5-2.5 3.5S16 14 16 14" />
    <path d="M8 6.4c1.3.8 2.7.8 4 0" />
    <path d="M12 2c-1.3 0-2.5.5-3.4 1.4" />
    <path d="M12 2c1.3 0 2.5.5 3.4 1.4" />
  </svg>
);

export function AboutPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 }}
  };

  return (
    <section className="container py-16 md:py-24">
      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="inline-block rounded-full bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 px-4 py-2 text-sm font-medium">
            Qui sommes nous
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              PACE ATMF
            </span> Argenteuil
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            L'Espace Associatif et Citoyen de Proximité (PACE ATMF) est une association créée officiellement en octobre 1985.
          </p>
          <p className="text-muted-foreground text-lg">
            Elle se définit comme citoyenne dans sa démarche, laïque et tolérante dans son esprit, démocratique dans son fonctionnement et indépendante dans sa réflexion.
          </p>
          <p className="text-muted-foreground text-lg">
            Elle est ancrée au cœur du quartier Val d'Argent Sud, à Argenteuil.
          </p>
          <p className="text-muted-foreground text-lg">
            Notre association est affiliée à un réseau national composé de vingt associations membres réparties dans toute l'Hexagone, dont le siège se trouve à Paris.
          </p>
          
          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border-l-4 border-red-600 my-4">
            <h3 className="font-semibold text-lg text-red-700 dark:text-red-400 mb-2">Notre impact en chiffres</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">500+</p>
                <p className="text-sm text-muted-foreground">Personnes aidées chaque année</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">12</p>
                <p className="text-sm text-muted-foreground">Missions de bénévolat</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">40+</p>
                <p className="text-sm text-muted-foreground">Bénévoles engagés</p>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="grid gap-5 pt-6"
            variants={containerVariants}
          >
            <motion.div 
              className="flex gap-4 items-start group" 
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg group-hover:text-red-600 transition-colors">Accompagnement scolaire</h3>
                <p className="text-muted-foreground">
                  Soutien aux élèves du collège au lycée, avec plus de 50 jeunes accompagnés chaque année.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 items-start group" 
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                <Languages className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg group-hover:text-rose-600 transition-colors">Alphabétisation & FLE</h3>
                <p className="text-muted-foreground">
                  Des centaines de personnes ont appris le français grâce à nos ateliers, facilitant leur intégration professionnelle et sociale.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 items-start group" 
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="bg-gradient-to-br from-red-600 to-rose-500 p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg group-hover:text-red-600 transition-colors">Soutien aux chibanis</h3>
                <p className="text-muted-foreground">
                  Accompagnement des personnes âgées d'origine immigrée réfugiée dans leurs démarches administratives et organisation de rencontres conviviales.
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button 
              size="lg"
              className="gap-2 rounded-full mt-4 group hover:shadow-md transition-all duration-300 bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90" 
              asChild
            >
            <Link href="/about">
              En savoir plus
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative h-[550px]"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute top-0 right-0 w-4/5 h-[350px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Activité d'accompagnement scolaire" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-0 left-0 p-4 text-white">
              <p className="font-medium text-sm">Accompagnement scolaire, Argenteuil</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-40 left-0 w-2/3 h-[250px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Atelier linguistique" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="font-medium text-sm">Atelier linguistique, Argenteuil</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 right-8 w-2/3 h-[220px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <img 
              src="/images/pang-yuhao-GBIFH9Lv2DM-unsplash.jpg" 
              alt="Homme âgé souriant assis sur un banc tenant une canne" 
              className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="font-medium text-sm">Accompagnement des chibanis, Argenteuil</p>
            </div>
          </motion.div>
          
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-red-600/20 to-rose-600/20 blur-3xl"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}