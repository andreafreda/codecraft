using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    // Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
    // separate those group into separate strings and return the list of those.
    // Separate groups are balanced (each open brace is properly closed) and not nested within each other
    // Ignore any spaces in the input string.
    // >>> SeparateParenGroups(("( ) (( )) (( )( ))"))
    // (new List<string>(new string[]{(string)"()", (string)"(())", (string)"(()())"}))
    public static List<string> SeparateParenGroups(string paren_string) {
        List<string> result = new List<string>();
        string cleaned = paren_string.Replace(" ", "");
        
        int balance = 0;
        int start = 0;
        
        for (int i = 0; i < cleaned.Length; i++) {
            if (cleaned[i] == '(') {
                balance++;
            } else if (cleaned[i] == ')') {
                balance--;
            }
            
            if (balance == 0) {
                result.Add(cleaned.Substring(start, i - start + 1));
                start = i + 1;
            }
        }
        
        return result;
    }
}
