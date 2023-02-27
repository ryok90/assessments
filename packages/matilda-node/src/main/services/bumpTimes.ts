import { client } from '../../db';

export const bumpTimes = (name: string) => {
  return client.bumpTimes(name);
};
