'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastNotificationProvider } from '@/components/ui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ToastNotificationProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ToastNotificationProvider>
    </ThemeProvider>
  );
}