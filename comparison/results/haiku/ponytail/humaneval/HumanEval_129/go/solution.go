package minPath_test

import (
    "testing"
    "fmt"
)

// Given a grid with N rows and N columns (N >= 2) and a positive integer k, 
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
// after making the ordered lists of the values on the cells that A and B go
// through (let's call them lst_A and lst_B), lst_A is lexicographically less
// than lst_B, in other words, there exist an integer index i (1 <= i <= k)
// such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
// lst_A[j] = lst_B[j].
// It is guaranteed that the answer is unique.
// Return an ordered list of the values on the cells that the minimum path go through.
// Examples:    
// >>> minPath([][]int{[]int{1, 2, 3}, []int{4, 5, 6}, []int{7, 8, 9}}, 3)
// []int{1, 2, 1}
// >>> minPath([][]int{[]int{5, 9, 3}, []int{4, 1, 6}, []int{7, 8, 2}}, 1)
// []int{1}
func minPath(grid [][]int, k int) []int {
	n := len(grid)
	
	// Find position of 1
	var si, sj int
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				si, sj = i, j
				break
			}
		}
	}
	
	memo := make(map[string][]int)
	result := dfs(grid, si, sj, k, memo)
	return result
}

func dfs(grid [][]int, i, j, k int, memo map[string][]int) []int {
	if k == 1 {
		return []int{grid[i][j]}
	}
	
	key := fmt.Sprintf("%d,%d,%d", i, j, k)
	if path, ok := memo[key]; ok {
		return path
	}
	
	var result []int
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	
	for _, dir := range directions {
		ni, nj := i+dir[0], j+dir[1]
		if ni >= 0 && ni < len(grid) && nj >= 0 && nj < len(grid[0]) {
			subPath := dfs(grid, ni, nj, k-1, memo)
			path := make([]int, len(subPath)+1)
			path[0] = grid[i][j]
			copy(path[1:], subPath)
			
			if result == nil || isLexSmaller(path, result) {
				result = path
			}
		}
	}
	
	memo[key] = result
	return result
}

func isLexSmaller(a, b []int) bool {
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
