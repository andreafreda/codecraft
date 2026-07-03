public static ArrayList<Long> sortThird(ArrayList<Long> l) {
    List<Long> thirdIndices = new ArrayList<>();
    for (int i = 0; i < l.size(); i++) {
        if (i % 3 == 0) {
            thirdIndices.add(l.get(i));
        }
    }
    
    Collections.sort(thirdIndices);
    
    ArrayList<Long> result = new ArrayList<>();
    int thirdIndex = 0;
    for (int i = 0; i < l.size(); i++) {
        if (i % 3 == 0) {
            result.add(thirdIndices.get(thirdIndex++));
        } else {
            result.add(l.get(i));
        }
    }
    
    return result;
}
