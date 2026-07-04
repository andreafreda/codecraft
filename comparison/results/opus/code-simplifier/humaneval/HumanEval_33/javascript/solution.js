// This function takes an array l and returns an array l' such that
// l' is identical to l at the indices that are not divisible by three, while its values at the indices
// that are divisible by three are equal to the values of the corresponding indices of l, but sorted.
// >>> sort_third([1, 2, 3])
// [1, 2, 3]
// >>> sort_third([5, 6, 3, 4, 8, 9, 2])
// [2, 6, 3, 4, 8, 9, 5]
function sort_third(l) {
  const sortedThirds = [];
  for (let i = 0; i < l.length; i += 3) {
    sortedThirds.push(l[i]);
  }
  sortedThirds.sort((a, b) => a - b);

  const result = l.slice();
  for (let i = 0; i < result.length; i += 3) {
    result[i] = sortedThirds[i / 3];
  }
  return result;
}
