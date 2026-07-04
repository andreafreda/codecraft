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
        ArrayList<String> groups = new ArrayList<>();
        StringBuilder currentGroup = new StringBuilder();
        int depth = 0;

        for (char c : paren_string.toCharArray()) {
            if (c == ' ') {
                continue;
            }

            currentGroup.append(c);

            if (c == '(') {
                depth++;
            } else if (c == ')') {
                depth--;
                if (depth == 0) {
                    groups.add(currentGroup.toString());
                    currentGroup = new StringBuilder();
                }
            }
        }

        return groups;
    }
}
