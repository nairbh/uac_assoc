'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, BookOpen, Languages, Pen, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Overlay with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800/90 via-red-700/80 to-rose-800/90 z-10" />
      
      {/* Background image with slight zoom animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)', 
          zIndex: 0 
        }} 
      />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-red-400 to-rose-500 z-20" />
      
      <div className="container relative z-20 py-28 md:py-36 text-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20">
                <Image 
                  src="/images/logo.png" 
                  alt="PACE ATMF Logo" 
                  width={80} 
                  height={80} 
                  className="object-contain rounded-full" 
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  PACE ATMF <span className="text-2xl md:text-4xl lg:text-5xl">Argenteuil</span>
                </h1>
                <p className="text-lg text-red-200">Un homme, une voix</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Association laïque, démocratique et indépendante, engagée contre toute forme de racisme et discrimination, au service des habitants d'Argenteuil.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg h-14 px-6 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]" asChild>
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Faire un don
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-red-700 hover:bg-white/20 text-lg h-14 px-6 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]" asChild>
                <Link href="/membership">
                  <Users className="mr-2 h-5 w-5" />
                  Devenir bénévole
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-300" /> Notre impact humain
            </h2>
            
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3 items-start group"
              >
                <div className="p-3 rounded-xl bg-red-600/30 text-white">
                  <Coffee className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Les chibanis</h3>
                  <p className="text-sm text-gray-200">Accompagnement des personnes âgées d'origine immigrée réfugiée dans leurs démarches, animation de rencontres et sorties culturelles.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 items-start group"
              >
                <div className="p-3 rounded-xl bg-red-600/30 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Les enfants et jeunes</h3>
                  <p className="text-sm text-gray-200">Soutien scolaire, activités périscolaires, et ateliers culturels pour favoriser l'épanouissement et la réussite.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 items-start group"
              >
                <div className="p-3 rounded-xl bg-red-600/30 text-white">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Les personnes non-francophones</h3>
                  <p className="text-sm text-gray-200">Cours de français, ateliers sociolinguistiques et aide à l'intégration sociale et professionnelle.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3 items-start group"
              >
                <div className="p-3 rounded-xl bg-red-600/30 text-white">
                  <Pen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Les sans-papiers</h3>
                  <p className="text-sm text-gray-200">Aide administrative, accompagnement juridique et soutien moral pour les personnes en situation administrative précaire.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}