package is_sorted_test

import (
    "testing"
    "fmt"
)

// Given a list of numbers, return whether or not they are sorted
// in ascending order. If list has more than 1 duplicate of the same
// number, return false. Assume no negative numbers and only integers.
// Examples
// >>> is_sorted([]int{5})
// true
// >>> is_sorted([]int{1, 2, 3, 4, 5})
// true
// >>> is_sorted([]int{1, 3, 2, 4, 5})
// false
// >>> is_sorted([]int{1, 2, 3, 4, 5, 6})
// true
// >>> is_sorted([]int{1, 2, 3, 4, 5, 6, 7})
// true
// >>> is_sorted([]int{1, 3, 2, 4, 5, 6, 7})
// false
// >>> is_sorted([]int{1, 2, 2, 3, 3, 4})
// true
// >>> is_sorted([]int{1, 2, 2, 2, 3, 4})
// false
func is_sorted(lst []int) bool {
	count := make(map[int]int)
	
	for i := 0; i < len(lst); i++ {
		if i > 0 && lst[i-1] > lst[i] {
			return false
		}
		
		count[lst[i]]++
		if count[lst[i]] > 2 {
			return false
		}
	}
	
	return true
}
