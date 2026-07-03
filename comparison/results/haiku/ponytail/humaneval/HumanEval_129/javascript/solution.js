function minPath(grid, k){
    const n = grid.length;
    
    // Find position of cell with value 1
    let x = 0, y = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                x = i;
                y = j;
            }
        }
    }
    
    const path = [1];
    
    // Greedily move to neighbor with minimum value k-1 times
    for (let step = 1; step < k; step++) {
        let minVal = Infinity;
        let nextX = x, nextY = y;
        
        // Check all 4 adjacent cells
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
                if (grid[nx][ny] < minVal) {
                    minVal = grid[nx][ny];
                    nextX = nx;
                    nextY = ny;
                }
            }
        }
        
        x = nextX;
        y = nextY;
        path.push(grid[x][y]);
    }
    
    return path;
}
