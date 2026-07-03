func separate_paren_groups(paren_string string) []string {
	var result []string
	var current strings.Builder
	count := 0

	for _, ch := range paren_string {
		if ch == ' ' {
			continue
		}

		current.WriteRune(ch)
		if ch == '(' {
			count++
		} else if ch == ')' {
			count--
		}

		if count == 0 && current.Len() > 0 {
			result = append(result, current.String())
			current.Reset()
		}
	}

	return result
}
