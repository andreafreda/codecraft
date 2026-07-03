function separate_paren_groups(paren_string){
  const cleaned = paren_string.replace(/ /g, '');
  const result = [];
  let counter = 0;
  let start = 0;
  
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '(') {
      counter++;
    } else if (cleaned[i] === ')') {
      counter--;
      if (counter === 0) {
        result.push(cleaned.substring(start, i + 1));
        start = i + 1;
      }
    }
  }
  
  return result;
}
