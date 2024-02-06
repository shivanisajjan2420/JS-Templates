// Function to implement Prim's algorithm for MST
function prims(edges, n) {
    const visited = new Array(n).fill(false);
    const parent = new Array(n).fill(-1);
    const weight = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    weight[0] = 0;

    // Priority queue to get the minimum-weight vertex efficiently
    const pq = new PriorityQueue((a, b) => a[1] - b[1]);
    pq.enqueue([0, 0]);

    for (let i = 0; i < n - 1; i++) {
        // Get the minimum-weight vertex
        let [minVertex, minWeight] = pq.dequeue();
        while (visited[minVertex]) {
            [minVertex, minWeight] = pq.dequeue();
        }

        visited[minVertex] = true;

        // Explore all neighbors of minVertex and update accordingly
        for (const [neighbor, edgeWeight] of edges[minVertex]) {
            if (visited[neighbor]) {
                continue;
            }

            if (weight[neighbor] > edgeWeight) {
                // Update the current weight of the neighbor and change its parent also
                weight[neighbor] = edgeWeight;
                parent[neighbor] = minVertex;
                pq.enqueue([neighbor, weight[neighbor]]);
            }
        }
    }

    // Print the MST edges
    for (let i = 1; i < n; i++) {
        console.log(i, parent[i], weight[i]);
    }
}

// Priority Queue implementation
class PriorityQueue {
    constructor(compareFunction) {
        this.compare = compareFunction;
        this.queue = [];
    }

    enqueue(item) {
        this.queue.push(item);
        this.bubbleUp();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.queue[0];
        const last = this.queue.pop();

        if (this.queue.length > 0) {
            this.queue[0] = last;
            this.bubbleDown();
        }

        return root;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    bubbleUp() {
        let index = this.queue.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.queue[index], this.queue[parentIndex]) < 0) {
                [this.queue[index], this.queue[parentIndex]] = [this.queue[parentIndex], this.queue[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.queue.length;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = null;

            if (leftChildIndex < length) {
                if (this.compare(this.queue[leftChildIndex], this.queue[index]) < 0) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                const compareRight = swapIndex === null ? rightChildIndex : swapIndex;
                if (this.compare(this.queue[compareRight], this.queue[index]) < 0) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) {
                break;
            }

            [this.queue[index], this.queue[swapIndex]] = [this.queue[swapIndex], this.queue[index]];
            index = swapIndex;
        }
    }
}

// Example usage
const n = 4;
const edges = [
    [[1, 2], 1],
    [[0, 2], 3],
    [[0, 1], 2],
    [[1, 3], 4],
    [[2, 3], 5]
];

// Call the function to find the MST using Prim's algorithm
prims(edges, n);
