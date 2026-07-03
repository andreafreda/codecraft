function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/ /g, '');
  const result = [];
  let currentGroup = '';
  let balance = 0;
  
  for (const char of cleaned) {
    currentGroup += char;
    
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
    }
    
    if (balance === 0 && currentGroup.length > 0) {
      result.push(currentGroup);
      currentGroup = '';
    }
  }
  
  return result;
}
