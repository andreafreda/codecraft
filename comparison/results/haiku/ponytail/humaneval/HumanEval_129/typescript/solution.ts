function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    
    // Find the position of value 1
    let startRow = 0, startCol = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
            }
        }
    }
    
    let result: number[] | null = null;
    
    function dfs(row: number, col: number, path: number[]): void {
        // Pruning: if current path is already worse than result
        if (result !== null) {
            for (let i = 0; i < path.length; i++) {
                if (path[i] > result[i]) {
                    return;  // Prune: current path is lexicographically larger
                }
                if (path[i] < result[i]) {
                    break;  // Current path is potentially better, continue exploring
                }
            }
        }
        
        // If we've reached length k, update result
        if (path.length === k) {
            if (result === null) {
                result = [...path];
            }
            return;
        }
        
        // Explore neighbors
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const neighbors: [number, number, number][] = [];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                neighbors.push([grid[newRow][newCol], newRow, newCol]);
            }
        }
        
        // Sort neighbors by value to explore smaller values first (optimization)
        neighbors.sort((a, b) => a[0] - b[0]);
        
        for (const [val, newRow, newCol] of neighbors) {
            path.push(val);
            dfs(newRow, newCol, path);
            path.pop();
        }
    }
    
    dfs(startRow, startCol, [1]);
    return result!;
}
