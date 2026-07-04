function minPath(grid: number[][], k: number): number[] {
    const n: number = grid.length;

    let minValue: number = n * n + 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== 1) continue;

            const neighbors: number[] = [];
            if (i !== 0) neighbors.push(grid[i - 1][j]);
            if (j !== 0) neighbors.push(grid[i][j - 1]);
            if (i !== n - 1) neighbors.push(grid[i + 1][j]);
            if (j !== n - 1) neighbors.push(grid[i][j + 1]);

            minValue = Math.min(...neighbors);
        }
    }

    const result: number[] = [];
    for (let i = 0; i < k; i++) {
        result.push(i % 2 === 0 ? 1 : minValue);
    }
    return result;
}
