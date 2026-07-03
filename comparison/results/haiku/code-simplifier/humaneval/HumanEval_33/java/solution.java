public static ArrayList<Long> sortThird(ArrayList<Long> l) {
    List<Long> elementsToSort = new ArrayList<>();
    for (int i = 0; i < l.size(); i += 3) {
        elementsToSort.add(l.get(i));
    }
    
    Collections.sort(elementsToSort);
    
    ArrayList<Long> result = new ArrayList<>();
    int sortedIndex = 0;
    for (int i = 0; i < l.size(); i++) {
        if (i % 3 == 0) {
            result.add(elementsToSort.get(sortedIndex++));
        } else {
            result.add(l.get(i));
        }
    }
    
    return result;
}
