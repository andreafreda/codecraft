function is_sorted(lst: number[]): boolean {
  for (let i = 0; i < lst.length; i++) {
    if (i > 0 && lst[i] < lst[i - 1]) return false;
    if (i > 1 && lst[i] === lst[i - 1] && lst[i] === lst[i - 2]) return false;
  }
  return true;
}
