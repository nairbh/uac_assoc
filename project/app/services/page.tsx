import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services ATMF Argenteuil',
  description: 'Services et activités de PACE ATMF Argenteuil - Association laïque et démocratique',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ServicesRedirect() {
  // Redirection côté serveur vers /about
  redirect('/about');
} 