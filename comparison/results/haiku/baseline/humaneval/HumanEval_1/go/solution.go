func separate_paren_groups(paren_string string) []string {
	var result []string
	var current string
	depth := 0
	
	for _, ch := range paren_string {
		if ch == ' ' {
			continue
		}
		
		current += string(ch)
		if ch == '(' {
			depth++
		} else if ch == ')' {
			depth--
		}
		
		if depth == 0 && len(current) > 0 {
			result = append(result, current)
			current = ""
		}
	}
	
	return result
}
