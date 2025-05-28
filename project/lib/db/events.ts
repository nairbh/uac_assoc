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
  time_end: string;
  location: string;
  max_participants?: number;
  current_participants: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  created_by?: string;
  created_at: string;
  updated_at: string;
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

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

export async function getEventById(id: number): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
}

export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all events:', error);
    return [];
  }

  return data || [];
}

export async function createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'current_participants'>): Promise<Event | null> {
  // Si pas d'image fournie, utiliser l'image par défaut de la catégorie
  const finalEventData = {
    ...eventData,
    image_url: eventData.image_url || getDefaultImageForCategory(eventData.category),
    current_participants: 0
  };
  
  const { data, error } = await supabase
    .from('events')
    .insert([finalEventData])
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return null;
  }

  return data;
}

export async function updateEvent(id: number, eventData: Partial<Event>): Promise<Event | null> {
  // Si l'image est supprimée, utiliser l'image par défaut
  if (eventData.image_url === '' && eventData.category) {
    eventData.image_url = getDefaultImageForCategory(eventData.category);
  }
  
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return null;
  }

  return data;
}

export async function deleteEvent(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }

  return true;
}

export async function registerForEvent(eventId: number, userId: string): Promise<boolean> {
  // Vérifier si l'utilisateur est déjà inscrit
  const { data: existingRegistration } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .single();

  if (existingRegistration) {
    console.error('User already registered for this event');
    return false;
  }

  // Vérifier la capacité de l'événement
  const event = await getEventById(eventId);
  if (!event) {
    console.error('Event not found');
    return false;
  }

  if (event.max_participants && event.current_participants >= event.max_participants) {
    console.error('Event is full');
    return false;
  }

  // Créer l'inscription
  const { error: registrationError } = await supabase
    .from('event_registrations')
    .insert([{
      event_id: eventId,
      user_id: userId,
      status: 'registered'
    }]);

  if (registrationError) {
    console.error('Error creating registration:', registrationError);
    return false;
  }

  // Mettre à jour le nombre de participants
  const { error: updateError } = await supabase
    .from('events')
    .update({ 
      current_participants: event.current_participants + 1 
    })
    .eq('id', eventId);

  if (updateError) {
    console.error('Error updating participant count:', updateError);
    return false;
  }

  return true;
}

export async function unregisterFromEvent(eventId: number, userId: string): Promise<boolean> {
  // Supprimer l'inscription
  const { error: deleteError } = await supabase
    .from('event_registrations')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', userId);

  if (deleteError) {
    console.error('Error deleting registration:', deleteError);
    return false;
  }

  // Mettre à jour le nombre de participants
  const event = await getEventById(eventId);
  if (event && event.current_participants > 0) {
    const { error: updateError } = await supabase
      .from('events')
      .update({ 
        current_participants: event.current_participants - 1 
      })
      .eq('id', eventId);

    if (updateError) {
      console.error('Error updating participant count:', updateError);
      return false;
    }
  }

  return true;
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