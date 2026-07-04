function separate_paren_groups(paren_string){
  var result = [];
  var current = "";
  var depth = 0;
  for (var i = 0; i < paren_string.length; i++) {
    var ch = paren_string[i];
    if (ch === ' ') {
      continue;
    }
    if (ch === '(') {
      depth++;
      current += ch;
    } else if (ch === ')') {
      depth--;
      current += ch;
      if (depth === 0) {
        result.push(current);
        current = "";
      }
    }
  }
  return result;
}
