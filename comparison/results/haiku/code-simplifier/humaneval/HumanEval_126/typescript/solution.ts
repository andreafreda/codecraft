function is_sorted(lst: number[]): boolean {
  const counts = new Map<number, number>();
  
  for (let i = 0; i < lst.length; i++) {
    const num = lst[i];
    
    if (i > 0 && num < lst[i - 1]) {
      return false;
    }
    
    const count = (counts.get(num) ?? 0) + 1;
    if (count > 2) {
      return false;
    }
    counts.set(num, count);
  }
  
  return true;
}
