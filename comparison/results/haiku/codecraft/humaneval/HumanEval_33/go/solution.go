package sort_third_test

import (
    "sort"
    "testing"
    "fmt"
)

// This function takes a list l and returns a list l' such that
// l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
// to the values of the corresponding indicies of l, but sorted.
// >>> sort_third([]int{1, 2, 3})
// []int{1, 2, 3}
// >>> sort_third([]int{5, 6, 3, 4, 8, 9, 2})
// []int{2, 6, 3, 4, 8, 9, 5}
func sort_third(l []int) []int {
    var thirdValues []int
    for i := 0; i < len(l); i += 3 {
        thirdValues = append(thirdValues, l[i])
    }
    
    sort.Ints(thirdValues)
    
    result := make([]int, len(l))
    thirdIndex := 0
    for i := 0; i < len(l); i++ {
        if i%3 == 0 {
            result[i] = thirdValues[thirdIndex]
            thirdIndex++
        } else {
            result[i] = l[i]
        }
    }
    
    return result
}
