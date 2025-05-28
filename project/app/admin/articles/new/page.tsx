'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Save, 
  Image, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { createArticle } from '@/lib/db/articles';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const CATEGORIES = [
  'Institutionnel',
  'Partenariat', 
  'Droits',
  'Culture',
  'Services',
  'Solidarité'
];

export default function NewArticlePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    image_url: '',
    status: 'draft' as 'draft' | 'published'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image_url: '' }));
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const slug = generateSlug(formData.title);
      const articleData = {
        ...formData,
        slug,
        author_id: user?.id,
        published_at: formData.status === 'published' ? new Date().toISOString() : undefined
      };

      const result = await createArticle(articleData);
      
      if (result) {
        toast.success('Article créé avec succès');
        router.push('/admin/articles');
      } else {
        toast.error('Erreur lors de la création de l\'article');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      toast.error('Erreur lors de la création de l\'article');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/admin/articles')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Nouvel article</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/articles')}>
            Annuler
          </Button>
          <Button 
            disabled={!formData.title || !formData.content || !formData.category || isSubmitting} 
            onClick={handleSubmit}
          >
            <Save className="mr-2 h-4 w-4" /> 
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contenu de l'article</CardTitle>
            <CardDescription>Créez votre article avec le titre et le contenu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'article *</Label>
              <Input 
                id="title" 
                placeholder="Entrez le titre de votre article" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Choisissez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Résumé</Label>
              <Textarea 
                id="excerpt" 
                placeholder="Résumé de l'article (optionnel)" 
                className="min-h-[80px]"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Contenu *</Label>
              <Textarea 
                id="content" 
                placeholder="Écrivez votre article ici..." 
                className="min-h-[300px]"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                required
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
              <CardDescription>Paramètres de publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Choisissez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date de publication</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilité</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 ${formData.status === 'published' ? 'border-primary bg-primary/10' : 'border-muted'}`}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                  >
                    <CheckCircle2 className={`mb-2 h-6 w-6 ${formData.status === 'published' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={formData.status === 'published' ? 'font-medium text-primary' : 'text-muted-foreground'}>Public</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 ${formData.status === 'draft' ? 'border-primary bg-primary/10' : 'border-muted'}`}
                    onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                  >
                    <XCircle className={`mb-2 h-6 w-6 ${formData.status === 'draft' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={formData.status === 'draft' ? 'font-medium text-primary' : 'text-muted-foreground'}>Brouillon</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Image principale</CardTitle>
              <CardDescription>
                Ajouter une image à votre article. Si aucune image n'est fournie, une image par défaut sera utilisée selon la catégorie.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative aspect-video rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Aperçu de l'image" 
                    className="object-cover w-full h-full"
                  />
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8" 
                    onClick={removeImage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                  <Image className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Glissez-déposez votre image ici ou cliquez pour parcourir
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Une image par défaut sera utilisée si aucune image n'est fournie
                  </p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Label htmlFor="image" asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Parcourir
                    </Button>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
} 