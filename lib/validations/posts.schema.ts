import z from "zod/v4";

export const postSchema = z.object({
  id: z.number(),

  username: z.string().min(1, { message: "Username is required" }),

  created_datetime: z.coerce.date(),

  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(120, { message: "Title is too long" }),

  content: z
    .string()
    .min(5, { message: "Content must have at least 5 characters" }),
});

export const createPostSchema = postSchema.omit({
  id: true,
  created_datetime: true,
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;

export const postsResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(postSchema),
});

export type Post = z.infer<typeof postSchema>;

export type PostResponseDTO = z.infer<typeof postsResponseSchema>;

export const updateSchema = postSchema.omit({
  id: true,
  username: true,
  created_datetime: true,
});

export type UpdatePostDTO = z.infer<typeof updateSchema>;
