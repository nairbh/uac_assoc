'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { 
  Menu, 
  User, 
  Heart, 
  Calendar, 
  Newspaper, 
  Users, 
  Mail,
  Moon,
  Sun,
  Home,
  ChevronDown
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'L\'association', href: '/about', icon: Users },
    { name: 'Faire un don', href: '/donate', icon: Heart },
    { name: 'Devenir bénévole', href: '/membership', icon: User },
    { name: 'Événements', href: '/events', icon: Calendar },
    { name: 'Actualités', href: '/news', icon: Newspaper },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 shadow-md border-b border-border/40' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 lg:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative h-12 w-12"
          >
            <Image 
              src="/images/logo.png" 
              alt="ATMF Logo" 
              width={48} 
              height={48}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain"
            />
          </motion.div>
          <div className="overflow-hidden">
            <motion.span 
              className="hidden font-bold sm:block text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              ATMF Argenteuil
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-foreground hover:bg-accent ${
                  pathname === link.href 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
            
            <div className="relative group">
              <Button variant="ghost" className="flex items-center gap-1">
                Plus
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </Button>
              <div className="absolute hidden group-hover:block right-0 mt-1 w-48 origin-top-right bg-popover rounded-md shadow-lg p-2 z-50">
                {navLinks.slice(5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
            >
                    <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/signin">
                <User className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90 hover:scale-105 transition-all rounded-full shadow-md">
              <Link href="/donate">
                <Heart className="mr-2 h-4 w-4" />
                Faire un don
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image 
                    src="/images/logo.png" 
                    alt="ATMF Logo" 
                    width={40} 
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                    className="object-contain" 
                  />
                  <span className="font-bold">
                    ATMF Argenteuil
                  </span>
                </Link>
                <div className="grid gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${
                          pathname === link.href ? 'bg-accent text-foreground font-medium' : ''
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="grid gap-3 pt-4">
                  <Button asChild className="h-12">
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-5 w-5" />
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild className="h-12 bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90">
                    <Link href="/donate" onClick={() => setIsOpen(false)}>
                      <Heart className="mr-2 h-5 w-5" />
                      Faire un don
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}