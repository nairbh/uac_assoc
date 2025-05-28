import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { getArticleById, getArticles } from '@/lib/db/articles';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

// Fonction pour formater le contenu avec des paragraphes
function formatContent(content: string) {
  return content.split('\n\n').map((paragraph, index) => {
    // Gérer les titres en gras (markdown-style)
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return (
        <h3 key={index} className="text-xl font-semibold mt-8 mb-4 text-primary">
          {paragraph.slice(2, -2)}
        </h3>
      );
    }
    
    // Gérer les listes
    if (paragraph.includes('- ')) {
      const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
      const beforeList = paragraph.split('\n').find(line => !line.trim().startsWith('- '));
      
      return (
        <div key={index} className="my-6">
          {beforeList && <p className="mb-4">{beforeList}</p>}
          <ul className="list-disc list-inside space-y-2 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Paragraphe normal
    return (
      <p key={index} className="mb-6 leading-relaxed">
        {paragraph}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(parseInt(params.id));
  
  if (!article) {
    notFound();
  }

  const publishedDate = article.published_at ? new Date(article.published_at) : new Date(article.created_at);
  const readingTime = Math.ceil(article.content.length / 1000); // Estimation du temps de lecture

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux actualités
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Image principale */}
          <div className="aspect-video relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={article.image_url || "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <Badge className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm">
              {article.category}
            </Badge>
          </div>

          {/* En-tête de l'article */}
          <div className="space-y-6 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {publishedDate.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min de lecture</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>ATMF Argenteuil</span>
              </div>

              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Contenu de l'article */}
          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed space-y-6">
              {formatContent(article.content)}
            </div>
          </div>

          {/* Pied de l'article */}
          <div className="mt-12 pt-8 border-t">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">À propos de l'ATMF Argenteuil</h3>
              <p className="text-muted-foreground">
                L'Association des Travailleurs Maghrébins de France (ATMF) Argenteuil œuvre depuis 1985 
                pour la défense des droits des immigrés et la promotion d'une citoyenneté active. 
                Nous accompagnons les familles dans leurs démarches administratives, proposons des cours 
                de français et organisons des événements culturels et solidaires.
              </p>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/news">Plus d'actualités</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 