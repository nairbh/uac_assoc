import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import type { Metadata } from 'next';

// MÉTADONNÉES SEO ULTRA-OPTIMISÉES pour la page d'accueil ATMF
export const metadata: Metadata = {
  title: 'ATMF Argenteuil | PACE ATMF - Association ATMF Officielle 95100 depuis 1985',
  description: 'ATMF Argenteuil : PACE ATMF, Association ATMF officielle à Argenteuil 95100 depuis 1985. ATMF laïque, démocratique, solidaire. ATMF Val d\'Argent Sud. Réseau ATMF France. Contact ATMF : 01.39.80.45.40',
  keywords: 'ATMF, ATMF Argenteuil, PACE ATMF, Association ATMF, ATMF 95100, ATMF officielle, ATMF Val d\'Argent Sud, ATMF laïque, ATMF démocratique, ATMF solidaire, ATMF Île-de-France, réseau ATMF France, ATMF Boulevard Général Leclerc, Association Travailleurs Maghrébins France',
  
  openGraph: {
    title: 'ATMF Argenteuil | PACE ATMF - Association ATMF Officielle depuis 1985',
    description: 'ATMF Argenteuil : PACE ATMF, association ATMF officielle depuis 1985. ATMF laïque, démocratique et solidaire. ATMF Val d\'Argent Sud 95100. Réseau ATMF France.',
    url: 'https://atmf-argenteuil.org',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'ATMF Argenteuil - PACE ATMF Association ATMF Officielle'
      }
    ]
  },
  
  twitter: {
    title: 'ATMF Argenteuil - PACE ATMF Association ATMF Officielle',
    description: 'ATMF Argenteuil : PACE ATMF depuis 1985. Association ATMF laïque et démocratique. ATMF Val d\'Argent Sud.'
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
        <h1>ATMF Argenteuil - PACE ATMF Association ATMF Officielle Val d'Argent Sud</h1>
        <h2>ATMF : Association Travailleurs Maghrébins de France</h2>
        <p>ATMF Argenteuil : PACE ATMF, Association ATMF officielle depuis 1985. ATMF laïque, démocratique, solidaire, citoyenne et indépendante. ATMF quartier Val d'Argent Sud, Argenteuil 95100.</p>
        <p>PACE ATMF Argenteuil fait partie du réseau national ATMF France composé de 20 associations ATMF réparties dans toute la France.</p>
        
        <h3>Contact ATMF Argenteuil</h3>
        <address>
          ATMF Argenteuil - PACE ATMF<br/>
          Association ATMF Val d'Argent Sud<br/>
          26 Boulevard du Général Leclerc<br/>
          95100 Argenteuil<br/>
          Téléphone ATMF: 01.39.80.45.40<br/>
          Email ATMF: atmfargent@gmail.com
        </address>
        
        <h3>Horaires ATMF Argenteuil</h3>
        <p>ATMF Argenteuil ouvert du lundi au vendredi 10h00-12h30 et 14h30-19h30. ATMF fermé weekends et jours fériés.</p>
        
        <h3>Services ATMF Argenteuil</h3>
        <ul>
          <li>ATMF solidarité internationale</li>
          <li>ATMF accompagnement scolaire collège lycée</li>
          <li>ATMF aide démarches administratives</li>
          <li>ATMF actions citoyennes</li>
          <li>ATMF lutte contre discriminations</li>
          <li>ATMF formation français langue étrangère</li>
          <li>ATMF permanences juridiques</li>
        </ul>
        
        <h3>Histoire ATMF Argenteuil</h3>
        <p>L'association ATMF Argenteuil (PACE ATMF) a été créée en octobre 1985. ATMF Argenteuil est une association laïque, démocratique et indépendante qui œuvre pour la solidarité et contre les discriminations.</p>
        
        <h3>Réseau ATMF France</h3>
        <p>ATMF réseau national : 20 associations ATMF membres dans toute la France. Siège ATMF national à Paris. ATMF Île-de-France : plusieurs associations ATMF en région parisienne.</p>
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
                ATMF Argenteuil - PACE ATMF : Votre Association ATMF de Proximité
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                L'association ATMF Argenteuil (PACE ATMF) vous accueille depuis 1985 au cœur du quartier Val d'Argent Sud. 
                Notre association ATMF laïque et démocratique fait partie du réseau national ATMF France.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">🏛️ ATMF Depuis 1985</h3>
                  <p className="text-gray-700">
                    L'Association ATMF Argenteuil (PACE ATMF) existe officiellement depuis octobre 1985. 
                    Notre association ATMF est laïque, démocratique et indépendante, 
                    solidement ancrée au cœur du quartier Val d'Argent Sud à Argenteuil 95100.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">🌍 Réseau ATMF National</h3>
                  <p className="text-gray-700">
                    ATMF Argenteuil (PACE ATMF) est fière d'être affiliée au réseau national ATMF 
                    composé de 20 associations ATMF membres réparties dans toute la France. 
                    Le siège du réseau ATMF France se trouve à Paris.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-red-600">📍 ATMF Val d'Argent Sud</h3>
                  <p className="text-gray-700">
                    Notre association ATMF Argenteuil se situe au 26 Boulevard du Général Leclerc, 
                    95100 Argenteuil. ATMF Argenteuil est ouverte du lundi au vendredi de 10h00 à 12h30 
                    et de 14h30 à 19h30. ATMF fermée weekends.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-red-800">
                  Contactez ATMF Argenteuil - PACE ATMF
                </h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <span>📞 ATMF : 01.39.80.45.40</span>
                  <span>✉️ ATMF : atmfargent@gmail.com</span>
                  <span>🏠 ATMF : 26 Boulevard du Général Leclerc, 95100 Argenteuil</span>
                </div>
                <p className="text-xs text-gray-600 mt-4">
                  ATMF Argenteuil - PACE ATMF - Association ATMF laïque et démocratique - Membre réseau ATMF France
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}