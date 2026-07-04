function is_sorted(lst: number[]): boolean {
  const counts = new Map<number, number>();
  for (const n of lst) {
    counts.set(n, (counts.get(n) ?? 0) + 1);
    if ((counts.get(n) as number) > 2) return false;
  }
  for (let i = 1; i < lst.length; i++) {
    if (lst[i] < lst[i - 1]) return false;
  }
  return true;
}
