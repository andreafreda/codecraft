function sort_third(l){
  const thirds = l.filter((_, i) => i % 3 === 0).sort((a, b) => a - b);
  let j = 0;
  return l.map((v, i) => (i % 3 === 0 ? thirds[j++] : v));
}
