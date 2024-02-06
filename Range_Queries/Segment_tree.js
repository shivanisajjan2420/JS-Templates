class Node1 {
    constructor(p1) {
        this.val = p1 || 0;
    }

    merge(l, r) {
        this.val = l.val ^ r.val;
    }
}

class Update1 {
    constructor(p1) {
        this.val = p1;
    }

    apply(a) {
        a.val = this.val;
    }
}

class SegTree {
    constructor(a_len, a) {
        this.arr = a;
        this.n = a_len;
        this.s = 1;
        while (this.s < 2 * this.n) {
            this.s = this.s << 1;
        }
        this.tree = new Array(this.s).fill().map(() => new Node1());
        this.build(0, this.n - 1, 1);
    }

    build(start, end, index) {
        if (start === end) {
            this.tree[index] = new Node1(this.arr[start]);
            return;
        }
        const mid = Math.floor((start + end) / 2);
        this.build(start, mid, 2 * index);
        this.build(mid + 1, end, 2 * index + 1);
        this.tree[index].merge(this.tree[2 * index], this.tree[2 * index + 1]);
    }

    update(start, end, index, query_index, u) {
        if (start === end) {
            u.apply(this.tree[index]);
            return;
        }
        const mid = Math.floor((start + end) / 2);
        if (mid >= query_index)
            this.update(start, mid, 2 * index, query_index, u);
        else
            this.update(mid + 1, end, 2 * index + 1, query_index, u);
        this.tree[index].merge(this.tree[2 * index], this.tree[2 * index + 1]);
    }

    query(start, end, index, left, right) {
        if (start > right || end < left)
            return new Node1();
        if (start >= left && end <= right)
            return this.tree[index];
        const mid = Math.floor((start + end) / 2);
        const l = this.query(start, mid, 2 * index, left, right);
        const r = this.query(mid + 1, end, 2 * index + 1, left, right);
        const ans = new Node1();
        ans.merge(l, r);
        return ans;
    }

    make_update(index, val) {
        const new_update = new Update1(val);
        this.update(0, this.n - 1, 1, index, new_update);
    }

    make_query(left, right) {
        return this.query(0, this.n - 1, 1, left, right);
    }
}

// Example Usage:
const n = 6;
const arr = [1, 2, 3, 4, 5, 6];
const segTree = new SegTree(n, arr);

console.log(segTree.make_query(2, 5).val); // Output: 3
segTree.make_update(3, 10);
console.log(segTree.make_query(2, 5).val); // Output: 9
