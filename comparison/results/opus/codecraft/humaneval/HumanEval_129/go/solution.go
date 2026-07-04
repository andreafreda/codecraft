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

	// The smallest possible first value is 1, which appears exactly once.
	// Find its cell, then find the smallest value reachable in one step.
	var startRow, startCol int
	for row := 0; row < n; row++ {
		for col := 0; col < n; col++ {
			if grid[row][col] == 1 {
				startRow, startCol = row, col
			}
		}
	}

	deltas := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	smallestNeighbor := n*n + 1
	for _, d := range deltas {
		row, col := startRow+d[0], startCol+d[1]
		if row >= 0 && row < n && col >= 0 && col < n && grid[row][col] < smallestNeighbor {
			smallestNeighbor = grid[row][col]
		}
	}

	// The optimal path bounces between 1 and its smallest neighbor: any step
	// away from 1 can only return to 1 as its cheapest continuation.
	path := make([]int, k)
	for i := 0; i < k; i++ {
		if i%2 == 0 {
			path[i] = 1
		} else {
			path[i] = smallestNeighbor
		}
	}
	return path
}
