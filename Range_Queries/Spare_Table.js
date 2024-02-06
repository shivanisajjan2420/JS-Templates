// O(1) for idempotent O(logN) for general
// Supports multiple sparse tables with minor change in Node

class Node1 {
    constructor(v) {
        this.val = v || 0;
    }

    merge(l, r) {
        this.val = l.val ^ r.val;
    }
}

class SparseTable {
    constructor(n1, arr) {
        this.n = n1;
        this.a = arr;
        this.table = new Array(this.n).fill().map(() => new Array());
        this.logValues = new Array(this.n + 1);
        this.maxLog = Math.log2(this.n);
        this.build();
    }

    build() {
        for (let i = 0; i < this.n; i++) {
            this.table[i][0] = new Node1(this.a[i]);
        }
        for (let j = 1; (1 << j) <= this.n; j++) {
            for (let i = 0; i + (1 << j) <= this.n; i++) {
                this.table[i][j] = new Node1();
                this.table[i][j].merge(this.table[i][j - 1], this.table[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    queryNormal(left, right) {
        let ans = new Node1();
        for (let j = Math.floor(Math.log2(right - left + 1)); j >= 0; j--) {
            if ((1 << j) <= right - left + 1) {
                ans.merge(ans, this.table[left][j]);
                left += (1 << j);
            }
        }
        return ans;
    }

    queryIdempotent(left, right) {
        const j = Math.floor(Math.log2(right - left + 1));
        const ans = new Node1();
        ans.merge(this.table[left][j], this.table[right - (1 << j) + 1][j]);
        return ans;
    }
}

// Example Usage:
const n = 6;
const arr = [1, 2, 3, 4, 5, 6];
const sparseTable = new SparseTable(n, arr);

console.log(sparseTable.queryNormal(2, 5).val); // Output: 6
console.log(sparseTable.queryIdempotent(2, 5).val); // Output: 6
