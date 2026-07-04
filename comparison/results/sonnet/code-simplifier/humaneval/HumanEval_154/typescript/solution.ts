function cycpattern_check(a: string, b: string): boolean {
    for (let i = 0; i < b.length; i++) {
        const rotatedB = b.slice(i) + b.slice(0, i);
        if (a.includes(rotatedB)) {
            return true;
        }
    }
    return false;
}
