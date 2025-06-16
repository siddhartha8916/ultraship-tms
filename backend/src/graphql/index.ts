import { Express } from 'express';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import depthLimit from 'graphql-depth-limit';
import { initializeSchema } from './schema.js';
import { handleError } from '@/errors/index.js';
import type { Server } from 'http';
import { IContext } from '@/shared/interfaces/index.js';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Configuration } from '@/config/environment.js';

export interface IGraphQLContext extends IContext, BaseContext {}

export interface IGraphQLSubscriptionContext extends Pick<IContext, 'userId'> {
  readonly userId: string | null;
}

export const initApolloGraphqlServer = async (app: Express, httpServer: Server): Promise<void> => {
  const GRAPHQL_PATH = '/graphql';
  const schema = await initializeSchema();

  /////////////////////////
  // Setup Apollo Server //
  /////////////////////////

  const apolloServer = new ApolloServer<IGraphQLContext>({
    schema,
    introspection: !Configuration.isProduction(),

    formatError: (gqlFormattedError, error) => {
      const err = handleError(error as Error);

      return {
        ...gqlFormattedError,
        extensions: {
          ...gqlFormattedError.extensions,
          ...err.originalError,
        },
      };
    },
    validationRules: [depthLimit(10)],
    plugins: [
      // Proper shutdown for the HTTP Server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket Server.
      {
        async serverWillStart() {
          return {
            async drainServer() {},
          };
        },
      },
      // GraphQL endpoint landing page.
      Configuration.isProduction()
        ? ApolloServerPluginLandingPageProductionDefault({ includeCookies: true })
        : ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
    ],

    status400ForVariableCoercionErrors: true,
  });
  await apolloServer.start();

  app.use(
    GRAPHQL_PATH,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const context: IContext = {
          ...req.context,
        };

        const graphqlContext: IGraphQLContext = {
          ...context,
        };

        return graphqlContext;
      },
    }),
  );
};
