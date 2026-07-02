func TestCycpattern_Check(t *testing.T) {
  candidate := cycpattern_check
	type test struct {
		actual   interface{}
		expected interface{}
	}
   tests := []test{
     { actual: candidate("xyzw", "xyw"), expected: false },
     { actual: candidate("yello", "ell"), expected: true },
     { actual: candidate("whattup", "ptut"), expected: false },
     { actual: candidate("efef", "fee"), expected: true },
     { actual: candidate("abab", "aabb"), expected: false },
     { actual: candidate("winemtt", "tinem"), expected: true },
   }

	for i, tc := range tests {
		t.Run(fmt.Sprintf("test num % d", i), func(t *testing.T) {
			if fmt.Sprintf("%v", tc.actual) != fmt.Sprintf("%v", tc.expected) {
				t.Errorf("expected '%s', got '%s'", tc.expected, tc.actual)
			}
		})
	}
}
