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
        ArrayList<String> result = new ArrayList<String>();
        StringBuilder currentGroup = new StringBuilder();
        int depth = 0;
        for (int i = 0; i < paren_string.length(); i++) {
            char c = paren_string.charAt(i);
            if (c == '(') {
                depth++;
                currentGroup.append(c);
            } else if (c == ')') {
                depth--;
                currentGroup.append(c);
                if (depth == 0) {
                    result.add(currentGroup.toString());
                    currentGroup = new StringBuilder();
                }
            }
            // Any other character (e.g. spaces) is ignored.
        }
        return result;
    }
}
