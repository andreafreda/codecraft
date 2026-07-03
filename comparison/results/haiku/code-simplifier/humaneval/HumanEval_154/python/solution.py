def cycpattern_check(text: str, pattern: str) -> bool:
    """Check if pattern or any rotation of it is a substring of text.
    
    cycpattern_check("abcd","abd") => False
    cycpattern_check("hello","ell") => True
    cycpattern_check("whassup","psus") => False
    cycpattern_check("abab","baa") => True
    cycpattern_check("efef","eeff") => False
    cycpattern_check("himenss","simen") => True
    """
    return any(pattern[i:] + pattern[:i] in text for i in range(len(pattern)))
