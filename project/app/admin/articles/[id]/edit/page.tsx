import EditArticleClient from './edit-article-client';
import { getAllArticles } from '@/lib/db/articles';

// Générer les paramètres statiques pour tous les articles existants
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles.map((article) => ({
      id: article.id.toString(),
    }));
  } catch (error) {
    console.error('Erreur lors de la génération des paramètres statiques:', error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <EditArticleClient params={params} />;
} 