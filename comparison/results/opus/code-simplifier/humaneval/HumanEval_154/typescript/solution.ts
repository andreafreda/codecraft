function cycpattern_check(a: string, b: string): boolean {
  const doubled = b + b;
  for (let i = 0; i < b.length; i++) {
    const rotation = doubled.slice(i, i + b.length);
    if (a.includes(rotation)) {
      return true;
    }
  }
  return false;
}
