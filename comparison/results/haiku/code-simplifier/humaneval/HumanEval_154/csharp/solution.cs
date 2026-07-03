public static bool CycpatternCheck(string a, string b) {
    for (int i = 0; i < b.Length; i++) {
        string rotation = b[i..] + b[..i];
        if (a.Contains(rotation)) {
            return true;
        }
    }
    return false;
}
