    }
    public static void Main(string[] args) {
    Debug.Assert(SortThird((new List<long>(new long[]{(long)5L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)2L}))).Equals((new List<long>(new long[]{(long)2L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)5L}))));
    Debug.Assert(SortThird((new List<long>(new long[]{(long)5L, (long)8L, (long)3L, (long)4L, (long)6L, (long)9L, (long)2L}))).Equals((new List<long>(new long[]{(long)2L, (long)8L, (long)3L, (long)4L, (long)6L, (long)9L, (long)5L}))));
    Debug.Assert(SortThird((new List<long>(new long[]{(long)5L, (long)6L, (long)9L, (long)4L, (long)8L, (long)3L, (long)2L}))).Equals((new List<long>(new long[]{(long)2L, (long)6L, (long)9L, (long)4L, (long)8L, (long)3L, (long)5L}))));
    Debug.Assert(SortThird((new List<long>(new long[]{(long)5L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)2L, (long)1L}))).Equals((new List<long>(new long[]{(long)2L, (long)6L, (long)3L, (long)4L, (long)8L, (long)9L, (long)5L, (long)1L}))));
    }

}
