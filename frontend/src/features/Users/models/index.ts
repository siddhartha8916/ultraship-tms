import { z } from "zod";

const created_at = z.coerce.date();
const updated_at = z.coerce.date();

export const AppUserSchema = z
  .object({
    email: z.string().email(),
    first_name: z.string(),
    full_name: z.string(),
    id: z.string().uuid(),
    updated_at: z.coerce.date(),
    role: z.enum(["admin", "employee"]),
    is_employee: z.boolean().optional(),
  })
  .merge(
    z.object({
      created_at,
      updated_at,
    })
  );

export type AppUser = z.infer<typeof AppUserSchema>;

export type GQL_UserResponse = {
  users: AppUser[];
};

export type ColumnKey = keyof AppUser | "actions";

export type GQL_CreateEmployeeResponse = {
  createEmployee: {
    user_id: string;
    job_title: string;
    department: string;
    salary: number;
  };
};