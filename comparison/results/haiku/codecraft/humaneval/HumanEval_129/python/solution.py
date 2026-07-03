def minPath(grid, k):
    n = len(grid)
    
    # Find starting position (where value is 1)
    start = None
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                start = (i, j)
                break
        if start:
            break
    
    # BFS: track the lexicographically smallest path to each cell at each step
    current_paths = {start: [grid[start[0]][start[1]]]}
    
    for step in range(k - 1):
        next_paths = {}
        for (row, col), path in current_paths.items():
            # Try moving to all adjacent cells
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < n and 0 <= nc < n:
                    new_path = path + [grid[nr][nc]]
                    # Keep only the lexicographically smallest path to this cell
                    if (nr, nc) not in next_paths or new_path < next_paths[(nr, nc)]:
                        next_paths[(nr, nc)] = new_path
        current_paths = next_paths
    
    # Return the lexicographically smallest path among all ending positions
    return min(current_paths.values())
