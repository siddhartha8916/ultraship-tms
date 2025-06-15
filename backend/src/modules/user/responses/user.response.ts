import { z } from 'zod';
import { UserSchema } from '@/db/schema/index.js';

export const ResponseUserFullSchema = z
  .object({
    id: UserSchema.shape.id,
    first_name: UserSchema.shape.first_name,
    middle_name: UserSchema.shape.middle_name,
    last_name: UserSchema.shape.last_name,
    email: UserSchema.shape.email,
    created_at: UserSchema.shape.created_at,
    updated_at: UserSchema.shape.updated_at,
  })
  .extend({
    // We need the date objects to be serialized but in valid datetime format.
    created_at: z.coerce.date().transform((arg) => arg.toISOString()),
    updated_at: z.coerce.date().transform((arg) => arg.toISOString()),
  });
export type ResponseUserFull = z.infer<typeof ResponseUserFullSchema>;

export const ResponseUserSimpleSchema = z.object({
  id: UserSchema.shape.id,
});
export type ResponseUserSimple = {
  id: string;
};
