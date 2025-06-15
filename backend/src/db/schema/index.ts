import { z } from 'zod';

const createdAt = z.coerce.date();
const updatedAt = z.coerce.date();

export const UserSchema = z
  .object({
    id: z.string().uuid(),
    firstName: z.string(),
    middleName: z.string().nullable().optional(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .merge(z.object({ createdAt, updatedAt }));

export const SystemRoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export const UserSystemRolesSchema = z.object({
  userId: UserSchema.shape.id,
  systemRoleId: SystemRoleSchema.shape.id,
});


export type User = z.infer<typeof UserSchema>;
export type SystemRole = z.infer<typeof SystemRoleSchema>;
export type UserSystemRoles = z.infer<typeof UserSystemRolesSchema>;