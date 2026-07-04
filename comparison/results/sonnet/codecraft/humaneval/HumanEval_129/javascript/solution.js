function minPath(grid, k){
    const N = grid.length;
    const neighbors = (i, j) => {
        const result = [];
        if (i > 0) result.push([i - 1, j]);
        if (i < N - 1) result.push([i + 1, j]);
        if (j > 0) result.push([i, j - 1]);
        if (j < N - 1) result.push([i, j + 1]);
        return result;
    };

    let minValue = N * N + 1;
    let minCell = [0, 0];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] < minValue) {
                minValue = grid[i][j];
                minCell = [i, j];
            }
        }
    }

    const candidates = [];
    for (const [ni, nj] of neighbors(minCell[0], minCell[1])) {
        candidates.push(grid[ni][nj]);
    }
    const smallestNeighbor = Math.min(...candidates);

    const path = [];
    if (k % 2 === 1) {
        for (let i = 0; i < k; i++) {
            path.push(i % 2 === 0 ? minValue : smallestNeighbor);
        }
    } else {
        for (let i = 0; i < k; i++) {
            path.push(i % 2 === 0 ? minValue : smallestNeighbor);
        }
    }

    return path;
}
