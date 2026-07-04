function separate_paren_groups(paren_string) {
  const result = [];
  let current = "";
  let depth = 0;
  for (const char of paren_string) {
    if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
    } else {
      continue;
    }
    current += char;
    if (depth === 0) {
      result.push(current);
      current = "";
    }
  }
  return result;
}
