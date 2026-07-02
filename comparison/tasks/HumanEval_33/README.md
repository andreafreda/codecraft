# HumanEval_33

Problem `HumanEval/33` from the HumanEval benchmark.

## Specification

```
This function takes a list l and returns a list l' such that
l' is identical to l in the indicies that are not divisible by three, while its values at the indicies that are divisible by three are equal
to the values of the corresponding indicies of l, but sorted.
>>> sort_third([1, 2, 3])
[1, 2, 3]
>>> sort_third([5, 6, 3, 4, 8, 9, 2])
[2, 6, 3, 4, 8, 9, 5]
```

## Files

Per language: `<lang>/prompt.<ext>` is the signature and docstring to
complete; `<lang>/tests.<ext>` holds the hidden correctness assertions.

Languages present: Python, TypeScript, JavaScript, Java, Go, C#.

## Sources

- **Python** (`python/`): original HumanEval, problem `HumanEval/33`. Chen et al., "Evaluating Large Language Models Trained on Code" (2021). Dataset: <https://huggingface.co/datasets/openai/openai_humaneval>. Code: <https://github.com/openai/human-eval> (MIT License).
- **TypeScript, JavaScript, Java, Go, C#**: Cassano et al., "MultiPL-E: A Scalable and Extensible Approach to Benchmarking Neural Code Generation" (IEEE TSE, 2023). Dataset: <https://huggingface.co/datasets/nuprl/MultiPL-E>. Code: <https://github.com/nuprl/MultiPL-E>. MultiPL-E mechanically translates HumanEval, so these prompts derive from HumanEval (MIT).

Retrieved 2026-07-02 via the Hugging Face datasets-server.
