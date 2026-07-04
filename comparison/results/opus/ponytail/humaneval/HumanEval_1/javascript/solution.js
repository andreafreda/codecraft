function separate_paren_groups(paren_string){
  const result = [];
  let depth = 0, current = "";
  for (const ch of paren_string){
    if (ch === "(") { depth++; current += ch; }
    else if (ch === ")") { depth--; current += ch; if (depth === 0){ result.push(current); current = ""; } }
  }
  return result;
}
