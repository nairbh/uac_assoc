import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for news
const latestNews = [
  {
    id: 1,
    title: "Succès de notre collecte pour les enfants défavorisés",
    excerpt: "Grâce à vos dons et à l'engagement de nos bénévoles, nous avons pu distribuer des fournitures scolaires à plus de 200 enfants pour la rentrée.",
    date: "12 avril 2025",
    category: "Solidarité",
    image: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Nouvelle convention avec l'ambassade d'Algérie",
    excerpt: "Une convention a été signée entre notre association et l'ambassade d'Algérie pour faciliter les démarches administratives des Algériens en France.",
    date: "28 mars 2025",
    category: "Partenariat",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Symposium sur l'entrepreneuriat algérien en France",
    excerpt: "Retour sur notre symposium qui a réuni plus de 50 entrepreneurs algériens établis en France pour échanger sur les opportunités et défis.",
    date: "15 mars 2025",
    category: "Économie",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export function NewsPreview() {
  return (
    <section className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Actualités</h2>
          <p className="text-muted-foreground">
            Les dernières nouvelles et réalisations de notre association
          </p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/news">
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map(news => (
          <Card key={news.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4">
                {news.category}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {news.date}
              </div>
              <CardTitle className="line-clamp-2">{news.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {news.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/news/${news.id}`}>
                  Lire la suite
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}