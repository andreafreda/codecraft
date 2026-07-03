function sort_third(l: number[]): number[] {
    const thirdValues = [];
    for (let i = 0; i < l.length; i += 3) {
        thirdValues.push(l[i]);
    }
    
    thirdValues.sort((a, b) => a - b);
    
    const result = [...l];
    let sortedIndex = 0;
    for (let i = 0; i < result.length; i += 3) {
        result[i] = thirdValues[sortedIndex++];
    }
    
    return result;
}
