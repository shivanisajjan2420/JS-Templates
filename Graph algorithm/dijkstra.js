const INF = Number.MAX_SAFE_INTEGER;

function Dijkstra(s, n, dist, parent, adj) {
    dist.fill(INF);
    parent.fill(-1);
    dist[s] = 0;
    const pq = new PriorityQueue((a, b) => a[0] < b[0]);
    pq.enqueue([0, s]);

    while (!pq.isEmpty()) {
        const [d_v, v] = pq.dequeue();
        if (d_v !== dist[v]) {
            continue;
        }

        for (const [u, w] of adj[v]) {
            if (dist[v] + w < dist[u]) {
                dist[u] = dist[v] + w;
                parent[u] = v;
                pq.enqueue([dist[u], u]);
            }
        }
    }
}

// Priority Queue implementation
class PriorityQueue {
    constructor(comparator) {
        this.heap = [];
        this.comparator = comparator || ((a, b) => a < b);
    }

    enqueue(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    dequeue() {
        const front = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return front;
    }

    peek() {
        return this.heap[0];
    }

    get length() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const current = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (this.comparator(current[0], parent[0])) {
                break;
            }

            this.heap[index] = parent;
            this.heap[parentIndex] = current;
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const current = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (this.comparator(leftChild[0], current[0])) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && this.comparator(rightChild[0], current[0])) ||
                    (swap !== null && this.comparator(rightChild[0], leftChild[0]))
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) {
                break;
            }

            this.heap[index] = this.heap[swap];
            this.heap[swap] = current;
            index = swap;
        }
    }
}

// Example usage:
const n = 6;
const adj = [
    [[1, 5], [2, 1]],
    [[3, 2]],
    [[4, 4]],
    [[5, 3]],
    [[1, 7]],
    []
];
const dist = new Array(n).fill(0);
const parent = new Array(n).fill(0);

Dijkstra(0, n, dist, parent, adj);

console.log("Shortest Distances:", dist);
console.log("Parent Array:", parent);
