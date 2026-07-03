using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
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
    // after making the ordered lists of the values on the cells that A and B go
    // through (let's call them lst_A and lst_B), lst_A is lexicographically less
    // than lst_B, in other words, there exist an integer index i (1 <= i <= k)
    // such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
    // lst_A[j] = lst_B[j].
    // It is guaranteed that the answer is unique.
    // Return an ordered list of the values on the cells that the minimum path go through.
    // Examples:    
    // >>> Minpath((new List<List<long>>(new List<long>[]{(List<long>)new List<long>(new long[]{(long)1L, (long)2L, (long)3L}), (List<long>)new List<long>(new long[]{(long)4L, (long)5L, (long)6L}), (List<long>)new List<long>(new long[]{(long)7L, (long)8L, (long)9L})})), (3L))
    // (new List<long>(new long[]{(long)1L, (long)2L, (long)1L}))
    // >>> Minpath((new List<List<long>>(new List<long>[]{(List<long>)new List<long>(new long[]{(long)5L, (long)9L, (long)3L}), (List<long>)new List<long>(new long[]{(long)4L, (long)1L, (long)6L}), (List<long>)new List<long>(new long[]{(long)7L, (long)8L, (long)2L})})), (1L))
    // (new List<long>(new long[]{(long)1L}))
    public static List<long> Minpath(List<List<long>> grid, long k) {
        long n = grid.Count;
        
        // Find the position of 1
        int startRow = -1, startCol = -1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    startRow = i;
                    startCol = j;
                    break;
                }
            }
            if (startRow != -1) break;
        }
        
        // DFS to find the minimum path
        List<long> result = new List<long>();
        DFS(grid, startRow, startCol, k, new List<long>(), result);
        return result;
    }

    private static void DFS(List<List<long>> grid, int row, int col, long remaining, List<long> currentPath, List<long> result) {
        currentPath.Add(grid[row][col]);
        
        if (remaining == 1) {
            if (result.Count == 0 || IsLexicographicallySmaller(currentPath, result)) {
                result.Clear();
                result.AddRange(currentPath);
            }
            currentPath.RemoveAt(currentPath.Count - 1);
            return;
        }
        
        // Pruning: if current path prefix is already larger than result, stop
        if (result.Count > 0) {
            int cmp = CompareLists(currentPath, result);
            if (cmp > 0) {
                currentPath.RemoveAt(currentPath.Count - 1);
                return;
            }
        }
        
        int n = grid.Count;
        int[] directions = { -1, 0, 1, 0, -1 };
        
        // Get neighbors and sort by value
        List<(int, int)> neighbors = new List<(int, int)>();
        for (int i = 0; i < 4; i++) {
            int newRow = row + directions[i];
            int newCol = col + directions[i + 1];
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                neighbors.Add((newRow, newCol));
            }
        }
        
        // Sort neighbors by their values to try smallest first
        neighbors.Sort((a, b) => grid[a.Item1][a.Item2].CompareTo(grid[b.Item1][b.Item2]));
        
        foreach (var (nextRow, nextCol) in neighbors) {
            DFS(grid, nextRow, nextCol, remaining - 1, currentPath, result);
        }
        
        currentPath.RemoveAt(currentPath.Count - 1);
    }

    private static int CompareLists(List<long> a, List<long> b) {
        int minLen = Math.Min(a.Count, b.Count);
        for (int i = 0; i < minLen; i++) {
            if (a[i] < b[i]) return -1;
            if (a[i] > b[i]) return 1;
        }
        if (a.Count < b.Count) return -1;
        if (a.Count > b.Count) return 1;
        return 0;
    }

    private static bool IsLexicographicallySmaller(List<long> a, List<long> b) {
        return CompareLists(a, b) < 0;
    }
}
