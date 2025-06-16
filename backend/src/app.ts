import { errorMiddleware, corsMiddleware, checkAuthToken } from '@/middlewares/index.js';
import { initApolloGraphqlServer } from '@/graphql/index.js';

import helmet from 'helmet';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';

import { maintenanceRouter } from '@/modules/maintenance/routes/index.js';
import { authRouter } from '@/modules/auth/routes/index.js';
import { userRouter } from '@/modules/user/routes/index.js';
import { db } from '@/db/index.js';
import { Configuration } from './config/environment.js';
import { initializeRequestContext } from './middlewares/context.middleware.js';

const app = express();

(async () => {
  console.info(`${'='.repeat(30)}`);
  console.info(`NODE_ENV: ${Configuration.NODE_ENV}`);
  console.info(`${'='.repeat(30)}`);

  app.set('trust proxy', true);

  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware());
  app.use(initializeRequestContext);
  app.use(checkAuthToken);

  const routers: Router[] = [maintenanceRouter, authRouter, userRouter];
  app.use(routers);

  app.use(errorMiddleware());

  const httpServer = http.createServer(app);

  await initApolloGraphqlServer(app, httpServer);

  createTerminus(httpServer, {
    async onSignal() {
      console.info('server is starting cleanup');

      return Promise.all([await db.destroy()]);
    },
  });

  httpServer.listen(Configuration.PORT, () => {
    console.info(`Server is now up @ ${Configuration.PORT}`);
  });
})();
