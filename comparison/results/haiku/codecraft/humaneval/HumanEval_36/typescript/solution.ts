function fizz_buzz(n: number): number {
  let count = 0;
  for (let i = 1; i < n; i++) {
    if (i % 11 === 0 || i % 13 === 0) {
      const str = i.toString();
      for (const char of str) {
        if (char === '7') {
          count++;
        }
      }
    }
  }
  return count;
}
