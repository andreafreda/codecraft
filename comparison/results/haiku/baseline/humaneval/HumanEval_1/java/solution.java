public static ArrayList<String> separateParenGroups(String paren_string) {
    ArrayList<String> result = new ArrayList<>();
    
    // Remove all spaces
    String cleaned = paren_string.replaceAll(" ", "");
    
    StringBuilder current = new StringBuilder();
    int balance = 0;
    
    for (char c : cleaned.toCharArray()) {
        if (c == '(') {
            current.append(c);
            balance++;
        } else if (c == ')') {
            current.append(c);
            balance--;
            
            // When balance reaches 0, we've completed a group
            if (balance == 0) {
                result.add(current.toString());
                current = new StringBuilder();
            }
        }
    }
    
    return result;
}
