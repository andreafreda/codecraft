function is_sorted(lst: number[]): boolean {
    for (let i = 1; i < lst.length; i++) {
        if (lst[i] < lst[i - 1]) {
            return false;
        }
    }

    const counts = new Map<number, number>();
    for (const num of lst) {
        counts.set(num, (counts.get(num) ?? 0) + 1);
    }

    return [...counts.values()].every((count) => count <= 2);
}
