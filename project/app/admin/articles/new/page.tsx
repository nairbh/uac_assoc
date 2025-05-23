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

export default function NewArticlePage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Ici, on simule un enregistrement d'article
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection vers la liste des articles
      router.push('/admin?tab=articles');
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
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
            onClick={() => router.push('/admin?tab=articles')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Nouvel article</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/admin?tab=articles')}>
            Annuler
          </Button>
          <Button 
            disabled={!title || isSubmitting} 
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
              <Label htmlFor="title">Titre de l'article</Label>
              <Input 
                id="title" 
                placeholder="Entrez le titre de votre article" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Contenu</Label>
              <Textarea 
                id="content" 
                placeholder="Écrivez votre article ici..." 
                className="min-h-[300px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                  value={status} 
                  onValueChange={setStatus}
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

              <div className="space-y-2">
                <Label htmlFor="author">Auteur</Label>
                <div className="flex items-center gap-2">
                  <Input value="Mohammed Cherif" disabled />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilité</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 ${status === 'published' ? 'border-primary bg-primary/10' : 'border-muted'}`}
                    onClick={() => setStatus('published')}
                  >
                    <CheckCircle2 className={`mb-2 h-6 w-6 ${status === 'published' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={status === 'published' ? 'font-medium text-primary' : 'text-muted-foreground'}>Public</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center rounded-md border-2 p-4 ${status === 'draft' ? 'border-primary bg-primary/10' : 'border-muted'}`}
                    onClick={() => setStatus('draft')}
                  >
                    <XCircle className={`mb-2 h-6 w-6 ${status === 'draft' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={status === 'draft' ? 'font-medium text-primary' : 'text-muted-foreground'}>Brouillon</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Image principale</CardTitle>
              <CardDescription>Ajouter une image à votre article</CardDescription>
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
                  <p className="text-sm text-muted-foreground mb-4">
                    Glissez-déposez votre image ici ou cliquez pour parcourir
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