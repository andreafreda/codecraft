def minPath(grid, k):
    n = len(grid)
    
    # Find the cell with value 1 (starting point for lexicographically smallest path)
    start_i, start_j = None, None
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                start_i, start_j = i, j
                break
        if start_i is not None:
            break
    
    memo = {}
    
    def dfs(i, j, remaining):
        if remaining == 1:
            return [grid[i][j]]
        
        if (i, j, remaining) in memo:
            return memo[(i, j, remaining)]
        
        current = grid[i][j]
        
        # Get neighbors sorted by their values
        neighbors = []
        for di, dj in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < n and 0 <= nj < n:
                neighbors.append((grid[ni][nj], ni, nj))
        
        neighbors.sort()
        
        result = None
        for val, ni, nj in neighbors:
            # Early termination: if val > result[1], all remaining neighbors are larger
            if result and val > result[1]:
                break
            
            path = dfs(ni, nj, remaining - 1)
            candidate = [current] + path
            
            if not result or candidate < result:
                result = candidate
        
        memo[(i, j, remaining)] = result
        return result
    
    return dfs(start_i, start_j, k)
