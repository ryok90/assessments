import { Handler } from 'express';
import { BadRequestError } from '../errors';
import { bumpTimes } from '../services';

export const postTypeahead: Handler = (req, res) => {
  const { name } = validate(req.body);

  const entry = bumpTimes(name);

  if (!entry) throw new BadRequestError();

  res.status(201).send(entry);
};

const validate = (body: Record<string, unknown>) => {
  if (typeof body?.name !== 'string') throw new BadRequestError();

  return { name: body.name };
};
