import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cliente" | "especialista";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, empresa: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem("vision360_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulación de llamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validación básica (en producción esto vendría del backend)
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        role: "cliente"
      };
      
      setUser(newUser);
      localStorage.setItem("vision360_user", JSON.stringify(newUser));
      localStorage.setItem("vision360_token", `token_${newUser.id}`);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    empresa: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulación de llamada API
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (name && email && password.length >= 6 && empresa) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: "cliente"
      };
      
      setUser(newUser);
      localStorage.setItem("vision360_user", JSON.stringify(newUser));
      localStorage.setItem("vision360_token", `token_${newUser.id}`);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vision360_user");
    localStorage.removeItem("vision360_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
