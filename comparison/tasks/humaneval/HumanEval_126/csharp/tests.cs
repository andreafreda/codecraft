    }
    public static void Main(string[] args) {
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)5L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)3L, (long)2L, (long)4L, (long)5L}))) == (false));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L, (long)6L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L, (long)5L, (long)6L, (long)7L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)3L, (long)2L, (long)4L, (long)5L, (long)6L, (long)7L}))) == (false));
    Debug.Assert(IsSorted((new List<long>())) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)3L, (long)2L, (long)1L}))) == (false));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)2L, (long)2L, (long)3L, (long)4L}))) == (false));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)3L, (long)3L, (long)4L}))) == (false));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)2L, (long)3L, (long)3L, (long)4L}))) == (true));
    Debug.Assert(IsSorted((new List<long>(new long[]{(long)1L, (long)2L, (long)3L, (long)4L}))) == (true));
    }

}
