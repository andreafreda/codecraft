public static boolean cycpatternCheck(String a, String b) {
    for (int i = 0; i < b.length(); i++) {
        if (a.contains(b.substring(i) + b.substring(0, i))) {
            return true;
        }
    }
    return false;
}
