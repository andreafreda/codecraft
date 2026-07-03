function sort_third(l: number[]): number[] {
  const result = l.slice();
  const thirdIndices: number[] = [];
  const thirdValues: number[] = [];

  for (let i = 0; i < l.length; i += 3) {
    thirdIndices.push(i);
    thirdValues.push(l[i]);
  }

  thirdValues.sort((a, b) => a - b);

  for (let i = 0; i < thirdIndices.length; i++) {
    result[thirdIndices[i]] = thirdValues[i];
  }

  return result;
}
