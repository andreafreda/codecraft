function minPath(grid, k) {
  const n = grid.length;
  const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  
  // Find the position of value 1
  let row = 0, col = 0;
  for (let i = 0; i < n; i++) {
    const j = grid[i].indexOf(1);
    if (j !== -1) {
      row = i;
      col = j;
      break;
    }
  }
  
  const path = [1];
  
  // Build path of length k
  for (let step = 1; step < k; step++) {
    let minVal = Infinity;
    let nextRow = row, nextCol = col;
    
    for (const [dr, dc] of DIRECTIONS) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
        const val = grid[newRow][newCol];
        if (val < minVal) {
          minVal = val;
          nextRow = newRow;
          nextCol = newCol;
        }
      }
    }
    
    row = nextRow;
    col = nextCol;
    path.push(grid[row][col]);
  }
  
  return path;
}
