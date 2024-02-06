function expo1(a, b, mod) {
    let res = 1;
    while (b > 0) {
        if (b & 1)
            res = (res * a) % mod;
        a = (a * a) % mod;
        b = b >> 1;
    }
    return res;
}

function checkComposite(n, a, d, s) {
    let x = expo1(a, d, n);
    if (x == 1 || x == n - 1)
        return false;
    for (let r = 1; r < s; r++) {
        x = (x * x) % n;
        if (x == n - 1)
            return false;
    }
    return true;
}

function millerRabin(n) {
    if (n < 2)
        return false;

    let r = 0;
    let d = n - 1;
    while ((d & 1) == 0) {
        d >>= 1;
        r++;
    }

    const bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    for (let i = 0; i < bases.length; i++) {
        let a = bases[i];
        if (n == a)
            return true;
        if (checkComposite(n, a, d, r))
            return false;
    }
    return true;
}

// Example usage:
let result = millerRabin(17); // Replace 17 with the number you want to test
console.log(result);
