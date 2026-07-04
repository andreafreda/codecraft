function separate_paren_groups(paren_string) {
    const result = [];
    let current = "";
    let depth = 0;

    for (const char of paren_string) {
        if (char === ' ') continue;

        current += char;

        if (char === '(') {
            depth += 1;
        } else if (char === ')') {
            depth -= 1;
            if (depth === 0) {
                result.push(current);
                current = "";
            }
        }
    }

    return result;
}
