function separate_paren_groups(paren_string: string): string[] {
    const result: string[] = [];
    let currentGroup = '';
    let depth = 0;

    for (const char of paren_string) {
        if (char === ' ') {
            continue;
        }

        if (char === '(') {
            depth++;
            currentGroup += char;
        } else if (char === ')') {
            depth--;
            currentGroup += char;

            if (depth === 0) {
                result.push(currentGroup);
                currentGroup = '';
            }
        }
    }

    return result;
}
