public static long fizzBuzz(long n) {
    long count = 0;
    for (long i = 1; i < n; i++) {
        if (i % 11 == 0 || i % 13 == 0) {
            long temp = i;
            while (temp > 0) {
                if (temp % 10 == 7) {
                    count++;
                }
                temp /= 10;
            }
        }
    }
    return count;
}
