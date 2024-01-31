// O(n^3)
// All pair shortest paths
// Negative Cycle needs to be checked otherwise the answer can be very negative resulting in overflows
// Maintain p[][] for getting the path. Recursively find the path between i and p[i][j], p[i][j] and j.

function FloydWarshall(n, adj) {
    const INF = Number.MAX_SAFE_INTEGER;

    // Initialize the distance matrix with INF
    const dist = Array.from({ length: n }, () => Array(n).fill(INF));

    // Set the diagonal elements to 0 and fill the distance matrix with initial edge weights
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
        for (const [j, weight] of adj[i]) {
            dist[i][j] = Math.min(dist[i][j], weight);
        }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    // Update the distance if there is a shorter path through vertex k
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    return dist;
}

// Example usage:
const n = 4;
const adj = [
    [[1, 2], [2, 5]],
    [[0, 2], [3, 1]],
    [[0, 5], [3, 4]],
    [[1, 1], [2, 4]]
];

const result = FloydWarshall(n, adj);
console.log("All Pair Shortest Paths:", result);
//the function FloydWarshall takes the number of vertices n and an adjacency list adj representing the weighted directed graph, and returns a 2D array containing the shortest distances between all pairs of vertices.







