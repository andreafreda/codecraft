import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    // Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
    // separate those group into separate strings and return the array list of those.
    // Separate groups are balanced (each open brace is properly closed) and not nested within each other
    // Ignore any spaces in the input string.
    // >>> separateParenGroups(("( ) (( )) (( )( ))"))
    // (new ArrayList<String>(Arrays.asList((String)"()", (String)"(())", (String)"(()())")))
    public static ArrayList<String> separateParenGroups(String paren_string) {
        ArrayList<String> result = new ArrayList<>();
        String clean = paren_string.replaceAll(" ", "");
        
        int count = 0;
        int start = 0;
        
        for (int i = 0; i < clean.length(); i++) {
            if (clean.charAt(i) == '(') {
                count++;
            } else if (clean.charAt(i) == ')') {
                count--;
            }
            
            if (count == 0 && start < i) {
                result.add(clean.substring(start, i + 1));
                start = i + 1;
            }
        }
        
        return result;
    }
}
