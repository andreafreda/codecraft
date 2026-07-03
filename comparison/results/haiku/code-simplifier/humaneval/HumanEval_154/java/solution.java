import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    public static boolean cycpatternCheck(String a, String b) {
        for (int i = 0; i < b.length(); i++) {
            String rotation = b.substring(i) + b.substring(0, i);
            if (a.contains(rotation)) {
                return true;
            }
        }
        return false;
    }
}
