public static long fizzBuzz(long n) {
    long count = 0;
    for (long i = 1; i < n; i++) {
        if (i % 11 == 0 || i % 13 == 0) {
            String s = String.valueOf(i);
            for (char c : s.toCharArray()) {
                if (c == '7') {
                    count++;
                }
            }
        }
    }
    return count;
}
