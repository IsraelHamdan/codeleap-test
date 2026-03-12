"use client";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react";
import Tipography from "./tipography";

export default function ModeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === "dark";
  const tooltipText = isDark
    ? "Mudar para modo claro"
    : "Mudar para modo escuro";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="default"
          type="button"
          aria-label="Alternar tema"
          pressed={isDark}
          onPressedChange={(pressed: boolean) => setTheme(pressed ? "dark" : "light")}
        >
          {isDark ? <SunIcon size={6} /> : <MoonStarsIcon size={6} />}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          "border shadow-md",
          isDark
            ? "bg-background text-foreground"
            : "bg-zinc-900 text-muted-foreground"
        )}
      >
        <Tipography variant="p">{tooltipText}</Tipography>
      </TooltipContent>
    </Tooltip>
  );
}