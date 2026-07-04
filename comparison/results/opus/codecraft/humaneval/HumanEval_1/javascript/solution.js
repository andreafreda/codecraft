function separate_paren_groups(paren_string){
  const groups = [];
  let current = "";
  let depth = 0;
  for (const char of paren_string) {
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
      if (depth === 0) {
        groups.push(current);
        current = "";
      }
    }
  }
  return groups;
}
