import { BaseError } from './base.error.js';

export class BadRequestError extends BaseError {
  constructor(payload: Record<string, string[] | undefined>) {
    super({
      errorCodename: 'BAD_REQUEST',
      httpStatusCode: 400,
      message: 'The server cannot process your request.',
      payload,
    });
  }
}
