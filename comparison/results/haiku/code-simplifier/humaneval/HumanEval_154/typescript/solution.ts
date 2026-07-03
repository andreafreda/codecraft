function cycpattern_check(a: string, b: string): boolean {
  const doubled = b + b;
  for (let i = 0; i < b.length; i++) {
    if (a.includes(doubled.substring(i, i + b.length))) {
      return true;
    }
  }
  return false;
}
