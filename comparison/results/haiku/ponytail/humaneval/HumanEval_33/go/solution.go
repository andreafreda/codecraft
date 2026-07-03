package sort_third_test

import (
    "testing"
    "fmt"
    "sort"
)

// This function takes a list l and returns a list l' such that
// l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
// to the values of the corresponding indicies of l, but sorted.
// >>> sort_third([]int{1, 2, 3})
// []int{1, 2, 3}
// >>> sort_third([]int{5, 6, 3, 4, 8, 9, 2})
// []int{2, 6, 3, 4, 8, 9, 5}
func sort_third(l []int) []int {
    var toSort []int
    for i, v := range l {
        if i%3 == 0 {
            toSort = append(toSort, v)
        }
    }
    
    sort.Ints(toSort)
    
    result := make([]int, len(l))
    copy(result, l)
    
    sortIdx := 0
    for i := 0; i < len(result); i++ {
        if i%3 == 0 {
            result[i] = toSort[sortIdx]
            sortIdx++
        }
    }
    
    return result
}
