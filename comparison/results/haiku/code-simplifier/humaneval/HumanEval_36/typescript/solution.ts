function fizz_buzz(n: number): number {
  function countSevens(num: number): number {
    return (String(num).match(/7/g) || []).length;
  }

  let count = 0;
  for (let i = 1; i < n; i++) {
    if (i % 11 === 0 || i % 13 === 0) {
      count += countSevens(i);
    }
  }
  return count;
}
