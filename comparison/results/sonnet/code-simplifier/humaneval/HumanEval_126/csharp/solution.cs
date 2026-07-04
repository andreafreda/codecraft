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
        bool isAscending = lst.Zip(lst.Skip(1), (previous, current) => current >= previous).All(inOrder => inOrder);
        if (!isAscending) {
            return false;
        }

        var counts = lst.GroupBy(value => value).Select(group => group.Count());
        return counts.All(count => count <= 2);
    }
}
