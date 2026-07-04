function separate_paren_groups(paren_string: string): string[] {
    const result: string[] = [];
    let depth = 0;
    let current = "";
    for (const char of paren_string) {
        if (char === "(") {
            depth++;
            current += char;
        } else if (char === ")") {
            depth--;
            current += char;
            if (depth === 0) {
                result.push(current);
                current = "";
            }
        }
    }
    return result;
}
