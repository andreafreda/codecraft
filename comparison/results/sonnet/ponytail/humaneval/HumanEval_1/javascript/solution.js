function separate_paren_groups(paren_string){
    const result = [];
    let current = "";
    let depth = 0;
    for (const ch of paren_string) {
        if (ch === ' ') continue;
        current += ch;
        if (ch === '(') {
            depth += 1;
        } else if (ch === ')') {
            depth -= 1;
            if (depth === 0) {
                result.push(current);
                current = "";
            }
        }
    }
    return result;
}
