//calculate the nth Fibonacci number efficiently
const MOD = 1000000007;
const ll = BigInt;

const identityMatrix = [
    [ll(1), ll(0)],
    [ll(0), ll(1)]
];

let result = [
    [ll(0), ll(0)],
    [ll(0), ll(0)]
];

function multiply(a, b) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            result[i][j] = ll(0);
            for (let k = 0; k < 2; k++) {
                result[i][k] += a[i][j] * b[j][k];
                result[i][k] %= MOD;
            }
        }
    }
}

function matrixExpo(matrix, n) {
    if (n === 0n) {
        result = [...identityMatrix];
        return;
    }

    matrixExpo(matrix, n / 2n);
    multiply(result, result);

    if (n % 2n === 1n) {
        multiply(result, matrix);
    }
}

function nthFibonacciNumber(n) {
    if (n <= 1n) {
        return n;
    }

    const baseMatrix = [
        [ll(1), ll(1)],
        [ll(1), ll(0)]
    ];

    multiply(baseMatrix, identityMatrix);
    matrixExpo(baseMatrix, n - 1n);

    return result[0][0];
}

// Example usage:
const n = ll(10);
const results = nthFibonacciNumber(n);
console.log(result.toString());
//Note that I used BigInt to handle large numbers as n can be as large as 1e18