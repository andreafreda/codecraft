public static boolean isSorted(ArrayList<Long> lst) {
    Map<Long, Integer> elementCount = new HashMap<>();
    
    for (int i = 0; i < lst.size(); i++) {
        Long element = lst.get(i);
        
        int count = elementCount.getOrDefault(element, 0) + 1;
        if (count > 2) {
            return false;
        }
        elementCount.put(element, count);
        
        if (i > 0 && element < lst.get(i - 1)) {
            return false;
        }
    }
    
    return true;
}
