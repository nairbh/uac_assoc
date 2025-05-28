'use client';

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastNotificationProvider } from '@/components/ui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastNotificationProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ToastNotificationProvider>
  );
}