function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    let r0 = 0, c0 = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                r0 = i;
                c0 = j;
            }
        }
    }
    let neighborMin = n * n + 1;
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nr = r0 + dr, nc = c0 + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
            neighborMin = Math.min(neighborMin, grid[nr][nc]);
        }
    }
    const result: number[] = [];
    for (let i = 0; i < k; i++) {
        result.push(i % 2 === 0 ? 1 : neighborMin);
    }
    return result;
}
