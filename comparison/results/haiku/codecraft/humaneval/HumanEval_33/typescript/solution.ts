function sort_third(l: number[]): number[] {
    const thirdValues = l.filter((_, i) => i % 3 === 0).sort((a, b) => a - b);
    const result = [...l];
    let sortedIndex = 0;
    for (let i = 0; i < result.length; i++) {
        if (i % 3 === 0) {
            result[i] = thirdValues[sortedIndex++];
        }
    }
    return result;
}
