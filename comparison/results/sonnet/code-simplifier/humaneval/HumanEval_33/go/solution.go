package sort_third_test

import (
	"fmt"
	"sort"
	"testing"
)

// This function takes a list l and returns a list l' such that
// l' is identical to l in the indices that are not divisible by three, while its values at the indices that are divisible by three are equal
// to the values of the corresponding indices of l, but sorted.
// >>> sort_third([]int{1, 2, 3})
// []int{1, 2, 3}
// >>> sort_third([]int{5, 6, 3, 4, 8, 9, 2})
// []int{2, 6, 3, 4, 8, 9, 5}
func sort_third(l []int) []int {
	result := make([]int, len(l))
	copy(result, l)

	values := make([]int, 0, (len(l)+2)/3)
	for i := 0; i < len(l); i += 3 {
		values = append(values, l[i])
	}
	sort.Ints(values)

	for i, v := range values {
		result[i*3] = v
	}

	return result
}

func TestSortThird(t *testing.T) {
	tests := []struct {
		input    []int
		expected []int
	}{
		{[]int{1, 2, 3}, []int{1, 2, 3}},
		{[]int{5, 6, 3, 4, 8, 9, 2}, []int{2, 6, 3, 4, 8, 9, 5}},
	}

	for _, test := range tests {
		result := sort_third(test.input)
		if fmt.Sprint(result) != fmt.Sprint(test.expected) {
			t.Errorf("sort_third(%v) = %v, expected %v", test.input, result, test.expected)
		}
	}
}
