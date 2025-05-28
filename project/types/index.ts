export type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: number;
  title: string;
  slug: string;
  description: string;
  details: string | null;
  image_url: string | null;
  category: string;
  date: string;
  time_start: string;
  time_end: string;
  location: string;
  max_participants: number | null;
  current_participants: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type EventRegistration = {
  id: number;
  event_id: number;
  user_id: string;
  status: 'registered' | 'cancelled' | 'attended';
  registered_at: string;
}; 