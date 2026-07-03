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
        (int row, int col) = FindCell(grid, n, 1);
        
        List<long> minPath = null;
        List<long> currentPath = new List<long> { 1 };
        
        DfsMinpath(row, col, n, grid, k, currentPath, ref minPath);
        
        return minPath;
    }
    
    private static (int, int) FindCell(List<List<long>> grid, int n, long targetValue) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == targetValue) {
                    return (i, j);
                }
            }
        }
        return (-1, -1);
    }
    
    private static void DfsMinpath(int row, int col, int n, List<List<long>> grid, long k,
                                    List<long> currentPath, ref List<long> minPath) {
        if (currentPath.Count == k) {
            if (minPath == null || IsLexicographicallySmaller(currentPath, minPath)) {
                minPath = new List<long>(currentPath);
            }
            return;
        }
        
        if (minPath != null && !IsLexicographicallySmaller(currentPath, minPath)) {
            return;
        }
        
        var neighbors = GetSortedNeighbors(row, col, n, grid);
        
        foreach (var (newRow, newCol, value) in neighbors) {
            currentPath.Add(value);
            DfsMinpath(newRow, newCol, n, grid, k, currentPath, ref minPath);
            currentPath.RemoveAt(currentPath.Count - 1);
        }
    }
    
    private static List<(int, int, long)> GetSortedNeighbors(int row, int col, int n, List<List<long>> grid) {
        var neighbors = new List<(int, int, long)>();
        
        int[][] directions = new int[][] {
            new int[] { -1, 0 },
            new int[] { 1, 0 },
            new int[] { 0, -1 },
            new int[] { 0, 1 }
        };
        
        foreach (var dir in directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                neighbors.Add((newRow, newCol, grid[newRow][newCol]));
            }
        }
        
        neighbors.Sort((a, b) => a.Item3.CompareTo(b.Item3));
        return neighbors;
    }
    
    private static bool IsLexicographicallySmaller(List<long> a, List<long> b) {
        int minLen = Math.Min(a.Count, b.Count);
        for (int i = 0; i < minLen; i++) {
            if (a[i] < b[i]) return true;
            if (a[i] > b[i]) return false;
        }
        return a.Count < b.Count;
    }
}
