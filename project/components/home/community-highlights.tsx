import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    author: {
      name: "Karim Bensouna",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      role: "Membre"
    },
    content: "Très fier d'avoir représenté notre association lors du forum des associations à Lyon ce week-end. Nous avons rencontré beaucoup de personnes intéressées par nos actions !",
    likes: 24,
    comments: 5,
    time: "Il y a 2 jours"
  },
  {
    id: 2,
    author: {
      name: "Amina Hadj",
      image: "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      role: "Bénévole"
    },
    content: "Je cherche des volontaires pour la distribution de repas qui aura lieu ce samedi à Marseille. Si vous êtes disponibles, merci de me contacter en MP !",
    likes: 18,
    comments: 12,
    time: "Il y a 3 jours"
  },
  {
    id: 3,
    author: {
      name: "Marie D.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      date: "28 Nov 2023",
      content: "Je viens de recevoir mon reçu fiscal. Merci à l'ATMF Argenteuil pour votre professionnalisme et pour toutes vos actions pour notre communauté !",
    },
    likes: 32,
    comments: 3,
    time: "Il y a 5 jours"
  }
];

export function CommunityHighlights() {
  return (
    <section className="container py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Notre communauté</h2>
          <p className="text-muted-foreground">
            Rejoignez les discussions et partagez avec les membres de notre association
          </p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/community">
            Voir tous les posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityPosts.map(post => (
          <Card key={post.id} className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar>
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-semibold">{post.author.name}</div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                    {post.author.role}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full text-sm">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <div className="inline-block rounded-lg border bg-card px-8 py-6 shadow-sm">
          <h3 className="mb-3 text-xl font-semibold">Rejoignez notre communauté</h3>
          <p className="text-muted-foreground mb-4">
            Créez un compte pour participer aux discussions et rester informé de nos activités.
          </p>
          <Button size="lg" asChild>
            <Link href="/signin">
              Créer un compte
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}