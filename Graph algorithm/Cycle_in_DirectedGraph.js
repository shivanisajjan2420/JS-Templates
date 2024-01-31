const fastio = () => {
    // No equivalent required in JavaScript
};

const dfs = (start, edges, w, g, b) => {
    w[start] = false;
    g[start] = true;
    for (const i of edges[start]) {
        if (g[i]) {
            return false;
        }
        if (w[i]) {
            const ans = dfs(i, edges, w, g, b);
            if (!ans) {
                return false;
            }
        }
    }
    g[start] = false;
    b[start] = true;
    return true;
};

const checkCycle = (n, edges) => {
    const white = new Array(n).fill(true);
    const grey = new Array(n).fill(false);
    const black = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        if (white[i]) {
            const ans = dfs(i, edges, white, grey, black);
            if (!ans) {
                return true;
            }
        }
    }
    return false;
};

const main = () => {
    fastio();

    // Example input
    const n = 3;
    const m = 3;
    const edges = [[1, 2], [2, 3], [3, 1]];

    const check = checkCycle(n, edges);
    if (check) {
        console.log("IMPOSSIBLE");
    }
};

main();
