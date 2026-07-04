function minPath(grid, k){
  const n = grid.length;
  let r = 0, c = 0;
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      if(grid[i][j] === 1){
        r = i;
        c = j;
      }
    }
  }
  let neighbor = n * n;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for(const [dr, dc] of dirs){
    const nr = r + dr, nc = c + dc;
    if(nr >= 0 && nr < n && nc >= 0 && nc < n){
      if(grid[nr][nc] < neighbor){
        neighbor = grid[nr][nc];
      }
    }
  }
  const result = [];
  for(let i = 0; i < k; i++){
    result.push(i % 2 === 0 ? 1 : neighbor);
  }
  return result;
}
