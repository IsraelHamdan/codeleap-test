"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePosts from "@/hooks/usePosts";
import type { CreatePostDTO } from "@/lib/validations/posts.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

type CreatePostFormValues = Pick<CreatePostDTO, "title" | "content">;

type CreatePostFormProps = {
  formKey: number;
  onSuccess?: () => void;
};

const defaultValues: CreatePostFormValues = {
  title: "",
  content: "",
};

const styles = {
  form: "space-y-4",
  fieldWrapper: "space-y-2",
  label: "text-xs font-medium text-foreground",
  input: "w-full",
  textarea:
    "min-h-32 w-full rounded-none border border-input bg-transparent px-2.5 py-2 text-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  actions: "flex justify-end pt-2",
  button: "min-w-28",
} as const;

export default function CreatePostForm({
  formKey,
  onSuccess,
}: CreatePostFormProps) {
  const { username } = useAuth();
  const { createPost, isCreating } = usePosts();

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      if (!username) {
        toast.error("Usuário não encontrado.");
        return;
      }

      const payload: CreatePostDTO = {
        ...value,
        username,
      };

      createPost(payload, {
        onSuccess: () => {
          toast.success("Post criado com sucesso.");
          onSuccess?.();
        },
        onError: () => {
          toast.error("Não foi possível criar o post.");
        },
      });
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [formKey, reset]);

  return (
    <form
      key={formKey}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className={styles.form}
    >
      <form.Field name="title">
        {(field) => (
          <div className={styles.fieldWrapper}>
            <Label htmlFor={field.name} className={styles.label}>
              Título
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Digite o título do post"
              className={styles.input}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <div className={styles.fieldWrapper}>
            <Label htmlFor={field.name} className={styles.label}>
              Conteúdo
            </Label>
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Escreva o conteúdo do post"
              className={styles.textarea}
            />
          </div>
        )}
      </form.Field>

      <div className={styles.actions}>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
          })}
        >
          {({ canSubmit }) => (
            <Button
              type="submit"
              disabled={!canSubmit || isCreating}
              className={styles.button}
            >
              {isCreating ? "Salvando..." : "Criar post"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
