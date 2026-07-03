function separateParenGroups(parenString) {
  const cleanString = parenString.replace(/\s/g, '');
  const result = [];
  let currentGroup = '';
  let balance = 0;
  
  for (const char of cleanString) {
    currentGroup += char;
    
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
    }
    
    if (balance === 0) {
      result.push(currentGroup);
      currentGroup = '';
    }
  }
  
  return result;
}
