package fizz_buzz_test

import (
    "testing"
    "fmt"
)

// Return the number of times the digit 7 appears in integers less than n which are divisible by 11 or 13.
// >>> fizz_buzz(50)
// 0
// >>> fizz_buzz(78)
// 2
// >>> fizz_buzz(79)
// 3
func fizz_buzz(n int) int {
    count := 0
    for i := 0; i < n; i++ {
        if i%11 == 0 || i%13 == 0 {
            for _, c := range fmt.Sprintf("%d", i) {
                if c == '7' {
                    count++
                }
            }
        }
    }
    return count
}
