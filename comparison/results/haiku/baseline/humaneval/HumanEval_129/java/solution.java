import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
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
    // after making the ordered array lists of the values on the cells that A and B go
    // through (let's call them lst_A and lst_B), lst_A is lexicographically less
    // than lst_B, in other words, there exist an integer index i (1 <= i <= k)
    // such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
    // lst_A[j] = lst_B[j].
    // It is guaranteed that the answer is unique.
    // Return an ordered array list of the values on the cells that the minimum path go through.
    // Examples:    
    // >>> minPath((new ArrayList<ArrayList<Long>>(Arrays.asList((ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l)), (ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)4l, (long)5l, (long)6l)), (ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)7l, (long)8l, (long)9l))))), (3l))
    // (new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)1l)))
    // >>> minPath((new ArrayList<ArrayList<Long>>(Arrays.asList((ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)5l, (long)9l, (long)3l)), (ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)4l, (long)1l, (long)6l)), (ArrayList<Long>)new ArrayList<Long>(Arrays.asList((long)7l, (long)8l, (long)2l))))), (1l))
    // (new ArrayList<Long>(Arrays.asList((long)1l)))
    public static ArrayList<Long> minPath(ArrayList<ArrayList<Long>> grid, long k) {
        int n = grid.size();
        
        // Find the position of 1 in the grid
        int startRow = -1, startCol = -1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid.get(i).get(j) == 1) {
                    startRow = i;
                    startCol = j;
                    break;
                }
            }
            if (startRow != -1) break;
        }
        
        // Greedily build the path by always moving to the smallest neighbor
        ArrayList<Long> path = new ArrayList<>();
        path.add(1L);
        
        int currentRow = startRow;
        int currentCol = startCol;
        
        for (long step = 1; step < k; step++) {
            // Find the smallest neighbor
            long minNeighbor = Long.MAX_VALUE;
            int nextRow = currentRow, nextCol = currentCol;
            
            // Check all 4 neighbors (up, down, left, right)
            int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            for (int[] dir : directions) {
                int nr = currentRow + dir[0];
                int nc = currentCol + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    long neighborValue = grid.get(nr).get(nc);
                    if (neighborValue < minNeighbor) {
                        minNeighbor = neighborValue;
                        nextRow = nr;
                        nextCol = nc;
                    }
                }
            }
            
            path.add(minNeighbor);
            currentRow = nextRow;
            currentCol = nextCol;
        }
        
        return path;
    }
}
