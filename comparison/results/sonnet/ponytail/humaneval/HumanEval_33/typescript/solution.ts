function sort_third(l: number[]): number[] {
    const result = [...l];
    const thirds = l.filter((_, i) => i % 3 === 0).sort((a, b) => a - b);
    let j = 0;
    for (let i = 0; i < result.length; i += 3) {
        result[i] = thirds[j++];
    }
    return result;
}
