public static ArrayList<Long> sortThird(ArrayList<Long> l) {
    List<Long> thirdElements = new ArrayList<>();
    for (int i = 0; i < l.size(); i += 3) {
        thirdElements.add(l.get(i));
    }
    
    Collections.sort(thirdElements);
    
    ArrayList<Long> result = new ArrayList<>(l);
    int sortedIndex = 0;
    for (int i = 0; i < result.size(); i += 3) {
        result.set(i, thirdElements.get(sortedIndex++));
    }
    
    return result;
}
