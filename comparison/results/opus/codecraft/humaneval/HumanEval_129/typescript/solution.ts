function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    let row = 0;
    let col = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                row = i;
                col = j;
            }
        }
    }

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let minNeighbor = n * n + 1;
    for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
            minNeighbor = Math.min(minNeighbor, grid[nr][nc]);
        }
    }

    const path: number[] = [];
    for (let step = 0; step < k; step++) {
        path.push(step % 2 === 0 ? 1 : minNeighbor);
    }
    return path;
}
