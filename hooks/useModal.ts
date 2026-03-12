"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react";

interface UseModalOptions {
  onClose?: () => void;
}

export function useModal({ onClose }: UseModalOptions = {}) {
  const [isOppened, setIsOppened] = useState<boolean>(false);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);
  const shouldResetFormRef = useRef(false);
  const triggerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    setIsModalMounted(true);
    requestAnimationFrame(() => setIsOppened(true));
  }, []);

  const closeModal = useCallback(() => {
    shouldResetFormRef.current = true;
    setIsOppened(false);
    onClose?.();
  }, [onClose]);

  const handleToggle = useCallback(() => {
    if (isOppened) {
      closeModal();
      return;
    }
    openModal();
  }, [closeModal, isOppened, openModal]);

  const handleCardTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget || isOppened) {
        return;
      }

      setIsModalMounted(false);

      if (shouldResetFormRef.current) {
        setFormKey((current) => current + 1);
        shouldResetFormRef.current = false;
      }
    },
    [isOppened],
  );

  useEffect(() => {
    if (!isModalMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const eventPath = event.composedPath();

      if (triggerRef.current && eventPath.includes(triggerRef.current)) return;
      if (cardRef.current && eventPath.includes(cardRef.current)) return;

      const radixPortals = document.querySelectorAll("[data-radix-portal]");
      for (const portal of radixPortals) {
        if (portal.contains(target)) return;
      }

      closeModal();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal, isModalMounted]);
  return {
    isOppened,
    isModalMounted,
    formKey,
    triggerRef,
    cardRef,
    openModal,
    closeModal,
    handleToggle,
    handleCardTransitionEnd,
  };
}
