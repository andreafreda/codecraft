function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/ /g, '');
  const result = [];
  let current = '';
  let level = 0;
  
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    current += char;
    
    if (char === '(') {
      level++;
    } else if (char === ')') {
      level--;
    }
    
    if (level === 0 && current.length > 0) {
      result.push(current);
      current = '';
    }
  }
  
  return result;
}
