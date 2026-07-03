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
        
        List<long> bestPath = null;
        List<long> currentPath = new List<long> { 1 };
        DFS(grid, startRow, startCol, k, currentPath, ref bestPath);
        
        return bestPath;
    }
    
    private static void DFS(List<List<long>> grid, int row, int col, long k, List<long> currentPath, ref List<long> bestPath) {
        if (bestPath != null) {
            bool isWorse = false;
            for (int i = 0; i < currentPath.Count; i++) {
                if (currentPath[i] < bestPath[i]) {
                    break;
                } else if (currentPath[i] > bestPath[i]) {
                    isWorse = true;
                    break;
                }
            }
            if (isWorse) {
                return;
            }
        }
        
        if (currentPath.Count == k) {
            if (bestPath == null || IsLexicographicallySmaller(currentPath, bestPath)) {
                bestPath = new List<long>(currentPath);
            }
            return;
        }
        
        int n = grid.Count;
        int[][] directions = new int[][] { 
            new int[] {-1, 0}, new int[] {1, 0}, 
            new int[] {0, -1}, new int[] {0, 1} 
        };
        
        List<(int, int, long)> neighbors = new List<(int, int, long)>();
        foreach (var dir in directions) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                neighbors.Add((newRow, newCol, grid[newRow][newCol]));
            }
        }
        
        neighbors.Sort((a, b) => a.Item3.CompareTo(b.Item3));
        
        foreach (var (newRow, newCol, value) in neighbors) {
            currentPath.Add(value);
            DFS(grid, newRow, newCol, k, currentPath, ref bestPath);
            currentPath.RemoveAt(currentPath.Count - 1);
        }
    }
    
    private static bool IsLexicographicallySmaller(List<long> a, List<long> b) {
        for (int i = 0; i < a.Count && i < b.Count; i++) {
            if (a[i] < b[i]) return true;
            if (a[i] > b[i]) return false;
        }
        return a.Count < b.Count;
    }
}
