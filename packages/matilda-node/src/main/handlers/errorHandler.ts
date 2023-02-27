import { ErrorRequestHandler } from 'express';
import { BaseError } from '../errors';

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  if (err instanceof BaseError) {
    return res.status(err.code).send(err.message);
  }
  console.error(err);

  res.status(500).send('Internal server error');
};
