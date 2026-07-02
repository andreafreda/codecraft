func TestSort_Third(t *testing.T) {
  candidate := sort_third
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate([]int{5, 6, 3, 4, 8, 9, 2}), expected: []int{2, 6, 3, 4, 8, 9, 5} },
     { actual: candidate([]int{5, 8, 3, 4, 6, 9, 2}), expected: []int{2, 8, 3, 4, 6, 9, 5} },
     { actual: candidate([]int{5, 6, 9, 4, 8, 3, 2}), expected: []int{2, 6, 9, 4, 8, 3, 5} },
     { actual: candidate([]int{5, 6, 3, 4, 8, 9, 2, 1}), expected: []int{2, 6, 3, 4, 8, 9, 5, 1} },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
