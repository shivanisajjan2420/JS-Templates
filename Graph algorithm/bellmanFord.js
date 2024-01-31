const INF = 1e18;

function BellmanFord(n, src, edges, dist, negCycle) {
    dist.fill(INF);
    dist[src] = 0;

    const e = [];
    for (let i = 0; i < n; i++) {
        for (const j of edges[i]) {
            e.push([j[1], [i, j[0]]]);
        }
    }

    for (let i = 0; i < n - 1; i++) {
        for (const j of e) {
            dist[j[1][1]] = Math.min(dist[j[1][1]], dist[j[1][0]] + j[0]);
        }
    }

    // Checking for negative cycle
    for (let i = 0; i < n; i++) {
        for (const j of e) {
            if (dist[j[1][1]] > dist[j[1][0]] + j[0]) {
                dist[j[1][1]] = dist[j[1][0]] + j[0];
                negCycle.add(j[1][1]);
            }
        }
    }
}

// Example usage:
const n = 5;
const src = 0;
const edges = [
    [[1, 5], [2, 4]],
    [[3, -3]],
    [[4, 2]],
    [[1, 6]],
    []
];
const dist = new Array(n).fill(0);
const negCycle = new Set();

BellmanFord(n, src, edges, dist, negCycle);

console.log("Shortest Distances:", dist);
console.log("Negative Cycle Vertices:", Array.from(negCycle));
//The adjustments include using let and const for variable declarations, using Math.min for finding the minimum value, and modifying the loop structures. 