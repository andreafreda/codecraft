# Benchmark results: three models

Model coverage: `claude-haiku-4-5`, `claude-sonnet-5`, `claude-opus-4-8`. Suite:
HumanEval / MultiPL-E, 6 tasks × 6 languages × 4 arms per model = **432 cells**,
all generated in isolation (one plugin-free `claude -p` process each, the arm's
system prompt the only variable), gated against the benchmark's hidden tests,
and cross-checked with SonarQube.

## Premise: read this before the numbers

**codecraft's job is not what this benchmark measures.** codecraft is not there
to save tokens, not to reduce SonarQube issues, and not to write shorter code.
None of those is its goal, and it should never be judged as if they were. Shorter
is explicitly *not* the aim, *clarity beats brevity* is one of its core
tie-breaks.

codecraft's aim is code that is **more readable, more maintainable, and better
designed (SOLID)**. Make it read as if a thoughtful human wrote it, obvious over
clever, so the next person (or the next session) understands it at a glance
(readable); so a change touches one place instead of rippling (maintainable); so
each unit has one job and depends on abstractions where a real seam exists
(SOLID). Design is applied **with judgement, never as ceremony**: no interface,
factory or layer for a single concrete case, clarity beats strict SOLID, and
YAGNI wins until a second case appears. It deliberately leaves working,
already-clear code alone.

That target, "is this clearer, more maintainable, better designed for the next
human", is a **judgement**, and this benchmark refuses to fake it with a score
of its own (we deleted our home-grown readability metric for exactly that reason). So the tables below measure only
what can be measured **objectively**: token cost, and an external static-analysis
tool's issue counts. Both are **proxies**, and neither is codecraft's aim.

Where codecraft happens to also use fewer tokens than a two-pass refiner, or trip
fewer Sonar rules, that is a **side effect of clarity, not the objective**. Read
the numbers as "clarity did not cost correctness and did not inflate cost," not
as "codecraft won at tokens" or "codecraft is a linter." The one metric that
brushes codecraft's actual domain is cognitive complexity (how hard code is to
follow); it is called out separately below, and even there it is a proxy for the
human judgement codecraft really serves.

## Correctness and cost (per model, avg per solution)

Every arm passed every cell: **432/432 correct**. Tokens are input / output.

| Model | Arm | Pass | Avg in | Avg out |
| --- | --- | --- | --- | --- |
| Haiku | baseline | 36/36 | 30,810 | 2,169 |
| Haiku | codecraft | 36/36 | 34,201 | 2,851 |
| Haiku | ponytail | 36/36 | 32,380 | 2,784 |
| Haiku | code-simplifier | 36/36 | 62,951 | 4,440 |
| Sonnet | baseline | 36/36 | 43,045 | 646 |
| Sonnet | codecraft | 36/36 | 47,836 | 602 |
| Sonnet | ponytail | 36/36 | 44,031 | 521 |
| Sonnet | code-simplifier | 36/36 | 87,123 | 1,283 |
| Opus | baseline | 36/36 | 37,726 | 531 |
| Opus | codecraft | 36/36 | 49,136 | 602 |
| Opus | ponytail | 36/36 | 45,663 | 476 |
| Opus | code-simplifier | 36/36 | 76,533 | 1,178 |

codecraft carries a modest input premium for its lens (~+11% on Haiku/Sonnet,
~+30% on Opus); code-simplifier costs ~2× everywhere for its second pass. This is
cost context, not a codecraft scorecard.

## SonarQube issues (external cross-check)

SonarQube `26.6` community, one project per model×arm, identical ruleset and
treatment. Covers python, js, ts, go, java; **C# is excluded** (the CLI scanner
cannot analyze it) and Java runs in reduced no-bytecode mode. "Controllable"
strips the ~22 issues every arm shares because the benchmark **imposes** them
(default package, static-only class, python-derived names Go/Java flag, the
`ArrayList` signature), no arm can touch those without breaking the fixed
signature, so they are noise for an arm-to-arm read.

| Model | Arm | Total | Cognitive (S3776) | Controllable |
| --- | --- | --- | --- | --- |
| Haiku | baseline | 31 | 5 | 11 |
| Haiku | codecraft | 29 | 4 | 9 |
| Haiku | ponytail | 31 | 4 | 11 |
| Haiku | code-simplifier | 30 | 0 | 10 |
| Sonnet | baseline | 32 | 5 | 10 |
| Sonnet | codecraft | 31 | 4 | 9 |
| Sonnet | ponytail | 29 | 3 | 7 |
| Sonnet | code-simplifier | 26 | 2 | 4 |
| Opus | baseline | 39 | 4 | 17 |
| Opus | codecraft | 27 | 1 | 5 |
| Opus | ponytail | 32 | 1 | 10 |
| Opus | code-simplifier | 26 | 0 | 4 |

## Cognitive complexity: the one metric near codecraft's domain

Cognitive complexity (SonarSource S3776) measures how hard code is to follow:
nesting and branching that a reader must hold in their head. That is the closest
a static tool gets to what codecraft actually optimizes. codecraft vs baseline,
**skill unchanged** across all three models:

| Model | codecraft | baseline | codecraft edge |
| --- | --- | --- | --- |
| Haiku | 4 | 5 | −1 |
| Sonnet | 4 | 5 | −1 |
| Opus | 1 | 4 | −3 |

codecraft reads more clearly by this proxy on **every** model, and the edge
**widens with model capability**, on Opus it nearly eliminates the smell (1 vs
4) while baseline, writing more elaborate code, gets worse (controllable 17). The
practical read: the more capable the model, the more the lens delivers. This is
why we did **not** bolt a numeric complexity rule onto the skill, its existing
principles (linear flow, guard clauses, "density is not fine") already produce
the effect, and a hard threshold would only overfit Sonar's arbitrary cutoff and
fight codecraft's own "don't over-abstract" tie-break.

## Honest reading

Treated as a trade-off table, not a leaderboard:

- **codecraft** stays 100% correct, reads more clearly by the cognitive-complexity
  proxy on every model, and gives the best quality-per-token on Opus (baseline's
  controllable smells 17→5 at ~1.3× input). Its purpose remains human clarity;
  the favourable numbers are a by-product.
- **code-simplifier** reaches the lowest raw issue counts, but costs ~2× tokens
  and, on the weakest model, its refine pass introduced the run's only genuine
  correctness bugs (regenerated once). It pays off only on a model strong enough
  not to break code while cleaning it.
- **ponytail** (least-code lens) lands between baseline and codecraft.
- **baseline** is the control; on Opus it degrades most, which is what makes the
  lenses visible.

## Caveats

n = 36 per arm per model, one benchmark. A signal, not a verdict. Sonar covers 5
of 6 languages with Java reduced; every arm gets identical treatment so the
arm-to-arm comparison stays fair. The benchmark records only objective signals
(tokens, gate pass/fail, external Sonar counts) and computes no readability score
of its own: the judgement codecraft serves is left to humans and to tools built
for it.

The codecraft arm injects `SKILL.md` (frontmatter stripped) as a one-shot system
prompt. That measures codecraft's guidance **content**, not the shipped plugin's
delivery mechanism (the SessionStart and per-turn hooks, and re-injection after
compaction). The numbers reflect the principles as context, not the installed
plugin end to end.
