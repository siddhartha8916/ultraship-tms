import { Configuration } from '@/config/environment.js';
import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';

export const corsMiddleware = (): RequestHandler => {
  // Refer to the docs on what works for your use cases. https://github.com/expressjs/cors#readme
  const whitelist: Array<string | RegExp> = [];

  if (!Configuration.isProduction()) {
    whitelist.push(/localhost/);
  }

  const corsOptions: CorsOptions = {
    origin: whitelist,
    allowedHeaders: ['*'],
    credentials: true,
  };

  return cors(corsOptions);
};
