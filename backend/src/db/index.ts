import { Configuration } from '@/config/environment.js';
import Knex from 'knex';

export const db = Knex({
  client: 'pg',
  connection: Configuration.POSTGRES_CONNECTION_URL,
  searchPath: ['tms_schema'],
  pool: { min: 0, max: 7 },
});
