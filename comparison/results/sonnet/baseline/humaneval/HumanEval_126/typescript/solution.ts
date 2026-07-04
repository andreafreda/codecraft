function is_sorted(lst: number[]): boolean {
    const counts: Record<number, number> = {};
    for (const n of lst) {
        counts[n] = (counts[n] || 0) + 1;
        if (counts[n] > 2) {
            return false;
        }
    }
    for (let i = 0; i < lst.length - 1; i++) {
        if (lst[i] > lst[i + 1]) {
            return false;
        }
    }
    return true;
}
