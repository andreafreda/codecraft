import java.util.*;
import java.lang.reflect.*;
import org.javatuples.*;
import java.security.*;
import java.math.*;
import java.io.*;
import java.util.stream.*;
class Problem {
    // Return the number of times the digit 7 appears in integers less than n which are divisible by 11 or 13.
    // >>> fizzBuzz((50l))
    // (0l)
    // >>> fizzBuzz((78l))
    // (2l)
    // >>> fizzBuzz((79l))
    // (3l)
    public static long fizzBuzz(long n) {
