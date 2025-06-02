import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Vérification de la présence des variables d'environnement
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Variables d\'environnement Supabase manquantes. Vérifiez que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies dans votre fichier .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey); 