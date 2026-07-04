function is_sorted(lst) {
    const counts = new Map();

    for (const num of lst) {
        const count = (counts.get(num) || 0) + 1;
        if (count > 2) {
            return false;
        }
        counts.set(num, count);
    }

    for (let i = 1; i < lst.length; i++) {
        if (lst[i] < lst[i - 1]) {
            return false;
        }
    }

    return true;
}
