# Benchmark run plan

## Resume: state and how to continue

**Done:** the pilot cell group `HumanEval_1/python` x 4 arms on Haiku (see the
ticked cells below and `results/haiku/`). The full apparatus is built and proven
end to end.

**Remaining:** every unchecked cell below, times three models for the full run.

### Run one cell

```
CLAUDE_CONFIG_DIR="C:/cc-bench-account" node comparison/harness/run-cell.mjs <suite>/<task>/<target>/<arm> [model]
```

- A separate Claude subscription (RELATECH account) is logged in at
  `C:/cc-bench-account`, so generation does not spend the main account.
- Model defaults to Haiku (`comparison/harness/arms.json`). For the three-model
  run pass a model id: `claude-haiku-4-5-20251001`, `claude-sonnet-5`,
  `claude-opus-4-8`.
- The harness writes `results/<model>/<arm>/<suite>/<task>/<target>/`
  (`solution.<ext>`, `metrics.json`) and ticks the matching cell below with a
  `[model]` annotation. It is isolated: the config dir has no plugins, so the
  ambient codecraft and caveman modes do not leak into a run.

### Gates

All six targets are wired in `harness/gate.mjs`. Each assembles the model's
solution with the hidden tests into one runnable program and checks the exit
code (non-zero = a failed assertion or a crash = `pass: no`).

| Target | Runtime | How it assembles |
| --- | --- | --- |
| python | `python` | append `check(<entry_point>)` |
| javascript | `node` | concat solution + tests (standalone driver) |
| typescript | `node --experimental-strip-types` | concat solution + tests |
| java | `javac` / `java -ea` | inject the test `main` into the class; bundled `org.javatuples` jar in `harness/lib` |
| go | `go test` | concat into one `_test.go` in a throwaway module |
| csharp | `dotnet run -c Debug` | inject `main`; rewrite `x.Equals(y)` to a JSON value compare (fixtures use reference-equality `List<T>.Equals`) |

Runtime requirements: java needs a JDK, go needs a `go` toolchain (override the
binary with `CCBENCH_GO`, else it must be on `PATH`; absent -> `pass: skipped`),
csharp needs the .NET SDK (`CCBENCH_DOTNET` override). Where a runtime is missing
the gate returns `skipped`, never a false `no`.

This benchmark **generates and saves code**; it does not judge its quality. The
only recorded signals are objective: tokens (cost) and the correctness gate
(pass/fail against the benchmark's hidden tests). Quality, readability, and
simplicity are left to established external tools run over the saved solutions
(e.g. SonarQube, lizard, radon) — not to any metric of our own.

### Notes

- Token counts include Claude Code's base system prompt (~20-30k input) plus
  cache tokens; compare arms relatively, not absolutely.
- ponytail tends to emit prose and `ponytail:` comments, which inflates its
  output tokens.
- Commit `results/` and this file after each batch.
- Do NOT blindly regenerate this file: it now holds run results and ticks.

### Batch example (one task, all arms, one language)

```
for arm in baseline codecraft ponytail code-simplifier; do
  CLAUDE_CONFIG_DIR="C:/cc-bench-account" node comparison/harness/run-cell.mjs humaneval/HumanEval_1/python/$arm
done
```

---


One checkbox per **run cell**: a single `task x language x arm`. Execute cells
one at a time, mount only what that cell needs, record the data, tick the box.
This file is generated from `tasks/manifest.json` and the arm list; regenerate
it when tasks, languages, or arms change.
Total run cells: **144** (6 tasks x targets x 4 arms).


## Arms

| Arm | What runs | Passes |
| --- | --- | --- |
| `baseline` | fresh agent, no readability tooling | 1 |
| `codecraft` | fresh agent with the codecraft lens in context | 1 |
| `ponytail` | fresh agent with the ponytail skill in context | 1 |
| `code-simplifier` | fresh agent writes, then the code-simplifier agent refines | 2 |

## Per-cell procedure

1. **Generate.** Run the arm on the cell's `prompt.<ext>`; record total tokens.
2. **Gate.** Assemble `prompt + completion + tests.<ext>` and run it in the
   language runtime. Record pass or fail against the hidden tests.
3. **Record.** Write the solution and a `metrics.json` (tokens, pass) under the
   output path below. No quality score is computed — judgement is left to
   external tools run later over the saved solutions.

Output: `comparison/results/<arm>/<suite>/<task>/<target>/{solution.<ext>, metrics.json}`.
Sonar issues are a separate final scan over all solutions, not per cell.

## Runtimes to mount (per language, at execution time)

| Language | Assemble | Run |
| --- | --- | --- |
| Python | `prompt + completion + tests.py` | `python3` |
| JavaScript | `prompt + completion + tests.js` | `node` |
| TypeScript | `prompt + completion + tests.ts` | `tsx` or `deno run` |
| Java | `prompt + completion + tests.java` | `javac` then `java` |
| Go | `prompt + completion + tests.go` | `go run` |
| C# | `prompt + completion + tests.cs` | `dotnet` |

Only the languages a cell touches need their runtime present for that cell.

## Cells

### Suite: HumanEval and MultiPL-E

#### HumanEval_1

- [x] `humaneval/HumanEval_1/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 31602
- [x] `humaneval/HumanEval_1/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 35788
- [x] `humaneval/HumanEval_1/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 33064
- [x] `humaneval/HumanEval_1/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 65545
- [x] `humaneval/HumanEval_1/go/baseline` (Go) — [haiku] pass: no, tokens: 31971
- [x] `humaneval/HumanEval_1/go/codecraft` (Go) — [haiku] pass: no, tokens: 35090
- [x] `humaneval/HumanEval_1/go/ponytail` (Go) — [haiku] pass: no, tokens: 38233
- [x] `humaneval/HumanEval_1/go/code-simplifier` (Go) — [haiku] pass: yes, tokens: 64783
- [x] `humaneval/HumanEval_1/java/baseline` (Java) — [haiku] pass: yes, tokens: 32357 — [sonnet] pass: yes, tokens: 40812
- [x] `humaneval/HumanEval_1/java/codecraft` (Java) — [haiku] pass: yes, tokens: 35820 — [sonnet] pass: yes, tokens: 45336
- [x] `humaneval/HumanEval_1/java/ponytail` (Java) — [haiku] pass: yes, tokens: 34010 — [sonnet] pass: yes, tokens: 42960
- [x] `humaneval/HumanEval_1/java/code-simplifier` (Java) — [haiku] pass: yes, tokens: 65680 — [sonnet] pass: yes, tokens: 83940
- [x] `humaneval/HumanEval_1/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 35048 — [sonnet] pass: yes, tokens: 40403
- [x] `humaneval/HumanEval_1/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 41472 — [sonnet] pass: yes, tokens: 44920
- [x] `humaneval/HumanEval_1/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 32816 — [sonnet] pass: yes, tokens: 42512
- [x] `humaneval/HumanEval_1/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 64447 — [sonnet] pass: yes, tokens: 82930
- [x] `humaneval/HumanEval_1/python/baseline` (Python) — [haiku] pass: yes, tokens: 32203 — [sonnet] pass: yes, tokens: 40533
- [x] `humaneval/HumanEval_1/python/codecraft` (Python) — [haiku] pass: yes, tokens: 34829 — [sonnet] pass: yes, tokens: 45031
- [x] `humaneval/HumanEval_1/python/ponytail` (Python) — [haiku] pass: yes, tokens: 34037 — [sonnet] pass: yes, tokens: 42613
- [x] `humaneval/HumanEval_1/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 65036 — [sonnet] pass: yes, tokens: 83127
- [x] `humaneval/HumanEval_1/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 31081 — [sonnet] pass: yes, tokens: 40392
- [x] `humaneval/HumanEval_1/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 34455 — [sonnet] pass: yes, tokens: 44942
- [x] `humaneval/HumanEval_1/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 32929 — [sonnet] pass: yes, tokens: 42539
- [x] `humaneval/HumanEval_1/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 67141 — [sonnet] pass: yes, tokens: 82980

#### HumanEval_126

- [x] `humaneval/HumanEval_126/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 33444
- [x] `humaneval/HumanEval_126/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 36186
- [x] `humaneval/HumanEval_126/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 34950
- [x] `humaneval/HumanEval_126/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 70869
- [x] `humaneval/HumanEval_126/go/baseline` (Go) — [haiku] pass: yes, tokens: 32612
- [x] `humaneval/HumanEval_126/go/codecraft` (Go) — [haiku] pass: yes, tokens: 37124
- [x] `humaneval/HumanEval_126/go/ponytail` (Go) — [haiku] pass: yes, tokens: 34310
- [x] `humaneval/HumanEval_126/go/code-simplifier` (Go) — [haiku] pass: yes, tokens: 67545
- [x] `humaneval/HumanEval_126/java/baseline` (Java) — [haiku] pass: yes, tokens: 33195 — [sonnet] pass: yes, tokens: 42253
- [x] `humaneval/HumanEval_126/java/codecraft` (Java) — [haiku] pass: yes, tokens: 36510 — [sonnet] pass: yes, tokens: 46694
- [x] `humaneval/HumanEval_126/java/ponytail` (Java) — [haiku] pass: yes, tokens: 34404 — [sonnet] pass: yes, tokens: 44235
- [x] `humaneval/HumanEval_126/java/code-simplifier` (Java) — [haiku] pass: yes, tokens: 66359 — [sonnet] pass: yes, tokens: 86461
- [x] `humaneval/HumanEval_126/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 31755 — [sonnet] pass: yes, tokens: 41273
- [x] `humaneval/HumanEval_126/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 35637 — [sonnet] pass: yes, tokens: 45837
- [x] `humaneval/HumanEval_126/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 33845 — [sonnet] pass: yes, tokens: 43510
- [x] `humaneval/HumanEval_126/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 65827 — [sonnet] pass: yes, tokens: 84547
- [x] `humaneval/HumanEval_126/python/baseline` (Python) — [haiku] pass: yes, tokens: 32807 — [sonnet] pass: yes, tokens: 41034
- [x] `humaneval/HumanEval_126/python/codecraft` (Python) — [haiku] pass: yes, tokens: 35422 — [sonnet] pass: yes, tokens: 45491
- [x] `humaneval/HumanEval_126/python/ponytail` (Python) — [haiku] pass: yes, tokens: 33533 — [sonnet] pass: yes, tokens: 43047
- [x] `humaneval/HumanEval_126/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 66100 — [sonnet] pass: yes, tokens: 83799
- [x] `humaneval/HumanEval_126/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 31794 — [sonnet] pass: yes, tokens: 41004
- [x] `humaneval/HumanEval_126/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 35307 — [sonnet] pass: yes, tokens: 46370
- [x] `humaneval/HumanEval_126/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 33580 — [sonnet] pass: yes, tokens: 43454
- [x] `humaneval/HumanEval_126/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 69796 — [sonnet] pass: yes, tokens: 84029

#### HumanEval_129

- [x] `humaneval/HumanEval_129/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 38061
- [x] `humaneval/HumanEval_129/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 43317
- [x] `humaneval/HumanEval_129/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 41126
- [x] `humaneval/HumanEval_129/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 74262
- [x] `humaneval/HumanEval_129/go/baseline` (Go) — [haiku] pass: yes, tokens: 37597
- [x] `humaneval/HumanEval_129/go/codecraft` (Go) — [haiku] pass: yes, tokens: 42233
- [x] `humaneval/HumanEval_129/go/ponytail` (Go) — [haiku] pass: yes, tokens: 39398
- [x] `humaneval/HumanEval_129/go/code-simplifier` (Go) — [haiku] pass: no, tokens: 70236
- [x] `humaneval/HumanEval_129/java/baseline` (Java) — [haiku] pass: yes, tokens: 38266 — [sonnet] pass: yes, tokens: 88675
- [x] `humaneval/HumanEval_129/java/codecraft` (Java) — [haiku] pass: yes, tokens: 41029 — [sonnet] pass: yes, tokens: 47652
- [x] `humaneval/HumanEval_129/java/ponytail` (Java) — [haiku] pass: yes, tokens: 39238 — [sonnet] pass: yes, tokens: 45185
- [x] `humaneval/HumanEval_129/java/code-simplifier` (Java) — [haiku] pass: yes, tokens: 75194 — [sonnet] pass: yes, tokens: 89321
- [x] `humaneval/HumanEval_129/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 33754 — [sonnet] pass: yes, tokens: 42536
- [x] `humaneval/HumanEval_129/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 39885 — [sonnet] pass: yes, tokens: 46185
- [x] `humaneval/HumanEval_129/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 35238 — [sonnet] pass: yes, tokens: 43979
- [x] `humaneval/HumanEval_129/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 70600 — [sonnet] pass: yes, tokens: 86806
- [x] `humaneval/HumanEval_129/python/baseline` (Python) — [haiku] pass: yes, tokens: 34746 — [sonnet] pass: yes, tokens: 41780
- [x] `humaneval/HumanEval_129/python/codecraft` (Python) — [haiku] pass: yes, tokens: 44973 — [sonnet] pass: yes, tokens: 46178
- [x] `humaneval/HumanEval_129/python/ponytail` (Python) — [haiku] pass: yes, tokens: 36895 — [sonnet] pass: yes, tokens: 43500
- [x] `humaneval/HumanEval_129/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 71264 — [sonnet] pass: yes, tokens: 85247
- [x] `humaneval/HumanEval_129/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 35690 — [sonnet] pass: yes, tokens: 42753
- [x] `humaneval/HumanEval_129/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 41483 — [sonnet] pass: yes, tokens: 46737
- [x] `humaneval/HumanEval_129/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 40486 — [sonnet] pass: yes, tokens: 44186
- [x] `humaneval/HumanEval_129/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 70967 — [sonnet] pass: yes, tokens: 128949

#### HumanEval_154

- [x] `humaneval/HumanEval_154/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 32531
- [x] `humaneval/HumanEval_154/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 37027
- [x] `humaneval/HumanEval_154/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 34628
- [x] `humaneval/HumanEval_154/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 67262
- [x] `humaneval/HumanEval_154/go/baseline` (Go) — [haiku] pass: yes, tokens: 33030
- [x] `humaneval/HumanEval_154/go/codecraft` (Go) — [haiku] pass: yes, tokens: 36815
- [x] `humaneval/HumanEval_154/go/ponytail` (Go) — [haiku] pass: no, tokens: 41894
- [x] `humaneval/HumanEval_154/go/code-simplifier` (Go) — [haiku] pass: yes, tokens: 68872
- [x] `humaneval/HumanEval_154/java/baseline` (Java) — [haiku] pass: yes, tokens: 33435 — [sonnet] pass: yes, tokens: 41537
- [x] `humaneval/HumanEval_154/java/codecraft` (Java) — [haiku] pass: yes, tokens: 36815 — [sonnet] pass: yes, tokens: 46046
- [x] `humaneval/HumanEval_154/java/ponytail` (Java) — [haiku] pass: yes, tokens: 34291 — [sonnet] pass: yes, tokens: 43643
- [x] `humaneval/HumanEval_154/java/code-simplifier` (Java) — [haiku] pass: yes, tokens: 67170 — [sonnet] pass: yes, tokens: 85319
- [x] `humaneval/HumanEval_154/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 32917 — [sonnet] pass: yes, tokens: 41117
- [x] `humaneval/HumanEval_154/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 37192 — [sonnet] pass: yes, tokens: 45810
- [x] `humaneval/HumanEval_154/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 33919 — [sonnet] pass: yes, tokens: 43429
- [x] `humaneval/HumanEval_154/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 66007 — [sonnet] pass: yes, tokens: 84679
- [x] `humaneval/HumanEval_154/python/baseline` (Python) — [haiku] pass: yes, tokens: 31742 — [sonnet] pass: yes, tokens: 40506
- [x] `humaneval/HumanEval_154/python/codecraft` (Python) — [haiku] pass: yes, tokens: 35940 — [sonnet] pass: yes, tokens: 44972
- [x] `humaneval/HumanEval_154/python/ponytail` (Python) — [haiku] pass: yes, tokens: 39234 — [sonnet] pass: yes, tokens: 42553
- [x] `humaneval/HumanEval_154/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 66991 — [sonnet] pass: yes, tokens: 82844
- [x] `humaneval/HumanEval_154/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 31929 — [sonnet] pass: yes, tokens: 41139
- [x] `humaneval/HumanEval_154/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 35880 — [sonnet] pass: yes, tokens: 45658
- [x] `humaneval/HumanEval_154/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 34521 — [sonnet] pass: yes, tokens: 43310
- [x] `humaneval/HumanEval_154/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 65815 — [sonnet] pass: yes, tokens: 84382

#### HumanEval_33

- [x] `humaneval/HumanEval_33/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 32210
- [x] `humaneval/HumanEval_33/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 35621
- [x] `humaneval/HumanEval_33/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 34297
- [x] `humaneval/HumanEval_33/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 69192
- [x] `humaneval/HumanEval_33/go/baseline` (Go) — [haiku] pass: yes, tokens: 32429
- [x] `humaneval/HumanEval_33/go/codecraft` (Go) — [haiku] pass: yes, tokens: 36598
- [x] `humaneval/HumanEval_33/go/ponytail` (Go) — [haiku] pass: yes, tokens: 34388
- [x] `humaneval/HumanEval_33/go/code-simplifier` (Go) — [haiku] pass: yes, tokens: 66382
- [x] `humaneval/HumanEval_33/java/baseline` (Java) — [haiku] pass: yes, tokens: 32410 — [sonnet] pass: yes, tokens: 41231
- [x] `humaneval/HumanEval_33/java/codecraft` (Java) — [haiku] pass: yes, tokens: 36011 — [sonnet] pass: yes, tokens: 45750
- [x] `humaneval/HumanEval_33/java/ponytail` (Java) — [haiku] pass: yes, tokens: 34366 — [sonnet] pass: yes, tokens: 43354
- [x] `humaneval/HumanEval_33/java/code-simplifier` (Java) — [haiku] pass: no, tokens: 66050 — [sonnet] pass: yes, tokens: 84719
- [x] `humaneval/HumanEval_33/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 32213 — [sonnet] pass: yes, tokens: 40539
- [x] `humaneval/HumanEval_33/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 35423 — [sonnet] pass: yes, tokens: 45062
- [x] `humaneval/HumanEval_33/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 33881 — [sonnet] pass: yes, tokens: 42790
- [x] `humaneval/HumanEval_33/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 65589 — [sonnet] pass: yes, tokens: 83688
- [x] `humaneval/HumanEval_33/python/baseline` (Python) — [haiku] pass: yes, tokens: 32142 — [sonnet] pass: yes, tokens: 40545
- [x] `humaneval/HumanEval_33/python/codecraft` (Python) — [haiku] pass: yes, tokens: 35517 — [sonnet] pass: yes, tokens: 45026
- [x] `humaneval/HumanEval_33/python/ponytail` (Python) — [haiku] pass: yes, tokens: 33783 — [sonnet] pass: yes, tokens: 42580
- [x] `humaneval/HumanEval_33/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 66283 — [sonnet] pass: yes, tokens: 82988
- [x] `humaneval/HumanEval_33/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 31778 — [sonnet] pass: yes, tokens: 40543
- [x] `humaneval/HumanEval_33/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 34789 — [sonnet] pass: yes, tokens: 45060
- [x] `humaneval/HumanEval_33/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 33191 — [sonnet] pass: yes, tokens: 42664
- [x] `humaneval/HumanEval_33/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 64410 — [sonnet] pass: yes, tokens: 83235

#### HumanEval_36

- [x] `humaneval/HumanEval_36/csharp/baseline` (C#) — [haiku] pass: yes, tokens: 31895
- [x] `humaneval/HumanEval_36/csharp/codecraft` (C#) — [haiku] pass: yes, tokens: 37121
- [x] `humaneval/HumanEval_36/csharp/ponytail` (C#) — [haiku] pass: yes, tokens: 33664
- [x] `humaneval/HumanEval_36/csharp/code-simplifier` (C#) — [haiku] pass: yes, tokens: 64322
- [x] `humaneval/HumanEval_36/go/baseline` (Go) — [haiku] pass: yes, tokens: 32089
- [x] `humaneval/HumanEval_36/go/codecraft` (Go) — [haiku] pass: yes, tokens: 36046
- [x] `humaneval/HumanEval_36/go/ponytail` (Go) — [haiku] pass: yes, tokens: 33616
- [x] `humaneval/HumanEval_36/go/code-simplifier` (Go) — [haiku] pass: no, tokens: 65526
- [x] `humaneval/HumanEval_36/java/baseline` (Java) — [haiku] pass: yes, tokens: 32392 — [sonnet] pass: yes, tokens: 40904
- [x] `humaneval/HumanEval_36/java/codecraft` (Java) — [haiku] pass: yes, tokens: 35548 — [sonnet] pass: yes, tokens: 45421
- [x] `humaneval/HumanEval_36/java/ponytail` (Java) — [haiku] pass: yes, tokens: 33734 — [sonnet] pass: yes, tokens: 42983
- [x] `humaneval/HumanEval_36/java/code-simplifier` (Java) — [haiku] pass: yes, tokens: 68503 — [sonnet] pass: yes, tokens: 83964
- [x] `humaneval/HumanEval_36/javascript/baseline` (JavaScript) — [haiku] pass: yes, tokens: 31212 — [sonnet] pass: yes, tokens: 40991
- [x] `humaneval/HumanEval_36/javascript/codecraft` (JavaScript) — [haiku] pass: yes, tokens: 34895 — [sonnet] pass: yes, tokens: 45103
- [x] `humaneval/HumanEval_36/javascript/ponytail` (JavaScript) — [haiku] pass: yes, tokens: 33196 — [sonnet] pass: yes, tokens: 42709
- [x] `humaneval/HumanEval_36/javascript/code-simplifier` (JavaScript) — [haiku] pass: yes, tokens: 65858 — [sonnet] pass: yes, tokens: 83485
- [x] `humaneval/HumanEval_36/python/baseline` (Python) — [haiku] pass: yes, tokens: 31694 — [sonnet] pass: yes, tokens: 82520
- [x] `humaneval/HumanEval_36/python/codecraft` (Python) — [haiku] pass: yes, tokens: 35302 — [sonnet] pass: yes, tokens: 44858
- [x] `humaneval/HumanEval_36/python/ponytail` (Python) — [haiku] pass: yes, tokens: 33866 — [sonnet] pass: yes, tokens: 42425
- [x] `humaneval/HumanEval_36/python/code-simplifier` (Python) — [haiku] pass: yes, tokens: 65618 — [sonnet] pass: yes, tokens: 82637
- [x] `humaneval/HumanEval_36/typescript/baseline` (TypeScript) — [haiku] pass: yes, tokens: 31238 — [sonnet] pass: yes, tokens: 40585
- [x] `humaneval/HumanEval_36/typescript/codecraft` (TypeScript) — [haiku] pass: yes, tokens: 34762 — [sonnet] pass: yes, tokens: 45100
- [x] `humaneval/HumanEval_36/typescript/ponytail` (TypeScript) — [haiku] pass: yes, tokens: 33328 — [sonnet] pass: yes, tokens: 42718
- [x] `humaneval/HumanEval_36/typescript/code-simplifier` (TypeScript) — [haiku] pass: yes, tokens: 64594 — [sonnet] pass: yes, tokens: 83572
