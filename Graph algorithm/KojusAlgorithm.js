//Kosaraju's algorithm to find the strongly connected components (SCCs) in a directed graph.

function debug(x) {
    console.error(x);
}

// Equivalent for "fastio()" in JavaScript
function fastio() {
    // No equivalent required in JavaScript
}

// Equivalent for "solve()" function in JavaScript
function solve() {
    let n, e;
    // Reading input values in JavaScript
    // Assume that the input is read from standard input or other appropriate source
    // Example: n = 5, e = 6;
    // Example edges input: [[1, 2], [2, 3], [3, 1], [3, 4], [4, 5], [5, 4]];
    
    // JavaScript array indices start from 0, so adjust input accordingly
    let edges = [[0, 1], [1, 2], [2, 0], [2, 3], [3, 4], [4, 3]];
    
    let edgesT = new Array(n).fill(0).map(() => []);

    for (let i = 0; i < e; i++) {
        let [a, b] = edges[i];
        edgesT[b].push(a);
    }

    // Function to perform topological sort
    function topoSort(start, edges, topo, visited) {
        visited[start] = true;
        for (let i of edges[start]) {
            if (!visited[i]) {
                topoSort(i, edges, topo, visited);
            }
        }
        topo.push(start);
    }

    // Function to get strongly connected component (SCC)
    function getComponent(start, edges, currComponent, visited) {
        currComponent.push(start);
        visited[start] = true;
        for (let i of edges[start]) {
            if (!visited[i]) {
                getComponent(i, edges, currComponent, visited);
            }
        }
    }

    // Function to get SCCs using Kosaraju's algorithm
    function getSCC(n, edges, edgesT) {
        let visited = new Array(n).fill(false);
        let topo = [];

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                topoSort(i, edges, topo, visited);
            }
        }

        visited.fill(false);
        let SCC = [];

        for (let i = topo.length - 1; i >= 0; i--) {
            if (!visited[topo[i]]) {
                let comp = [];
                getComponent(topo[i], edgesT, comp, visited);
                SCC.push(comp);
            }
        }

        return SCC;
    }

    let SCC = getSCC(n, edges, edgesT);
    console.log(SCC);
}

// Equivalent for "int main()" in JavaScript
function main() {
    fastio();
    let start1 = Date.now();
    solve();
    let stop1 = Date.now();
    let duration = stop1 - start1;
    console.log("Time: " + duration + "ms");
}

// Call the main function to run the program
main();
