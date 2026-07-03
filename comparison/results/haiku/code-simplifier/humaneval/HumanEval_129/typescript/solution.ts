function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    
    // Find starting position (cell with value 1)
    let startRow = 0, startCol = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
                break;
            }
        }
    }
    
    const memo = new Map<string, number[]>();
    
    function dfs(row: number, col: number, remaining: number): number[] {
        if (remaining === 1) {
            return [grid[row][col]];
        }
        
        const key = `${row},${col},${remaining}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const paths: number[][] = [];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                const subPath = dfs(newRow, newCol, remaining - 1);
                paths.push([grid[row][col], ...subPath]);
            }
        }
        
        const result = paths.sort(compareLexicographically)[0];
        memo.set(key, result);
        return result;
    }
    
    function compareLexicographically(a: number[], b: number[]): number {
        for (let i = 0; i < a.length; i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        return 0;
    }
    
    return dfs(startRow, startCol, k);
}
