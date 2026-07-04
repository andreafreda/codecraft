import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    // Given an array array list of numbers, return whether or not they are sorted
    // in ascending order. If array list has more than 1 duplicate of the same
    // number, return false. Assume no negative numbers and only integers.
    // Examples
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)5l))))
    // (true)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l))))
    // (true)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)3l, (long)2l, (long)4l, (long)5l))))
    // (false)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l, (long)6l))))
    // (true)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l, (long)6l, (long)7l))))
    // (true)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)3l, (long)2l, (long)4l, (long)5l, (long)6l, (long)7l))))
    // (false)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)2l, (long)3l, (long)3l, (long)4l))))
    // (true)
    // >>> isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)2l, (long)2l, (long)3l, (long)4l))))
    // (false)
    public static boolean isSorted(ArrayList<Long> lst) {
        Map<Long, Integer> counts = new HashMap<>();
        for (Long n : lst) {
            counts.put(n, counts.getOrDefault(n, 0) + 1);
            if (counts.get(n) > 2) {
                return false;
            }
        }
        for (int i = 0; i < lst.size() - 1; i++) {
            if (lst.get(i) > lst.get(i + 1)) {
                return false;
            }
        }
        return true;
    }
}
