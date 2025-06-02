import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ContactForm } from '@/components/contact/contact-form';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Besoin d'informations ? Une question ? N'hésitez pas à nous contacter.
          Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <ContactForm />
          
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Suivez-nous</h2>
            <div className="flex gap-4">
              <Button size="icon" variant="outline">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">📍 Adresse</h3>
                  <p className="text-muted-foreground">
                    26 Boulevard du Général Leclerc<br />
                    95 100 Argenteuil
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">📞 Téléphone</h3>
                  <p className="text-muted-foreground">
                    01.39.80.45.40
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">📧 Email</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:atmfargent@gmail.com"
                      className="text-red-600 hover:underline"
                    >
                      atmfargent@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horaires</h3>
                  <p className="text-muted-foreground">
                    Lundi au vendredi: 10:00–12:30, 14:30–19:30<br />
                    Fermé les weekends
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="aspect-[16/10] w-full rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.9033345158473!2d2.2488978!3d48.9424356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6674c38b064e3%3A0xda0778de77e59ccf!2s26%20Bd%20du%20G%C3%A9n%C3%A9ral%20Leclerc%2C%2095100%20Argenteuil!5e0!3m2!1sfr!2sfr!4v1660000000000!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}