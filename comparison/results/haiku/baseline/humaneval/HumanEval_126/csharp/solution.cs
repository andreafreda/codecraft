using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    // Given a list of numbers, return whether or not they are sorted
    // in ascending order. If list has more than 1 duplicate of the same
    // number, return false. Assume no negative numbers and only integers.
    // Examples
    // >>> IsSorted((new List<long>(new long[]{(long)5L})))
    // (true)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L})))
    // (true)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)3L, (long)2L, (long)4L, (long)5L})))
    // (false)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L, (long)6L})))
    // (true)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L, (long)6L, (long)7L})))
    // (true)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)3L, (long)2L, (long)4L, (long)5L, (long)6L, (long)7L})))
    // (false)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)2L, (long)3L, (long)3L, (long)4L})))
    // (true)
    // >>> IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)2L, (long)2L, (long)3L, (long)4L})))
    // (false)
    public static bool IsSorted(List<long> lst) {
        // Check if any number appears more than twice
        Dictionary<long, int> freq = new Dictionary<long, int>();
        foreach (long num in lst) {
            if (freq.ContainsKey(num)) {
                freq[num]++;
            } else {
                freq[num] = 1;
            }
            
            if (freq[num] > 2) {
                return false;
            }
        }
        
        // Check if list is sorted in ascending order
        for (int i = 0; i < lst.Count - 1; i++) {
            if (lst[i] > lst[i + 1]) {
                return false;
            }
        }
        
        return true;
    }
}
