function cycpattern_check(a: string, b: string): boolean {
    const n = b.length;
    for (let i = 0; i < n; i++) {
        const rotation = b.slice(i) + b.slice(0, i);
        if (a.includes(rotation)) {
            return true;
        }
    }
    return false;
}
