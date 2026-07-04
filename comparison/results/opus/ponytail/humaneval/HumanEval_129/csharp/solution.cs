using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    public static List<long> Minpath(List<List<long>> grid, long k) {
        int n = grid.Count;
        int r = 0, c = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { r = i; c = j; }
        long neighbor = long.MaxValue;
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };
        for (int d = 0; d < 4; d++) {
            int ni = r + dr[d], nj = c + dc[d];
            if (ni >= 0 && ni < n && nj >= 0 && nj < n)
                neighbor = Math.Min(neighbor, grid[ni][nj]);
        }
        var result = new List<long>();
        for (long i = 0; i < k; i++)
            result.Add(i % 2 == 0 ? 1L : neighbor);
        return result;
    }
}
