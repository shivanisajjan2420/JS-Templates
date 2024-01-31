class Edge {
    constructor(index, src, dest, val, residualIndex) {
        this.index = index;
        this.src = src;
        this.dest = dest;
        this.val = val;
        this.residualIndex = residualIndex;
    }
}

class Flow {
    constructor(edges, n, s, d) {
        this.n = n;
        this.src = s;
        this.dest = d;
        this.iteration = 0;
        this.edgesT = [];
        this.edges = new Array(n).fill().map(() => []);
        this.visited = new Array(n).fill(0);
        this.solved = false;
        this.flow = 0;

        for (let i = 0; i < n; i++) {
            for (const [j, weight] of edges[i]) {
                const e1 = new Edge(this.edgesT.length, i, j, weight, this.edgesT.length + 1);
                const e2 = new Edge(this.edgesT.length + 1, j, i, 0, this.edgesT.length);
                this.edgesT.push(e1);
                this.edgesT.push(e2);
                this.edges[i].push(e1.index);
                this.edges[j].push(e2.index);
            }
        }
    }

    dfs(root, currValue) {
        this.visited[root] = this.iteration;

        if (root === this.dest) {
            return currValue;
        }

        for (const i of this.edges[root]) {
            const e1 = this.edgesT[i];
            const e2 = this.edgesT[e1.residualIndex];

            if (this.visited[e1.dest] !== this.iteration && e1.val > 0) {
                const val = this.dfs(e1.dest, Math.min(e1.val, currValue));

                if (val > 0) {
                    e1.val -= val;
                    e2.val += val;
                    this.edgesT[i] = e1;
                    this.edgesT[e1.residualIndex] = e2;
                    return val;
                }
            }
        }

        return 0;
    }

    FordFulkersonFlow() {
        while (true) {
            const f = this.dfs(this.src, Infinity);

            if (f === 0) {
                return;
            }

            this.flow += f;
            this.iteration++;
        }
    }

    maxFlow() {
        if (!this.solved) {
            this.solved = true;
            this.FordFulkersonFlow();
        }

        return this.flow;
    }
}

// Example usage:
const n = 4;
const edges = [
    [[1, 2], [2, 5]],
    [[0, 2], [3, 1]],
    [[0, 5], [3, 4]],
    [[1, 1], [2, 4]]
];

const flowNetwork = new Flow(edges, n, 0, 3);
const maxFlow = flowNetwork.maxFlow();
console.log("Maximum Flow:", maxFlow);
//The class Flow represents the flow network, and the methods dfs and FordFulkersonFlow implement the Ford-Fulkerson algorithm.
// The maxFlow method calculates and returns the maximum flow in the network.