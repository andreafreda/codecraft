function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    let i0 = 0, j0 = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                i0 = i;
                j0 = j;
            }
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    let minNeighbor = n * n + 1;
    for (let d = 0; d < 4; d++) {
        const ni = i0 + dx[d];
        const nj = j0 + dy[d];
        if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
            minNeighbor = Math.min(minNeighbor, grid[ni][nj]);
        }
    }

    const result: number[] = [];
    for (let step = 0; step < k; step++) {
        result.push(step % 2 === 0 ? 1 : minNeighbor);
    }
    return result;
}
