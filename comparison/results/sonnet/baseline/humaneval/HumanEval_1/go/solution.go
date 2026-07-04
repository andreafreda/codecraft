package separate_paren_groups_test

import (
	"testing"
	"fmt"
	"strings"
)

// Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
// separate those group into separate strings and return the list of those.
// Separate groups are balanced (each open brace is properly closed) and not nested within each other
// Ignore any spaces in the input string.
// >>> separate_paren_groups("( ) (( )) (( )( ))")
// []string{"()", "(())", "(()())"}
func separate_paren_groups(paren_string string) []string {
	result := []string{}
	current := strings.Builder{}
	depth := 0

	for _, ch := range paren_string {
		switch ch {
		case ' ':
			continue
		case '(':
			depth++
			current.WriteRune(ch)
		case ')':
			depth--
			current.WriteRune(ch)
			if depth == 0 {
				result = append(result, current.String())
				current.Reset()
			}
		}
	}

	return result
}
