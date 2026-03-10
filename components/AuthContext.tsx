"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoginDTO } from "@/lib/validations/user.schema";

type AuthContextType = {
  username: string | null;
  login: (data: LoginDTO) => void;
  logout: () => void;
};

const PUBLIC_ROUTES = ["/auth"];

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const pathname = usePathname();

  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("username");
  });

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!username && !isPublicRoute) {
      router.replace("/auth");
      return;
    }

    if (username && isPublicRoute) {
      router.replace("/");
      return;
    }
  }, [pathname, username, router, isPublicRoute]);

  function login(data: LoginDTO) {
    localStorage.setItem("username", data.username);
    setUsername(data.username);
    router.replace("/");
  }

  function logout() {
    localStorage.removeItem("username");
    setUsername(null);
    router.replace("/auth");
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}