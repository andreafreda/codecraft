//Given a grid with N rows and N columns (N >= 2) and a positive integer k, 
// each cell of the grid contains a value. Every integer in the range [1, N * N]
// inclusive appears exactly once on the cells of the grid.
// You have to find the minimum path of length k in the grid. You can start
// from any cell, and in each step you can move to any of the neighbor cells,
// in other words, you can go to cells which share an edge with you current
// cell.
// Please note that a path of length k means visiting exactly k cells (not
// necessarily distinct).
// You CANNOT go off the grid.
// A path A (of length k) is considered less than a path B (of length k) if
// after making the ordered arrays of the values on the cells that A and B go
// through (let's call them lst_A and lst_B), lst_A is lexicographically less
// than lst_B, in other words, there exist an integer index i (1 <= i <= k)
// such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
// lst_A[j] = lst_B[j].
// It is guaranteed that the answer is unique.
// Return an ordered array of the values on the cells that the minimum path go through.
// Examples:    
// >>> minPath([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 3)
// [1, 2, 1]
// >>> minPath([[5, 9, 3], [4, 1, 6], [7, 8, 2]], 1)
// [1]
function minPath(grid, k){
    const N = grid.length;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let val = N * N + 1;
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(grid[i][j] === 1){
                let minNeighbor = N * N + 1;
                for(let d = 0; d < 4; d++){
                    const x = i + dx[d];
                    const y = j + dy[d];
                    if(x >= 0 && x < N && y >= 0 && y < N){
                        if(grid[x][y] < minNeighbor) minNeighbor = grid[x][y];
                    }
                }
                val = Math.min(val, minNeighbor);
            }
        }
    }
    const ans = [];
    for(let i = 0; i < Math.ceil(k / 2); i++){
        ans.push(1);
        ans.push(val);
    }
    return ans.slice(0, k);
}
