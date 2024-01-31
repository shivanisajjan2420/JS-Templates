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
    constructor(edges1, n1, s, d) {
        this.n = n1;
        this.src = s;
        this.dest = d;
        this.iteration = 0;
        this.edgesT = [];
        this.edges = [];
        this.visited = Array(n1).fill(0);
        this.solved = false;
        this.flow = 0;
        this.init(edges1);
    }

    init(edges1) {
        for (let i = 0; i < this.n; i++) {
            this.edges.push([]);
            for (const [j, val] of edges1[i]) {
                const e1 = new Edge(this.edgesT.length, i, j, val, this.edgesT.length + 1);
                const e2 = new Edge(this.edgesT.length + 1, j, i, 0, this.edgesT.length);
                this.edgesT.push(e1);
                this.edgesT.push(e2);
                this.edges[i].push(e1.index);
                this.edges[j].push(e2.index);
            }
        }
    }

    bfs(root) {
        const queue = [];
        queue.push(root);
        this.visited[root] = this.iteration;
        const prev = new Array(this.n).fill(-1);

        while (queue.length > 0) {
            const node = queue.shift();
            if (node === this.dest) {
                break;
            }

            for (const i of this.edges[node]) {
                const e1 = this.edgesT[i];
                if (this.visited[e1.dest] !== this.iteration && e1.val > 0) {
                    this.visited[e1.dest] = this.iteration;
                    prev[e1.dest] = e1.index;
                    queue.push(e1.dest);
                }
            }
        }

        let currNode = this.dest;
        if (prev[currNode] === -1) {
            return 0;
        }

        let finalValue = Number.MAX_SAFE_INTEGER;
        while (prev[currNode] !== -1) {
            const e1 = this.edgesT[prev[currNode]];
            finalValue = Math.min(finalValue, e1.val);
            currNode = e1.src;
        }

        currNode = this.dest;
        while (prev[currNode] !== -1) {
            const e1 = this.edgesT[prev[currNode]];
            e1.val -= finalValue;
            this.edgesT[e1.index] = e1;
            this.edgesT[e1.residualIndex].val += finalValue;
            currNode = e1.src;
        }

        return finalValue;
    }

    EdmondsKarp() {
        while (true) {
            const f = this.bfs(this.src);
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
            this.EdmondsKarp();
        }
        return this.flow;
    }
}

// Example usage:
const n = 6;
const edges = [
    [[1, 5], [2, 1]],
    [[3, 2]],
    [[4, 4]],
    [[5, 3]],
    [[1, 7]],
    []
];

const flowNetwork = new Flow(edges, n, 0, 5);
const maxFlow = flowNetwork.maxFlow();

console.log("Max Flow:", maxFlow);
//the Edmonds-Karp algorithm is implemented to find the maximum flow in the flow network.






