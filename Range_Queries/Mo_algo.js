const block_size = 450;

function compare(p1, p2) {
    const b1 = Math.floor(p1[0][0] / block_size);
    const b2 = Math.floor(p2[0][0] / block_size);
    if (b1 === b2)
        return b1 % 2 === 0 ? p1[0][1] < p2[0][1] : p1[0][1] > p2[0][1];
    return b1 < b2;
}

function solve() {
    const input = require('fs').readFileSync('/dev/stdin', 'utf-8').split('\n');
    const [n, q] = input[0].split(' ').map(Number);
    let arr = new Array(n);
    let freq = new Array(n + 1).fill(0);
    let number = 1;
    let coordinateCompression = new Map();

    for (let i = 0; i < n; i++) {
        arr[i] = Number(input[i + 1]);
        if (!coordinateCompression.has(arr[i])) {
            coordinateCompression.set(arr[i], number);
            arr[i] = number;
            number++;
        } else {
            arr[i] = coordinateCompression.get(arr[i]);
        }
    }

    let start = 0;
    let end = -1;
    let ans = [];

    for (let i = 0; i < q; i++) {
        const [a, b] = input[n + 1 + i].split(' ').map(Number);
        ans.push([[a, b], i]);
    }

    ans.sort(compare);
    let ans1 = new Array(q);
    let count = 0;

    for (let i = 0; i < ans.length; i++) {
        const p1 = ans[i];
        const right = p1[0][1] - 1;
        const left = p1[0][0] - 1;

        while (start < left) {
            const x = arr[start];
            freq[x]--;
            if (freq[x] === 0) count--;
            start++;
        }

        while (start > left) {
            start--;
            const x = arr[start];
            freq[x]++;
            if (freq[x] === 1) count++;
        }

        while (end < right) {
            end++;
            const x = arr[end];
            freq[x]++;
            if (freq[x] === 1) count++;
        }

        while (end > right) {
            const x = arr[end];
            freq[x]--;
            if (freq[x] === 0) count--;
            end--;
        }

        ans1[p1[1]] = count;
    }

    for (let i = 0; i < q; i++) {
        console.log(ans1[i]);
    }
}

solve();
