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
        Position minPos = findMinPosition(grid, n);
        long minValue = grid.get(minPos.row).get(minPos.col);
        long minNeighborValue = findMinNeighborValue(grid, n, minPos);

        ArrayList<Long> path = new ArrayList<>();
        for (long step = 0; step < k; step++) {
            path.add(step % 2 == 0 ? minValue : minNeighborValue);
        }
        return path;
    }

    private static Position findMinPosition(ArrayList<ArrayList<Long>> grid, int n) {
        Position minPos = new Position(0, 0);
        long minValue = (long) n * n + 1;
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                long value = grid.get(row).get(col);
                if (value < minValue) {
                    minValue = value;
                    minPos = new Position(row, col);
                }
            }
        }
        return minPos;
    }

    private static long findMinNeighborValue(ArrayList<ArrayList<Long>> grid, int n, Position pos) {
        int[] dRow = {-1, 1, 0, 0};
        int[] dCol = {0, 0, -1, 1};
        long minNeighborValue = (long) n * n + 1;
        for (int d = 0; d < 4; d++) {
            int neighborRow = pos.row + dRow[d];
            int neighborCol = pos.col + dCol[d];
            if (neighborRow >= 0 && neighborRow < n && neighborCol >= 0 && neighborCol < n) {
                long value = grid.get(neighborRow).get(neighborCol);
                if (value < minNeighborValue) {
                    minNeighborValue = value;
                }
            }
        }
        return minNeighborValue;
    }

    private static class Position {
        final int row;
        final int col;

        Position(int row, int col) {
            this.row = row;
            this.col = col;
        }
    }
}
