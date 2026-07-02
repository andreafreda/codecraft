func TestSeparate_Paren_Groups(t *testing.T) {
  candidate := separate_paren_groups
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate("(()()) ((())) () ((())()())"), expected: []string{"(()())", "((()))", "()", "((())()())"} },
     { actual: candidate("() (()) ((())) (((())))"), expected: []string{"()", "(())", "((()))", "(((())))"} },
     { actual: candidate("(()(())((())))"), expected: []string{"(()(())((())))"} },
     { actual: candidate("( ) (( )) (( )( ))"), expected: []string{"()", "(())", "(()())"} },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
