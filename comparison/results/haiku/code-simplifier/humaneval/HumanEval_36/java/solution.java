public static long fizzBuzz(long n) {
    long count = 0;
    for (long i = 1; i < n; i++) {
        if (isDivisibleBy11Or13(i) && containsDigit7(i)) {
            count++;
        }
    }
    return count;
}

private static boolean isDivisibleBy11Or13(long num) {
    return num % 11 == 0 || num % 13 == 0;
}

private static boolean containsDigit7(long num) {
    while (num > 0) {
        if (num % 10 == 7) {
            return true;
        }
        num /= 10;
    }
    return false;
}
