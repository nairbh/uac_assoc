import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from '@/hooks/usePathname';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Settings, Home, LogOut, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  // Vérifier si on est sur une page admin
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              ATMF Argenteuil
            </span>
          </Link>
          
          {/* Navigation principale - masquée sur les pages admin */}
          {!isAdminPage && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Accueil
              </Link>
              <Link
                href="/association"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/association" ? "text-foreground" : "text-foreground/60"
                )}
              >
                L'association
              </Link>
              <Link
                href="/news"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/news" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Actualités
              </Link>
              <Link
                href="/events"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/events" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Événements
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/contact" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Contact
              </Link>
            </nav>
          )}

          {/* Navigation admin */}
          {isAdminPage && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <span className="text-foreground font-semibold">
                Administration ATMF
              </span>
            </nav>
          )}
        </div>

        {/* ... existing mobile menu code ... */}

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Recherche masquée sur les pages admin */}
            {!isAdminPage && (
              <Button variant="outline" className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2">
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Rechercher...</span>
              </Button>
            )}
          </div>
          
          <nav className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.first_name || 'Utilisateur'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Liens admin */}
                  {!isAdminPage && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {/* Retour au site public depuis l'admin */}
                  {isAdminPage && (
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
                  
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Boutons connexion/don masqués sur les pages admin */
              !isAdminPage && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Connexion</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/donate">Faire un don</Link>
                  </Button>
                </>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 