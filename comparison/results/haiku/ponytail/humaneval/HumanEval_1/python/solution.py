from typing import List


def separate_paren_groups(paren_string: str) -> List[str]:
    """ Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
    separate those group into separate strings and return the list of those.
    Separate groups are balanced (each open brace is properly closed) and not nested within each other
    Ignore any spaces in the input string.
    >>> separate_paren_groups('( ) (( )) (( )( ))')
    ['()', '(())', '(()())']
    """
    cleaned = paren_string.replace(' ', '')
    
    groups = []
    current_group = ''
    open_count = 0
    
    for char in cleaned:
        current_group += char
        if char == '(':
            open_count += 1
        elif char == ')':
            open_count -= 1
        
        if open_count == 0 and current_group:
            groups.append(current_group)
            current_group = ''
    
    return groups
