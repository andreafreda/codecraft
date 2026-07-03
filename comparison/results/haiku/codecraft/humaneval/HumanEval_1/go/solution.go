func separate_paren_groups(paren_string string) []string {
	// Remove spaces
	cleaned := ""
	for _, ch := range paren_string {
		if ch != ' ' {
			cleaned += string(ch)
		}
	}
	
	var groups []string
	current := ""
	balance := 0
	
	for _, ch := range cleaned {
		if ch == '(' {
			balance++
			current += string(ch)
		} else if ch == ')' {
			balance--
			current += string(ch)
			if balance == 0 {
				groups = append(groups, current)
				current = ""
			}
		}
	}
	
	return groups
}
