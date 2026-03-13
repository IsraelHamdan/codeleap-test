import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROUTE_TITLES: Record<string, string> = {
  "/profile": "Perfil",
  "/dashboard": "dashboard",
};

export function getRouteTitle(pathname: string): string {
  // Verifica correspondência exata primeiro
  if (ROUTE_TITLES[pathname]) {
    return ROUTE_TITLES[pathname];
  }

  // Verifica se é uma subrota (ex: /students/123)
  for (const [route, title] of Object.entries(ROUTE_TITLES)) {
    if (pathname.startsWith(route) && route !== "/") {
      return title;
    }
  }

  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" > ");
}
