import Knex from 'knex';
import { env } from '@/config/environment.js';

export const db = Knex({
  client: 'pg',
  connection: env.POSTGRES_CONNECTION_URL,
  searchPath: ['knex', 'public'],
  pool: { min: 0, max: 7 },
});