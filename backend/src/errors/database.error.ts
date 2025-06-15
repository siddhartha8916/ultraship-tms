import { BaseError, IBaseErrorConstructorArgs } from './base.error.js';

/**
 * DatabaseError is used to represent errors that occur during database operations.
 * It extends the BaseError class and provides a specific error codename for database-related issues.
 */
export class DatabaseError extends BaseError {
  constructor(args: Omit<IBaseErrorConstructorArgs, 'errorCodename'>) {
    super({
      ...args,
      errorCodename: 'DATABASE_ERROR',
    });
  }
}
