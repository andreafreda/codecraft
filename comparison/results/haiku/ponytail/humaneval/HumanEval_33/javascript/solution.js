function sort_third(l){
    // Extract values at indices divisible by 3
    const thirdValues = [];
    for (let i = 0; i < l.length; i += 3) {
        thirdValues.push(l[i]);
    }
    
    // Sort the extracted values
    thirdValues.sort((a, b) => a - b);
    
    // Create result and place sorted values back at their indices
    const result = [...l];
    for (let i = 0, j = 0; i < l.length; i += 3) {
        result[i] = thirdValues[j++];
    }
    
    return result;
}
