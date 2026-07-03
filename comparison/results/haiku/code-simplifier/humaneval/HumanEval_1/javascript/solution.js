function separate_paren_groups(paren_string) {
  const clean = paren_string.replace(/ /g, '');
  const result = [];
  let depth = 0;
  let current = '';
  
  for (const char of clean) {
    current += char;
    
    if (char === '(') {
      depth++;
    } else if (char === ')') {
      depth--;
      if (depth === 0) {
        result.push(current);
        current = '';
      }
    }
  }
  
  return result;
}
