import { createClient } from '@supabase/supabase-js';

// Les URL et clés Supabase devraient idéalement venir des variables d'environnement
// Pour simplifier le développement et les tests, nous les codons en dur ici
const supabaseUrl = 'https://loigcranltagacxbmzez.supabase.co';

// IMPORTANT: Remplacez cette clé par votre propre clé anon (publique) de Supabase
// Trouvez-la dans votre tableau de bord Supabase sous Settings > API > Project API keys
// Copiez la clé "anon public" (PAS la clé service_role qui est privée)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvaWdjcmFubHRhZ2FjeGJtemV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTYwODgsImV4cCI6MjA2Mjk5MjA4OH0.si3HVut75HHbsWtJJ8fH3gI88NaF7ppR0UX9HUZYivs';

export const supabase = createClient(supabaseUrl, supabaseKey); 