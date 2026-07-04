//Given a grid with N rows and N columns (N >= 2) and a positive integer k, 
// each cell of the grid contains a value. Every integer in the range [1, N * N]
// inclusive appears exactly once on the cells of the grid.
// You have to find the minimum path of length k in the grid. You can start
// from any cell, and in each step you can move to any of the neighbor cells,
// in other words, you can go to cells which share an edge with you current
// cell.
// Please note that a path of length k means visiting exactly k cells (not
// necessarily distinct).
// You CANNOT go off the grid.
// A path A (of length k) is considered less than a path B (of length k) if
// after making the ordered arrays of the values on the cells that A and B go
// through (let's call them lst_A and lst_B), lst_A is lexicographically less
// than lst_B, in other words, there exist an integer index i (1 <= i <= k)
// such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
// lst_A[j] = lst_B[j].
// It is guaranteed that the answer is unique.
// Return an ordered array of the values on the cells that the minimum path go through.
// Examples:    
// >>> minPath([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 3)
// [1, 2, 1]
// >>> minPath([[5, 9, 3], [4, 1, 6], [7, 8, 2]], 1)
// [1]
function minPath(grid, k){
  const n = grid.length;

  // The minimum path must start at the cell holding value 1, since 1 is the
  // smallest value on the grid and any path starting elsewhere is larger.
  let startRow = 0;
  let startCol = 0;
  for (let row = 0; row < n; row++){
    for (let col = 0; col < n; col++){
      if (grid[row][col] === 1){
        startRow = row;
        startCol = col;
      }
    }
  }

  // Find the smallest neighbour value of the cell holding 1. From there the
  // optimal move is to alternate between 1 and that smallest neighbour.
  let smallestNeighbour = Infinity;
  const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of deltas){
    const r = startRow + dr;
    const c = startCol + dc;
    if (r >= 0 && r < n && c >= 0 && c < n){
      smallestNeighbour = Math.min(smallestNeighbour, grid[r][c]);
    }
  }

  const path = [];
  for (let step = 0; step < k; step++){
    path.push(step % 2 === 0 ? 1 : smallestNeighbour);
  }
  return path;
}
