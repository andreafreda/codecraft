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

## SonarQube issues (5 languages: python, js, ts, go, java)

External quality cross-check. SonarQube `26.6` community, one project per arm,
same ruleset and same treatment for every arm. C# is **excluded** (the CLI
scanner cannot analyze C#; it needs SonarScanner for .NET). Java is analyzed in
reduced mode (`sonar.java.binaries=.`, no bytecode).

| Arm | Total | S3776 | Controllable* | Bug | Vuln | Minor | Major | Critical |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baseline | 31 | 5 | 11 | 0 | 0 | 16 | 10 | 5 |
| codecraft | 29 | 4 | 9 | 0 | 0 | 16 | 9 | 4 |
| ponytail | 31 | 4 | 11 | 0 | 0 | 18 | 9 | 4 |
| code-simplifier | 30 | 0 | 10 | 0 | 0 | 19 | 11 | 0 |

\*Controllable = total minus the ~20 issues every arm shares because the
benchmark imposes them (default package, static-only class, python-derived names,
the `ArrayList` signature); no arm can fix those without breaking the fixed
signature. S3776 is cognitive complexity (see `RESULTS.md`).

- All issues are maintainability **code smells**; zero bugs or vulnerabilities,
  as expected for small algorithmic snippets.
- **codecraft has the fewest total issues (29)**, the fewest controllable (9),
  and sits below baseline on cognitive complexity (4 vs 5).
- **code-simplifier drives critical issues and cognitive complexity to 0** (its
  refinement removes the worst smells) but carries the most minor+major, and
  pays ~2× tokens for it.
- baseline carries the most critical (5). Differences are small (29–31 total).

## Honest reading

The spread is narrow. On this suite and model, codecraft gives a small
maintainability edge (fewest total, fewest critical) at a modest token premium,
while staying 100% correct. code-simplifier trades the most tokens for zero
critical smells, but its second pass also introduced the only two genuine
correctness bugs seen in the run (a `replace(char, String)` type error in Java
and a missing Go import), which had to be regenerated. Brevity (ponytail) and
the plain baseline land in between. This is a trade-off table, not a winner.

## Caveats

- n = 36 cells per arm, one model (Haiku), one benchmark. Not statistically
  conclusive; a signal, not a verdict.
- Sonar covers 5 of 6 languages (no C#) and Java in reduced mode. Every arm gets
  identical treatment, so cross-arm comparison stays fair even where coverage is
  partial.
- The benchmark records only objective signals, tokens, gate pass/fail, and the
  external Sonar counts. It does not compute any readability score of its own.
- Two correctness failures were regenerated once (transparently); two Go failures
  were harness artifacts (dropped test imports) fixed in the gate, not the code.
