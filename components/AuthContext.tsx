"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoginDTO } from "@/lib/validations/user.schema";

type AuthContextType = {
  username: string | null;
  login: (data: LoginDTO) => void;
  logout: () => void;
};

const AUTH_ROUTE = "/auth";
const DEFAULT_AUTHENTICATED_ROUTE = "/dashboard";
const USERNAME_STORAGE_KEY = "username";
const AUTH_STORAGE_EVENT = "auth:storage-change";
const PUBLIC_ROUTES = new Set([AUTH_ROUTE]);

const AuthContext = createContext<AuthContextType | null>(null);

function subscribeToAuth(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === USERNAME_STORAGE_KEY) {
      onStoreChange();
    }
  };

  const handleAuthChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(AUTH_STORAGE_EVENT, handleAuthChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(AUTH_STORAGE_EVENT, handleAuthChange);
  };
}

function getUsernameSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(USERNAME_STORAGE_KEY);
}

function getServerUsernameSnapshot() {
  return null;
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const username = useSyncExternalStore(
    subscribeToAuth,
    getUsernameSnapshot,
    getServerUsernameSnapshot
  );

  const isPublicRoute = PUBLIC_ROUTES.has(currentPath);
  const isRootRoute = currentPath === "/";
  const isProtectedRoute = !isPublicRoute && !isRootRoute;

  const redirectTo = useCallback(
    (targetPath: string) => {
      if (currentPath !== targetPath) {
        router.replace(targetPath);
      }
    },
    [currentPath, router]
  );

  const checkAuthStatus = useCallback(
    (opts?: {
      redirectOnAuthChange?: boolean;
      usernameSnapshot?: string | null;
    }) => {
      const {
        redirectOnAuthChange = true,
        usernameSnapshot = username,
      } = opts ?? {};
      const isAuthenticated = usernameSnapshot !== null;

      if (redirectOnAuthChange && !isAuthenticated && isProtectedRoute) {
        redirectTo(AUTH_ROUTE);
      }

      if (redirectOnAuthChange && isAuthenticated && isPublicRoute) {
        redirectTo(DEFAULT_AUTHENTICATED_ROUTE);
      }

      return usernameSnapshot;
    },
    [isProtectedRoute, isPublicRoute, redirectTo, username]
  );

  useEffect(() => {
    checkAuthStatus({ redirectOnAuthChange: true });
  }, [checkAuthStatus]);

  function login(data: LoginDTO) {
    localStorage.setItem(USERNAME_STORAGE_KEY, data.username);
    notifyAuthChange();
    redirectTo(DEFAULT_AUTHENTICATED_ROUTE);
  }

  function logout() {
    localStorage.removeItem(USERNAME_STORAGE_KEY);
    notifyAuthChange();
    redirectTo(AUTH_ROUTE);
  }

  if (!username && isProtectedRoute) {
    return null;
  }

  if (username && isPublicRoute) {
    return null;
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
