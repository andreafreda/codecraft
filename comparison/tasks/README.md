# Benchmark tasks

Prompts and hidden tests for the codecraft benchmark (see `../COMPARISON.md`).

Layout: `tasks/<suite>/<task>/<target>/`, where a **target** is a language or a
framework. Coverage is simply whatever targets are present on disk. To add a
language or framework, drop a new `<target>/` folder under a task; to add a new
benchmark source, add a `<suite>/` folder with a `suite.json`. Nothing here is
pinned to a fixed number of languages or tasks.

## Suite: HumanEval and MultiPL-E

Kind: algorithmic, self-contained function tasks.

| Task | csharp | go | java | javascript | python | typescript |
| --- | --- | --- | --- | --- | --- | --- |
| HumanEval_1 | yes | yes | yes | yes | yes | yes |
| HumanEval_126 | yes | yes | yes | yes | yes | yes |
| HumanEval_129 | yes | yes | yes | yes | yes | yes |
| HumanEval_154 | yes | yes | yes | yes | yes | yes |
| HumanEval_33 | yes | yes | yes | yes | yes | yes |
| HumanEval_36 | yes | yes | yes | yes | yes | yes |

Provenance: Python from the original HumanEval (Chen et al., 2021; https://github.com/openai/human-eval, MIT). Other languages from MultiPL-E (Cassano et al., IEEE TSE 2023; https://github.com/nuprl/MultiPL-E), which mechanically translates HumanEval. Retrieved 2026-07-02 via the Hugging Face datasets-server.
