# HumanEval_129

Problem `HumanEval/129` from the HumanEval benchmark.

## Specification

```
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
```

## Files

Per language: `<lang>/prompt.<ext>` is the signature and docstring to
complete; `<lang>/tests.<ext>` holds the hidden correctness assertions.

Languages present: Python, TypeScript, JavaScript, Java, Go, C#.

## Sources

- **Python** (`python/`): original HumanEval, problem `HumanEval/129`. Chen et al., "Evaluating Large Language Models Trained on Code" (2021). Dataset: <https://huggingface.co/datasets/openai/openai_humaneval>. Code: <https://github.com/openai/human-eval> (MIT License).
- **TypeScript, JavaScript, Java, Go, C#**: Cassano et al., "MultiPL-E: A Scalable and Extensible Approach to Benchmarking Neural Code Generation" (IEEE TSE, 2023). Dataset: <https://huggingface.co/datasets/nuprl/MultiPL-E>. Code: <https://github.com/nuprl/MultiPL-E>. MultiPL-E mechanically translates HumanEval, so these prompts derive from HumanEval (MIT).

Retrieved 2026-07-02 via the Hugging Face datasets-server.
