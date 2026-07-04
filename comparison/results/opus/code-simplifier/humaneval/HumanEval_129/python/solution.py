def minPath(grid, k):
    """
    Given a grid with N rows and N columns (N >= 2) and a positive integer k,
    each cell of the grid contains a value. Every integer in the range [1, N * N]
    inclusive appears exactly once on the cells of the grid.

    You have to find the minimum path of length k in the grid. You can start
    from any cell, and in each step you can move to any of the neighbor cells,
    in other words, you can go to cells which share an edge with you current
    cell.
    Please note that a path of length k means visiting exactly k cells (not
    necessarily distinct).
    You CANNOT go off the grid.
    A path A (of length k) is considered less than a path B (of length k) if
    after making the ordered lists of the values on the cells that A and B go
    through (let's call them lst_A and lst_B), lst_A is lexicographically less
    than lst_B, in other words, there exist an integer index i (1 <= i <= k)
    such that lst_A[i] < lst_B[i] and for any j (1 <= j < i) we have
    lst_A[j] = lst_B[j].
    It is guaranteed that the answer is unique.
    Return an ordered list of the values on the cells that the minimum path go through.

    Examples:

        Input: grid = [ [1,2,3], [4,5,6], [7,8,9]], k = 3
        Output: [1, 2, 1]

        Input: grid = [ [5,9,3], [4,1,6], [7,8,2]], k = 1
        Output: [1]
    """
    n = len(grid)

    # The smallest value on the grid is always 1, and its cell is the unique
    # optimal starting point: no path starting elsewhere can be smaller, since
    # its first element would exceed 1.
    start_row, start_col = next(
        (i, j)
        for i in range(n)
        for j in range(n)
        if grid[i][j] == 1
    )

    # From the cell holding 1, the lexicographically smallest continuation is
    # to step to the smallest reachable neighbor, which is the second-smallest
    # value adjacent to the start. Alternating between 1 and that neighbor
    # yields the minimum path.
    neighbor_values = []
    for row_offset, col_offset in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        neighbor_row = start_row + row_offset
        neighbor_col = start_col + col_offset
        if 0 <= neighbor_row < n and 0 <= neighbor_col < n:
            neighbor_values.append(grid[neighbor_row][neighbor_col])
    neighbor_min = min(neighbor_values)

    path = []
    for step in range(k):
        is_start_cell = step % 2 == 0
        path.append(1 if is_start_cell else neighbor_min)
    return path
