def sort_third(l: list):
    """This function takes a list l and returns a list l' such that
    l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
    to the values of the corresponding indicies of l, but sorted.
    >>> sort_third([1, 2, 3])
    [1, 2, 3]
    >>> sort_third([5, 6, 3, 4, 8, 9, 2])
    [2, 6, 3, 4, 8, 9, 5]
    """
    indices_divisible_by_three = range(0, len(l), 3)
    sorted_values = sorted(l[i] for i in indices_divisible_by_three)

    result = list(l)
    for index, value in zip(indices_divisible_by_three, sorted_values):
        result[index] = value

    return result
