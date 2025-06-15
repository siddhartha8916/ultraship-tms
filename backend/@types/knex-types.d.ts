import { SystemRole, User, UserSystemRoles } from './schema/index.ts';

declare module 'knex/types/tables.js' {
  interface Tables {
    users: User;
    system_roles: SystemRole;
    user_system_roles: UserSystemRoles;
  }
}
