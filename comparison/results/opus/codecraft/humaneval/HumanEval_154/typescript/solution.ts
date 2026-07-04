//You are given 2 words. You need to return true if the second word or any of its rotations is a substring in the first word
// >>> cycpattern_check("abcd", "abd")
// false
// >>> cycpattern_check("hello", "ell")
// true
// >>> cycpattern_check("whassup", "psus")
// false
// >>> cycpattern_check("abab", "baa")
// true
// >>> cycpattern_check("efef", "eeff")
// false
// >>> cycpattern_check("himenss", "simen")
// true
function cycpattern_check(a: string, b: string): boolean {
  for (let offset = 0; offset < b.length; offset++) {
    const rotation = b.slice(offset) + b.slice(0, offset);
    if (a.includes(rotation)) {
      return true;
    }
  }
  return false;
}
