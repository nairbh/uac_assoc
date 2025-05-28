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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar,
  Search,
  Filter,
  ArrowRight,
  User,
  ArrowLeft,
} from 'lucide-react';
import { getArticles } from '@/lib/db/articles';

export default async function NewsPage() {
  const articles = await getArticles();

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
              <SelectItem value="Institutionnel">Institutionnel</SelectItem>
              <SelectItem value="Partenariat">Partenariat</SelectItem>
              <SelectItem value="Droits">Droits</SelectItem>
              <SelectItem value="Culture">Culture</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Solidarité">Solidarité</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {articles.map(article => (
          <Card key={article.id} className="overflow-hidden h-full flex flex-col">
            <div className="aspect-video relative">
              <img 
                src={article.image_url || "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
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
                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>ATMF Argenteuil</span>
                <span className="text-xs bg-muted py-0.5 px-1.5 rounded-full">{article.status}</span>
              </div>
              <p className="text-muted-foreground line-clamp-3 mt-2">
                {article.excerpt || article.content.substring(0, 150) + '...'}
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

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Revenez bientôt pour découvrir nos actualités !
          </p>
        </div>
      )}
      
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