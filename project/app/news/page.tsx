import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar,
  Search,
  Filter,
  ArrowRight,
  User,
  ArrowLeft,
} from 'lucide-react';

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "Succès de notre collecte pour les enfants défavorisés",
    excerpt: "Grâce à vos dons et à l'engagement de nos bénévoles, nous avons pu distribuer des fournitures scolaires à plus de 200 enfants pour la rentrée.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "12 avril 2025",
    author: "Karima Hamidi",
    authorRole: "Responsable Solidarité",
    category: "Solidarité",
    image: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Nouvelle convention avec l'ambassade d'Algérie",
    excerpt: "Une convention a été signée entre notre association et l'ambassade d'Algérie pour faciliter les démarches administratives des Algériens en France.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "28 mars 2025",
    author: "Mohammed Benali",
    authorRole: "Président",
    category: "Partenariat",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Symposium sur l'entrepreneuriat algérien en France",
    excerpt: "Retour sur notre symposium qui a réuni plus de 50 entrepreneurs algériens établis en France pour échanger sur les opportunités et défis.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "15 mars 2025",
    author: "Samira Khaldi",
    authorRole: "Chargée des Relations Professionnelles",
    category: "Économie",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    title: "Concours de poésie : célébrons la culture algérienne",
    excerpt: "Lancement de notre concours annuel de poésie pour mettre en valeur le patrimoine culturel algérien. Participez nombreux !",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "3 mars 2025",
    author: "Fatima Chaouche",
    authorRole: "Responsable Culturel",
    category: "Culture",
    image: "https://images.pexels.com/photos/3059750/pexels-photo-3059750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    title: "Rencontre avec le consul général d'Algérie à Paris",
    excerpt: "Le bureau de l'ATMF Argenteuil a été reçu par le consul général pour discuter des préoccupations de la communauté maghrébine en France.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "20 février 2025",
    author: "Mohammed Benali",
    authorRole: "Président",
    category: "Institutionnel",
    image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 6,
    title: "Bilan de notre campagne d'aide aux sinistrés des inondations",
    excerpt: "Compte-rendu de notre action humanitaire pour venir en aide aux victimes des récentes inondations dans le nord de l'Algérie.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
    date: "5 février 2025",
    author: "Karim Boumediene",
    authorRole: "Coordinateur Actions Humanitaires",
    category: "Solidarité",
    image: "https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export default function NewsPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Actualités</h1>
        <p className="text-lg text-muted-foreground">
          Suivez les dernières nouvelles et activités de l'ATMF Argenteuil
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un article..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="solidarity">Solidarité</SelectItem>
              <SelectItem value="partnership">Partenariat</SelectItem>
              <SelectItem value="economy">Économie</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="institutional">Institutionnel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {newsArticles.map(article => (
          <Card key={article.id} className="overflow-hidden h-full flex flex-col">
            <div className="aspect-video relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4">
                {article.category}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
                <span className="text-xs bg-muted py-0.5 px-1.5 rounded-full">{article.authorRole}</span>
              </div>
              <p className="text-muted-foreground line-clamp-3 mt-2">
                {article.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/news/${article.id}`}>
                  Lire la suite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-16 py-8 border-t">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold">Abonnez-vous à notre newsletter</h2>
          <p className="text-muted-foreground">
            Recevez nos actualités et annonces directement dans votre boîte mail.
            Restez informé des activités de l'association.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input placeholder="Votre email" type="email" />
            <Button>S'abonner</Button>
          </div>
        </div>
      </div>
    </div>
  );
}