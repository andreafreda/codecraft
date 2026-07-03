public static ArrayList<String> separateParenGroups(String paren_string) {
    ArrayList<String> result = new ArrayList<>();
    String cleaned = paren_string.replaceAll(" ", "");
    
    StringBuilder current = new StringBuilder();
    int balance = 0;
    
    for (char c : cleaned.toCharArray()) {
        current.append(c);
        
        if (c == '(') {
            balance++;
        } else if (c == ')') {
            balance--;
            if (balance == 0) {
                result.add(current.toString());
                current = new StringBuilder();
            }
        }
    }
    
    return result;
}
