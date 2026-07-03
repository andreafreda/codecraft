public static List<string> SeparateParenGroups(string paren_string) {
    var result = new List<string>();
    string cleaned = paren_string.Replace(" ", "");
    
    string current = "";
    int depth = 0;
    
    foreach (char c in cleaned) {
        if (c == '(') {
            depth++;
            current += c;
        } else if (c == ')') {
            current += c;
            depth--;
            if (depth == 0) {
                result.Add(current);
                current = "";
            }
        }
    }
    
    return result;
}
