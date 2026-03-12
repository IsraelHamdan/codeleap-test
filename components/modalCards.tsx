"use client";

import { type TransitionEvent } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
    <div className="fixed inset-0 z-50">
      {/* Backdrop — fecha ao clicar fora */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isOppened ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onMouseDown={onClose}
      />

      {/* Wrapper de posicionamento */}
      <div className="pointer-events-none flex h-full items-center justify-center p-4">
        <Card
          ref={cardRef}
          onTransitionEnd={onTransitionEnd}
          onMouseDown={(e) => e.stopPropagation()} // impede que cliques no card bublem pro backdrop
          className={`pointer-events-auto flex max-h-[78vh] w-[min(92vw,820px)] flex-col overflow-hidden border-border/70 shadow-2xl transition-all duration-200 ${isOppened
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
            }`}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto">{children}</CardContent>
          <CardFooter className="justify-end border-t">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}