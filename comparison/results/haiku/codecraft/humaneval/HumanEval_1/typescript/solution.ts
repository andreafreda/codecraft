function separate_paren_groups(paren_string: string): string[] {
  const cleaned = paren_string.replace(/ /g, "");
  const result: string[] = [];
  let current = "";
  let depth = 0;

  for (const char of cleaned) {
    current += char;
    if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
      if (depth === 0) {
        result.push(current);
        current = "";
      }
    }
  }

  return result;
}
