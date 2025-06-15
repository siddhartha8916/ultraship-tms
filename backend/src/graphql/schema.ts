/* eslint-disable arrow-body-style */

import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as enums from './enums/index.js';
import { GraphQLSchema } from 'graphql';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

const getTypeDefs = async () => {
  return loadFiles('src/modules/**/*.graphql');
};

const getResolvers = async () => {
  return loadFiles('src/modules/**/graphql/resolvers/index.*', {
    ignoreIndex: false,
    extensions: ['.js', '.ts'],
  });
};

export const initializeSchema = async (): Promise<GraphQLSchema> => {
  const resolvers = {
    ...mergeResolvers(await getResolvers()),
    ...enums,
  };

  const typeDefs = mergeTypeDefs(await getTypeDefs());

  const graphqlSchema = makeExecutableSchema({
    typeDefs: [scalarTypeDefs, typeDefs],
    resolvers,
    inheritResolversFromInterfaces: true,
  });

  return graphqlSchema;
};
