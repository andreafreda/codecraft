function minPath(grid: number[][], k: number): number[] {
    const n = grid.length;
    let minVal = n * n + 1;
    let minI = 0;
    let minJ = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] < minVal) {
                minVal = grid[i][j];
                minI = i;
                minJ = j;
            }
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    const neighborValues: number[] = [];

    for (let d = 0; d < 4; d++) {
        const ni = minI + dx[d];
        const nj = minJ + dy[d];
        if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
            neighborValues.push(grid[ni][nj]);
        }
    }

    const minNeighbor = Math.min(...neighborValues);

    const result: number[] = [];
    for (let i = 0; i < k; i++) {
        result.push(i % 2 === 0 ? minVal : minNeighbor);
    }

    return result;
}
