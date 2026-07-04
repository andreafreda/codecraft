function separate_paren_groups(paren_string: string): string[] {
    const groups: string[] = [];
    let currentGroup = "";
    let openCount = 0;

    for (const char of paren_string) {
        if (char === " ") {
            continue;
        }

        currentGroup += char;

        if (char === "(") {
            openCount++;
        } else if (char === ")") {
            openCount--;
            if (openCount === 0) {
                groups.push(currentGroup);
                currentGroup = "";
            }
        }
    }

    return groups;
}
