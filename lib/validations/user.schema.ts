import { z } from "zod/v4";

export const loginSchema = z.object({
  username: z.string().min(3),
});

export type LoginDTO = z.infer<typeof loginSchema>;
