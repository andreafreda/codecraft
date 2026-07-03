public static ArrayList<String> separateParenGroups(String paren_string) {
    ArrayList<String> result = new ArrayList<>();
    
    String cleaned = paren_string.replaceAll(" ", "");
    
    StringBuilder current = new StringBuilder();
    int balance = 0;
    
    for (char c : cleaned.toCharArray()) {
        if (c == '(') {
            balance++;
            current.append(c);
        } else if (c == ')') {
            balance--;
            current.append(c);
            
            if (balance == 0) {
                result.add(current.toString());
                current = new StringBuilder();
            }
        }
    }
    
    return result;
}
