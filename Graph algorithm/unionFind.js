class UnionFind {
    constructor(n) {
      this.n = n;
      this.rank = new Array(n).fill(0);
      this.parent = [...Array(n).keys()]; // Initially, each element is its own parent
    }
  
    get(a) {
      return (this.parent[a] = this.parent[a] === a ? a : this.get(this.parent[a]));
    }
  
    merge(a, b) {
      a = this.get(a);
      b = this.get(b);
  
      if (a === b) {
        return;
      }
  
      if (this.rank[a] === this.rank[b]) {
        this.rank[a]++;
      }
  
      if (this.rank[a] > this.rank[b]) {
        this.parent[b] = a;
      } else {
        this.parent[a] = b;
      }
    }
  }
  
  // Example usage:
  const n = 5; // Number of elements
  const unionFind = new UnionFind(n);
  
  unionFind.merge(0, 1);
  unionFind.merge(2, 3);
  console.log(unionFind.get(1)); // Output: 0 (both 0 and 1 are in the same set)
  console.log(unionFind.get(3)); // Output: 2 (both 2 and 3 are in the same set)
  