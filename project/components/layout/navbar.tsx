'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { formatUserName, getUserInitials } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, profile, signOut, isAdmin } = useAuth();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeout = React.useRef<NodeJS.Timeout | null>(null);

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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Vérifier si on est sur une page admin
  const isAdminPage = pathname?.startsWith('/admin');

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
              alt="PACE ATMF Logo" 
              width={48} 
              height={48}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain rounded-full"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">
              PACE ATMF Argenteuil
            </span>
            <span className="text-xs text-muted-foreground -mt-1">
              Association citoyenne
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1">
            {!isAdminPage && navLinks.slice(0, 5).map((link) => (
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
            
            {!isAdminPage && (
            <div 
              className="relative inline-block"
              onMouseEnter={() => {
                if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                setIsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 150);
              }}
            >
              <Button variant="ghost" className="flex items-center gap-1">
                Plus
                <ChevronDown size={16} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full w-48 origin-top-right bg-popover rounded-md shadow-lg p-2 z-50">
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
              )}
            </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            {user ? (
              // Utilisateur connecté
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-red-100 text-red-600">
                        {getUserInitials(profile?.first_name, profile?.last_name, user?.email)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline-block font-medium">
                      {formatUserName(profile?.first_name, profile?.last_name, user?.email)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {formatUserName(profile?.first_name, profile?.last_name, user?.email)}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Liens selon le rôle utilisateur */}
                  {profile?.role === 'admin' && !isAdminPage && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Administration complète
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {profile?.role === 'editor' && !isAdminPage && !pathname?.startsWith('/moderator') && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/moderator">
                          <Settings className="mr-2 h-4 w-4" />
                          Espace modération
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {/* Lien vers espace membre pour tous */}
                  {!isAdminPage && !pathname?.startsWith('/moderator') && !pathname?.startsWith('/member') && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/member">
                          <User className="mr-2 h-4 w-4" />
                          Mon espace
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {/* Retour au site depuis l'admin ou modérateur */}
                  {(isAdminPage || pathname?.startsWith('/moderator')) && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/">
                          <Home className="mr-2 h-4 w-4" />
                          Retour au site
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Utilisateur non connecté
              <>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/signin">
                <User className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
                {!isAdminPage && (
            <Button asChild className="bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90 hover:scale-105 transition-all rounded-full shadow-md">
              <Link href="/donate">
                <Heart className="mr-2 h-4 w-4" />
                Faire un don
              </Link>
            </Button>
                )}
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
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
                    alt="PACE ATMF Logo" 
                    width={32} 
                    height={32}
                    style={{ width: 'auto', height: 'auto' }}
                    className="object-contain rounded-full" 
                  />
                  <span className="font-semibold">
                    PACE ATMF Argenteuil
                  </span>
                </Link>
                
                {!isAdminPage && (
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
                )}
                
                <div className="grid gap-3 pt-4">
                  {user ? (
                    // Menu mobile pour utilisateur connecté
                    <>
                      <div className="px-3 py-2 text-sm border-b">
                        <p className="font-medium">
                          {formatUserName(profile?.first_name, profile?.last_name, user?.email)}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      
                      {/* Liens selon le rôle */}
                      {profile?.role === 'admin' && !isAdminPage && (
                        <Button variant="outline" asChild className="h-12">
                          <Link href="/admin" onClick={() => setIsOpen(false)}>
                            <Settings className="mr-2 h-5 w-5" />
                            Administration complète
                          </Link>
                        </Button>
                      )}
                      
                      {profile?.role === 'editor' && !isAdminPage && !pathname?.startsWith('/moderator') && (
                        <Button variant="outline" asChild className="h-12">
                          <Link href="/moderator" onClick={() => setIsOpen(false)}>
                            <Settings className="mr-2 h-5 w-5" />
                            Espace modération
                          </Link>
                        </Button>
                      )}
                      
                      {/* Espace membre pour tous */}
                      {!isAdminPage && !pathname?.startsWith('/moderator') && !pathname?.startsWith('/member') && (
                        <Button variant="outline" asChild className="h-12">
                          <Link href="/member" onClick={() => setIsOpen(false)}>
                            <User className="mr-2 h-5 w-5" />
                            Mon espace
                          </Link>
                        </Button>
                      )}
                      
                      {/* Retour au site */}
                      {(isAdminPage || pathname?.startsWith('/moderator')) && (
                        <Button variant="outline" asChild className="h-12">
                          <Link href="/" onClick={() => setIsOpen(false)}>
                            <Home className="mr-2 h-5 w-5" />
                            Retour au site
                          </Link>
                        </Button>
                      )}
                      
                      <Button variant="outline" className="h-12" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                        <LogOut className="mr-2 h-5 w-5" />
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    // Menu mobile pour utilisateur non connecté
                    <>
                  <Button asChild className="h-12">
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-5 w-5" />
                      Connexion
                    </Link>
                  </Button>
                      {!isAdminPage && (
                  <Button asChild className="h-12 bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-90">
                    <Link href="/donate" onClick={() => setIsOpen(false)}>
                      <Heart className="mr-2 h-5 w-5" />
                      Faire un don
                    </Link>
                  </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}