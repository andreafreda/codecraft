func TestFizz_Buzz(t *testing.T) {
  candidate := fizz_buzz
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate(50), expected: 0 },
     { actual: candidate(78), expected: 2 },
     { actual: candidate(79), expected: 3 },
     { actual: candidate(100), expected: 3 },
     { actual: candidate(200), expected: 6 },
     { actual: candidate(4000), expected: 192 },
     { actual: candidate(10000), expected: 639 },
     { actual: candidate(100000), expected: 8026 },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
