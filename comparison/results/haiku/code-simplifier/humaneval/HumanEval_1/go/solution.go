package separate_paren_groups_test

import (
	"strings"
	"testing"
)

// Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
// separate those group into separate strings and return the list of those.
// Separate groups are balanced (each open brace is properly closed) and not nested within each other
// Ignore any spaces in the input string.
// >>> separate_paren_groups("( ) (( )) (( )( ))")
// []string{"()", "(())", "(()())"}
func separate_paren_groups(paren_string string) []string {
	var result []string
	var current strings.Builder
	balance := 0

	for _, char := range paren_string {
		if char == ' ' {
			continue
		}

		current.WriteRune(char)

		if char == '(' {
			balance++
		} else if char == ')' {
			balance--
		}

		if balance == 0 {
			result = append(result, current.String())
			current.Reset()
		}
	}

	return result
}
