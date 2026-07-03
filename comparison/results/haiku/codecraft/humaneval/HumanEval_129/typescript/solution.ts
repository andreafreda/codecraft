function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    
    // Find position of value 1
    let row = 0, col = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                row = i;
                col = j;
                break;
            }
        }
    }
    
    const path: number[] = [1];
    
    for (let i = 1; i < k; i++) {
        let minVal = Infinity;
        let nextRow = row, nextCol = col;
        
        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] < minVal) {
                minVal = grid[nr][nc];
                nextRow = nr;
                nextCol = nc;
            }
        }
        
        path.push(minVal);
        row = nextRow;
        col = nextCol;
    }
    
    return path;
}
