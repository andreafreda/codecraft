# Benchmark report: Haiku

Model: `claude-haiku-4-5-20251001`. Suite: HumanEval / MultiPL-E, 6 tasks ×
6 languages × 4 arms = **144 cells**. Each cell is one isolated `claude -p`
generation (separate process, plugin-free config, the arm's system prompt the
only variable), gated against the benchmark's hidden tests, then its saved code
scanned by SonarQube.

## Correctness and cost (all 144 cells)

| Arm | Pass | Avg input tok | Avg output tok | Total input | Total output |
| --- | --- | --- | --- | --- | --- |
| baseline | 36/36 | 30,810 | 2,169 | 1,109,172 | 78,097 |
| codecraft | 36/36 | 34,201 | 2,851 | 1,231,219 | 102,643 |
| ponytail | 36/36 | 32,380 | 2,784 | 1,165,663 | 100,226 |
| code-simplifier | 36/36 | 62,951 | 4,440 | 2,266,252 | 159,843 |

- Every arm reaches 100% correctness after fixes (see notes). Cost order:
  **baseline < ponytail < codecraft < code-simplifier**.
- codecraft pays ~+11% input / +31% output over baseline for its lens.
- code-simplifier costs ~2× everything (it writes, then refines in a second pass).

## SonarQube issues (all six languages)

External quality cross-check. SonarQube `26.6` community, one project per arm,
same ruleset and same treatment for every arm. Covers python, js, ts and go from
source, java in reduced mode (`sonar.java.binaries=.`, no bytecode), and C# via
the SonarScanner for .NET on a throwaway project (solutions namespaced apart,
missing class scaffolding rebuilt from the prompt as the gate does).

| Arm | Total | S3776 (cognitive) | Controllable* |
| --- | --- | --- | --- |
| baseline | 43 | 6 | 17 |
| codecraft | 37 | 5 | 11 |
| ponytail | 40 | 5 | 14 |
| code-simplifier | 36 | 0 | 10 |

\*Controllable = total minus the ~26 issues every arm shares because the
benchmark imposes them (default package, static-only class needing a constructor
in Java and C#, python-derived names, the `ArrayList` signature); no arm can fix
those without breaking the fixed signature. S3776 is cognitive complexity.

- All issues are maintainability **code smells**; zero bugs or vulnerabilities,
  as expected for small algorithmic snippets.
- **codecraft has the fewest total issues (37)**, the fewest controllable (11),
  and sits below baseline on cognitive complexity (5 vs 6).
- **code-simplifier drives cognitive complexity to 0** (its refinement removes the
  worst smells) and reaches the lowest controllable of the two-pass arms, but
  pays ~2× tokens for it.
- baseline carries the most controllable smells (17). The spread is real but
  modest on this model.

## Honest reading

The spread is narrow. On this suite and model, codecraft gives a small
maintainability edge (fewest total and fewest controllable, one below baseline on
cognitive complexity) at a modest token premium, while staying 100% correct.
code-simplifier trades the most tokens for zero cognitive complexity, but its
second pass also introduced the only two genuine correctness bugs seen in the run
(a `replace(char, String)` type error in Java and a missing Go import), which had
to be regenerated. Brevity (ponytail) and the plain baseline land in between.
This is a trade-off table, not a winner.

## Caveats

- n = 36 cells per arm, one model (Haiku), one benchmark. Not statistically
  conclusive; a signal, not a verdict.
- Sonar covers all six languages (Java in reduced no-bytecode mode, C# through
  the SonarScanner for .NET). Every arm gets identical treatment, so cross-arm
  comparison stays fair.
- The benchmark records only objective signals, tokens, gate pass/fail, and the
  external Sonar counts. It does not compute any readability score of its own.
- Two correctness failures were regenerated once (transparently); two Go failures
  were harness artifacts (dropped test imports) fixed in the gate, not the code.
