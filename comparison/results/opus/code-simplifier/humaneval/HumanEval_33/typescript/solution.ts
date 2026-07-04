function sort_third(l: number[]): number[] {
  const sortedThirds = l
    .filter((_, i) => i % 3 === 0)
    .sort((a, b) => a - b);

  return l.map((value, i) => (i % 3 === 0 ? sortedThirds[i / 3] : value));
}
