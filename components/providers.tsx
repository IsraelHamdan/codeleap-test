"use client";
import { DehydratedState, HydrationBoundary, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { getQueryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './AuthContext';
import { TooltipProvider } from './ui/tooltip';
import ModeToggle from './theme-toggle';

const THEME_COOKIE = "theme";
const ONE_YEAR = 60 * 60 * 24 * 365;

function ThemeCookieSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    document.cookie = `${THEME_COOKIE}=${resolvedTheme}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
  }, [resolvedTheme]);

  return null;
}

export function Providers({
  children,
  dehydratedState,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
  defaultTheme?: "light" | "dark";
}) {
  const queryClient = getQueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeCookieSync />
      <Toaster />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <TooltipProvider>
              <ModeToggle />
              {children}
            </TooltipProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}