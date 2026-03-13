"use client";

import { dashboardButtonStyle } from "@/app/tailwindGlobal";
import { type TransitionEvent } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

const styles = {
  root: "fixed inset-0 z-50",
  backdrop:
    "absolute inset-0 bg-black/40 transition-opacity duration-200",
  backdropOpen: "opacity-100",
  backdropClosed: "pointer-events-none opacity-0",
  positioner:
    "pointer-events-none flex h-full items-center justify-center p-4",
  card:
    "pointer-events-auto flex max-h-[78vh] w-[min(92vw,820px)] flex-col overflow-hidden rounded-2xl border border-border/70 shadow-2xl transition-all duration-200",
  cardOpen: "translate-y-0 scale-100 opacity-100",
  cardClosed: "translate-y-3 scale-95 opacity-0",
  content: "overflow-y-auto",
  footer: "justify-end border-t",
  cancelButton: cn(
    dashboardButtonStyle.destructive,
    dashboardButtonStyle.regular,
  ),
} as const;

interface ModalCardProps {
  isOppened: boolean;
  isModalMounted: boolean;
  title: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalCard({
  isOppened,
  isModalMounted,
  title,
  cardRef,
  onTransitionEnd,
  onClose,
  children,
}: ModalCardProps) {
  if (!isModalMounted) return null;

  return (
    <div className={styles.root}>
      <div
        className={cn(
          styles.backdrop,
          isOppened ? styles.backdropOpen : styles.backdropClosed,
        )}
        onMouseDown={onClose}
      />

      <div className={styles.positioner}>
        <Card
          ref={cardRef}
          onTransitionEnd={onTransitionEnd}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            styles.card,
            isOppened ? styles.cardOpen : styles.cardClosed,
          )}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className={styles.content}>{children}</CardContent>
          <CardFooter className={styles.footer}>
            <Button
              type="button"
              variant="destructive"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
