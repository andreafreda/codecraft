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
  computed: judgement is left to external tools run over the saved solutions.
- The matching checkbox in `comparison/PLAN.md` is ticked and annotated with the
  result.

## Runtimes

The correctness gate (`gate.mjs`) is wired for all six targets: **python**
(`python`), **javascript** (`node`), **typescript** (`node
--experimental-strip-types`), **java** (`javac`/`java -ea`, bundled
`org.javatuples` jar in `lib/`), **go** (`go test`), and **csharp** (`dotnet run`,
with the fixtures' reference-equality `.Equals` rewritten to a JSON value
compare). A target records `pass: skipped` (never a false `no`) when its
toolchain is missing: go and csharp need `go` / `dotnet` on `PATH` (override with
`CCBENCH_GO` / `CCBENCH_DOTNET`), and typescript needs Node >= 22.6 for
`--experimental-strip-types`. Each gate run is bounded by a timeout, so a
generated solution that loops forever fails rather than hanging the harness. See
`PLAN.md` for how each target assembles.

## Execution safety

The gate compiles and runs model-generated code locally with your full user
privileges and network access. The isolation above keeps plugins out of the
generation config; it does not sandbox execution. Treat the generated solutions
as untrusted and run the gate in a disposable container or VM (ideally with the
network denied and the filesystem restricted), not on a machine you care about.

## Status

Run in full: 6 tasks x 6 languages x 4 arms x 3 models
(`claude-haiku-4-5`, `claude-sonnet-5`, `claude-opus-4-8`) = 432 cells, all
passing their correctness gate. See `../RESULTS.md` and the per-model
`../REPORT-*.md`.
