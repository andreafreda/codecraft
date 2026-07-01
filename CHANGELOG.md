# Changelog

All notable changes to codecraft are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
