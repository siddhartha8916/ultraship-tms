import { z } from "zod";

// Define the schema for user login
export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  email: z.string().email(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  role: z.enum(["admin", "employee"]),
});

export type User = z.infer<typeof UserSchema>;

export const UserStateSchema = z.object({
  currentUser: UserSchema.nullable(),
  getCurrentUser: z.function().returns(UserSchema.nullable()),
  updateCurrentUser: z.function().args(UserSchema.nullable()).returns(z.void()),
});

export type UserState = z.infer<typeof UserStateSchema>;

export const AppSurveyErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
});

export type AppSurveyError = z.infer<typeof AppSurveyErrorSchema>;
