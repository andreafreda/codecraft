function cycpattern_check(a: string, b: string): boolean {
    for (let i = 0; i < b.length; i++) {
        const rotation = b.slice(i) + b.slice(0, i);
        if (a.includes(rotation)) {
            return true;
        }
    }
    return false;
}
