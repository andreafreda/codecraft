function countOccurrences(num, digit) {
  return String(num).split(digit).length - 1;
}

function fizz_buzz(n) {
  let count = 0;
  for (let i = 1; i < n; i++) {
    if (i % 11 === 0 || i % 13 === 0) {
      count += countOccurrences(i, '7');
    }
  }
  return count;
}
