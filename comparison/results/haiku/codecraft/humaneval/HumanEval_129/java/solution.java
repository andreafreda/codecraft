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
        ArrayList<Long> result = new ArrayList<>();
        
        // Find position of 1
        int row = -1, col = -1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid.get(i).get(j) == 1) {
                    row = i;
                    col = j;
                    break;
                }
            }
            if (row != -1) break;
        }
        
        // Build path greedily by always moving to the smallest valued neighbor
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        for (long i = 0; i < k; i++) {
            result.add(grid.get(row).get(col));
            
            if (i < k - 1) {
                // Find neighbor with smallest value
                long minVal = Long.MAX_VALUE;
                int nextRow = row, nextCol = col;
                
                for (int[] dir : directions) {
                    int newRow = row + dir[0];
                    int newCol = col + dir[1];
                    
                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                        long val = grid.get(newRow).get(newCol);
                        if (val < minVal) {
                            minVal = val;
                            nextRow = newRow;
                            nextCol = newCol;
                        }
                    }
                }
                
                row = nextRow;
                col = nextCol;
            }
        }
        
        return result;
    }
}
