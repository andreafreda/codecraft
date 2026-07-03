public static boolean isSorted(ArrayList<Long> lst) {
    // Check if sorted in ascending order
    for (int i = 0; i < lst.size() - 1; i++) {
        if (lst.get(i) > lst.get(i + 1)) {
            return false;
        }
    }
    
    // Check for more than 2 of the same number
    Map<Long, Integer> count = new HashMap<>();
    for (Long num : lst) {
        count.put(num, count.getOrDefault(num, 0) + 1);
        if (count.get(num) > 2) {
            return false;
        }
    }
    
    return true;
}
