function fizz_buzz(n: number): number {
    let sevenCount = 0;

    for (let i = 0; i < n; i++) {
        if (i % 11 === 0 || i % 13 === 0) {
            sevenCount += countSevens(i);
        }
    }

    return sevenCount;
}

function countSevens(value: number): number {
    return String(value)
        .split('')
        .filter((digit) => digit === '7').length;
}
