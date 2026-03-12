import { cn } from "@/lib/utils";
import React, { JSX } from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "small";

const tagMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  span: "span",
  small: "small",
};

const baseStyles = "text-inherit";

const styles: Record<TypographyVariant, string> = {
  h1: "text-3xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  h4: "text-lg font-medium",
  p: "text-sm leading-relaxed",
  span: "text-sm",
  small: "text-xs text-muted-foreground",
};

type TipographyProps = {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
};

export default function Tipography({
  variant = "p",
  className,
  children,
}: TipographyProps) {
  const Component = tagMap[variant];

  return (
    <Component className={cn(baseStyles, styles[variant], className)}>
      {children}
    </Component>
  );
}