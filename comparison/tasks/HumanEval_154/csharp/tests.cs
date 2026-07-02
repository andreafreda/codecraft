    }
    public static void Main(string[] args) {
    Debug.Assert(CycpatternCheck(("xyzw"), ("xyw")) == (false));
    Debug.Assert(CycpatternCheck(("yello"), ("ell")) == (true));
    Debug.Assert(CycpatternCheck(("whattup"), ("ptut")) == (false));
    Debug.Assert(CycpatternCheck(("efef"), ("fee")) == (true));
    Debug.Assert(CycpatternCheck(("abab"), ("aabb")) == (false));
    Debug.Assert(CycpatternCheck(("winemtt"), ("tinem")) == (true));
    }

}
