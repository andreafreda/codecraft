package minPath_test

import (
    "testing"
    "fmt"
)

func minPath(grid [][]int, k int) []int {
    n := len(grid)
    
    // Find position of value 1
    var startRow, startCol int
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                startRow, startCol = i, j
                break
            }
        }
    }
    
    memo := make(map[[3]int][]int)
    
    var dfs func(row, col, steps int) []int
    dfs = func(row, col, steps int) []int {
        if steps == 1 {
            return []int{grid[row][col]}
        }
        
        key := [3]int{row, col, steps}
        if cached, ok := memo[key]; ok {
            return cached
        }
        
        var result []int
        directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
        
        for _, dir := range directions {
            nr, nc := row+dir[0], col+dir[1]
            if nr >= 0 && nr < n && nc >= 0 && nc < n {
                rest := dfs(nr, nc, steps-1)
                candidate := append([]int{grid[row][col]}, rest...)
                
                if result == nil {
                    result = candidate
                } else if lexSmaller(candidate, result) {
                    result = candidate
                }
            }
        }
        
        memo[key] = result
        return result
    }
    
    return dfs(startRow, startCol, k)
}

func lexSmaller(a, b []int) bool {
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
