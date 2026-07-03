import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    public static boolean isSorted(ArrayList<Long> lst) {
        Map<Long, Integer> counts = new HashMap<>();
        Long previous = null;
        
        for (Long current : lst) {
            if (previous != null && previous > current) {
                return false;
            }
            
            int count = counts.getOrDefault(current, 0) + 1;
            if (count > 2) {
                return false;
            }
            counts.put(current, count);
            
            previous = current;
        }
        
        return true;
    }
}
