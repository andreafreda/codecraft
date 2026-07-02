func TestMinpath(t *testing.T) {
  candidate := minPath
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate([][]int{[]int{1, 2, 3}, []int{4, 5, 6}, []int{7, 8, 9}}, 3), expected: []int{1, 2, 1} },
     { actual: candidate([][]int{[]int{5, 9, 3}, []int{4, 1, 6}, []int{7, 8, 2}}, 1), expected: []int{1} },
     { actual: candidate([][]int{[]int{1, 2, 3, 4}, []int{5, 6, 7, 8}, []int{9, 10, 11, 12}, []int{13, 14, 15, 16}}, 4), expected: []int{1, 2, 1, 2} },
     { actual: candidate([][]int{[]int{6, 4, 13, 10}, []int{5, 7, 12, 1}, []int{3, 16, 11, 15}, []int{8, 14, 9, 2}}, 7), expected: []int{1, 10, 1, 10, 1, 10, 1} },
     { actual: candidate([][]int{[]int{8, 14, 9, 2}, []int{6, 4, 13, 15}, []int{5, 7, 1, 12}, []int{3, 10, 11, 16}}, 5), expected: []int{1, 7, 1, 7, 1} },
     { actual: candidate([][]int{[]int{11, 8, 7, 2}, []int{5, 16, 14, 4}, []int{9, 3, 15, 6}, []int{12, 13, 10, 1}}, 9), expected: []int{1, 6, 1, 6, 1, 6, 1, 6, 1} },
     { actual: candidate([][]int{[]int{12, 13, 10, 1}, []int{9, 3, 15, 6}, []int{5, 16, 14, 4}, []int{11, 8, 7, 2}}, 12), expected: []int{1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6} },
     { actual: candidate([][]int{[]int{2, 7, 4}, []int{3, 1, 5}, []int{6, 8, 9}}, 8), expected: []int{1, 3, 1, 3, 1, 3, 1, 3} },
     { actual: candidate([][]int{[]int{6, 1, 5}, []int{3, 8, 9}, []int{2, 7, 4}}, 8), expected: []int{1, 5, 1, 5, 1, 5, 1, 5} },
     { actual: candidate([][]int{[]int{1, 2}, []int{3, 4}}, 10), expected: []int{1, 2, 1, 2, 1, 2, 1, 2, 1, 2} },
     { actual: candidate([][]int{[]int{1, 3}, []int{3, 2}}, 10), expected: []int{1, 3, 1, 3, 1, 3, 1, 3, 1, 3} },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
