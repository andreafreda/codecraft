package cycpattern_check_test

import (
    "strings"
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
    if len(b) > len(a) {
        return false
    }
    
    for i := 0; i < len(b); i++ {
        rotation := b[i:] + b[:i]
        if strings.Contains(a, rotation) {
            return true
        }
    }
    return false
}
