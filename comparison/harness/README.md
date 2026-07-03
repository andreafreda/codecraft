# Benchmark harness

`run-cell.mjs` executes one run cell (`suite/task/target/arm`) end to end.

```bash
node comparison/harness/run-cell.mjs humaneval/HumanEval_1/python/codecraft
```

## How it stays isolated

Generation runs through `claude -p` (headless, using your Claude Code
subscription; no separate API key) inside a temporary `CLAUDE_CONFIG_DIR` that
holds only the copied credentials. Nothing else loads: no plugins, no hooks, no
settings, so the ambient codecraft and caveman modes cannot leak into a run. The
only thing that changes between arms is the appended system prompt, defined in
`arms.json`:

- `baseline`: none.
- `codecraft`: the local `skills/codecraft/SKILL.md`.
- `ponytail`: fetched from the ponytail repository at run time.
- `code-simplifier`: fetched from the official plugin repository; two-pass (write,
  then refine).

The model is pinned in `arms.json` so every arm runs on the same model.

## What a cell produces

- `comparison/results/<arm>/<suite>/<task>/<target>/solution.<ext>` and
  `metrics.json` (tokens in/out, correctness pass/fail). No quality score is
  computed — judgement is left to external tools run over the saved solutions.
- The matching checkbox in `comparison/PLAN.md` is ticked and annotated with the
  result.

## Runtimes

The correctness gate (`gate.mjs`) is wired for all six targets: **python**
(`python`), **javascript** (`node`), **typescript** (`node
--experimental-strip-types`), **java** (`javac`/`java -ea`, bundled
`org.javatuples` jar in `lib/`), **go** (`go test`), and **csharp** (`dotnet run`,
with the fixtures' reference-equality `.Equals` rewritten to a JSON value
compare). go and csharp fall back to `pass: skipped` if their toolchain is not
on `PATH` (override with `CCBENCH_GO` / `CCBENCH_DOTNET`). See `PLAN.md` for how
each target assembles.

## Status

v0, not yet run. A pilot (one task in Python, four arms) validates the chain
before a wider run; the full 144-cell run is a deliberate, budgeted job.
