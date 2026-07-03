using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    // This function takes a list l and returns a list l' such that
    // l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
    // to the values of the corresponding indicies of l, but sorted.
    // >>> SortThird((new List<long>(new long[]{(long)1L, (long)2L, (long)3L})))
    // (new List<long>(new long[]{(long)1L, (long)2L, (long)3L}))
    // >>> SortThird((new List<long>(new long[]{(long)5L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)2L})))
    // (new List<long>(new long[]{(long)2L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)5L}))
    public static List<long> SortThird(List<long> l) {
        var sortedThirds = l.Where((v, i) => i % 3 == 0).OrderBy(x => x).ToList();
        
        var result = new List<long>(l);
        int sortedIndex = 0;
        for (int i = 0; i < result.Count; i++) {
            if (i % 3 == 0) {
                result[i] = sortedThirds[sortedIndex++];
            }
        }
        
        return result;
    }
}
