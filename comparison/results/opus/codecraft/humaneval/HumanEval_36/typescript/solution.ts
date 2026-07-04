//Return the number of times the digit 7 appears in integers less than n which are divisible by 11 or 13.
// >>> fizz_buzz(50)
// 0
// >>> fizz_buzz(78)
// 2
// >>> fizz_buzz(79)
// 3
function fizz_buzz(n: number): number {
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (i % 11 === 0 || i % 13 === 0) {
      count += String(i).split("").filter((digit) => digit === "7").length;
    }
  }
  return count;
}
