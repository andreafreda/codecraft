function cycpattern_check(a: string, b: string): boolean {
    for (let i = 0; i < b.length; i++) {
        const rotated = b.slice(i) + b.slice(0, i);
        if (a.includes(rotated)) {
            return true;
        }
    }
    return false;
}
