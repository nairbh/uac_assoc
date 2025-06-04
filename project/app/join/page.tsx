import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rejoindre ATMF Argenteuil',
  description: 'Adhésion et engagement à PACE ATMF Argenteuil - Association laïque et démocratique',
  robots: {
    index: false,
    follow: true,
  },
};

export default function JoinRedirect() {
  // Redirection côté serveur vers /membership
  redirect('/membership');
} 