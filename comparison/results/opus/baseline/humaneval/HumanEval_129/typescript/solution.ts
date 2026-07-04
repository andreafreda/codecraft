function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    let r = 0, c = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                r = i;
                c = j;
            }
        }
    }
    let minNeighbor = n * n + 1;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
            if (grid[nr][nc] < minNeighbor) {
                minNeighbor = grid[nr][nc];
            }
        }
    }
    const result: number[] = [];
    for (let i = 0; i < k; i++) {
        result.push(i % 2 === 0 ? 1 : minNeighbor);
    }
    return result;
}
