// Lazy Segment Tree with Range Updates and Range Queries
// Supports multiple Segment Trees with just a change in the Node and Update
// Very few changes required everytime
class LazySGT {
    constructor(a_len, a) {
        this.arr = a;
        this.n = a_len;
        this.s = 1;
        while (this.s < 2 * this.n) {
            this.s <<= 1;
        }
        this.tree = new Array(this.s).fill(new Node1());
        this.lazy = new Array(this.s).fill(false);
        this.updates = new Array(this.s).fill(new Update1());
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

    pushdown(index, start, end) {
        if (this.lazy[index]) {
            const mid = Math.floor((start + end) / 2);
            this.apply(2 * index, start, mid, this.updates[index]);
            this.apply(2 * index + 1, mid + 1, end, this.updates[index]);
            this.updates[index] = new Update1();
            this.lazy[index] = false;
        }
    }

    apply(index, start, end, u) {
        if (start !== end) {
            this.lazy[index] = true;
            this.updates[index].combine(u, start, end);
        }
        u.apply(this.tree[index], start, end);
    }

    update(start, end, index, left, right, u) {
        if (start > right || end < left)
            return;
        if (start >= left && end <= right) {
            this.apply(index, start, end, u);
            return;
        }
        this.pushdown(index, start, end);
        const mid = Math.floor((start + end) / 2);
        this.update(start, mid, 2 * index, left, right, u);
        this.update(mid + 1, end, 2 * index + 1, left, right, u);
        this.tree[index].merge(this.tree[2 * index], this.tree[2 * index + 1]);
    }

    query(start, end, index, left, right) {
        if (start > right || end < left)
            return new Node1();
        if (start >= left && end <= right) {
            this.pushdown(index, start, end);
            return this.tree[index];
        }
        this.pushdown(index, start, end);
        const mid = Math.floor((start + end) / 2);
        const l = this.query(start, mid, 2 * index, left, right);
        const r = this.query(mid + 1, end, 2 * index + 1, left, right);
        const ans = new Node1();
        ans.merge(l, r);
        return ans;
    }

    makeUpdate(left, right, val) {
        const newUpdate = new Update1(val);
        this.update(0, this.n - 1, 1, left, right, newUpdate);
    }

    makeQuery(left, right) {
        return this.query(0, this.n - 1, 1, left, right);
    }
}

class Node1 {
    constructor(p1) {
        this.val = p1 || 0;
    }

    merge(l, r) {
        this.val = l.val + r.val;
    }
}

class Update1 {
    constructor(val) {
        this.val = val || 0;
    }

    apply(a, start, end) {
        a.val = this.val * (end - start + 1);
    }

    combine(newUpdate, start, end) {
        this.val = newUpdate.val;
    }
}
