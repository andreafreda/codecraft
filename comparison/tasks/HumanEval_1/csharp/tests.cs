    }
    public static void Main(string[] args) {
    Debug.Assert(SeparateParenGroups(("(()()) ((())) () ((())()())")).Equals((new List<string>(new string[]{(string)"(()())", (string)"((()))", (string)"()", (string)"((())()())"}))));
    Debug.Assert(SeparateParenGroups(("() (()) ((())) (((())))")).Equals((new List<string>(new string[]{(string)"()", (string)"(())", (string)"((()))", (string)"(((())))"}))));
    Debug.Assert(SeparateParenGroups(("(()(())((())))")).Equals((new List<string>(new string[]{(string)"(()(())((())))"}))));
    Debug.Assert(SeparateParenGroups(("( ) (( )) (( )( ))")).Equals((new List<string>(new string[]{(string)"()", (string)"(())", (string)"(()())"}))));
    }

}
