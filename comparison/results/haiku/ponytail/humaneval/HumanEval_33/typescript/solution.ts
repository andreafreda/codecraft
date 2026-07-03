function sort_third(l: number[]): number[] {
    const values_at_divisible_indices: number[] = [];
    
    for (let i = 0; i < l.length; i += 3) {
        values_at_divisible_indices.push(l[i]);
    }
    
    values_at_divisible_indices.sort((a, b) => a - b);
    
    const result = [...l];
    let sorted_index = 0;
    
    for (let i = 0; i < l.length; i += 3) {
        result[i] = values_at_divisible_indices[sorted_index];
        sorted_index++;
    }
    
    return result;
}
