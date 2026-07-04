function is_sorted(lst: number[]): boolean {
  for (let i = 1; i < lst.length; i++) {
    if (lst[i] < lst[i - 1]) return false;
    if (i >= 2 && lst[i] === lst[i - 1] && lst[i] === lst[i - 2]) return false;
  }
  return true;
}
