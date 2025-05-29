'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Heart,
  Bell,
  User,
  BarChart,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { AdminGuard } from '@/components/auth/admin-guard';

// Type pour un élément de menu
interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  permission?: string; // Permission requise pour afficher cet élément
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, profile } = useAuth();
  const { hasPermission } = usePermissions();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  // Configuration des éléments de menu avec leurs permissions requises
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Articles',
      href: '/admin?tab=articles',
      icon: FileText,
      permission: 'create_article'
    },
    {
      title: 'Événements',
      href: '/admin?tab=events',
      icon: Calendar,
      permission: 'create_event'
    },
    {
      title: 'Équipe',
      href: '/admin?tab=users',
      icon: Users,
      permission: 'manage_users'
    },
    {
      title: 'Statistiques',
      href: '/admin?tab=analytics',
      icon: BarChart,
      permission: 'view_analytics'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin' && pathname === '/admin') return true;
    if (href.includes('?tab=') && pathname === '/admin') {
      const tabName = href.split('=')[1];
      return window.location.search.includes(tabName);
    }
    if (href !== '/admin' && pathname.startsWith(href)) return true;
    return false;
  };

  // Filtrer les éléments du menu selon les permissions
  const filteredNavItems = navItems.filter(item => 
    !item.permission || hasPermission(item.permission as any)
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted/30">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 lg:top-20 z-40 bg-background border-r transition-all duration-300",
            "h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]", // Ajuster la hauteur pour tenir compte de la navbar
            sidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2",
                !sidebarOpen && "justify-center"
              )}
            >
              <div className="flex items-center gap-2 p-3">
                <div className="bg-gradient-to-r from-red-600 to-rose-600 p-2 rounded-xl">
                  <h1 className="text-white font-bold text-xl">ATMF</h1>
                </div>
                {sidebarOpen && (
                  <span className="font-bold">
                    Admin Portal
                  </span>
                )}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex"
            >
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                !sidebarOpen && "rotate-180"
              )} />
            </Button>
          </div>

          <div className="py-4">
            <nav className="space-y-1 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    !sidebarOpen && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-4 left-0 right-0 px-2">
            <Separator className="mb-4" />
            <Button
              variant="ghost"
              className={cn(
                "w-full text-muted-foreground hover:text-foreground",
                !sidebarOpen && "justify-center"
              )}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span className="ml-2">Déconnexion</span>}
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <div
          className={cn(
            "transition-all duration-300 min-h-screen pt-16 lg:pt-20", // Garder le padding pour la navbar principale
            sidebarOpen ? "md:ml-64" : "md:ml-20"
          )}
        >
          {/* Page content directement sans header supplémentaire */}
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}