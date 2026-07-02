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
