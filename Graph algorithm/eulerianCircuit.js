function dfs(root, edges, path) {
    while (edges[root].size > 0) {
        const [neighbor, index] = edges[root].values().next().value;
        edges[root].delete(neighbor);
        edges[neighbor].delete([root, index]);
        dfs(neighbor, edges, path);
    }
    path.push(root);
}

function EulerCircuits(n, edges) {
    // When sending an undirected graph, don't add the edges in the edgesVector on both sides
    // For an undirected graph:
    // - Circuit: all edges have even degree
    // - Path: exactly two vertices have an odd degree
    // Modify it for a directed graph by starting at a node with outdegree odd and ending at indegree odd
    // For a directed graph:
    // - Circuit: all vertices have even in-degree and out-degree
    // - Path: there are two vertices, one with out-degree greater than in-degree, and one with in-degree greater than out-degree

    const circuits = [];
    let counter = 0;
    const newEdges = Array.from({ length: n }, () => new Set());

    for (let i = 0; i < n; i++) {
        for (const j of edges[i]) {
            newEdges[i].add([j, counter]);
            newEdges[j].add([i, counter]);
            counter++;
        }
    }

    for (let i = 0; i < n; i++) {
        if (newEdges[i].size % 2 !== 0) {
            // Graph doesn't have an Eulerian circuit or path
            return circuits;
        }
    }

    for (let i = 0; i < n; i++) {
        if (newEdges[i].size > 0) {
            const path = [];
            dfs(i, newEdges, path);
            circuits.push(path);
        }
    }

    return circuits;
}

// Example usage:
const n = 4;
const edges = [
    [[1, 0], [2, 1]],
    [[0, 0], [2, 2], [3, 3]],
    [[0, 1], [1, 2], [3, 4]],
    [[1, 3], [2, 4]]
];

const eulerCircuits = EulerCircuits(n, edges);
console.log("Eulerian Circuits:", eulerCircuits);

//The code defines dfs and EulerCircuits functions to find Eulerian circuits in an undirected graph.