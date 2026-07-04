//This function takes an array l and returns an array l' such that
// l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
// to the values of the corresponding indicies of l, but sorted.
// >>> sort_third([1, 2, 3])
// [1, 2, 3]
// >>> sort_third([5, 6, 3, 4, 8, 9, 2])
// [2, 6, 3, 4, 8, 9, 5]
function sort_third(l){
  const sortedThirds = l
    .filter((_, index) => index % 3 === 0)
    .sort((a, b) => a - b);

  let nextThird = 0;
  return l.map((value, index) =>
    index % 3 === 0 ? sortedThirds[nextThird++] : value
  );
}
