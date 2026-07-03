function is_sorted(lst: number[]): boolean {
  const counts = new Map<number, number>();
  
  for (let i = 0; i < lst.length; i++) {
    if (i > 0 && lst[i] < lst[i - 1]) {
      return false;
    }
    
    const count = (counts.get(lst[i]) || 0) + 1;
    counts.set(lst[i], count);
    
    if (count > 2) {
      return false;
    }
  }
  
  return true;
}
