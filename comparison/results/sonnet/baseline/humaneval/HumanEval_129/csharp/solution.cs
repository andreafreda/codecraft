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
    // >>> Minpath((new List<List<long>>(new List<List<long>>(new long[]{(long)5L, (long)9L, (long)3L}), (List<long>)new List<long>(new long[]{(long)4L, (long)1L, (long)6L}), (List<long>)new List<long>(new long[]{(long)7L, (long)8L, (long)2L})})), (1L))
    // (new List<long>(new long[]{(long)1L}))
    public static List<long> Minpath(List<List<long>> grid, long k) {
        int n = grid.Count;
        long val = (long)(n * n) + 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1L) {
                    List<long> temp = new List<long>();
                    if (i != 0) {
                        temp.Add(grid[i - 1][j]);
                    }
                    if (j != 0) {
                        temp.Add(grid[i][j - 1]);
                    }
                    if (i != n - 1) {
                        temp.Add(grid[i + 1][j]);
                    }
                    if (j != n - 1) {
                        temp.Add(grid[i][j + 1]);
                    }
                    val = temp.Min();
                }
            }
        }
        List<long> ans = new List<long>();
        for (long i = 0; i < k; i++) {
            if (i % 2 == 0) {
                ans.Add(1L);
            } else {
                ans.Add(val);
            }
        }
        return ans;
    }
}
