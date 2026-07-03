public static ArrayList<Long> minPath(ArrayList<ArrayList<Long>> grid, long k) {
    int n = grid.size();
    
    // Find position of 1
    int row = -1, col = -1;
    for (int i = 0; i < n && row == -1; i++) {
        for (int j = 0; j < n; j++) {
            if (grid.get(i).get(j) == 1) {
                row = i;
                col = j;
                break;
            }
        }
    }
    
    ArrayList<Long> path = new ArrayList<>();
    path.add(1L);
    
    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    for (int step = 1; step < k; step++) {
        long minNeighbor = Long.MAX_VALUE;
        int nextRow = row, nextCol = col;
        
        for (int[] dir : directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                long neighborValue = grid.get(newRow).get(newCol);
                if (neighborValue < minNeighbor) {
                    minNeighbor = neighborValue;
                    nextRow = newRow;
                    nextCol = newCol;
                }
            }
        }
        
        row = nextRow;
        col = nextCol;
        path.add(grid.get(row).get(col));
    }
    
    return path;
}
