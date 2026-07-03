package sort_third_test

import (
	"sort"
	"testing"
	"fmt"
)

// sort_third returns a new slice where elements at indices divisible by 3 are sorted,
// and elements at other indices remain unchanged.
func sort_third(l []int) []int {
	// Extract elements at indices divisible by 3
	var third []int
	for i := 0; i < len(l); i += 3 {
		third = append(third, l[i])
	}

	// Sort the extracted elements
	sort.Ints(third)

	// Create result by copying original
	result := make([]int, len(l))
	copy(result, l)

	// Place sorted elements back at indices divisible by 3
	for i := 0; i < len(l); i += 3 {
		result[i] = third[i/3]
	}

	return result
}
