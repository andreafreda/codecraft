# HumanEval_1

Problem `HumanEval/1` from the HumanEval benchmark.

## Specification

```
Input to this function is a string containing multiple groups of nested parentheses. Your goal is to
separate those group into separate strings and return the list of those.
Separate groups are balanced (each open brace is properly closed) and not nested within each other
Ignore any spaces in the input string.
>>> separate_paren_groups('( ) (( )) (( )( ))')
['()', '(())', '(()())']
```

## Files

Per language: `<lang>/prompt.<ext>` is the signature and docstring to
complete; `<lang>/tests.<ext>` holds the hidden correctness assertions.

Languages present: Python, TypeScript, JavaScript, Java, Go, C#.

## Sources

- **Python** (`python/`): original HumanEval, problem `HumanEval/1`. Chen et al., "Evaluating Large Language Models Trained on Code" (2021). Dataset: <https://huggingface.co/datasets/openai/openai_humaneval>. Code: <https://github.com/openai/human-eval> (MIT License).
- **TypeScript, JavaScript, Java, Go, C#**: Cassano et al., "MultiPL-E: A Scalable and Extensible Approach to Benchmarking Neural Code Generation" (IEEE TSE, 2023). Dataset: <https://huggingface.co/datasets/nuprl/MultiPL-E>. Code: <https://github.com/nuprl/MultiPL-E>. MultiPL-E mechanically translates HumanEval, so these prompts derive from HumanEval (MIT).

Retrieved 2026-07-02 via the Hugging Face datasets-server.
