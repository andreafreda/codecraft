function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/\s/g, '');
  const result = [];
  let count = 0;
  let current = '';
  
  for (let char of cleaned) {
    current += char;
    if (char === '(') {
      count++;
    } else if (char === ')') {
      count--;
    }
    
    if (count === 0 && current.length > 0) {
      result.push(current);
      current = '';
    }
  }
  
  return result;
}
