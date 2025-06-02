import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Users,
  Calendar
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contactez-nous</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          L'Association des Travailleurs Maghrébins de France - Section d'Argenteuil est à votre écoute.
          N'hésitez pas à nous contacter par les moyens ci-dessous.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <Card className="p-6 bg-gradient-to-br from-red-50 to-green-50 border-red-200">
            <h2 className="text-2xl font-bold mb-6 text-center">🤝 Comment nous joindre</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">📞 Appelez-nous</h3>
                  <p className="text-muted-foreground mb-2">
                    Pour toute question ou information :
                  </p>
                  <a 
                    href="tel:0139804540" 
                    className="text-xl font-bold text-red-600 hover:underline"
                  >
                    01.39.80.45.40
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">📧 Écrivez-nous</h3>
                  <p className="text-muted-foreground mb-2">
                    Envoyez-nous un email à :
                  </p>
                  <a
                    href="mailto:atmfargent@gmail.com"
                    className="text-xl font-bold text-green-600 hover:underline"
                  >
                    atmfargent@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">🏢 Rendez-nous visite</h3>
                  <p className="text-muted-foreground mb-2">
                    Notre siège social :
                  </p>
                  <address className="not-italic font-semibold text-blue-600">
                    26 Boulevard du Général Leclerc<br />
                    95100 Argenteuil
                  </address>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">📅 Nos services</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-red-600" />
                <span>Accueil et accompagnement social</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span>Lutte contre les discriminations</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Événements culturels et éducatifs</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">📍 Informations pratiques</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horaires d'ouverture</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p><strong>Lundi au vendredi :</strong></p>
                    <p>10:00 - 12:30</p>
                    <p>14:30 - 19:30</p>
                    <p className="text-red-600 font-medium mt-2">Fermé les weekends</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Conseil</h4>
                <p className="text-yellow-700 text-sm">
                  Nous vous recommandons d'appeler avant de vous déplacer pour vous assurer de notre disponibilité.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">📱 Suivez-nous</h2>
            <p className="text-muted-foreground mb-4">
              Restez informé de nos actualités et événements :
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="outline" className="hover:bg-blue-50">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-blue-50">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-pink-50">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-red-50">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </Card>
          
          <div className="aspect-[16/10] w-full rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.9033345158473!2d2.2488978!3d48.9424356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6674c38b064e3%3A0xda0778de77e59ccf!2s26%20Bd%20du%20G%C3%A9n%C3%A9ral%20Leclerc%2C%2095100%20Argenteuil!5e0!3m2!1sfr!2sfr!4v1660000000000!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation ATMF Argenteuil"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}