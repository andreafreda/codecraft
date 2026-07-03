using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

class Problem {
    public static List<long> SortThird(List<long> l) {
        var result = new List<long>(l);
        var thirdElements = new List<long>();
        var thirdIndices = new List<int>();
        
        for (int i = 0; i < l.Count; i++) {
            if (i % 3 == 0) {
                thirdElements.Add(l[i]);
                thirdIndices.Add(i);
            }
        }
        
        thirdElements.Sort();
        
        for (int i = 0; i < thirdIndices.Count; i++) {
            result[thirdIndices[i]] = thirdElements[i];
        }
        
        return result;
    }
}
