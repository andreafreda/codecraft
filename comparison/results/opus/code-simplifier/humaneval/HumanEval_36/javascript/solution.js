function fizz_buzz(n) {
  let sevenCount = 0;
  for (let i = 0; i < n; i++) {
    const isMultipleOf11Or13 = i % 11 === 0 || i % 13 === 0;
    if (isMultipleOf11Or13) {
      const digits = String(i).split('');
      sevenCount += digits.filter(digit => digit === '7').length;
    }
  }
  return sevenCount;
}
