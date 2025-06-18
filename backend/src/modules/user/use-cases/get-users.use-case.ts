import { checkAuthentication } from '@/modules/auth/helpers/check-authentication.js';
import { IContext } from '@/shared/interfaces/index.js';
import { z } from 'zod';
import { db } from '@/db/index.js';
import { createSchemaValidator } from '@/utils/index.js';
import { User } from '@/db/schema/index.js';
import graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

const dtoSchema = z.object({
  offset: z.number(),
  limit: z.number().max(100),
});
const validateDTO = createSchemaValidator(dtoSchema);
export type GetUsersDTO = z.infer<typeof dtoSchema>;

type GetUsersUseCaseResult = {
  data: User[];
};

export async function getUsersUseCase(dto: GetUsersDTO, ctx: IContext, info?: GraphQLResolveInfo): Promise<GetUsersUseCaseResult> {
  await checkAuthentication(ctx);

  const { offset, limit } = await validateDTO(dto);

  let selectedColumns: string[] = ['id', 'first_name', 'middle_name', 'email'];

  if (info) {
    const infoFields = graphqlFields(info);
    selectedColumns = Object.keys(infoFields).filter((field) => field !== 'full_name' && field !== '__typename' && field !== 'is_employee');
  }

  const users = (await db('users')
    .select(selectedColumns)
    .offset(offset * limit)
    .limit(limit)) as User[];

  return {
    data: users,
  };
}
