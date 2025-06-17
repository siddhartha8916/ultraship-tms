import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email: z.string().email(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
