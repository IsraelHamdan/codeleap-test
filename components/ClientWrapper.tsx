"use client";
import { usePathname } from "next/navigation";
import { CSSProperties, ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

import Tipography from "./tipography";
import ModeToggle from "./theme-toggle";
import { useAuth } from "./AuthContext";
import AppNav from "./AppNav/appNav";
import { getRouteTitle } from "@/lib/utils";

export default function ClientWrapper({ children }: { children: ReactNode; }) {
  const pathname = usePathname();
  const { username } = useAuth();

  const isAuthRoute = pathname?.startsWith("/auth");
  const showSidebar = Boolean(username) && !isAuthRoute;

  const mainClass = username
    ? "flex-1 bg-background min-h-screen p-1.5"
    : "flex-1 bg-background min-h-screen";

  const sidebarVars = {
    "--sidebar-width": "14rem",
    "--sidebar-width-icon": "5.5rem",
    "--sidebar-width-mobile": "92vw",
  } as CSSProperties;

  const pathName = usePathname();

  const routeTitle = pathName ? getRouteTitle(pathname) : "";

  return (
    <SidebarProvider style={sidebarVars}>
      {showSidebar && <AppNav />}

      <SidebarInset className="min-h-screen h-full flex flex-col">
        {username && (
          <header className="flex items-center gap-2 border-b px-4 py-2  bg-sidebar border-sidebar-border">
            <SidebarTrigger />
            <Tipography
              variant="p"
              className="font-semibold text-sidebar-foreground">
              {routeTitle}
            </Tipography>
            <ModeToggle />
          </header>
        )}
        <main className={`${mainClass}`}>{children}</main>
        <div
          id="overlay-root"
          className="absolute inset-0 pointer-events-none"
        />
      </SidebarInset>
    </SidebarProvider>
  );
}