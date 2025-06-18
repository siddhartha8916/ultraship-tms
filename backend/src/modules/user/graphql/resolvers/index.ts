import { GQL_Resolvers } from '@/generated/graphql/index.js';
import { userResolver, usersResolver } from './users.query.js';
import { fullNameResolver, isEmployeeResolver } from './full-name.query.js';

const resolvers: GQL_Resolvers = {
  Query: {
    users: usersResolver,
    user: userResolver,
  },
  User: {
    full_name: fullNameResolver,
    is_employee: isEmployeeResolver,
  },
};
export default resolvers;
