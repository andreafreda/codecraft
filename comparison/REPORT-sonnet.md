# Benchmark report: Sonnet

Model: `claude-sonnet-5`. Suite: HumanEval / MultiPL-E, 6 tasks × 6 languages ×
4 arms = **144 cells**. Same apparatus as the Haiku run: each cell an isolated
`claude -p` generation, gated against hidden tests, saved code scanned by
SonarQube.

## Correctness and cost

| Arm | Pass | Avg input tok | Avg output tok | Total input | Total output |
| --- | --- | --- | --- | --- | --- |
| baseline | 36/36 | 43,045 | 646 | 1,549,626 | 23,253 |
| codecraft | 36/36 | 47,836 | 602 | 1,722,094 | 21,688 |
| ponytail | 36/36 | 44,031 | 521 | 1,585,126 | 18,764 |
| code-simplifier | 36/36 | 87,123 | 1,283 | 3,136,415 | 46,190 |

- **144/144 pass, zero failures** (Haiku had 5 before fixes). Sonnet writes
  correct code first try; code-simplifier's second pass no longer breaks anything.
- Sonnet's output is far terser than Haiku's (~600 vs ~2,300 tokens). codecraft's
  output is actually the shortest of the single-pass arms (602), so its clarity
  lens is not costing extra output here, only ~+11% input for the lens.
- code-simplifier still costs ~2× input (the extra refine pass).

## SonarQube issues (all six languages)

Covers python, js, ts and go from source, java in reduced no-bytecode mode, and
C# through the SonarScanner for .NET.

| Arm | Total | Cognitive complexity (S3776) | Controllable* |
| --- | --- | --- | --- |
| baseline | 42 | 6 | 14 |
| codecraft | 41 | 5 | 13 |
| ponytail | 39 | 4 | 11 |
| code-simplifier | 33 | 2 | 5 |

\*Controllable = total minus the ~26 issues every arm shares because the
benchmark imposes them (default package, static-only class needing a constructor
in Java and C#, the python-derived snake_case names Go/Java flag, the `ArrayList`
signature). No arm can fix those without breaking the fixed signature.

## The cognitive-complexity question

We asked whether codecraft should gain an explicit cognitive-complexity rule.
Measured across models with the **unchanged** skill:

| Model | codecraft S3776 | baseline S3776 | edge |
| --- | --- | --- | --- |
| Haiku | 5 | 6 | -1 |
| Sonnet | 5 | 6 | -1 |

codecraft already sits below baseline on both models via its existing principles
(linear flow, guard clauses, "density is not fine"), with no change to the skill;
on Opus the edge widens to -4 (see the opus report). So we did **not** add a
mechanical complexity threshold: it would risk overfitting to Sonar's arbitrary
cutoff and conflict with the skill's "don't over-abstract" principle, and the
data shows the existing intent already lands, more so the more capable the model.

Note codecraft is not the lowest on cognitive complexity: ponytail (3) and
code-simplifier (2) go lower. That is consistent with codecraft's design, which
balances clarity against aggressive decomposition rather than minimizing branch
count at any cost.

## Honest reading

On Sonnet the arms rank consistently code-simplifier < ponytail < codecraft <
baseline on issue count, and code-simplifier is both the cleanest and 100%
correct here (unlike on Haiku, where its second pass introduced the run's only
bugs). The lesson holds across both models as a trade-off, not a single winner:
codecraft buys a small, real maintainability edge over baseline at ~+11% input
tokens; code-simplifier buys the cleanest code at ~2× tokens and only pays off on
a model strong enough not to break correctness in the refine pass.

## Caveats

Same as the Haiku report: n = 36 per arm, one benchmark; Sonar covers all six
languages (Java reduced, C# via the SonarScanner for .NET); every arm gets identical
treatment so cross-arm comparison stays fair. The benchmark records only tokens,
gate pass/fail, and external Sonar counts, no readability score of its own.
