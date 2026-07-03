function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/ /g, '');
  const result = [];
  let current_group = '';
  let depth = 0;
  
  for (let char of cleaned) {
    if (char === '(') {
      depth++;
      current_group += char;
    } else if (char === ')') {
      current_group += char;
      depth--;
      if (depth === 0) {
        result.push(current_group);
        current_group = '';
      }
    }
  }
  
  return result;
}
