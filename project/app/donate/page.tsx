import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonationForm } from '@/components/donation/donation-form';

export default function DonatePage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="space-y-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Faire un don</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Soutenez nos actions en faisant un don. Chaque contribution nous aide à accomplir notre mission
          auprès de la communauté algérienne en France.
        </p>
      </div>
      
      <Tabs defaultValue="onetime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="onetime">Don ponctuel</TabsTrigger>
          <TabsTrigger value="monthly">Don mensuel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="onetime">
          <DonationForm type="onetime" />
        </TabsContent>
        
        <TabsContent value="monthly">
          <DonationForm type="monthly" />
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transparence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Nous nous engageons à la transparence totale sur l'utilisation de vos dons.
              Un rapport annuel est publié et envoyé à tous nos donateurs.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Déduction fiscale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vos dons sont déductibles des impôts à hauteur de 66% dans la limite de 20% de votre revenu imposable.
              Un reçu fiscal vous sera envoyé.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vos paiements sont entièrement sécurisés. Nous utilisons Stripe, leader mondial du paiement en ligne sécurisé.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}