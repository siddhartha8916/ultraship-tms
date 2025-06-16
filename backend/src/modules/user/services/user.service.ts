import { db } from '@/db/index.js';
import { User } from '@/db/schema/index.js';
import { NotFoundError } from '@/errors/index.js';

async function findByIdOrThrow(userId: string): Promise<User> {
  const user = (await db.select().table('users').where('id', '=', userId).first()) as User;
  if (!user) {
    throw new NotFoundError(`User (${userId}) not found.`);
  }

  return user;
}

async function findByIds(ids: string[]): Promise<User[]> {
  const users = (await db.select().table('users').where('id', 'in', ids)) as User[];

  return users;
}

export const userService = {
  findByIdOrThrow,
  findByIds,
};
