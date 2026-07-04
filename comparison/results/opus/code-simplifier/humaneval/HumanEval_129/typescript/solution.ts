function minPath(grid: number[][], k: number): number[] {
  const n = grid.length;

  let startRow = 0;
  let startCol = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 1) {
        startRow = row;
        startCol = col;
      }
    }
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let smallestNeighbor = Infinity;
  for (const [deltaRow, deltaCol] of directions) {
    const neighborRow = startRow + deltaRow;
    const neighborCol = startCol + deltaCol;

    const inBounds =
      neighborRow >= 0 && neighborRow < n && neighborCol >= 0 && neighborCol < n;
    if (inBounds) {
      smallestNeighbor = Math.min(smallestNeighbor, grid[neighborRow][neighborCol]);
    }
  }

  const path: number[] = [];
  for (let step = 0; step < k; step++) {
    const isEvenStep = step % 2 === 0;
    path.push(isEvenStep ? 1 : smallestNeighbor);
  }

  return path;
}
