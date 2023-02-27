import { Handler } from 'express';
import { getMatches } from '../services';

export const getTypeahead: Handler = (req, res) => {
  const prefix = req.params.prefix ?? '';

  const matches = getMatches(prefix);
  res.send(matches);
};
