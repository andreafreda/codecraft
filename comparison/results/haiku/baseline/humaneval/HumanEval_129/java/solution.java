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
        
        // Find the position of value 1
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
        
        ArrayList<Long> path = new ArrayList<>();
        path.add(grid.get(row).get(col));
        
        // Build the path greedily
        for (long step = 1; step < k; step++) {
            int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            long minValue = Long.MAX_VALUE;
            int nextRow = -1, nextCol = -1;
            
            for (int[] dir : directions) {
                int newRow = row + dir[0];
                int newCol = col + dir[1];
                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                    long value = grid.get(newRow).get(newCol);
                    if (value < minValue) {
                        minValue = value;
                        nextRow = newRow;
                        nextCol = newCol;
                    }
                }
            }
            
            if (nextRow != -1) {
                path.add(grid.get(nextRow).get(nextCol));
                row = nextRow;
                col = nextCol;
            }
        }
        
        return path;
    }
}
