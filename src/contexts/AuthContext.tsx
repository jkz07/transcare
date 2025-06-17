
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  pronouns?: string;
  age?: number;
  location?: string;
  bio?: string;
  thType?: string;
  journeyTime?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, profileData?: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (profileData: Partial<User>) => void;
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular verificação no "banco de dados" (localStorage)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, profileData?: Partial<User>): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se email já existe
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      ...profileData
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const updateProfile = (profileData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Atualizar também no "banco de dados"
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...profileData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
