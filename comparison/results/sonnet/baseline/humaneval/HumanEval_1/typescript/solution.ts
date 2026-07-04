function separate_paren_groups(paren_string: string): string[] {
    const result: string[] = [];
    let current = "";
    let depth = 0;

    for (const char of paren_string) {
        if (char === ' ') continue;

        current += char;

        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth === 0) {
                result.push(current);
                current = "";
            }
        }
    }

    return result;
}
