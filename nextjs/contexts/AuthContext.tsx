// src/contexts/AuthContext.tsx
'use client';
import React, { createContext, useState, useContext, PropsWithChildren, useEffect } from 'react';
import pb from '@/lib/pocketbase';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  // Initialize user from auth store
  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);

  const login = async (email: string, password: string) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    setUser(authData);
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
