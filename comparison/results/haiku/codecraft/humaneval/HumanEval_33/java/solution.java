import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    // This function takes an array array list l and returns an array array list l' such that
    // l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
    // to the values of the corresponding indicies of l, but sorted.
    // >>> sortThird((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l))))
    // (new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l)))
    // >>> sortThird((new ArrayList<Long>(Arrays.asList((long)5l, (long)6l, (long)3l, (long)4l, (long)8l, (long)9l, (long)2l))))
    // (new ArrayList<Long>(Arrays.asList((long)2l, (long)6l, (long)3l, (long)4l, (long)8l, (long)9l, (long)5l)))
    public static ArrayList<Long> sortThird(ArrayList<Long> l) {
        List<Long> thirdElements = new ArrayList<>();
        for (int i = 0; i < l.size(); i += 3) {
            thirdElements.add(l.get(i));
        }
        
        Collections.sort(thirdElements);
        
        ArrayList<Long> result = new ArrayList<>(l);
        int thirdIndex = 0;
        for (int i = 0; i < result.size(); i += 3) {
            result.set(i, thirdElements.get(thirdIndex));
            thirdIndex++;
        }
        
        return result;
    }
}
