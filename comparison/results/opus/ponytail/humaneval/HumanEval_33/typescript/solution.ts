function sort_third(l: number[]): number[] {
  const sorted = l.filter((_, i) => i % 3 === 0).sort((a, b) => a - b);
  return l.map((v, i) => (i % 3 === 0 ? sorted.shift()! : v));
}
