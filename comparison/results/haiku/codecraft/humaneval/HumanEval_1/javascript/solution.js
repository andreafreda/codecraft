function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/\s/g, '');
  const groups = [];
  let current_group = '';
  let balance = 0;
  
  for (let char of cleaned) {
    current_group += char;
    
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
    }
    
    if (balance === 0) {
      groups.push(current_group);
      current_group = '';
    }
  }
  
  return groups;
}
