function fizz_buzz(n: number): number {
  let count = 0;
  for (let i = 1; i < n; i++) {
    if (i % 11 === 0 || i % 13 === 0) {
      const str = String(i);
      count += (str.match(/7/g) || []).length;
    }
  }
  return count;
}
