function cycpattern_check(a: string, b: string): boolean {
  for (let i = 0; i < b.length; i++) {
    if (a.includes(b.slice(i) + b.slice(0, i))) return true;
  }
  return false;
}
