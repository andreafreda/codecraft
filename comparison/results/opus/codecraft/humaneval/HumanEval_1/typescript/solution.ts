//Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
// separate those group into separate strings and return the array of those.
// Separate groups are balanced (each open brace is properly closed) and not nested within each other
// Ignore any spaces in the input string.
// >>> separate_paren_groups("( ) (( )) (( )( ))")
// ["()", "(())", "(()())"]
function separate_paren_groups(paren_string: string): string[] {
  const groups: string[] = [];
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
