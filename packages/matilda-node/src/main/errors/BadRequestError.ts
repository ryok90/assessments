import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message = 'Bad request') {
    super(message);
  }
  code = 400;
}
