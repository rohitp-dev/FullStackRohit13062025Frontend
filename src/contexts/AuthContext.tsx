"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { fetcher } from "@/utils/fetcher";

type AuthContextType = {
  login: (email: string, password: string) => Promise<boolean>;
  token: string | null;
  logout: () => void;
  hydrated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const login = async (email: string, password: string) => {
    try {
      const { data } = await fetcher.post<any>("/auth/login", {
        email,
        password,
      });
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    setHydrated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, token, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
