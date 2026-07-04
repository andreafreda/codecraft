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
    thirds := []int{}
    for i := 0; i < len(l); i += 3 {
        thirds = append(thirds, l[i])
    }
    sort.Ints(thirds)

    result := make([]int, len(l))
    copy(result, l)
    for i, j := 0, 0; i < len(l); i += 3 {
        result[i] = thirds[j]
        j++
    }
    return result
}

var _ = fmt.Sprintf
var _ = testing.AllocsPerRun
