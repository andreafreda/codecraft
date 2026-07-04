# Changelog

All notable changes to codecraft are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-07-04

### Added
- `comparison/harness/`: the run harness (`run-cell.mjs` plus `arms.json`).
  Generation goes through `claude -p` (headless, subscription auth, no API key)
  in an isolated `CLAUDE_CONFIG_DIR` that holds only the credentials, so ambient
  plugins and hooks cannot leak into a run; the only per-arm difference is the
  appended system prompt. A cell writes its solution and `metrics.json` under
  `comparison/results/`, runs the correctness gate for that language (python,
  javascript, typescript, java, go, csharp), and ticks and annotates its
  checkbox in `PLAN.md`.
- `comparison/PLAN.md`: a task-oriented run plan, one checkbox per run cell (a
  single task x language x arm), generated from the task manifest and the arm
  list. It carries the per-cell procedure (generate, gate, record), the
  per-language runtimes to mount at execution time, and the results output
  layout, so cells can be executed one at a time with only what each needs.
- Ran the full benchmark: 6 tasks x 6 languages x 4 arms x 3 models
  (`claude-haiku-4-5`, `claude-sonnet-5`, `claude-opus-4-8`) = 432 cells, all
  passing their correctness gate. Reports in `comparison/RESULTS.md` and
  `REPORT-{haiku,sonnet,opus}.md` cover token cost and a SonarQube issue-count
  cross-check per arm across all six languages (python, js, ts and go from
  source, java in reduced no-bytecode mode, C# through the SonarScanner for
  .NET). The benchmark records only objective signals (tokens and gate
  pass/fail); it computes no readability score of its own, leaving that
  judgement to established external tools.
- README: a "Measured, not asserted" section surfacing the benchmark's headline
  numbers and stating plainly that the comparison reports trade-offs, not a
  winner, and does not claim ponytail or code-simplifier are worse.
- `reference/angular.md`: an Angular extension reference, modeled on
  `reference/react.md`. It applies the Core principles to Angular-specific shapes
  (signal inputs, `@if`/`@else` control flow, `computed()` over `effect()`,
  `inject()` and focused services) using current idioms (standalone components,
  signals, Angular 17+), and points back to the TypeScript Core. Registered in
  the `SKILL.md` index, the README layout, and CONTRIBUTING.
- Test suite (`node --test`) covering the flag persistence and the toggle
  parser, plus a GitHub Actions CI workflow that runs it on push and pull
  request, and a CI badge in the README.
- Black-box tests for the hooks themselves: the SessionStart injection
  (default-on, frontmatter stripping, off short-circuit, and the inline fallback
  when SKILL.md is missing) and the UserPromptSubmit runtime path (reminder
  emitted when active, suppressed when off, toggled by `/codecraft on|off`).

### Changed
- Isolated the mode tracker's stdin handling behind a `require.main` guard and
  exported `requestedMode`, so the parser can be unit-tested without triggering
  the hook's side effects.
- Slimmed the per-turn reminder to a salience-only note (about a quarter of its
  former size). The full principles already arrive via the SessionStart hook at
  startup and after each compaction, so the per-turn note no longer restates
  them, which keeps its accumulated context cost small over long sessions.
- Made the skill intent-gated instead of task-gated: it no longer auto-activates
  on ordinary code writing, only on `/codecraft`, an explicit readability
  request, or when codecraft mode is already active. This makes `/codecraft off`
  behave like a real off (the skill stays dormant) and clearly separates the
  plain-skill install (explicit) from the plugin install (always-on via hooks).
- Cleaned up the plugin's own code after a self-review with the codecraft lens
  and a static-analysis pass: `node:`-prefixed builtin imports, the toggle
  matcher split into named checks instead of two dense regexes, clearer error
  handling, and small naming fixes. Behavior is unchanged and the tests stay green.

### Fixed
- Hardened the natural-language toggle so it never flips the global on/off flag
  on an incidental mention. A negated request ("do not turn off codecraft") is a
  no-op; "codecraft on|off" only counts with on/off at the end, so "codecraft off
  switch" and "codecraft on top of the setup" do not match; and a hyphenated
  compound ("codecraft-style") does not count. The `/codecraft` command match is
  exact, so "/codecraftfoo" is not treated as it. Tests cover all of these.
- Shortened the SessionStart inline fallback (used only when SKILL.md is
  missing) to a one-line pointer, removing a hand-maintained copy of the
  principles that could drift from SKILL.md.
- Made the shipped hooks and the `/codecraft` command honor principle 11 (no dash
  as a clause connector) in their own comments, prose, and the reminder string
  injected into the model context, so the plugin follows its own rule.

### Docs
- Documented the on/off state as a known limitation: it is global (one flag
  under ~/.claude), not per-project.
- Expanded the README with a "How the always-on plugin works" section covering
  the SessionStart injection (full principles, re-injected after compaction),
  the slim per-turn UserPromptSubmit reminder, the flag, and why the intent-gated
  skill makes `/codecraft off` a real off.
- Added `comparison/COMPARISON.md`: a topic-by-topic comparison against
  Anthropic's official `code-simplifier` plugin (shaping during writing vs a
  post-hoc cleanup pass), based on reading the full code-simplifier definition,
  plus a "generate, gate, save" benchmark workflow (a Mermaid diagram and stage
  breakdown): four arms, a correctness gate, token counts, and a final SonarQube
  issue-count cross-check, with quality judgement left to external tools. The
  fourth arm is `ponytail`, a popular least-code skill that uses the same
  always-on hook mechanism as codecraft but optimizes for brevity, making it a
  clarity-versus-brevity foil in the same comparison.
- Stored the first benchmark task set under `comparison/tasks/`, in an extensible
  `tasks/<suite>/<task>/<target>/` layout where a target is a language or a
  framework. The first suite (HumanEval and MultiPL-E) carries six problems with
  prompts and hidden tests across Python, TypeScript, JavaScript, Java, Go, and
  C#. Coverage is generated from the folder tree (a data-driven index and
  `manifest.json`), so adding a language, framework, or benchmark source is a
  drop-in with no fixed count to update. Per-task READMEs cite sources and
  licenses.

## [1.0.2] - 2026-07-01

### Changed
- Tightened the skill description down to its trigger anchors and skip
  conditions, dropping the redundant enumerations and examples.

### Added
- A "leave clear code alone" restraint, so the lens is not read as a mandate to
  rewrite already-clear code. It still yields to an explicit user request.

### Docs
- Pointed CONTRIBUTING at the README "Layout" section instead of a nonexistent
  file-list table, and dropped the plural "these skills" framing.

## [1.0.1] - 2026-07-01

### Changed
- Refactored the hooks for readability. Extracted `getFlagPath()` into
  `codecraft-state` so both hooks share one flag-path source, and extracted
  `requestedMode()` in the mode tracker to name the toggle intent and flatten
  the nested command and natural-language branches.

## [1.0.0] - 2026-07-01

### Added
- Initial release. Always-on readability lens for Claude Code: a `SessionStart`
  hook activates codecraft by default and injects the principles from
  `SKILL.md`, and a `UserPromptSubmit` hook reinforces them each turn.
- `/codecraft on|off` toggle, persisted across sessions.
- Per-language reference guides (Python, TypeScript, JavaScript, React, Go,
  Java, C#), plus a shared `style-and-smells` reference and a language-agnostic
  `general` reference.
