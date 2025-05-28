import { supabase } from '@/lib/supabase';

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  details?: string;
  image_url?: string;
  category: string;
  date: string;
  time_start: string;
  time_end?: string;
  location: string;
  max_participants?: number;
  current_participants: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  slug: string;
  description: string;
  details?: string;
  image_url?: string;
  category: string;
  date: string;
  time_start: string;
  time_end?: string;
  location: string;
  max_participants?: number | null;
  current_participants?: number;
  status?: string;
  created_by?: string | null;
}

export interface UpdateEventData {
  title?: string;
  slug?: string;
  description?: string;
  details?: string;
  image_url?: string;
  category?: string;
  date?: string;
  time_start?: string;
  time_end?: string;
  location?: string;
  max_participants?: number | null;
  status?: string;
  updated_at?: string;
}

const DEFAULT_EVENT_IMAGES = {
  'Institutionnel': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Services': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Éducation': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  'Religieux': 'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Culture': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
  'Solidarité': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'default': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

function getDefaultImageForCategory(category: string): string {
  return DEFAULT_EVENT_IMAGES[category as keyof typeof DEFAULT_EVENT_IMAGES] || DEFAULT_EVENT_IMAGES.default;
}

// Récupérer tous les événements
export async function getAllEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return [];
  }
}

// Récupérer les événements publiés
export async function getPublishedEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des événements publiés:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements publiés:', error);
    return [];
  }
}

// Récupérer un événement par ID
export async function getEventById(id: number): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de l\'événement:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    return null;
  }
}

// Récupérer un événement par slug
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de l\'événement:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    return null;
  }
}

// Créer un nouvel événement
export async function createEvent(eventData: CreateEventData): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        current_participants: eventData.current_participants || 0,
        status: eventData.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return false;
  }
}

// Mettre à jour un événement
export async function updateEvent(id: number, eventData: UpdateEventData): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la mise à jour de l\'événement:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    return false;
  }
}

// Supprimer un événement
export async function deleteEvent(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    return false;
  }
}

// Récupérer les événements par catégorie
export async function getEventsByCategory(category: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('date', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des événements par catégorie:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements par catégorie:', error);
    return [];
  }
}

// Récupérer les événements à venir
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('date', today)
      .order('date', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erreur lors de la récupération des événements à venir:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements à venir:', error);
    return [];
  }
}

// Récupérer les événements passés
export async function getPastEvents(limit?: number): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .lt('date', today)
      .order('date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erreur lors de la récupération des événements passés:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements passés:', error);
    return [];
  }
}

// Inscrire un utilisateur à un événement
export async function registerForEvent(eventId: number, userId: string): Promise<boolean> {
  try {
    // Vérifier si l'utilisateur n'est pas déjà inscrit
    const { data: existingRegistration } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    if (existingRegistration) {
      console.error('Utilisateur déjà inscrit à cet événement');
      return false;
    }

    // Vérifier la capacité de l'événement
    const event = await getEventById(eventId);
    if (!event) {
      console.error('Événement non trouvé');
      return false;
    }

    if (event.max_participants && event.current_participants >= event.max_participants) {
      console.error('Événement complet');
      return false;
    }

    // Inscrire l'utilisateur
    const { error: registrationError } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: userId,
        status: 'registered',
        registered_at: new Date().toISOString()
      }]);

    if (registrationError) {
      console.error('Erreur lors de l\'inscription:', registrationError);
      return false;
    }

    // Mettre à jour le nombre de participants
    const { error: updateError } = await supabase
      .from('events')
      .update({
        current_participants: event.current_participants + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId);

    if (updateError) {
      console.error('Erreur lors de la mise à jour du nombre de participants:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'inscription à l\'événement:', error);
    return false;
  }
}

// Désinscrire un utilisateur d'un événement
export async function unregisterFromEvent(eventId: number, userId: string): Promise<boolean> {
  try {
    // Supprimer l'inscription
    const { error: deleteError } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Erreur lors de la désinscription:', deleteError);
      return false;
    }

    // Mettre à jour le nombre de participants
    const event = await getEventById(eventId);
    if (event && event.current_participants > 0) {
      const { error: updateError } = await supabase
        .from('events')
        .update({
          current_participants: event.current_participants - 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId);

      if (updateError) {
        console.error('Erreur lors de la mise à jour du nombre de participants:', updateError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la désinscription de l\'événement:', error);
    return false;
  }
}

// Vérifier si un utilisateur est inscrit à un événement
export async function isUserRegistered(eventId: number, userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .eq('status', 'registered')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Erreur lors de la vérification de l\'inscription:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'inscription:', error);
    return false;
  }
}

export async function getUserEventRegistrations(userId: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from('event_registrations')
    .select(`
      events (*)
    `)
    .eq('user_id', userId)
    .eq('status', 'registered');

  if (error) {
    console.error('Error fetching user registrations:', error);
    return [];
  }

  // Extraire les événements de la structure imbriquée
  return data?.map((reg: any) => reg.events).filter(Boolean) || [];
} 