
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  birth_date?: string;
  location?: string;
  phone?: string;
  th_type?: string;
  journey_time?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string, profileData?: Partial<UserProfile>) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ error?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configurar listener de mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Buscar perfil do usuário
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profileData) {
              setProfile({
                id: profileData.id,
                name: profileData.name,
                email: session.user.email || '',
                birth_date: profileData.birth_date,
                location: profileData.location,
                phone: profileData.phone,
                th_type: profileData.th_type,
                journey_time: profileData.journey_time
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: 'Email ou senha incorretos' };
    }
    
    return {};
  };

  const register = async (name: string, email: string, password: string, profileData?: Partial<UserProfile>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/perfil`,
        data: {
          name,
          ...profileData
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { error: 'Este email já está cadastrado' };
      }
      return { error: error.message };
    }

    return {};
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id);

    if (error) {
      return { error: 'Erro ao atualizar perfil' };
    }

    // Atualizar estado local
    setProfile(prev => prev ? { ...prev, ...profileData } : null);
    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      updateProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
