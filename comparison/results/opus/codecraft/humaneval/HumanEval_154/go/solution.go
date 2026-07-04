package cycpattern_check_test

import (
    "testing"
    "fmt"
)

// You are given 2 words. You need to return true if the second word or any of its rotations is a substring in the first word
// >>> cycpattern_check("abcd", "abd")
// false
// >>> cycpattern_check("hello", "ell")
// true
// >>> cycpattern_check("whassup", "psus")
// false
// >>> cycpattern_check("abab", "baa")
// true
// >>> cycpattern_check("efef", "eeff")
// false
// >>> cycpattern_check("himenss", "simen")
// true
func cycpattern_check(a string, b string) bool {
    n := len(b)
    if n == 0 {
        return true
    }
    if n > len(a) {
        return false
    }
    doubled := b + b
    for i := 0; i < n; i++ {
        rotation := doubled[i : i+n]
        if strings.Contains(a, rotation) {
            return true
        }
    }
    return false
}
