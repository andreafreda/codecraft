function sort_third(l: number[]): number[] {
    const result = [...l];
    const sortedThirds = l.filter((_, i) => i % 3 === 0).sort((a, b) => a - b);

    let sortedIndex = 0;
    for (let i = 0; i < result.length; i++) {
        if (i % 3 === 0) {
            result[i] = sortedThirds[sortedIndex++];
        }
    }

    return result;
}
