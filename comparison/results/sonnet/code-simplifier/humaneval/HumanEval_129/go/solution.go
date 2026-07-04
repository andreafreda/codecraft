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
	smallestNeighbor := n*n + 1

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] != 1 {
				continue
			}

			if i > 0 && grid[i-1][j] < smallestNeighbor {
				smallestNeighbor = grid[i-1][j]
			}
			if j > 0 && grid[i][j-1] < smallestNeighbor {
				smallestNeighbor = grid[i][j-1]
			}
			if i < n-1 && grid[i+1][j] < smallestNeighbor {
				smallestNeighbor = grid[i+1][j]
			}
			if j < n-1 && grid[i][j+1] < smallestNeighbor {
				smallestNeighbor = grid[i][j+1]
			}
		}
	}

	ans := make([]int, k)
	for i := 0; i < k; i++ {
		if i%2 == 0 {
			ans[i] = 1
		} else {
			ans[i] = smallestNeighbor
		}
	}
	return ans
}
