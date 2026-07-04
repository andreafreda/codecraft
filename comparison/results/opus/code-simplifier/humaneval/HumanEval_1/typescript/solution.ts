function separate_paren_groups(paren_string: string): string[] {
  const groups: string[] = [];
  let current = "";
  let depth = 0;

  for (const char of paren_string) {
    if (char !== "(" && char !== ")") {
      continue;
    }

    current += char;
    depth += char === "(" ? 1 : -1;

    if (depth === 0) {
      groups.push(current);
      current = "";
    }
  }

  return groups;
}
