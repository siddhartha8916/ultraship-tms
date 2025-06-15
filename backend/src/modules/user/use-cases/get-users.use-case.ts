import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { db } from '@/db/index.js';
import { createSchemaValidator } from '@/utils/index.js';
import { User } from '@/db/schema/index.js';

const dtoSchema = z.object({
  offset: z.number(),
  limit: z.number().max(100),
});
const validateDTO = createSchemaValidator(dtoSchema);
export type GetUsersDTO = z.infer<typeof dtoSchema>;

type GetUsersUseCaseResult = {
  data: User[];
};
export async function getUsersUseCase(dto: GetUsersDTO, ctx: IContext): Promise<GetUsersUseCaseResult> {
  await checkAuthentication(ctx);

  const { offset, limit } = await validateDTO(dto);

  const users = await db.select().table('users').offset(offset).limit(limit) as User[];

  return {
    data: users,
  };
}
