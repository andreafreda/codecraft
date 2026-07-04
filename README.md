# codecraft

[![CI](https://github.com/andreafreda/codecraft/actions/workflows/ci.yml/badge.svg)](https://github.com/andreafreda/codecraft/actions/workflows/ci.yml)

**Make Claude write code like a thoughtful human, not a machine.**

Out of the box, AI tends to produce code that *works* but reads like it was
generated: dense one-liners, cryptic names, clever tricks, zero docstrings, or
the opposite, a tower of abstractions for a single use case. `codecraft` steers
Claude toward code a real engineer would be happy to inherit.

When it's active, Claude:

- 🧠 **Favors the obvious solution** over the clever one, no line you have to stop and decode.
- 🏷️ **Names things fully**, intention-revealing identifiers, no cryptic abbreviations.
- 💬 **Documents every main method** with a human-oriented docstring: *what it's for and when to reach for it*, not a restatement of the signature.
- 🧩 **Applies SOLID with judgement**, real seams, not ceremony (YAGNI wins ties).
- 🚫 **Avoids classic code smells**, long parameter lists, feature envy, primitive obsession, magic numbers, boolean traps, dead code…
- 📖 **Optimizes for the next reader**, linear flow, consistent shapes, comments that explain *why*.

> Readability first. Not shorter code, *clearer* code.

## Install

Two ways to install, depending on how much you want codecraft to assert itself.

### As a plain skill (keyword-triggered)

```bash
# globally (available in every project)
npx skills add andreafreda/codecraft -y -g

# or just in the current project
npx skills add andreafreda/codecraft -y
```

Activates when you invoke `/codecraft` or explicitly ask for readability,
simplicity, or cleaner code. It deliberately does not fire on its own for
ordinary code writing; the always-on, apply-by-default behavior is the plugin
path below. No hooks, no persistent state.

### As a plugin (always-on)

```
/plugin marketplace add andreafreda/codecraft
/plugin install codecraft@andreafreda-codecraft
```

or, for a quick local test without touching your global config:

```
claude --plugin-dir /path/to/codecraft
```

This applies codecraft to every function, class, module, or diff you write or
refactor, without needing you to ask for readability explicitly. Turn it off
with `/codecraft off` or "stop codecraft"; back on with `/codecraft` or
"codecraft mode". The choice persists until you change it.

#### How the always-on plugin works

Two hooks and a flag, each with a distinct job:

- **`SessionStart`** injects the full principles, read live from `SKILL.md`, at
  the start of the session. It also fires again after a compaction (SessionStart
  runs with `source: "compact"`), so a long session that compacts the original
  injection away still gets the principles back.
- **`UserPromptSubmit`** re-emits a short, salience-only reminder each turn so
  the lens does not fade as the conversation grows. It is intentionally tiny:
  the full principles already arrive from `SessionStart`, so the per-turn note
  only keeps them front of mind rather than restating them (which would pile up
  in the context every turn).
- **The flag** (`~/.claude/.codecraft-active`) records on/off. Both hooks read
  it, so `/codecraft off` stops all injection until you turn it back on.

The bundled skill is intent-gated: `SKILL.md` tells the model to activate only
when explicitly invoked and not to self-activate on ordinary code writing. That
line governs the plain-skill install (no hooks), where you opt in per use. The
plugin deliberately overrides it: the `SessionStart` hook injects the principles
as context directly, so the "do not self-activate" instruction never runs and
the lens is on by default. The hooks, not the skill's own gate, are the
activation path, so `/codecraft off` genuinely turns codecraft off rather than
leaving the skill to trigger on its own.

> **Known limitation:** the on/off state is global. It lives in a single file
> (`~/.claude/.codecraft-active`, or `$CLAUDE_CONFIG_DIR/.codecraft-active`),
> shared across every project and session. Turning codecraft off in one project
> turns it off everywhere until you turn it back on. There is no per-project
> state today.

## Layout

```
skills/codecraft/SKILL.md         # the guidance body, always loaded when the skill is active
skills/codecraft/reference/*.md   # worked examples per language, loaded on demand
hooks/                            # SessionStart + UserPromptSubmit hooks for the always-on plugin path
commands/codecraft.toml           # /codecraft slash command
.claude-plugin/plugin.json        # plugin manifest, registers the hooks above
```

`SKILL.md` holds the rules (principles, tie-breaks, smells, the checklist). It
is loaded for the whole session when active, so anything universal must live
there, never only in a reference file. The `reference/` files hold worked
examples and are opened on demand, one at a time: one file per language
(`python`, `typescript`, `javascript`, `go`, `java`, `csharp`) plus
frontend-framework extensions (`react`, `angular`), a shared `style-and-smells`
file for the judgement principles, and a language-agnostic `general.md`. See
`CONTRIBUTING.md` for the pattern to follow when adding a language.

The `hooks/`, `commands/`, and `.claude-plugin/` pieces only matter for the
always-on plugin install path above; the plain-skill install ignores them
entirely.

## Credits and references

The `codecraft` framing is the author's own, but it builds on well-known prior
work. Full source links live in `skills/codecraft/SKILL.md` under "References";
the headline ones:

- **Kent Beck's four rules of simple design**, via [Martin Fowler](https://martinfowler.com/bliki/BeckDesignRules.html).
- **SOLID principles** ([Wikipedia](https://en.wikipedia.org/wiki/SOLID), [Baeldung](https://www.baeldung.com/solid-principles)).

## License

[MIT](LICENSE). Use it, modify it, ship it, sell it; just keep the copyright
notice.
