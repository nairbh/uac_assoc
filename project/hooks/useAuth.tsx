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
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error: string | null }>;
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
    // Vérifier si un utilisateur test est déjà stocké dans localStorage
    const checkLocalAuth = () => {
      const testUserAuth = localStorage.getItem('testUserAuth');
      if (testUserAuth) {
        try {
          const testUser = JSON.parse(testUserAuth);
          console.log('Utilisateur test trouvé:', testUser);
          setState({
            ...initialState,
            user: testUser.user,
            profile: testUser.profile,
            isAdmin: testUser.profile.role === 'admin',
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error("Erreur lors de la lecture de l'authentification locale:", error);
          localStorage.removeItem('testUserAuth');
        }
      }
      return false;
    };

    // Initialiser l'état d'authentification
    const initializeAuth = async () => {
      // Vérifier d'abord si un utilisateur test est stocké localement
      if (checkLocalAuth()) {
        return;
      }

      try {
        console.log('Initialisation de l\'authentification...');
        
        // Récupérer la session actuelle depuis Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Erreur lors de la récupération de la session:', sessionError);
          throw sessionError;
        }
        
        console.log('Session récupérée:', session ? 'Connecté' : 'Non connecté');
        
        if (session?.user) {
          console.log('Récupération du profil pour l\'utilisateur:', session.user.id);
          
          // Si on a un utilisateur connecté, récupérer son profil
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Erreur lors de la récupération du profil:', profileError);
            // Ne pas throw l'erreur, juste logger et continuer
          }
          
          console.log('Profil récupéré:', profile);
          
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
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Changement d\'état d\'authentification:', event, newSession ? 'Connecté' : 'Déconnecté');
            
            setState((prev) => ({ ...prev, session: newSession, user: newSession?.user || null }));
            
            // Si un utilisateur vient de se connecter, récupérer son profil
            if (event === 'SIGNED_IN' && newSession?.user) {
              console.log('Récupération du profil après connexion...');
              
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', newSession.user.id)
                .single();
                
              if (error) {
                console.error('Erreur lors de la récupération du profil après connexion:', error);
              } else {
                console.log('Profil récupéré après connexion:', profile);
              }
              
              setState((prev) => ({
                ...prev,
                profile,
                isAdmin: profile?.role === 'admin',
                isLoading: false,
              }));
            }
            
            // Si l'utilisateur se déconnecte, réinitialiser l'état
            if (event === 'SIGNED_OUT') {
              localStorage.removeItem('testUserAuth');
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
      
      console.log('Tentative de connexion pour:', email);
      
      // Pour faciliter les tests avec un compte admin
      if (email === 'admin@atmf-argenteuil.org' && password === 'admin') {
        console.log('Connexion avec compte test admin');
        
        // Créer un utilisateur test
        const testUser = {
          id: 'test-admin-user',
          email: 'admin@atmf-argenteuil.org',
          user_metadata: {
            first_name: 'Admin',
            last_name: 'ATMF'
          }
        };
        
        const testProfile = {
          id: 'test-admin-user',
          first_name: 'Admin',
          last_name: 'ATMF',
          email: 'admin@atmf-argenteuil.org',
          role: 'admin' as 'admin'
        };
        
        // Stocker l'utilisateur test dans localStorage
        localStorage.setItem('testUserAuth', JSON.stringify({
          user: testUser,
          profile: testProfile
        }));
        
        setState({
          session: null,
          user: testUser as any,
          profile: testProfile,
          isAdmin: true,
          isLoading: false,
          error: null
        });
        
        console.log('Connexion test réussie');
        return;
      }
      
      // Connexion normale avec Supabase
      console.log('Connexion avec Supabase...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Erreur de connexion Supabase:', error);
        
        // Gestion spécifique des erreurs courantes
        let errorMessage = error.message;
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter.';
        } else if (error.message?.includes('signup disabled')) {
          errorMessage = 'Les nouvelles inscriptions sont désactivées.';
        }
        
        setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
        throw new Error(errorMessage);
      }
      
      console.log('Connexion Supabase réussie:', data);
      
      // Si la connexion réussit mais l'utilisateur n'est pas confirmé
      if (data.user && !data.user.email_confirmed_at) {
        console.warn('Utilisateur connecté mais email non confirmé');
        setState((prev) => ({ 
          ...prev, 
          error: 'Veuillez confirmer votre email. Vérifiez votre boîte mail.',
          isLoading: false 
        }));
        return;
      }
      
      // La gestion de l'état sera faite par l'écouteur onAuthStateChange
      console.log('Attente de la mise à jour de l\'état par onAuthStateChange...');
      
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
      throw error;
    }
  };
  
  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<{ success: boolean; error: string | null }> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      console.log('Tentative d\'inscription pour:', email);
      
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
      
      if (error) {
        console.error('Erreur d\'inscription Supabase:', error);
        const errorMessage = error.message || 'Une erreur s\'est produite lors de l\'inscription';
        setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
        return { success: false, error: errorMessage };
      }
      
      console.log('Inscription réussie:', data);
      
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Erreur d\'inscription (catch):', error);
      const errorMessage = error?.message || 'Une erreur inattendue s\'est produite lors de l\'inscription';
      setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
      return { success: false, error: errorMessage };
    }
  };
  
  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      console.log('Déconnexion...');
      
      // Si l'utilisateur est un utilisateur test
      if (localStorage.getItem('testUserAuth')) {
        localStorage.removeItem('testUserAuth');
        setState({ ...initialState, isLoading: false });
        console.log('Déconnexion test réussie');
        return;
      }
      
      // Déconnexion normale avec Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Déconnexion Supabase réussie');
      
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