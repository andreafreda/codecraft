public static boolean cycpatternCheck(String a, String b) {
    for (int i = 0; i < b.length(); i++) {
        String rotated = b.substring(i) + b.substring(0, i);
        if (a.contains(rotated)) {
            return true;
        }
    }
    return false;
}
