function fizz_buzz(n: number): number {
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (i % 11 === 0 || i % 13 === 0) {
            count += i.toString().split('').filter(digit => digit === '7').length;
        }
    }
    return count;
}
