func TestIs_Sorted(t *testing.T) {
  candidate := is_sorted
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate([]int{5}), expected: true },
     { actual: candidate([]int{1, 2, 3, 4, 5}), expected: true },
     { actual: candidate([]int{1, 3, 2, 4, 5}), expected: false },
     { actual: candidate([]int{1, 2, 3, 4, 5, 6}), expected: true },
     { actual: candidate([]int{1, 2, 3, 4, 5, 6, 7}), expected: true },
     { actual: candidate([]int{1, 3, 2, 4, 5, 6, 7}), expected: false },
     { actual: candidate([]int{}), expected: true },
     { actual: candidate([]int{1}), expected: true },
     { actual: candidate([]int{3, 2, 1}), expected: false },
     { actual: candidate([]int{1, 2, 2, 2, 3, 4}), expected: false },
     { actual: candidate([]int{1, 2, 3, 3, 3, 4}), expected: false },
     { actual: candidate([]int{1, 2, 2, 3, 3, 4}), expected: true },
     { actual: candidate([]int{1, 2, 3, 4}), expected: true },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
