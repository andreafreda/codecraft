function is_sorted(lst) {
  const counts = {};
  
  for (let i = 0; i < lst.length; i++) {
    const current = lst[i];
    
    if (i > 0 && lst[i - 1] > current) {
      return false;
    }
    
    counts[current] = (counts[current] || 0) + 1;
    
    if (counts[current] > 2) {
      return false;
    }
  }
  
  return true;
}
