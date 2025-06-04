import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATMF Argenteuil | Association ATMF Officielle Argenteuil 95100 - PACE ATMF',
  description: 'ATMF Argenteuil : Association ATMF officielle à Argenteuil 95100. PACE ATMF depuis 1985. ATMF laïque, démocratique, solidaire. ATMF Val d\'Argent Sud. Contact ATMF Argenteuil : 01.39.80.45.40',
  keywords: 'ATMF Argenteuil, Association ATMF Argenteuil, PACE ATMF Argenteuil, ATMF 95100, ATMF Val d\'Argent Sud, ATMF Argenteuil officielle, ATMF laïque Argenteuil, ATMF démocratique Argenteuil, ATMF solidaire Argenteuil',
  
  openGraph: {
    title: 'ATMF Argenteuil - Association ATMF Officielle 95100',
    description: 'ATMF Argenteuil : PACE ATMF, association ATMF officielle depuis 1985. ATMF laïque et démocratique. Contact ATMF Argenteuil : 01.39.80.45.40',
    url: 'https://atmf-argenteuil.org/atmf-argenteuil',
  },
  
  alternates: {
    canonical: 'https://atmf-argenteuil.org/atmf-argenteuil'
  },
  
  robots: {
    index: true,
    follow: true,
  }
};

export default function ATMFArgenteuil() {
  // Redirection vers la page d'accueil pour éviter le contenu dupliqué
  // mais permettre l'indexation de l'URL /atmf-argenteuil
  redirect('/');
} 