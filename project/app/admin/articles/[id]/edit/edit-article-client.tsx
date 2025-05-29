'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { Article, getArticleById, updateArticle } from '@/lib/db/articles';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  'Institutionnel',
  'Partenariat', 
  'Droits',
  'Culture',
  'Services',
  'Solidarité'
];

const defaultImages = {
  'Institutionnel': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
  'Partenariat': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Droits': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Culture': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  'Services': 'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Solidarité': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
};

interface EditArticleClientProps {
  params: { id: string };
}

export default function EditArticleClient({ params }: EditArticleClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const { toast } = useToast();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    loadArticle();
  }, [params.id]);

  const loadArticle = async () => {
    try {
      const data = await getArticleById(parseInt(params.id));
      if (data) {
        setArticle(data);
        setImagePreview(data.image_url || '');
      } else {
        toast({
          title: "Erreur",
          description: "Article non trouvé",
          variant: "destructive",
        });
        router.push('/admin?tab=articles');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'article:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement de l'article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    if (!article.title || !article.content || !article.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const updatedData = {
        ...article,
        slug: generateSlug(article.title),
        image_url: imagePreview || defaultImages[article.category as keyof typeof defaultImages],
        updated_at: new Date().toISOString(),
        published_at: article.status === 'published' && !article.published_at 
          ? new Date().toISOString() 
          : article.published_at
      };

      const result = await updateArticle(article.id, updatedData);
      
      if (result) {
        toast({
          title: "Succès",
          description: "Article mis à jour avec succès",
        });
        router.push('/admin?tab=articles');
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'article",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    if (article) {
      setArticle({ ...article, image_url: url });
    }
  };

  const removeImage = () => {
    setImagePreview('');
    if (article) {
      setArticle({ ...article, image_url: '' });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement de l'article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Button onClick={() => router.push('/admin?tab=articles')}>
            Retour aux articles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Modifier l'article</h1>
          <p className="text-muted-foreground">Modifiez les informations de l'article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu de l'article</CardTitle>
                <CardDescription>Informations principales de l'article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    placeholder="Titre de l'article"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Résumé</Label>
                  <Textarea
                    id="excerpt"
                    value={article.excerpt || ''}
                    onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                    placeholder="Résumé de l'article (optionnel)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea
                    id="content"
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    placeholder="Contenu complet de l'article"
                    rows={15}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle>Image de l'article</CardTitle>
                <CardDescription>Image qui sera affichée avec l'article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de l'image</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={article.image_url || ''}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>

                {imagePreview && (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="w-full h-48 object-cover rounded-lg"
                      onError={() => setImagePreview('')}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {!imagePreview && article.category && (
                  <div className="text-sm text-muted-foreground">
                    Si aucune image n'est fournie, l'image par défaut de la catégorie "{article.category}" sera utilisée.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
                <CardDescription>Paramètres de publication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut *</Label>
                  <Select
                    value={article.status}
                    onValueChange={(value) => setArticle({ ...article, status: value as 'draft' | 'published' | 'archived' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={article.category}
                    onValueChange={(value) => setArticle({ ...article, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {article.published_at && (
                  <div className="text-sm text-muted-foreground">
                    Publié le : {new Date(article.published_at).toLocaleDateString('fr-FR')}
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  Créé le : {new Date(article.created_at).toLocaleDateString('fr-FR')}
                </div>

                <div className="text-sm text-muted-foreground">
                  Modifié le : {new Date(article.updated_at).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`/news/${article.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 