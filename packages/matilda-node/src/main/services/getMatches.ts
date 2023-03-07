import { env } from '../../config';
import { client } from '../../db';

export const getMatches = (prefix: string) => {
  const matches = client.getMatches(prefix);

  matches.sort((a, b) => {
    if (areEqual(a.name, prefix)) return -1;
    if (areEqual(b.name, prefix)) return 1;
    if (a.times > b.times) return -1;
    if (a.times < b.times) return 1;
    if (a.name > b.name) return 1;
    return -1;
  });

  return matches.slice(0, env.limit);
};

const areEqual = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
