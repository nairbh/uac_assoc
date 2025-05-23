'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'member' | 'editor';
};

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthContextType = AuthState & {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const initialState: AuthState = {
  session: null,
  user: null,
  profile: null,
  isAdmin: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Initialiser l'état d'authentification
    const initializeAuth = async () => {
      try {
        // Récupérer la session actuelle
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Si on a un utilisateur connecté, récupérer son profil
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (error) throw error;
          
          setState({
            session,
            user: session.user,
            profile,
            isAdmin: profile?.role === 'admin',
            isLoading: false,
            error: null,
          });
        } else {
          setState({ ...initialState, isLoading: false });
        }
        
        // Écouter les changements d'authentification
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            setState((prev) => ({ ...prev, session: newSession, user: newSession?.user || null }));
            
            // Si un utilisateur vient de se connecter, récupérer son profil
            if (event === 'SIGNED_IN' && newSession?.user) {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
                
              if (!error) {
                setState((prev) => ({
                  ...prev,
                  profile,
                  isAdmin: profile?.role === 'admin',
                }));
              }
            }
            
            // Si l'utilisateur se déconnecte, réinitialiser l'état
            if (event === 'SIGNED_OUT') {
              setState({ ...initialState, isLoading: false });
            }
          }
        );
        
        // Nettoyer l'abonnement lors du démontage
        return () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error('Erreur d\'initialisation de l\'authentification:', error);
        setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
      }
    };
    
    initializeAuth();
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      // Connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // On ne met pas à jour l'état ici car l'écouteur onAuthStateChange le fera
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
      throw error;
    }
  };
  
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      // Inscription avec Supabase
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
      
      // Insérer le profil de l'utilisateur
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              email,
              role: 'member', // Par défaut
            }
          ]);
          
        if (profileError) throw profileError;
      }
      
      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
      throw error;
    }
  };
  
  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // L'écouteur onAuthStateChange va mettre à jour l'état
    } catch (error: any) {
      console.error('Erreur de déconnexion:', error);
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
    }
  };
  
  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 