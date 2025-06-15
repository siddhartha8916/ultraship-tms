import { GQL_Resolvers } from '@/generated/graphql/index.js';
import { usersResolver } from './users.query.js';
import { fullNameResolver } from './full-name.query.js';

const resolvers: GQL_Resolvers = {
  Query: {
    users: usersResolver,
  },
  User: {
    full_name: fullNameResolver,
  },
};
export default resolvers;
