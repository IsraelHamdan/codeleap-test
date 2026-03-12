"use client";

import { ModalCard } from "@/components/modalCards";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import CreatePostForm from "./CreatePostForm";

const styles = {
  trigger: "min-w-32",
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
      <span ref={triggerRef}>
        <Button type="button" onClick={openModal} className={styles.trigger}>
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
