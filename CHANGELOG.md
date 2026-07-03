# Changelog

All notable changes to codecraft are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Fixed
- Tightened the natural-language toggle: an intent word now only flips the mode
  when it sits right next to "codecraft" (for example "stop codecraft" or
  "codecraft off"). A passing mention like "stop, codecraft is fine but..." no
  longer triggers a false off. Added tests for these ambiguous phrasings.
- Shortened the SessionStart inline fallback (used only when SKILL.md is
  missing) to a one-line pointer, removing a hand-maintained copy of the
  principles that could drift from SKILL.md.

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
  plus a "from prompt to score" benchmark workflow (a Mermaid diagram and stage
  breakdown): four arms, a correctness gate, a deterministic readability
  composite, token counts, and a final SonarQube issue-count cross-check. The
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
