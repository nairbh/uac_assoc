'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ExternalLink,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -z-10 top-1/2 left-0 w-72 h-72 rounded-full bg-red-600/5 blur-3xl"></div>
      <div className="absolute -z-10 top-1/3 right-0 w-96 h-96 rounded-full bg-rose-600/5 blur-3xl"></div>
      
      <div className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="relative h-12 w-12"
              >
                <Image 
                  src="/images/logo.png" 
                  alt="PACE ATMF Logo" 
                  width={48} 
                  height={48}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain rounded-full" 
                />
              </motion.div>
              <span className="font-bold text-lg">
                PACE ATMF Argenteuil
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Association laïque, démocratique et indépendante, engagée contre toute forme de racisme et discrimination,
              au service des habitants d'Argenteuil.
            </p>
            <div className="flex gap-3">
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="icon" variant="outline" className="rounded-full bg-background hover:bg-accent hover:text-accent-foreground">
                <Facebook className="h-5 w-5" />
              </Button>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="icon" variant="outline" className="rounded-full bg-background hover:bg-accent hover:text-accent-foreground">
                <Twitter className="h-5 w-5" />
              </Button>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="icon" variant="outline" className="rounded-full bg-background hover:bg-accent hover:text-accent-foreground">
                <Instagram className="h-5 w-5" />
              </Button>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Button size="icon" variant="outline" className="rounded-full bg-background hover:bg-accent hover:text-accent-foreground">
                <Youtube className="h-5 w-5" />
              </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg relative inline-block">
              Liens Rapides
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "L'association", href: "/about" },
                { name: "Événements", href: "/events" },
                { name: "Actualités", href: "/news" },
                { name: "Devenir bénévole", href: "/membership" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3 text-red-600" />
                    {link.name}
                </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg relative inline-block">
              Contact
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <motion.li className="flex items-start gap-3" whileHover={{ x: 3 }}>
                <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-red-600" />
          </div>
                <span className="text-muted-foreground">26 Boulevard du Général Leclerc, 95 100 Argenteuil</span>
              </motion.li>
              <motion.li className="flex items-center gap-3" whileHover={{ x: 3 }}>
                <div className="bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-rose-600" />
                </div>
                <span className="text-muted-foreground">01.39.80.45.40</span>
              </motion.li>
              <motion.li className="flex items-center gap-3" whileHover={{ x: 3 }}>
                <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-muted-foreground">atmfargent@gmail.com</span>
              </motion.li>
              <motion.li className="flex items-center gap-3" whileHover={{ x: 3 }}>
                <div className="bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800 p-2 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-rose-600" />
                </div>
                <Link href="http://www.atmf-argenteuil.org" target="_blank" className="text-muted-foreground hover:text-foreground">
                  www.atmf-argenteuil.org
                </Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg relative inline-block">
              Newsletter
              <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"></div>
            </h3>
            <p className="text-muted-foreground">
              Abonnez-vous à notre newsletter pour recevoir nos actualités et événements.
            </p>
            <div className="space-y-3">
            <div className="flex gap-2">
                <Input 
                  placeholder="Votre email" 
                  type="email" 
                  className="rounded-l-full rounded-r-none bg-background" 
                />
                <Button className="rounded-r-full rounded-l-none bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                En vous inscrivant, vous acceptez notre <Link href="/legal/privacy" className="underline hover:text-foreground">politique de confidentialité</Link>.
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <p className="text-muted-foreground text-sm">© {currentYear} PACE ATMF Argenteuil.</p>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                Fait avec <Heart className="h-3 w-3 text-red-500 inline fill-red-500" /> en France
              </p>
            </div>
            <div className="flex justify-center gap-6">
              {[
                { name: "Conditions d'utilisation", href: "/legal/terms" },
                { name: "Politique de confidentialité", href: "/legal/privacy" },
                { name: "Cookies", href: "/legal/cookies" }
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.name}
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}