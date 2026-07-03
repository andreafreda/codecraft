function separate_paren_groups(paren_string: string): string[] {
  const cleaned = paren_string.replace(/ /g, '');
  const result: string[] = [];
  let currentGroup = '';
  let count = 0;
  
  for (const char of cleaned) {
    if (char === '(') {
      count++;
      currentGroup += char;
    } else if (char === ')') {
      count--;
      currentGroup += char;
      if (count === 0) {
        result.push(currentGroup);
        currentGroup = '';
      }
    }
  }
  
  return result;
}
