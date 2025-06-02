import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import type { Metadata } from 'next';

// MÉTADONNÉES SEO ULTRA-OPTIMISÉES pour la page d'accueil ATMF
export const metadata: Metadata = {
  title: 'PACE ATMF Argenteuil | Association ATMF Officielle Val d\'Argent Sud depuis 1985',
  description: 'PACE ATMF Argenteuil : Association Travailleurs Maghrébins de France officielle à Argenteuil depuis 1985. ATMF laïque, démocratique, solidaire. Quartier Val d\'Argent Sud, 26 Boulevard du Général Leclerc. Association ATMF membre du réseau national ATMF France - 20 associations.',
  keywords: 'PACE ATMF Argenteuil, ATMF Argenteuil officielle, Association ATMF Val d\'Argent Sud, ATMF 95100, ATMF 1985, Association Travailleurs Maghrébins France Argenteuil, ATMF laïque Argenteuil, ATMF démocratique solidaire, ATMF Île-de-France, réseau ATMF France, ATMF Boulevard Général Leclerc',
  
  openGraph: {
    title: 'PACE ATMF Argenteuil | Association ATMF Officielle depuis 1985',
    description: 'PACE ATMF Argenteuil : Association ATMF laïque, démocratique et solidaire depuis 1985. Quartier Val d\'Argent Sud. Membre officiel du réseau national ATMF France.',
    url: 'https://atmf-argenteuil.org',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'PACE ATMF Argenteuil - Association ATMF Officielle'
      }
    ]
  },
  
  twitter: {
    title: 'PACE ATMF Argenteuil - Association ATMF Officielle',
    description: 'PACE ATMF Argenteuil : Association ATMF depuis 1985, laïque et démocratique. Val d\'Argent Sud, Argenteuil.'
  },
  
  alternates: {
    canonical: 'https://atmf-argenteuil.org'
  }
};

export default function HomePage() {
  return (
    <>
      {/* Contenu SEO structuré invisible pour Google */}
      <div className="sr-only">
        <h1>PACE ATMF Argenteuil - Association ATMF Officielle Val d'Argent Sud</h1>
        <p>Association Travailleurs Maghrébins de France PACE ATMF Argenteuil depuis 1985. ATMF laïque, démocratique, solidaire, citoyenne et indépendante. Quartier Val d'Argent Sud, Argenteuil 95100.</p>
        <address>
          PACE ATMF Argenteuil<br/>
          26 Boulevard du Général Leclerc<br/>
          95100 Argenteuil<br/>
          Téléphone: 01.39.80.45.40<br/>
          Email: atmfargent@gmail.com
        </address>
        <p>Horaires ATMF Argenteuil: Lundi au vendredi 10h00-12h30, 14h30-19h30. Fermé weekends.</p>
        <p>ATMF réseau national: 20 associations ATMF membres dans toute la France. Siège ATMF Paris.</p>
        <p>Services ATMF Argenteuil: Solidarité internationale, Accompagnement scolaire collège lycée, Aide démarches administratives, Actions citoyennes, Lutte contre discriminations.</p>
      </div>

      {/* Contenu visible principal */}
      <div>
        <HeroSection />
        <AboutPreview />
        <TestimonialsSection />
        
        {/* Section SEO supplémentaire pour renforcer "ATMF Argenteuil" */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                PACE ATMF Argenteuil - Votre Association ATMF de Proximité
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">🏛️ ATMF Depuis 1985</h3>
                  <p className="text-gray-700">
                    L'Association PACE ATMF Argenteuil existe officiellement depuis octobre 1985. 
                    Nous sommes une association ATMF laïque, démocratique et indépendante, 
                    ancrée au cœur du quartier Val d'Argent Sud à Argenteuil.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">🌍 Réseau ATMF National</h3>
                  <p className="text-gray-700">
                    PACE ATMF Argenteuil est fière d'être affiliée au réseau national ATMF 
                    composé de 20 associations ATMF membres réparties dans toute la France, 
                    dont le siège se trouve à Paris.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">📍 ATMF Val d'Argent Sud</h3>
                  <p className="text-gray-700">
                    Notre association ATMF se situe au 26 Boulevard du Général Leclerc, 
                    95100 Argenteuil. Nous sommes ouverts du lundi au vendredi de 10h00 à 12h30 
                    et de 14h30 à 19h30.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-red-800">
                  Contactez PACE ATMF Argenteuil
                </h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <span>📞 01.39.80.45.40</span>
                  <span>✉️ atmfargent@gmail.com</span>
                  <span>🏠 26 Boulevard du Général Leclerc, 95100 Argenteuil</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}