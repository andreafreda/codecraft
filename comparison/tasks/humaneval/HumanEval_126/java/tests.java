    }
    public static void main(String[] args) {
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)5l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)3l, (long)2l, (long)4l, (long)5l)))) == (false));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l, (long)6l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l, (long)5l, (long)6l, (long)7l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)3l, (long)2l, (long)4l, (long)5l, (long)6l, (long)7l)))) == (false));
    assert(isSorted((new ArrayList<Long>(Arrays.asList()))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)3l, (long)2l, (long)1l)))) == (false));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)2l, (long)2l, (long)3l, (long)4l)))) == (false));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)3l, (long)3l, (long)4l)))) == (false));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)2l, (long)3l, (long)3l, (long)4l)))) == (true));
    assert(isSorted((new ArrayList<Long>(Arrays.asList((long)1l, (long)2l, (long)3l, (long)4l)))) == (true));
    }

}
