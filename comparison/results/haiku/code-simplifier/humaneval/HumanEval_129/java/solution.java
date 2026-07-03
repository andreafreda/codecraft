public static ArrayList<Long> minPath(ArrayList<ArrayList<Long>> grid, long k) {
    int n = grid.size();
    
    // Find position of 1
    int startRow = -1, startCol = -1;
    outerLoop:
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (grid.get(i).get(j) == 1) {
                startRow = i;
                startCol = j;
                break outerLoop;
            }
        }
    }
    
    // Find minimum neighbor value
    long minNeighbor = Long.MAX_VALUE;
    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    for (int[] dir : directions) {
        int newRow = startRow + dir[0];
        int newCol = startCol + dir[1];
        if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
            minNeighbor = Math.min(minNeighbor, grid.get(newRow).get(newCol));
        }
    }
    
    // Build result by alternating between 1 and minNeighbor
    ArrayList<Long> result = new ArrayList<>();
    for (long i = 0; i < k; i++) {
        result.add(i % 2 == 0 ? 1L : minNeighbor);
    }
    
    return result;
}
