function minPath(grid, k) {
    const n = grid.length;
    
    // Find position of value 1
    let startRow = -1, startCol = -1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
                break;
            }
        }
        if (startRow !== -1) break;
    }
    
    // Find minimum neighbor value of cell 1
    let minNeighbor = Infinity;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of directions) {
        const nr = startRow + dr;
        const nc = startCol + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
            minNeighbor = Math.min(minNeighbor, grid[nr][nc]);
        }
    }
    
    // Build lexicographically smallest path by alternating between 1 and minNeighbor
    const path = [1];
    for (let i = 1; i < k; i++) {
        if (i % 2 === 1) {
            path.push(minNeighbor);
        } else {
            path.push(1);
        }
    }
    
    return path;
}
