import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // TITRE OPTIMISÉ pour dominer "ATMF"
  title: {
    default: 'PACE ATMF Argenteuil | Association Laïque et Démocratique - Solidarité et Citoyenneté',
    template: '%s | PACE ATMF Argenteuil'
  },
  
  // DESCRIPTION SEO ULTRA-OPTIMISÉE sans référence maghrébine
  description: 'PACE ATMF Argenteuil : Association laïque, démocratique et solidaire depuis 1985. Engagement citoyen, accompagnement scolaire, lutte contre les discriminations. Quartier Val d\'Argent Sud. Association membre du réseau national ATMF France.',
  
  // MOTS-CLÉS STRATÉGIQUES pour dominer "ATMF"
  keywords: [
    'PACE ATMF Argenteuil',
    'ATMF Argenteuil', 
    'Association ATMF',
    'ATMF Val d\'Argent Sud',
    'ATMF 95100',
    'Association laïque Argenteuil',
    'PACE ATMF',
    'ATMF laïque démocratique',
    'ATMF solidaire',
    'Association citoyenne Argenteuil',
    'ATMF Île-de-France',
    'ATMF réseau national',
    'ATMF accompagnement scolaire',
    'ATMF citoyenneté',
    'ATMF Val de Seine',
    'Association solidaire Argenteuil',
    'ATMF 26 Boulevard Général Leclerc',
    'ATMF quartier populaire',
    'Association lutte discriminations',
    'ATMF engagement citoyen'
  ].join(', '),
  
  authors: [{ name: 'PACE ATMF Argenteuil', url: 'https://atmf-argenteuil.org' }],
  creator: 'PACE ATMF Argenteuil - Association Laïque et Démocratique',
  publisher: 'PACE ATMF Argenteuil',
  
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://atmf-argenteuil.org'),
  
  // GÉOLOCALISATION pour dominer les recherches locales "ATMF Argenteuil"
  other: {
    'geo.region': 'FR-95',
    'geo.placename': 'Argenteuil, Val d\'Oise',
    'geo.position': '48.9474;2.2482',
    'ICBM': '48.9474, 2.2482',
    'DC.title': 'PACE ATMF Argenteuil - Association Laïque et Démocratique',
    'DC.creator': 'PACE ATMF Argenteuil',
    'DC.subject': 'Association laïque, solidarité, citoyenneté, accompagnement scolaire, Argenteuil',
    'DC.description': 'Association PACE ATMF Argenteuil : laïque, démocratique et solidaire depuis 1985',
    'DC.publisher': 'PACE ATMF Argenteuil',
    'DC.contributor': 'Réseau ATMF France',
    'DC.date': '1985-10',
    'DC.type': 'Association',
    'DC.format': 'text/html',
    'DC.identifier': 'https://atmf-argenteuil.org',
    'DC.source': 'https://atmf-argenteuil.org',
    'DC.language': 'fr-FR',
    'DC.coverage': 'Argenteuil, Val d\'Oise, Île-de-France, France',
    'DC.rights': 'PACE ATMF Argenteuil'
  },
  
  // Favicons et icônes
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#dc2626' }
    ]
  },
  
  // Manifeste PWA
  manifest: '/site.webmanifest',
  
  // OPEN GRAPH OPTIMISÉ pour partage social "ATMF"
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://atmf-argenteuil.org',
    siteName: 'PACE ATMF Argenteuil - Association Laïque et Démocratique',
    title: 'PACE ATMF Argenteuil | Association Laïque, Démocratique et Solidaire',
    description: 'PACE ATMF Argenteuil : Association laïque, démocratique et solidaire depuis 1985. Engagement citoyen, accompagnement scolaire, lutte contre les discriminations. Quartier Val d\'Argent Sud.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE ATMF Argenteuil - Logo Association Laïque et Démocratique',
        type: 'image/png'
      }
    ],
    countryName: 'France',
    emails: ['atmfargent@gmail.com'],
    phoneNumbers: ['+33139804540'],
    faxNumbers: [],
    streetAddress: '26 Boulevard du Général Leclerc',
    locality: 'Argenteuil',
    region: 'Île-de-France',
    postalCode: '95100',
    countryName: 'France'
  },
  
  // TWITTER CARD optimisée
  twitter: {
    card: 'summary_large_image',
    site: '@ATMF_Argenteuil',
    creator: '@ATMF_Argenteuil',
    title: 'PACE ATMF Argenteuil - Association Laïque et Solidaire',
    description: 'PACE ATMF Argenteuil : Association laïque, démocratique et solidaire depuis 1985. Val d\'Argent Sud, Argenteuil.',
    images: {
      url: '/images/logo.png',
      alt: 'PACE ATMF Argenteuil - Association Laïque et Démocratique'
    }
  },
  
  // Thème couleur ATMF
  themeColor: '#dc2626',
  
  // DONNÉES STRUCTURÉES pour Google
  alternates: {
    canonical: 'https://atmf-argenteuil.org',
    languages: {
      'fr-FR': 'https://atmf-argenteuil.org',
      'fr': 'https://atmf-argenteuil.org'
    }
  },
  
  // ROBOT INSTRUCTIONS pour indexation maximale
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // VERIFICATION moteurs de recherche
  verification: {
    google: 'google-site-verification-code-here',
    yandex: 'yandex-verification-code-here',
    yahoo: 'yahoo-site-verification-code-here',
    other: {
      'msvalidate.01': 'bing-site-verification-code-here'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#dc2626" />
        
        {/* PWA et SEO */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Theme colors ATMF */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        
        {/* GÉOLOCALISATION précise pour "ATMF Argenteuil" */}
        <meta name="geo.region" content="FR-95" />
        <meta name="geo.placename" content="Argenteuil, Val d'Oise" />
        <meta name="geo.position" content="48.9474;2.2482" />
        <meta name="ICBM" content="48.9474, 2.2482" />
        
        {/* iOS optimisé */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PACE ATMF" />
        
        {/* PRECONNECT pour performance SEO */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS-PREFETCH pour optimisation */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* DONNÉES STRUCTURÉES JSON-LD pour Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://atmf-argenteuil.org/#organization",
              "name": "PACE ATMF Argenteuil",
              "legalName": "PACE ATMF Argenteuil - Association Laïque et Démocratique",
              "alternateName": ["ATMF Argenteuil", "Association ATMF", "PACE ATMF"],
              "url": "https://atmf-argenteuil.org",
              "logo": "https://atmf-argenteuil.org/images/logo.png",
              "image": "https://atmf-argenteuil.org/images/logo.png",
              "description": "Association PACE ATMF Argenteuil : laïque, démocratique et solidaire depuis 1985. Engagement citoyen, accompagnement scolaire, lutte contre les discriminations. Quartier Val d'Argent Sud.",
              "foundingDate": "1985-10",
              "foundingLocation": {
                "@type": "Place",
                "name": "Argenteuil, France"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "26 Boulevard du Général Leclerc",
                "addressLocality": "Argenteuil",
                "addressRegion": "Île-de-France",
                "postalCode": "95100",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.9474,
                "longitude": 2.2482
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-1-39-80-45-40",
                "email": "atmfargent@gmail.com",
                "contactType": "customer support",
                "availableLanguage": ["French", "Arabic"]
              },
              "openingHours": [
                "Mo-Fr 10:00-12:30",
                "Mo-Fr 14:30-19:30"
              ],
              "sameAs": [
                "https://www.facebook.com/atmfargenteuil",
                "https://twitter.com/atmfargenteuil"
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "Réseau National ATMF France",
                "url": "https://www.atmf.org"
              },
              "areaServed": {
                "@type": "Place",
                "name": "Argenteuil et Val d'Oise"
              },
              "knowsAbout": [
                "Solidarité internationale",
                "Accompagnement scolaire",
                "Aide aux démarches administratives",
                "Lutte contre les discriminations",
                "Citoyenneté",
                "Engagement citoyen",
                "Laïcité"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}