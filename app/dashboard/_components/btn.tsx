"use client";

import { dashboardButtonStyle } from "@/app/tailwindGlobal";
import { ModalCard } from "@/components/modalCards";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import CreatePostForm from "./CreatePostForm";

const styles = {
  triggerWrapper: "inline-flex",
} as const;

export default function Btn() {
  const {
    isOppened,
    isModalMounted,
    formKey,
    triggerRef,
    cardRef,
    openModal,
    closeModal,
    handleCardTransitionEnd,
  } = useModal();

  return (
    <>
      <span ref={triggerRef} className={styles.triggerWrapper}>
        <Button
          type="button"
          onClick={openModal}
          className={cn(
            dashboardButtonStyle.primary,
            dashboardButtonStyle.tall,
            dashboardButtonStyle.wide,
          )}
        >
          Criar post
        </Button>
      </span>

      <ModalCard
        title="Novo post"
        isOppened={isOppened}
        isModalMounted={isModalMounted}
        cardRef={cardRef}
        onClose={closeModal}
        onTransitionEnd={handleCardTransitionEnd}
      >
        <CreatePostForm key={formKey} formKey={formKey} onSuccess={closeModal} />
      </ModalCard>
    </>
  );
}
