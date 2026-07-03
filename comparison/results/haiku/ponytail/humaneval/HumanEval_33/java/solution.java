public static ArrayList<Long> sortThird(ArrayList<Long> l) {
    List<Long> thirdIndices = new ArrayList<>();
    for (int i = 0; i < l.size(); i += 3) {
        thirdIndices.add(l.get(i));
    }
    
    Collections.sort(thirdIndices);
    
    ArrayList<Long> result = new ArrayList<>(l);
    int sortedIndex = 0;
    for (int i = 0; i < result.size(); i += 3) {
        result.set(i, thirdIndices.get(sortedIndex++));
    }
    
    return result;
}
