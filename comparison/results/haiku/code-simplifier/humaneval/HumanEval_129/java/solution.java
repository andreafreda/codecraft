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
        int gridSize = grid.size();
        
        // Find position of cell containing value 1
        int startRow = 0, startCol = 0;
        outer: for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize; j++) {
                if (grid.get(i).get(j) == 1) {
                    startRow = i;
                    startCol = j;
                    break outer;
                }
            }
        }
        
        ArrayList<Long> result = new ArrayList<>();
        result.add(1L);
        
        if (k == 1) {
            return result;
        }
        
        // Find the smallest neighbor adjacent to the cell with value 1
        int[][] neighborOffsets = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        long smallestNeighbor = Long.MAX_VALUE;
        
        for (int[] offset : neighborOffsets) {
            int neighborRow = startRow + offset[0];
            int neighborCol = startCol + offset[1];
            if (neighborRow >= 0 && neighborRow < gridSize && neighborCol >= 0 && neighborCol < gridSize) {
                smallestNeighbor = Math.min(smallestNeighbor, grid.get(neighborRow).get(neighborCol));
            }
        }
        
        // Build path by alternating between smallest neighbor and 1
        for (int i = 1; i < k; i++) {
            result.add(i % 2 == 1 ? smallestNeighbor : 1L);
        }
        
        return result;
    }
}
