package cycpattern_check_test

import (
    "testing"
    "fmt"
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
    doubled := b + b
    patternLen := len(b)
    for i := 0; i < patternLen; i++ {
        if strings.Contains(a, doubled[i:i+patternLen]) {
            return true
        }
    }
    return false
}
