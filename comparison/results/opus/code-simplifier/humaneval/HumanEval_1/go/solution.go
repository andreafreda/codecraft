package separate_paren_groups_test

import (
	"fmt"
	"testing"
)

// Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
// separate those group into separate strings and return the list of those.
// Separate groups are balanced (each open brace is properly closed) and not nested within each other
// Ignore any spaces in the input string.
// >>> separate_paren_groups("( ) (( )) (( )( ))")
// []string{"()", "(())", "(()())"}
func separate_paren_groups(paren_string string) []string {
	groups := []string{}
	current := []rune{}
	depth := 0

	for _, char := range paren_string {
		switch char {
		case '(':
			depth++
			current = append(current, char)
		case ')':
			depth--
			current = append(current, char)
			if depth == 0 {
				groups = append(groups, string(current))
				current = []rune{}
			}
		}
	}

	return groups
}

var _ = fmt.Sprintf
var _ = testing.Short
