import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    public static ArrayList<Long> minPath(ArrayList<ArrayList<Long>> grid, long k) {
        int n = grid.size();
        
        // Find position of 1 (minimum value)
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
        
        // Find minimum neighbor of 1
        long minNeighbor = Long.MAX_VALUE;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int[] dir : directions) {
            int newRow = startRow + dir[0];
            int newCol = startCol + dir[1];
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                long val = grid.get(newRow).get(newCol);
                minNeighbor = Math.min(minNeighbor, val);
            }
        }
        
        // Build result by oscillating between 1 and its minimum neighbor
        ArrayList<Long> result = new ArrayList<>();
        for (long i = 0; i < k; i++) {
            if (i % 2 == 0) {
                result.add(1L);
            } else {
                result.add(minNeighbor);
            }
        }
        
        return result;
    }
}
