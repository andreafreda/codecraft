# Benchmark tasks

Prompts and hidden tests used by the codecraft vs. code-simplifier benchmark
(see `../COMPARISON.md`). Each task is stored per language so a fresh agent can
be asked to complete the same problem in each language, and the result checked
against the hidden tests before its readability is scored.

## Coverage

| Task | Python | TypeScript | JavaScript | Java | Go | C# |
| --- | --- | --- | --- | --- | --- | --- |
| HumanEval_1 | yes | yes | yes | yes | yes | yes |
| HumanEval_33 | yes | yes | yes | yes | yes | yes |
| HumanEval_36 | yes | yes | yes | yes | yes | yes |
| HumanEval_126 | yes | yes | yes | yes | yes | yes |
| HumanEval_129 | yes | yes | yes | yes | yes | yes |
| HumanEval_154 | yes | yes | yes | yes | yes | yes |

## Provenance

- **HumanEval** (Python prompts and tests). Chen et al., "Evaluating Large Language Models Trained on Code" (2021). Dataset: <https://huggingface.co/datasets/openai/openai_humaneval>. Code: <https://github.com/openai/human-eval> (MIT License).
- **MultiPL-E** (TypeScript, JavaScript, Java, Go, C# prompts and tests). Cassano et al., "MultiPL-E: A Scalable and Extensible Approach to Benchmarking Neural Code Generation" (IEEE TSE, 2023). Dataset: <https://huggingface.co/datasets/nuprl/MultiPL-E>. Code: <https://github.com/nuprl/MultiPL-E>. MultiPL-E mechanically translates HumanEval, so these prompts derive from HumanEval (MIT).

All prompts retrieved 2026-07-02 via the Hugging Face datasets-server
(<https://datasets-server.huggingface.co>). Task selection favors problems with
enough branching and loop logic that dense and clean solutions visibly diverge;
trivial one-line problems were skipped on purpose.
