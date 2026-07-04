// Given a grid with N rows and N columns (N >= 2) and a positive integer k, 
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
function minPath(grid, k) {
    const n = grid.length;
    let startRow = 0;
    let startCol = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
            }
        }
    }

    const neighborValues = [];
    if (startRow > 0) neighborValues.push(grid[startRow - 1][startCol]);
    if (startRow < n - 1) neighborValues.push(grid[startRow + 1][startCol]);
    if (startCol > 0) neighborValues.push(grid[startRow][startCol - 1]);
    if (startCol < n - 1) neighborValues.push(grid[startRow][startCol + 1]);

    const smallestNeighbor = Math.min(...neighborValues);

    const path = [];
    for (let step = 0; step < k; step++) {
        path.push(step % 2 === 0 ? 1 : smallestNeighbor);
    }
    return path;
}
