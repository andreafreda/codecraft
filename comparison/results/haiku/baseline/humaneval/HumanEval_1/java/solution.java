import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    public static ArrayList<String> separateParenGroups(String paren_string) {
        ArrayList<String> result = new ArrayList<>();
        
        // Remove spaces
        String cleaned = paren_string.replaceAll(" ", "");
        
        int balance = 0;
        StringBuilder current = new StringBuilder();
        
        for (char c : cleaned.toCharArray()) {
            current.append(c);
            if (c == '(') {
                balance++;
            } else if (c == ')') {
                balance--;
            }
            
            // When balance reaches 0, we've completed a group
            if (balance == 0 && current.length() > 0) {
                result.add(current.toString());
                current = new StringBuilder();
            }
        }
        
        return result;
    }
}
