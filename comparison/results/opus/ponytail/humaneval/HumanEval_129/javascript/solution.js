function minPath(grid, k){
  const n = grid.length;
  let r0 = 0, c0 = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (grid[i][j] === 1) { r0 = i; c0 = j; }

  let minNeighbor = Infinity;
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    const r = r0 + dr, c = c0 + dc;
    if (r >= 0 && r < n && c >= 0 && c < n)
      minNeighbor = Math.min(minNeighbor, grid[r][c]);
  }

  const res = [];
  for (let i = 0; i < k; i++) res.push(i % 2 === 0 ? 1 : minNeighbor);
  return res;
}
