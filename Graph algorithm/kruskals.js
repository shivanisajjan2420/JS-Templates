class DisjointSet {
    constructor(size) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
        this.rank = new Array(size).fill(0);
    }

    findSet(x) {
        if (x !== this.parent[x]) {
            this.parent[x] = this.findSet(this.parent[x]);
        }
        return this.parent[x];
    }

    unionSets(x, y) {
        let rootX = this.findSet(x);
        let rootY = this.findSet(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                [rootX, rootY] = [rootY, rootX];
            }
            this.parent[rootY] = rootX;
            if (this.rank[rootX] === this.rank[rootY]) {
                this.rank[rootX]++;
            }
        }
    }
}

function kruskalMST(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);

    const disjointSet = new DisjointSet(n);
    const result = [];

    for (const [u, v, weight] of edges) {
        if (disjointSet.findSet(u) !== disjointSet.findSet(v)) {
            disjointSet.unionSets(u, v);
            result.push([Math.min(u, v), Math.max(u, v), weight]);
        }
    }

    return result;
}

function solve() {
    const n = 4; // Adjust the number of nodes as needed
    const m = 5; // Adjust the number of edges as needed
    const edges = [
        [0, 1, 2],
        [0, 2, 5],
        [1, 2, 4],
        [1, 3, 1],
        [2, 3, 3]
    ];

    const result = kruskalMST(n, edges);

    for (const [u, v, weight] of result) {
        console.log(u, v, weight);
    }
}

// Example usage:
solve();
//This JavaScript code defines a DisjointSet class for implementing disjoint-set data structure and a kruskalMST function for finding the Minimum Spanning Tree using Kruskal's algorithm.