package minPath_test

import (
    "testing"
    "fmt"
)

func minPath(grid [][]int, k int) []int {
    n := len(grid)
    
    // Find the cell with value 1
    var startRow, startCol int
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                startRow, startCol = i, j
                break
            }
        }
    }
    
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    var result []int
    
    var dfs func(int, int, []int)
    dfs = func(row, col int, path []int) {
        if len(path) == k {
            if result == nil || lexLess(path, result) {
                result = make([]int, len(path))
                copy(result, path)
            }
            return
        }
        
        // Pruning: if current path is already worse than best result so far
        if result != nil && lexGreater(path, result[:len(path)]) {
            return
        }
        
        // Explore all neighbors
        for _, dir := range directions {
            nr, nc := row+dir[0], col+dir[1]
            if nr >= 0 && nr < n && nc >= 0 && nc < n {
                path = append(path, grid[nr][nc])
                dfs(nr, nc, path)
                path = path[:len(path)-1]
            }
        }
    }
    
    dfs(startRow, startCol, []int{grid[startRow][startCol]})
    return result
}

func lexLess(a, b []int) bool {
    for i := 0; i < len(a) && i < len(b); i++ {
        if a[i] < b[i] {
            return true
        }
        if a[i] > b[i] {
            return false
        }
    }
    return len(a) < len(b)
}

func lexGreater(a, b []int) bool {
    for i := 0; i < len(a) && i < len(b); i++ {
        if a[i] > b[i] {
            return true
        }
        if a[i] < b[i] {
            return false
        }
    }
    return len(a) > len(b)
}
