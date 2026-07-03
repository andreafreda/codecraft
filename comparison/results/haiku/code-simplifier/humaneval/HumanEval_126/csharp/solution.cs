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
        Dictionary<long, int> counts = new Dictionary<long, int>();
        
        for (int i = 0; i < lst.Count; i++) {
            if (i > 0 && lst[i] < lst[i - 1]) {
                return false;
            }
            
            if (counts.TryGetValue(lst[i], out int count)) {
                counts[lst[i]] = count + 1;
            } else {
                counts[lst[i]] = 1;
            }
        }
        
        return counts.Values.All(count => count <= 2);
    }
}
