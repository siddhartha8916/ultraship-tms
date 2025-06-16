import { z } from 'zod';

const created_at = z.coerce.date();
const updated_at = z.coerce.date();

export const UserSchema = z
  .object({
    id: z.string().uuid(),
    first_name: z.string(),
    middle_name: z.string().nullable().optional(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['admin', 'employee']),
  })
  .merge(z.object({ created_at, updated_at }));

export const SystemRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export const UserSystemRolesSchema = z.object({
  userId: UserSchema.shape.id,
  systemRoleId: SystemRoleSchema.shape.id,
});

export type UserFull = User & {
  hashed_password: string;
};

export type User = z.infer<typeof UserSchema>;
export type SystemRole = z.infer<typeof SystemRoleSchema>;
export type UserSystemRoles = z.infer<typeof UserSystemRolesSchema>;
