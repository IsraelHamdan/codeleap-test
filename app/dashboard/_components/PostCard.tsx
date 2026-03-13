"use client";

import { useEffect, useState } from "react";
import {
  dashboardButtonStyle,
  dashboardFormStyle,
  dashboardIconStyle,
} from "@/app/tailwindGlobal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePosts from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { PencilSimpleLineIcon, TrashIcon } from "@phosphor-icons/react";
import {
  type Post,
  type UpdatePostDTO,
  updateSchema as updatePostSchema,
} from "@/lib/validations/posts.schema";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";

type PostCardProps = {
  post: Post;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const styles = {
  card:
    "flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-200/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/90 dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-black/20 dark:hover:shadow-black/35",
  header: "flex items-start justify-between gap-4",
  headerContent: "space-y-3",
  metaRow: "flex flex-wrap items-center gap-2",
  authorBadge:
    "inline-flex items-center rounded-full border border-slate-200 bg-slate-100/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
  metaText: "text-xs text-slate-500 dark:text-slate-400",
  title: "text-lg font-semibold leading-tight text-slate-950 dark:text-slate-50",
  editState:
    "text-sm font-semibold text-slate-700 dark:text-slate-200",
  contentWrapper: "flex flex-1 flex-col pt-5",
  divider: "mb-5 h-px w-full bg-slate-200/80 dark:bg-slate-800/80",
  content:
    "flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300",
  actions: "flex items-center gap-2",
  actionIcon: dashboardIconStyle.button,
  form: "flex flex-1 flex-col gap-4 pt-5",
  fieldWrapper: dashboardFormStyle.fieldWrapper,
  label: dashboardFormStyle.label,
  input: dashboardFormStyle.input,
  textarea: dashboardFormStyle.textareaCompact,
  inputError: dashboardFormStyle.inputError,
  error: dashboardFormStyle.error,
  footer: dashboardFormStyle.footer,
} as const;

export default function PostCard({ post }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { updatePost, deletePost, isUpdating, isDeleting } = usePosts(post.id);

  const form = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
    } satisfies UpdatePostDTO,
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "blur",
    }),
    onSubmit: ({ value }) => {
      updatePost(value, {
        onSuccess: () => {
          reset(value);
          setIsEditing(false);
          toast.success("Post atualizado com sucesso.");
        },
        onError: () => {
          toast.error("Não foi possível atualizar o post.");
        },
      });
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (!isEditing) {
      reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [isEditing, post.content, post.title, reset]);
  const isBusy = isUpdating || isDeleting;
  const titleId = `post-${post.id}-title`;
  const contentId = `post-${post.id}-content`;

  const handleStartEditing = () => {
    reset({
      title: post.title,
      content: post.content,
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    reset({
      title: post.title,
      content: post.content,
    });
    setIsEditing(false);
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.metaRow}>
            <span className={styles.authorBadge}>@{post.username}</span>
            <span className={styles.metaText}>
              {dateFormatter.format(post.created_datetime)}
            </span>
          </div>
          {isEditing ? (
            <p className={styles.editState}>Modo de edição</p>
          ) : (
            <h2 className={styles.title}>{post.title}</h2>
          )}
        </div>

        {!isEditing ? (
          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              className={cn(
                dashboardButtonStyle.secondary,
                dashboardButtonStyle.compact,
              )}
              onClick={handleStartEditing}
              disabled={isBusy}
            >
              <PencilSimpleLineIcon className={styles.actionIcon} />
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn(
                dashboardButtonStyle.destructive,
                dashboardButtonStyle.compact,
              )}
              onClick={() =>
                deletePost(post.id, {
                  onSuccess: () => {
                    toast.success("Post excluído com sucesso.");
                  },
                  onError: () => {
                    toast.error("Não foi possível excluir o post.");
                  },
                })
              }
              disabled={isBusy}
            >
              <TrashIcon className={styles.actionIcon} />
              {isDeleting ? "Excluindo..." : "Delete"}
            </Button>
          </div>
        ) : null}
      </div>

      {!isEditing ? (
        <div className={styles.contentWrapper}>
          <div className={styles.divider} />
          <p className={styles.content}>{post.content}</p>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
          className={styles.form}
        >
          <form.Field
            name="title"
            validators={{
              onDynamic: updatePostSchema.shape.title,
            }}
          >
            {(field) => {
              const errorMessage =
                field.state.meta.isTouched && !field.state.meta.isValid
                  ? field.state.meta.errorMap.onDynamic?.[0]?.message
                  : undefined;

              return (
                <div className={styles.fieldWrapper}>
                  <Label htmlFor={titleId} className={styles.label}>
                    Título
                  </Label>
                  <Input
                    id={titleId}
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
              onDynamic: updatePostSchema.shape.content,
            }}
          >
            {(field) => {
              const errorMessage =
                field.state.meta.isTouched && !field.state.meta.isValid
                  ? field.state.meta.errorMap.onDynamic?.[0]?.message
                  : undefined;

              return (
                <div className={styles.fieldWrapper}>
                  <Label htmlFor={contentId} className={styles.label}>
                    Conteúdo
                  </Label>
                  <textarea
                    id={contentId}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Atualize o conteúdo do post"
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

          <div className={styles.footer}>
            <Button
              type="button"
              variant="outline"
              className={cn(
                dashboardButtonStyle.secondary,
                dashboardButtonStyle.regular,
              )}
              onClick={handleCancelEditing}
              disabled={isBusy}
            >
              Cancelar
            </Button>

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
              })}
            >
              {({ canSubmit }) => (
                <Button
                  type="submit"
                  className={cn(
                    dashboardButtonStyle.primary,
                    dashboardButtonStyle.regular,
                  )}
                  disabled={!canSubmit || isBusy}
                >
                  {isUpdating ? "Salvando..." : "Salvar"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      )}
    </article>
  );
}
