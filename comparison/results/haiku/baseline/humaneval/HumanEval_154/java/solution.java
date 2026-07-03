public static boolean cycpatternCheck(String a, String b) {
    String current = b;
    for (int i = 0; i < b.length(); i++) {
        if (a.contains(current)) {
            return true;
        }
        current = current.substring(1) + current.charAt(0);
    }
    return false;
}
