import names from '../../../names.json';
import { Trie } from './Trie';

type Name = {
  name: string;
  times: number;
};

class Client {
  constructor() {
    this.lowerCaseMap = {};
    Object.entries(names).forEach(([name, times]) => {
      this.lowerCaseMap[name.toLowerCase()] = { name, times };
    });
    this.trie = new Trie(Object.keys(this.lowerCaseMap));
  }

  private trie: Trie;
  private lowerCaseMap: Record<string, Name>;

  public getMatches(prefix: string) {
    const lowerPrefix = prefix.toLowerCase();
    const lowerCaseMatches = this.trie.getMatches(lowerPrefix);
    const matches: { name: string; times: number }[] = [];

    lowerCaseMatches.forEach((lowerCaseName) =>
      matches.push(this.lowerCaseMap[lowerCaseName]),
    );

    return matches;
  }

  public bumpTimes(name: string) {
    const entry = this.lowerCaseMap[name.toLowerCase()];

    if (!entry) return undefined;

    entry.times++;

    return entry;
  }
}

export const client = new Client();
