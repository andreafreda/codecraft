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

Only the Python correctness gate is implemented. js/ts/java/go/cs need their
runtime mounted and a gate that assembles `prompt + completion + tests.<ext>`
(MultiPL-E format: the tests file is a full program; run it and check the exit
code). Until then, non-Python cells record score and tokens with `pass: skipped`.

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
   language runtime. Pass or fail; only passing solutions are scored.
3. **Score.** `node comparison/scoring/score.mjs <solution>` for the 0.00 to
   10.00 readability composite and raw metrics.
4. **Record.** Write the solution and a `metrics.json` (tokens, pass, composite,
   raw) under the output path below.

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

- [ ] `humaneval/HumanEval_1/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_1/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_1/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_1/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_1/go/baseline` (Go)
- [ ] `humaneval/HumanEval_1/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_1/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_1/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_1/java/baseline` (Java)
- [ ] `humaneval/HumanEval_1/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_1/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_1/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_1/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_1/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_1/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_1/javascript/code-simplifier` (JavaScript)
- [x] `humaneval/HumanEval_1/python/baseline` (Python) — [haiku] pass: yes, composite: 8.32, tokens: 31412
- [x] `humaneval/HumanEval_1/python/codecraft` (Python) — [haiku] pass: yes, composite: 8.11, tokens: 34646
- [x] `humaneval/HumanEval_1/python/ponytail` (Python) — [haiku] pass: yes, composite: 8.31, tokens: 36757
- [x] `humaneval/HumanEval_1/python/code-simplifier` (Python) — [haiku] pass: yes, composite: 8.75, tokens: 65073
- [ ] `humaneval/HumanEval_1/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_1/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_1/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_1/typescript/code-simplifier` (TypeScript)

#### HumanEval_126

- [ ] `humaneval/HumanEval_126/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_126/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_126/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_126/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_126/go/baseline` (Go)
- [ ] `humaneval/HumanEval_126/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_126/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_126/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_126/java/baseline` (Java)
- [ ] `humaneval/HumanEval_126/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_126/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_126/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_126/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_126/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_126/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_126/javascript/code-simplifier` (JavaScript)
- [x] `humaneval/HumanEval_126/python/baseline` (Python) — [haiku] pass: yes, composite: 8.83, tokens: 34550
- [x] `humaneval/HumanEval_126/python/codecraft` (Python) — [haiku] pass: yes, composite: 6.99, tokens: 35409
- [x] `humaneval/HumanEval_126/python/ponytail` (Python) — [haiku] pass: yes, composite: 7.86, tokens: 33915
- [x] `humaneval/HumanEval_126/python/code-simplifier` (Python) — [haiku] pass: yes, composite: 7.77, tokens: 67017
- [ ] `humaneval/HumanEval_126/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_126/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_126/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_126/typescript/code-simplifier` (TypeScript)

#### HumanEval_129

- [ ] `humaneval/HumanEval_129/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_129/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_129/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_129/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_129/go/baseline` (Go)
- [ ] `humaneval/HumanEval_129/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_129/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_129/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_129/java/baseline` (Java)
- [ ] `humaneval/HumanEval_129/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_129/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_129/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_129/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_129/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_129/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_129/javascript/code-simplifier` (JavaScript)
- [ ] `humaneval/HumanEval_129/python/baseline` (Python)
- [ ] `humaneval/HumanEval_129/python/codecraft` (Python)
- [ ] `humaneval/HumanEval_129/python/ponytail` (Python)
- [ ] `humaneval/HumanEval_129/python/code-simplifier` (Python)
- [ ] `humaneval/HumanEval_129/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_129/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_129/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_129/typescript/code-simplifier` (TypeScript)

#### HumanEval_154

- [ ] `humaneval/HumanEval_154/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_154/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_154/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_154/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_154/go/baseline` (Go)
- [ ] `humaneval/HumanEval_154/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_154/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_154/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_154/java/baseline` (Java)
- [ ] `humaneval/HumanEval_154/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_154/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_154/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_154/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_154/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_154/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_154/javascript/code-simplifier` (JavaScript)
- [ ] `humaneval/HumanEval_154/python/baseline` (Python)
- [ ] `humaneval/HumanEval_154/python/codecraft` (Python)
- [ ] `humaneval/HumanEval_154/python/ponytail` (Python)
- [ ] `humaneval/HumanEval_154/python/code-simplifier` (Python)
- [ ] `humaneval/HumanEval_154/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_154/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_154/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_154/typescript/code-simplifier` (TypeScript)

#### HumanEval_33

- [ ] `humaneval/HumanEval_33/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_33/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_33/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_33/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_33/go/baseline` (Go)
- [ ] `humaneval/HumanEval_33/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_33/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_33/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_33/java/baseline` (Java)
- [ ] `humaneval/HumanEval_33/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_33/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_33/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_33/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_33/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_33/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_33/javascript/code-simplifier` (JavaScript)
- [x] `humaneval/HumanEval_33/python/baseline` (Python) — [haiku] pass: yes, composite: 4.97, tokens: 31743
- [x] `humaneval/HumanEval_33/python/codecraft` (Python) — [haiku] pass: yes, composite: 4.97, tokens: 35009
- [x] `humaneval/HumanEval_33/python/ponytail` (Python) — [haiku] pass: yes, composite: 4.3, tokens: 33460
- [x] `humaneval/HumanEval_33/python/code-simplifier` (Python) — [haiku] pass: yes, composite: 4.84, tokens: 66203
- [ ] `humaneval/HumanEval_33/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_33/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_33/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_33/typescript/code-simplifier` (TypeScript)

#### HumanEval_36

- [ ] `humaneval/HumanEval_36/csharp/baseline` (C#)
- [ ] `humaneval/HumanEval_36/csharp/codecraft` (C#)
- [ ] `humaneval/HumanEval_36/csharp/ponytail` (C#)
- [ ] `humaneval/HumanEval_36/csharp/code-simplifier` (C#)
- [ ] `humaneval/HumanEval_36/go/baseline` (Go)
- [ ] `humaneval/HumanEval_36/go/codecraft` (Go)
- [ ] `humaneval/HumanEval_36/go/ponytail` (Go)
- [ ] `humaneval/HumanEval_36/go/code-simplifier` (Go)
- [ ] `humaneval/HumanEval_36/java/baseline` (Java)
- [ ] `humaneval/HumanEval_36/java/codecraft` (Java)
- [ ] `humaneval/HumanEval_36/java/ponytail` (Java)
- [ ] `humaneval/HumanEval_36/java/code-simplifier` (Java)
- [ ] `humaneval/HumanEval_36/javascript/baseline` (JavaScript)
- [ ] `humaneval/HumanEval_36/javascript/codecraft` (JavaScript)
- [ ] `humaneval/HumanEval_36/javascript/ponytail` (JavaScript)
- [ ] `humaneval/HumanEval_36/javascript/code-simplifier` (JavaScript)
- [x] `humaneval/HumanEval_36/python/baseline` (Python) — [haiku] pass: yes, composite: 4.34, tokens: 31294
- [x] `humaneval/HumanEval_36/python/codecraft` (Python) — [haiku] pass: yes, composite: 4.34, tokens: 34630
- [x] `humaneval/HumanEval_36/python/ponytail` (Python) — [haiku] pass: yes, composite: 4.34, tokens: 32800
- [x] `humaneval/HumanEval_36/python/code-simplifier` (Python) — [haiku] pass: yes, composite: 4.84, tokens: 63793
- [ ] `humaneval/HumanEval_36/typescript/baseline` (TypeScript)
- [ ] `humaneval/HumanEval_36/typescript/codecraft` (TypeScript)
- [ ] `humaneval/HumanEval_36/typescript/ponytail` (TypeScript)
- [ ] `humaneval/HumanEval_36/typescript/code-simplifier` (TypeScript)
