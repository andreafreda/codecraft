import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    public static ArrayList<Long> sortThird(ArrayList<Long> l) {
        ArrayList<Long> result = new ArrayList<>(l);
        ArrayList<Long> thirdElements = new ArrayList<>();
        
        // Extract elements at indices divisible by 3
        for (int i = 0; i < l.size(); i += 3) {
            thirdElements.add(l.get(i));
        }
        
        // Sort them
        Collections.sort(thirdElements);
        
        // Put sorted elements back at indices divisible by 3
        int index = 0;
        for (int i = 0; i < l.size(); i += 3) {
            result.set(i, thirdElements.get(index));
            index++;
        }
        
        return result;
    }
}
