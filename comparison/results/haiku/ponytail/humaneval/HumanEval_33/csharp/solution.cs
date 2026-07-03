using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    public static List<long> SortThird(List<long> l) {
        var sorted = l.Where((x, i) => i % 3 == 0).OrderBy(x => x).ToList();
        var result = new List<long>(l);
        for (int i = 0, j = 0; i < result.Count; i++) {
            if (i % 3 == 0) {
                result[i] = sorted[j++];
            }
        }
        return result;
    }
}
