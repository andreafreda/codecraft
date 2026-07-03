func minPath(grid [][]int, k int) []int {
	n := len(grid)

	// Find position of 1
	var startR, startC int
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				startR, startC = i, j
				break
			}
		}
	}

	result := []int{1}
	r, c := startR, startC

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(result) < k {
		minVal := n*n + 1
		minR, minC := r, c

		for _, dir := range directions {
			nr, nc := r+dir[0], c+dir[1]
			if nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] < minVal {
				minVal = grid[nr][nc]
				minR, minC = nr, nc
			}
		}

		result = append(result, minVal)
		r, c = minR, minC
	}

	return result
}
