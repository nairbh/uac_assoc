import EditArticleClient from './edit-article-client';

// Forcer le rendu dynamique pour cette page d'administration
export const dynamic = 'force-dynamic';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <EditArticleClient params={params} />;
} 