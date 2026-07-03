function sort_third(l){
    const thirdIndices = [];
    for (let i = 0; i < l.length; i += 3) {
        thirdIndices.push(l[i]);
    }
    
    thirdIndices.sort((a, b) => a - b);
    
    const result = [];
    let sortedIndex = 0;
    for (let i = 0; i < l.length; i++) {
        if (i % 3 === 0) {
            result.push(thirdIndices[sortedIndex++]);
        } else {
            result.push(l[i]);
        }
    }
    
    return result;
}
