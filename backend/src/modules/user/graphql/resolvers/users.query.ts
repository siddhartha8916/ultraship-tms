import { GQL_QueryResolvers } from '@/generated/graphql/index.js';
import { userFactory } from '../../factories/user.factory.js';
import { getUsersUseCase } from '../../use-cases/get-users.use-case.js';
import { getUserUseCase } from '../../use-cases/get-user.use-case.js';

export const usersResolver: GQL_QueryResolvers['users'] = async (root, args, ctx) => {
  const result = await getUsersUseCase(
    {
      offset: args.offset ?? 0,
      limit: args.limit ?? 10,
    },
    ctx,
  );

  return result.data.map((user) => userFactory.createGQLUser(user));
};


export const userResolver: GQL_QueryResolvers['user'] = async (root, args, ctx) => {
  const result = await getUserUseCase(
    {
      userId: args.id,
    },
    ctx,
  );

  return userFactory.createGQLUser(result.user);
};