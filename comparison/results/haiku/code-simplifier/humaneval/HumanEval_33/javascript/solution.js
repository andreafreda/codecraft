function sort_third(l) {
  const thirdIndices = [];
  
  for (let i = 0; i < l.length; i += 3) {
    thirdIndices.push(i);
  }
  
  const thirdValues = thirdIndices.map(i => l[i]).sort((a, b) => a - b);
  
  const result = [...l];
  thirdIndices.forEach((idx, i) => {
    result[idx] = thirdValues[i];
  });
  
  return result;
}
