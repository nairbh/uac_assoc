'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Type pour le profil utilisateur
interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Récupérer l'utilisateur et son profil
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      // Récupérer la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (session) {
        // Mettre à jour l'utilisateur
        setUser(session.user);

        // Récupérer le profil
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        if (profileData) {
          setProfile(profileData as Profile);
        }
      } else {
        setUser(null);
        setProfile(null);
      }

      setError(null);
    } catch (err: any) {
      console.error("Erreur d'authentification:", err);
      setError(err.message || "Erreur d'authentification");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialisation et configuration des abonnements aux changements d'auth
  useEffect(() => {
    fetchUser();

    // S'abonner aux changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user);
        await fetchUser(); // Récupérer le profil également
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    // Nettoyer l'abonnement
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fonction pour se connecter
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      await fetchUser();
      return { success: true };
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(err.message || "Erreur de connexion");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour s'inscrire
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) throw error;

      return { success: true };
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      setError(err.message || "Erreur d'inscription");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour se déconnecter
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      return { success: true };
    } catch (err: any) {
      console.error("Erreur de déconnexion:", err);
      setError(err.message || "Erreur de déconnexion");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier si l'utilisateur a le rôle admin
  const isAdmin = profile?.role === 'admin';

  return {
    user,
    profile,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };
} 