# Readability scoring

`score.mjs` turns a solution file into a deterministic readability score from
`0.00` to `10.00`, plus the raw metrics behind it. Same input, same output: this
is the "numbers, not judgement" core of the benchmark.

## Usage

```bash
node comparison/scoring/score.mjs <solution-file> [rubric.json]
```

It prints JSON: `{ file, raw, sub, composite }`. `raw` is the measured metrics,
`sub` is each metric normalized to a per-category vote from `0` to `10`, and
`composite` is their plain unweighted mean.

## Rubric

`rubric.json` lists the metrics and their `good`/`bad` bands. Every metric is
"lower is better": the per-category sub-score is `10` at or below `good`, `0` at
or above `bad`, and linear between. Each category gets its own vote in `[0, 10]`.

**The composite is the plain unweighted mean of the per-category sub-scores.**
There are no weights, on purpose. With no human-scored data we cannot justify
claiming one category matters more than another, and an unweighted mean states
that assumption in the open instead of burying a taste choice inside weights.
Every `metrics.json` stores the per-category `sub` votes next to the composite,
so a weighted or fitted variant can be derived *later* — from the stored votes,
with no need to regenerate any solution.

Metrics in v0: `avg_line_length`, `max_nesting`, `cyclomatic_density`,
`magic_number_density`, `single_char_ident_ratio`.

## Calibration (deferred)

The `good`/`bad` bands are v0 heuristics chosen by hand, not fitted, and treating
the categories equally is a placeholder. To move the score off taste, fit both
the bands and any per-category weights against a corpus of human readability
ratings, then report the held-out correlation (e.g. Spearman) so agreement with
human judgement is a *measured* number, not a claim. Corpora verified to exist
for this: Buse & Weimer, "Learning a Metric for Code Readability" (IEEE TSE
2010), 100 Java snippets rated by 120 people; Scalabrino et al., "A Comprehensive
Model for Code Readability" (J. Software: Evolution and Process 2018), Java
snippets with human ratings. Until that fit is done and its correlation reported,
the composite is a transparent heuristic, not a validated metric.

## v0 caveat

The metrics are heuristic: light comment and string stripping plus
language-agnostic counting, not a real parser. Treat the numbers as an
approximation. They discriminate dense from clean code reliably (a dense
one-liner scores around 2.4, a clean guard-claused version around 8.7), but a
tree-sitter version can replace the heuristics with AST metrics and add
per-function length. What matters now is that the score is deterministic and
transparent: the raw metrics ship next to the composite, so nothing is hidden.
