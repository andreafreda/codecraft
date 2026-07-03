function separate_paren_groups(paren_string: string): string[] {
  const cleaned = paren_string.replace(/ /g, '');
  const result: string[] = [];
  let depth = 0;
  let group = '';
  
  for (const char of cleaned) {
    if (char === '(') {
      depth++;
      group += char;
    } else if (char === ')') {
      group += char;
      depth--;
      if (depth === 0) {
        result.push(group);
        group = '';
      }
    }
  }
  
  return result;
}
