export class Node {
  private children: Record<string, Node>;
  public isWordEnd = false;

  constructor() {
    this.children = {};
  }

  public addNode(letter: string) {
    this.children[letter] ??= new Node();

    return this.children[letter];
  }

  public getNode(letter: string): Node | undefined {
    return this.children[letter];
  }

  public getChildren() {
    return { ...this.children };
  }

  public getChildrenEntries() {
    return Object.entries(this.getChildren());
  }
}
