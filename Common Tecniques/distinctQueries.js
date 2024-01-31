function compare(a, b) {
    return a[0][1] < b[0][1];
}

function update(index, bit, value) {
    for (; index < bit.length; index += index & -index) {
        bit[index] += value;
    }
}

function query(index, bit) {
    let sum = 0;
    for (; index > 0; index -= index & -index) {
        sum += bit[index];
    }
    return sum;
}

function distinctQueries(n, q, arr, queries) {
    let compression = new Map();
    let prev = 0;

    arr = arr.map((element) => {
        if (!compression.has(element)) {
            compression.set(element, prev);
            prev++;
        }
        return compression.get(element);
    });

    let lastIndex = Array.from({ length: compression.size }, () => -1);
    let tempQueries = [];

    for (let i = 0; i < q; i++) {
        tempQueries.push([
            [queries[i][0] + 1, queries[i][1] + 1],
            i
        ]);
    }

    let ans = Array(q).fill(0);
    tempQueries.sort(compare);

    let num = 0;
    let bit = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        if (lastIndex[arr[i]] !== -1) {
            update(lastIndex[arr[i]] + 1, bit, -1);
        }
        lastIndex[arr[i]] = i;
        update(i + 1, bit, 1);

        while (num < q && tempQueries[num][0][1] === i + 1) {
            let index = tempQueries[num][1];
            ans[index] = query(i + 1, bit) - query(tempQueries[num][0][0] - 1, bit);
            num++;
        }
    }

    return ans;
}

// Example usage:
const n = 5;
const q = 3;
const arr = [1, 2, 1, 3, 2];
const queries = [[1, 3], [2, 5], [1, 5]];

const result = distinctQueries(n, q, arr, queries);
console.log(result);  // Output: [3, 4, 4]
