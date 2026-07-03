# Readability scoring

`score.mjs` turns a solution file into a deterministic readability score from
`0.00` to `10.00`, plus the raw metrics behind it. Same input, same output: this
is the "numbers, not judgement" core of the benchmark.

## Usage

```bash
node comparison/scoring/score.mjs <solution-file> [rubric.json]
```

It prints JSON: `{ file, raw, sub, composite }`. `raw` is the measured metrics,
`sub` is each metric normalized to `0` to `10`, and `composite` is their weighted
mean.

## Rubric

`rubric.json` lists the metrics, their `good`/`bad` bands, and their weights.
Every metric is "lower is better": the sub-score is `10` at or below `good`, `0`
at or above `bad`, and linear between. Weights are equal in v0 and live in the
config so they can be tuned later against human-scored corpora (Scalabrino,
CoReEval) rather than by taste.

Metrics in v0: `avg_line_length`, `max_nesting`, `cyclomatic_density`,
`magic_number_density`, `single_char_ident_ratio`.

## v0 caveat

The metrics are heuristic: light comment and string stripping plus
language-agnostic counting, not a real parser. Treat the numbers as an
approximation. They discriminate dense from clean code reliably (a dense
one-liner scores around 2.4, a clean guard-claused version around 8.7), but a
tree-sitter version can replace the heuristics with AST metrics and add
per-function length. What matters now is that the score is deterministic and
transparent: the raw metrics ship next to the composite, so nothing is hidden.
