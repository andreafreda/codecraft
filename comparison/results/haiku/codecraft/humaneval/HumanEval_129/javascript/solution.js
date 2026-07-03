function minPath(grid, k) {
    const n = grid.length;
    
    // Find starting position (cell with value 1)
    let row = 0, col = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                row = i;
                col = j;
            }
        }
    }
    
    const path = [1];
    
    // Build path of length k by greedily choosing smallest neighbor at each step
    for (let i = 1; i < k; i++) {
        let minVal = Infinity;
        let nextRow = row, nextCol = col;
        
        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                if (grid[newRow][newCol] < minVal) {
                    minVal = grid[newRow][newCol];
                    nextRow = newRow;
                    nextCol = newCol;
                }
            }
        }
        
        path.push(minVal);
        row = nextRow;
        col = nextCol;
    }
    
    return path;
}
