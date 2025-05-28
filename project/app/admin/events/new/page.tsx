'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, Eye, Calendar, Clock, MapPin, Users, Upload, X } from 'lucide-react';
import { createEvent } from '@/lib/db/events';

const categories = [
  'Assemblée Générale',
  'Formation',
  'Conférence',
  'Événement culturel',
  'Action solidaire',
  'Réunion',
  'Célébration',
  'Autre'
];

const defaultImages = {
  'Assemblée Générale': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Formation': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  'Conférence': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Événement culturel': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
  'Action solidaire': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Réunion': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Célébration': 'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Autre': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

export default function NewEventPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    details: '',
    category: '',
    date: '',
    time_start: '',
    time_end: '',
    location: '',
    max_participants: '',
    image_url: '',
    status: 'draft'
  });

  // Gestion du drag & drop
  const [isDragging, setIsDragging] = useState(false);

  // Redirection si pas admin
  if (!isAdmin) {
    router.push('/');
    return null;
  }

  // Générer automatiquement le slug à partir du titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-') // Supprimer les tirets multiples
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  // Gestion du drag & drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Traiter le fichier directement
      processImageFile(file);
    }
  };

  // Fonction pour traiter un fichier image
  const processImageFile = (file: File) => {
    console.log('Fichier sélectionné:', file);
    
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier image valide",
          variant: "destructive",
        });
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }

      console.log('Fichier valide, création de l\'aperçu...');
      setImageFile(file);
      
      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('Aperçu créé:', result.substring(0, 50) + '...');
        setImagePreview(result);
        // Ne pas modifier formData.image_url ici, on garde l'aperçu séparé
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestion de l'upload d'image
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Supprimer l'image (fonction simplifiée)
  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    // Pas besoin de modifier formData.image_url, la logique d'affichage s'en charge
  };

  // Gestion de l'URL d'image manuelle
  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
    // Si une URL est saisie, supprimer l'image uploadée
    if (url && url.trim() !== '') {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.date || !formData.time_start || !formData.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Vérifier que l'heure de fin est après l'heure de début
    if (formData.time_end && formData.time_start >= formData.time_end) {
      toast({
        title: "Erreur",
        description: "L'heure de fin doit être après l'heure de début",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Déterminer quelle image utiliser : uploadée > URL saisie > par défaut
      const finalImageUrl = imagePreview || 
                           (formData.image_url && formData.image_url.trim() !== '' ? formData.image_url : null) ||
                           defaultImages[formData.category as keyof typeof defaultImages];

      const eventData = {
        ...formData,
        image_url: finalImageUrl,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        current_participants: 0,
        created_by: user?.id || null
      };

      console.log('Données événement à envoyer:', eventData);

      const success = await createEvent(eventData);
      
      if (success) {
        toast({
          title: "Succès",
          description: "Événement créé avec succès",
        });
        router.push('/admin?tab=events');
      } else {
        throw new Error('Erreur lors de la création');
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'événement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    // Ouvrir un aperçu dans un nouvel onglet
    const previewData = encodeURIComponent(JSON.stringify(formData));
    window.open(`/admin/events/preview?data=${previewData}`, '_blank');
  };

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
          <h1 className="text-3xl font-bold">Créer un événement</h1>
          <p className="text-muted-foreground">Organisez un nouvel événement pour l'association</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Détails principaux de l'événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Titre de l'événement"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="slug-de-l-evenement"
                  />
                  <p className="text-sm text-muted-foreground">
                    Généré automatiquement à partir du titre
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description courte de l'événement"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Détails complets</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="Informations détaillées sur l'événement (optionnel)"
                    rows={8}
                  />
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez utiliser du Markdown pour la mise en forme
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date, heure et lieu</CardTitle>
                <CardDescription>Informations pratiques de l'événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max_participants">Nombre max de participants</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="max_participants"
                        type="number"
                        min="1"
                        value={formData.max_participants}
                        onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
                        placeholder="Illimité"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time_start">Heure de début *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time_start"
                        type="time"
                        value={formData.time_start}
                        onChange={(e) => setFormData(prev => ({ ...prev, time_start: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_end">Heure de fin</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time_end"
                        type="time"
                        value={formData.time_end}
                        onChange={(e) => setFormData(prev => ({ ...prev, time_end: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Adresse ou lieu de l'événement"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Aperçu
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Création...' : 'Créer'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Catégorie et image</CardTitle>
                <CardDescription>Choisissez une catégorie et personnalisez l'image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Catégorie */}
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                    required
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

                {/* Section Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Image de l'événement</Label>
                    <div className="text-xs text-muted-foreground">
                      {imagePreview ? 'Image personnalisée' : formData.category ? 'Image par défaut' : 'Sélectionnez une catégorie'}
                    </div>
                  </div>

                  {/* Aperçu de l'image actuelle */}
                  <div className="relative">
                    <div className="aspect-video w-full rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 overflow-hidden">
                      {imagePreview ? (
                        // Image uploadée par l'utilisateur
                        <img
                          src={imagePreview}
                          alt="Aperçu de l'événement"
                          className="w-full h-full object-cover"
                        />
                      ) : formData.category ? (
                        // Image par défaut de la catégorie
                        <img
                          src={defaultImages[formData.category as keyof typeof defaultImages]}
                          alt={`Image par défaut - ${formData.category}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Erreur de chargement d\'image par défaut, fallback');
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                          }}
                        />
                      ) : (
                        // Aucune catégorie sélectionnée
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Sélectionnez d'abord une catégorie
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Options d'image */}
                  {formData.category && (
                    <div className="space-y-4">
                      {/* Upload personnalisé */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <Label className="text-sm font-medium">
                            {imagePreview ? 'Remplacer l\'image personnalisée' : 'Ajouter une image personnalisée'}
                          </Label>
                        </div>
                        
                        <div className="pl-4 space-y-3">
                          {/* Zone d'upload */}
                          <div 
                            className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                              isDragging 
                                ? 'border-primary bg-primary/5' 
                                : 'border-primary/25 hover:border-primary/50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1 text-center sm:text-left">
                                <div 
                                  className="cursor-pointer"
                                  onClick={() => document.getElementById('image-upload')?.click()}
                                >
                                  <span className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                                    {isDragging ? 'Déposez votre image ici' : 'Cliquez pour télécharger une image'}
                                  </span>
                                  <span className="block text-xs text-muted-foreground mt-1">
                                    {isDragging ? 'Relâchez pour uploader' : 'PNG, JPG, GIF • Max 5MB • Recommandé : 1200x630px'}
                                  </span>
                                </div>
                              </div>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => document.getElementById('image-upload')?.click()}
                              >
                                {imagePreview ? 'Changer' : 'Parcourir'}
                              </Button>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>

                          {/* URL manuelle */}
                          <div className="space-y-2">
                            <Label htmlFor="image_url" className="text-xs text-muted-foreground">
                              Ou collez l'URL d'une image
                            </Label>
                            <Input
                              id="image_url"
                              value={formData.image_url}
                              onChange={(e) => handleImageUrlChange(e.target.value)}
                              placeholder="https://exemple.com/image.jpg"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Indication image par défaut */}
                      {!imagePreview && (
                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={defaultImages[formData.category as keyof typeof defaultImages]}
                                alt={`Image par défaut - ${formData.category}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                Image par défaut utilisée
                              </p>
                              <p className="text-xs text-blue-700 dark:text-blue-300">
                                Catégorie : {formData.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Conseils */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">📅</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Conseils pour une image d'événement
                        </p>
                        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Utilisez des images qui reflètent l'ambiance de l'événement</li>
                          <li>• Évitez les images trop chargées en texte</li>
                          <li>• Privilégiez les photos de qualité et bien éclairées</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Conseils :</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Soyez précis dans la description</li>
                  <li>Indiquez clairement le lieu et l'heure</li>
                  <li>Mentionnez les prérequis si nécessaire</li>
                  <li>Ajoutez des détails sur l'inscription</li>
                </ul>
                <p className="mt-4"><strong>Markdown supporté dans les détails :</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>**Gras** pour le texte en gras</li>
                  <li>*Italique* pour le texte en italique</li>
                  <li># Titre pour les titres</li>
                  <li>- Liste pour les listes à puces</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 