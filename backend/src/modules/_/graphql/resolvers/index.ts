import { GQL_Resolvers } from '@/generated/graphql/index.js';
import { _dummyResolver as _dummyQueryResolver } from './_dummy.query.js';
import { _dummyResolver as _dummyMutationResolver } from './_dummy.mutation.js';
import { nodeInterfaceResolveType } from './node.interface.js';
import { resolvers as scalarResolvers } from 'graphql-scalars';

const resolvers: GQL_Resolvers = {
  ...scalarResolvers,
  Node: {
    __resolveType: nodeInterfaceResolveType,
  },
  Query: {
    _dummy: _dummyQueryResolver,
  },
  Mutation: {
    _dummy: _dummyMutationResolver,
  },

};
export default resolvers;
