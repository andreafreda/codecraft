using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    // Return the number of times the digit 7 appears in integers less than n which are divisible by 11 or 13.
    // >>> FizzBuzz((50L))
    // (0L)
    // >>> FizzBuzz((78L))
    // (2L)
    // >>> FizzBuzz((79L))
    // (3L)
    public static long FizzBuzz(long n) {
        long count = 0;
        for (long i = 1; i < n; i++) {
            if (i % 11 == 0 || i % 13 == 0) {
                long num = i;
                while (num > 0) {
                    if (num % 10 == 7) {
                        count++;
                    }
                    num /= 10;
                }
            }
        }
        return count;
    }
}
