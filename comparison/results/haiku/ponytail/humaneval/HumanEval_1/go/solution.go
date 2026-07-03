func separate_paren_groups(paren_string string) []string {
    var cleaned string
    for _, ch := range paren_string {
        if ch != ' ' {
            cleaned += string(ch)
        }
    }
    
    var result []string
    var current string
    var balance int
    
    for _, ch := range cleaned {
        current += string(ch)
        if ch == '(' {
            balance++
        } else if ch == ')' {
            balance--
        }
        
        if balance == 0 && current != "" {
            result = append(result, current)
            current = ""
        }
    }
    
    return result
}
