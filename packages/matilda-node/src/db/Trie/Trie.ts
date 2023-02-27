import { Node } from './Node';

export class Trie {
  public root = new Node();

  constructor(names: string[]) {
    names.forEach((name) => this.insertName(name));
  }

  private insertName(name: string) {
    let current = this.root;
    name.split('').forEach((letter) => {
      current = current.addNode(letter);
    });
    current.isWordEnd = true;
  }

  private getEndNode(partial: string) {
    let current = this.root;

    for (const letter of partial.split('')) {
      const next = current.getNode(letter);

      if (!next) return undefined;
      current = next;
    }

    return current;
  }

  public getMatches(prefix: string) {
    const endNode = this.getEndNode(prefix);

    if (!endNode) return [];

    const matches = [];

    if (endNode.isWordEnd) matches.push(prefix);
    const nodes = endNode.getChildrenEntries();

    for (const [suffix, node] of nodes) {
      if (node.isWordEnd) matches.push(prefix + suffix);

      node
        .getChildrenEntries()
        .forEach(([letter, nextNode]) =>
          nodes.push([suffix + letter, nextNode]),
        );
    }

    return matches;
  }
}
