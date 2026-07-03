public static boolean isSorted(ArrayList<Long> lst) {
    // Check for more than 1 duplicate of any number
    Map<Long, Integer> counts = new HashMap<>();
    for (Long num : lst) {
        counts.put(num, counts.getOrDefault(num, 0) + 1);
        if (counts.get(num) > 2) {
            return false;
        }
    }
    
    // Check if sorted in ascending order
    for (int i = 1; i < lst.size(); i++) {
        if (lst.get(i) < lst.get(i - 1)) {
            return false;
        }
    }
    
    return true;
}
