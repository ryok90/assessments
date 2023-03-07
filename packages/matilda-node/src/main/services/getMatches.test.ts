import { getMatches } from './getMatches';

const mockGetMatches = jest.fn();
jest.mock('../../db', () => ({
  client: { getMatches: (...args: unknown[]) => mockGetMatches(...args) },
}));
jest.mock('../../config', () => ({ env: { limit: 5 } }));

describe('main/services/getMatches', () => {
  it('should return firstly ordered by exact match', () => {
    const prefix = 'aaa';
    const matches = [
      { name: prefix + 'bbb', times: 999 },
      { name: prefix, times: 1 },
    ];
    mockGetMatches.mockReturnValueOnce([...matches]);

    const result = getMatches(prefix);

    expect(result).toEqual([matches[1], matches[0]]);
  });

  it('should return secondly ordered by highest times', () => {
    const prefix = 'aaa';
    const matches = [
      { name: prefix + 'bbb', times: 50 },
      { name: prefix, times: 1 },
      { name: prefix + 'ccc', times: 999 },
    ];
    mockGetMatches.mockReturnValueOnce([...matches]);

    const result = getMatches(prefix);

    expect(result).toEqual([matches[1], matches[2], matches[0]]);
  });

  it('should return thirdly ordered ascending alphabetically', () => {
    const prefix = 'aaa';
    const matches = [
      { name: prefix + 'ccc', times: 999 },
      { name: prefix + 'aaa', times: 50 },
      { name: prefix + 'ddd', times: 50 },
      { name: prefix + 'bbb', times: 50 },
      { name: prefix, times: 1 },
    ];
    mockGetMatches.mockReturnValueOnce([...matches]);

    const result = getMatches(prefix);

    expect(result).toEqual([
      matches[4],
      matches[0],
      matches[1],
      matches[3],
      matches[2],
    ]);
  });

  it('should return respecting limit from env', () => {
    const prefix = 'aaa';
    const matches = [
      { name: prefix + 'ccc', times: 999 },
      { name: prefix + 'aaa', times: 50 },
      { name: prefix + 'ddd', times: 50 },
      { name: prefix + 'bbb', times: 50 },
      { name: prefix + 'eee', times: 50 },
      { name: prefix, times: 1 },
    ];
    mockGetMatches.mockReturnValueOnce([...matches]);

    const result = getMatches(prefix);

    expect(result.length).toBe(5);
  });
});
