function separate_paren_groups(paren_string: string): string[] {
    const cleaned = paren_string.replace(/\s/g, '');
    const result: string[] = [];
    let current = '';
    let depth = 0;
    
    for (const char of cleaned) {
        if (char === '(') {
            depth++;
            current += char;
        } else if (char === ')') {
            current += char;
            depth--;
            if (depth === 0) {
                result.push(current);
                current = '';
            }
        }
    }
    
    return result;
}
