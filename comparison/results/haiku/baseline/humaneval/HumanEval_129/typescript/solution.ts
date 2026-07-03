function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    
    // Find position of value 1
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
    
    let result: number[] | null = null;
    
    function dfs(row: number, col: number, path: number[]): void {
        // Pruning: if current path is already lexicographically larger, stop
        if (result) {
            for (let i = 0; i < path.length; i++) {
                if (path[i] > result[i]) return;
                if (path[i] < result[i]) break;
            }
        }
        
        if (path.length === k) {
            if (!result || isLexSmaller(path, result)) {
                result = [...path];
            }
            return;
        }
        
        // Get neighbors sorted by their values
        const neighbors = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                neighbors.push([grid[nr][nc], nr, nc]);
            }
        }
        
        neighbors.sort((a, b) => a[0] - b[0]);
        
        for (const [val, nr, nc] of neighbors) {
            path.push(val);
            dfs(nr, nc, path);
            path.pop();
        }
    }
    
    function isLexSmaller(a: number[], b: number[]): boolean {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return a[i] < b[i];
        }
        return false;
    }
    
    dfs(startRow, startCol, [1]);
    return result!;
}
