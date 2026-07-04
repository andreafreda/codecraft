# Benchmark report — Opus

Model: `claude-opus-4-8`. Suite: HumanEval / MultiPL-E, 6 tasks × 6 languages ×
4 arms = **144 cells**. Same apparatus as the Haiku and Sonnet runs.

## Correctness and cost

| Arm | Pass | Avg input tok | Avg output tok |
| --- | --- | --- | --- |
| baseline | 36/36 | 37,726 | 531 |
| codecraft | 36/36 | 49,136 | 602 |
| ponytail | 36/36 | 45,663 | 476 |
| code-simplifier | 36/36 | 76,533 | 1,178 |

144/144 pass. codecraft costs ~+30% input over baseline; code-simplifier ~2×.

## SonarQube issues (5 languages: python, js, ts, go, java; C# excluded)

| Arm | Total | Cognitive complexity (S3776) | Controllable* |
| --- | --- | --- | --- |
| baseline | 39 | 4 | 17 |
| codecraft | 27 | 1 | 5 |
| ponytail | 32 | 1 | 10 |
| code-simplifier | 26 | 0 | 4 |

\*Controllable = total minus the ~22 issues imposed by the benchmark scaffolding
(default package, static-only class, python-derived names, `ArrayList` signature)
that no arm can fix without breaking the fixed signature.

On Opus the gap is the widest of the three models. baseline degrades (39 total,
17 controllable, more than on Haiku or Sonnet: a stronger model writes more
elaborate code with more smells), while codecraft reins it in hard: **27 total,
5 controllable, cognitive complexity down to 1**. codecraft lands essentially at
code-simplifier's cleanliness (4 controllable, S3776 0) but at ~1.3× baseline
tokens versus code-simplifier's ~2×.

## The cognitive-complexity question, settled across three models

The centerpiece finding. codecraft vs baseline on S3776 (cognitive complexity),
**skill unchanged** throughout:

| Model | codecraft | baseline | codecraft edge |
| --- | --- | --- | --- |
| Haiku | 4 | 5 | −1 |
| Sonnet | 4 | 5 | −1 |
| Opus | 1 | 4 | −3 |

codecraft sits below baseline on cognitive complexity on **every** model, and the
edge **widens with model capability**: on Opus it nearly eliminates the smell
(1 vs 4). This is decisive: adding a mechanical complexity threshold to the skill
would have been the wrong fix (it would overfit Sonar's arbitrary cutoff and
fight the skill's own "don't over-abstract" principle). The existing principles
(linear flow, guard clauses, "density is not fine") already deliver, more so the
more capable the model.

## Honest reading

Opus is where codecraft's value shows clearest: it cuts baseline's controllable
smells from 17 to 5 and cognitive complexity from 4 to 1, at ~+30% input tokens,
reaching almost code-simplifier's quality for half the token premium. Still a
trade-off, not a free win: code-simplifier is marginally cleaner (4 controllable,
0 cognitive) but costs ~2× and, on weaker models, its refine pass breaks
correctness (it did on Haiku, not here). ponytail sits between. The ranking
codecraft ≈ code-simplifier < ponytail < baseline holds, with codecraft the best
quality-per-token on this model.

## Caveats

n = 36 per arm, one benchmark; Sonar covers 5 of 6 languages (no C#), Java in
reduced no-bytecode mode; identical treatment per arm keeps the comparison fair.
Objective signals only (tokens, gate pass/fail, external Sonar counts).
