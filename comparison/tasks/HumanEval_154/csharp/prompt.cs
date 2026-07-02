using System;
using System.Numerics;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
class Problem {
    // You are given 2 words. You need to return true if the second word or any of its rotations is a substring in the first word
    // >>> CycpatternCheck(("abcd"), ("abd"))
    // (false)
    // >>> CycpatternCheck(("hello"), ("ell"))
    // (true)
    // >>> CycpatternCheck(("whassup"), ("psus"))
    // (false)
    // >>> CycpatternCheck(("abab"), ("baa"))
    // (true)
    // >>> CycpatternCheck(("efef"), ("eeff"))
    // (false)
    // >>> CycpatternCheck(("himenss"), ("simen"))
    // (true)
    public static bool CycpatternCheck(string a, string b) {
