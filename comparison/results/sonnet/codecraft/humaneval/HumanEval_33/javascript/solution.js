function sort_third(l){
    const indices = [];
    for (let i = 0; i < l.length; i += 3) {
        indices.push(i);
    }
    const values = indices.map(i => l[i]).sort((a, b) => a - b);
    const result = [...l];
    indices.forEach((idx, i) => {
        result[idx] = values[i];
    });
    return result;
}
