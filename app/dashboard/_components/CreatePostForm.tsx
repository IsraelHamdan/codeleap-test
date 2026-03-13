"use client";

import { useEffect } from "react";
import {
  dashboardButtonStyle,
  dashboardFormStyle,
} from "@/app/tailwindGlobal";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePosts from "@/hooks/usePosts";
import {
  createPostSchema,
  type CreatePostDTO,
} from "@/lib/validations/posts.schema";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  form: dashboardFormStyle.form,
  fieldWrapper: dashboardFormStyle.fieldWrapper,
  label: dashboardFormStyle.label,
  input: dashboardFormStyle.input,
  textarea: dashboardFormStyle.textarea,
  inputError: dashboardFormStyle.inputError,
  error: dashboardFormStyle.error,
  actions: dashboardFormStyle.actions,
} as const;

export default function CreatePostForm({
  formKey,
  onSuccess,
}: CreatePostFormProps) {
  const { username } = useAuth();
  const { createPost, isCreating } = usePosts();

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "blur",
    }),
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
      <form.Field
        name="title"
        validators={{
          onDynamic: createPostSchema.shape.title,
        }}
      >
        {(field) => {
          const errorMessage =
            field.state.meta.isTouched && !field.state.meta.isValid
              ? field.state.meta.errorMap.onDynamic?.[0]?.message
              : undefined;

          return (
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
                className={cn(
                  styles.input,
                  errorMessage ? styles.inputError : undefined,
                )}
              />
              <p className={styles.error}>{errorMessage}</p>
            </div>
          );
        }}
      </form.Field>

      <form.Field
        name="content"
        validators={{
          onDynamic: createPostSchema.shape.content,
        }}
      >
        {(field) => {
          const errorMessage =
            field.state.meta.isTouched && !field.state.meta.isValid
              ? field.state.meta.errorMap.onDynamic?.[0]?.message
              : undefined;

          return (
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
                className={cn(
                  styles.input,
                  styles.textarea,
                  errorMessage ? styles.inputError : undefined,
                )}
              />
              <p className={styles.error}>{errorMessage}</p>
            </div>
          );
        }}
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
              className={cn(
                dashboardButtonStyle.primary,
                dashboardButtonStyle.tall,
                dashboardButtonStyle.form,
              )}
            >
              {isCreating ? "Salvando..." : "Criar post"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
