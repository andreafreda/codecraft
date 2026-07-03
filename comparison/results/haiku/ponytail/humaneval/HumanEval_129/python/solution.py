def minPath(grid, k):
    n = len(grid)
    
    # Find position of value 1 (optimal starting point)
    start_pos = None
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                start_pos = (i, j)
                break
        if start_pos:
            break
    
    best_path = None
    
    def dfs(i, j, path):
        nonlocal best_path
        
        if len(path) == k:
            if best_path is None or path < best_path:
                best_path = path[:]
            return
        
        # Pruning: if current path is worse than best path, stop
        if best_path is not None and path > best_path[:len(path)]:
            return
        
        # Try all 4 neighbors
        for di, dj in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < n and 0 <= nj < n:
                path.append(grid[ni][nj])
                dfs(ni, nj, path)
                path.pop()
    
    dfs(start_pos[0], start_pos[1], [1])
    
    return best_path
