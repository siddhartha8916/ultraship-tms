import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  role: z.string(),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const RegisterResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    middle_name: z.string().nullable(),
    last_name: z.string(),
    email: z.string().email(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    role: z.enum(["employee", "admin"]),
  }),
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
