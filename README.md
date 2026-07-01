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

Triggers explicitly with `/codecraft`, or automatically when you're writing or
refactoring code, or whenever readability and simplicity come up in what you
ask for. No hooks, no persistent state; the skill description alone decides
whether it fires on a given turn.

### As a plugin (always-on)

```
/plugin marketplace add andreafreda/codecraft
/plugin install codecraft@andreafreda-codecraft
```

or, for a quick local test without touching your global config:

```
claude --plugin-dir /path/to/codecraft
```

This registers a `SessionStart` hook that activates codecraft by default the
moment the plugin is enabled, and a `UserPromptSubmit` hook that reinforces it
every turn. It applies to every function, class, module, or diff you write or
refactor without needing you to ask for readability explicitly. Turn it off
with `/codecraft off` or "stop codecraft"; back on with `/codecraft` or
"codecraft mode". The choice persists until you change it.

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
(`python`, `typescript`, `javascript`, `go`, `java`, `csharp`) plus a
frontend-oriented `react` extension, a shared `style-and-smells` file for the
judgement principles, and a language-agnostic `general.md`. See
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
- **Python caching idioms** ([standard library docs](https://docs.python.org/3/library/functools.html), [Real Python](https://realpython.com/lru-cache-python/)).

## License

[MIT](LICENSE). Use it, modify it, ship it, sell it; just keep the copyright
notice.
