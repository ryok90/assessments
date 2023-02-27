import { client } from './client';
import names from '../../../names.json';

describe('db/Trie/client', () => {
  const entries = Object.entries(names);

  it('should return all matches for a given prefix', () => {
    const result = client.getMatches('a');

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          times: expect.any(Number),
        }),
      ]),
    );
  });

  it('should return matches regardless of string case', () => {
    const result = client.getMatches('ABBE');

    expect(result).toEqual(
      expect.arrayContaining([{ name: 'Abbe', times: expect.any(Number) }]),
    );
  });

  it('should return empty array when no matches are found', () => {
    const result = client.getMatches('asdfasdf');

    expect(result).toEqual([]);
  });

  it('should bump popularity of a given name and return it', () => {
    const [name, times] = entries[0];

    const result = client.bumpTimes(name);

    expect(result).toEqual({ name, times: times + 1 });
  });

  it('should return undefined when trying to bump nonexistent name', () => {
    const result = client.bumpTimes('asdfasdf');

    expect(result).toBeUndefined();
  });
});
