function fizz_buzz(n){
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (i % 11 === 0 || i % 13 === 0) {
            count += String(i).split('').filter(d => d === '7').length;
        }
    }
    return count;
}
