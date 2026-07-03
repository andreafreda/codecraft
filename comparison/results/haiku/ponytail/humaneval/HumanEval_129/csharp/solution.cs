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
        
        // Find position of value 1
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
        int[][] directions = new int[][] { 
            new int[] { -1, 0 }, 
            new int[] { 1, 0 }, 
            new int[] { 0, -1 }, 
            new int[] { 0, 1 } 
        };
        
        bool IsLexSmaller(List<long> a, List<long> b) {
            for (int i = 0; i < a.Count; i++) {
                if (a[i] < b[i]) return true;
                if (a[i] > b[i]) return false;
            }
            return false;
        }
        
        bool CanBeBetter(List<long> current, List<long> best) {
            for (int i = 0; i < current.Count; i++) {
                if (current[i] < best[i]) return true;
                if (current[i] > best[i]) return false;
            }
            return true;
        }
        
        void DFS(int row, int col, List<long> path) {
            if (path.Count == k) {
                if (bestPath == null || IsLexSmaller(path, bestPath)) {
                    bestPath = new List<long>(path);
                }
                return;
            }
            
            if (bestPath != null && !CanBeBetter(path, bestPath)) {
                return;
            }
            
            var neighbors = new List<(int, int, long)>();
            foreach (var dir in directions) {
                int newRow = row + dir[0];
                int newCol = col + dir[1];
                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                    neighbors.Add((newRow, newCol, grid[newRow][newCol]));
                }
            }
            
            neighbors.Sort((a, b) => a.Item3.CompareTo(b.Item3));
            
            foreach (var (newRow, newCol, val) in neighbors) {
                path.Add(val);
                DFS(newRow, newCol, path);
                path.RemoveAt(path.Count - 1);
            }
        }
        
        DFS(startRow, startCol, new List<long> { 1L });
        return bestPath;
    }
}
