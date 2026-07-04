function fizz_buzz(n: number): number {
  let count = 0;
  for (let i = 0; i < n; i++) {
    const isDivisibleBy11Or13 = i % 11 === 0 || i % 13 === 0;
    if (isDivisibleBy11Or13) {
      const digits = String(i).split("");
      const sevens = digits.filter((digit) => digit === "7");
      count += sevens.length;
    }
  }
  return count;
}
