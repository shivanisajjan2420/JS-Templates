// Importing required libraries
const readline = require('readline');

// Utility function to read input
async function input() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

// Function to perform Depth-First Search (DFS) during topological sorting
function dfs(start, edges, visited, ans) {
    visited[start] = true;
    for (const i of edges[start]) {
        if (!visited[i]) {
            dfs(i, edges, visited, ans);
        }
    }
    ans.push(start);
}

// Function to perform topological sorting
function topologicalSort(n, edges) {
    const ans = [];
    const visited = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, edges, visited, ans);
        }
    }

    ans.reverse();
    return ans.map(vertex => vertex + 1);
}

// Main function
async function main() {
    // Reading input
    const nm = (await input()).split(' ');
    const n = parseInt(nm[0]);
    const m = parseInt(nm[1]);

    const edges = Array.from({ length: n }, () => []);

    // Constructing the graph
    for (let i = 0; i < m; i++) {
        const uv = (await input()).split(' ');
        const u = parseInt(uv[0]) - 1;
        const v = parseInt(uv[1]) - 1;
        edges[u].push(v);
    }

    // Performing topological sorting
    const result = topologicalSort(n, edges);

    // Printing the result
    console.log(result.join(' '));
}

// Calling the main function
main();
