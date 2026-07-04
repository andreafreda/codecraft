function separate_paren_groups(paren_string: string): string[] {
    const result: string[] = [];
    let current = "";
    let depth = 0;
    for (const ch of paren_string) {
        if (ch === " ") {
            continue;
        }
        if (ch === "(") {
            depth++;
            current += ch;
        } else if (ch === ")") {
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
