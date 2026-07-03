public static ArrayList<Long> sortThird(ArrayList<Long> l) {
    // Extract values at indices divisible by 3
    ArrayList<Long> thirdIndices = new ArrayList<>();
    for (int i = 0; i < l.size(); i += 3) {
        thirdIndices.add(l.get(i));
    }
    
    // Sort them
    Collections.sort(thirdIndices);
    
    // Create result with sorted values at divisible-by-3 indices
    ArrayList<Long> result = new ArrayList<>();
    int thirdIndex = 0;
    for (int i = 0; i < l.size(); i++) {
        if (i % 3 == 0) {
            result.add(thirdIndices.get(thirdIndex));
            thirdIndex++;
        } else {
            result.add(l.get(i));
        }
    }
    
    return result;
}
