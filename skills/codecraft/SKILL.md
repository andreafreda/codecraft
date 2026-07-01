---
name: codecraft
description: >-
  Make code read as if a thoughtful human engineer wrote it: plain, obvious, easy
  to follow, never machine-dense or over-abstracted. Apply this as a cross-cutting
  lens whenever writing, implementing, or refactoring a function, class, module,
  or component, and when reviewing a diff for readability, in any language. It
  co-applies with framework or language skills rather than replacing them, so use
  it even when another skill (React, Angular, etc.) is already engaged. Also use
  it when the user mentions readability, simplicity, "clean code", maintainability,
  "as if written by hand", or invokes /codecraft. Skip it for trivial or
  mechanical edits (a one-line tweak, a version bump, a print statement), and as
  the primary lens when the task's main goal is a performance hot path, an urgent
  hotfix, or a security review; there readability is a later pass.
---

# codecraft

The premise: code must read as if a careful human wrote it. Not necessarily
short, but clear. Optimize for the next person (or the next session)
understanding it at a glance, not for cleverness or line count. These rules are
project-agnostic; apply them in any codebase and language.

## Not in scope

This skill is about how code reads, not what it does. It does not drive
performance and optimization, security review, or feature and architecture
decisions; those come first and have their own focus. The SOLID and seam notes
below are secondary lenses to keep a readability change honest, not an invitation
to redesign the system. Reach for codecraft when the goal is making code clear
and maintainable.

## The one rule, and how to break ties

**Obvious over clever** is the north star; every other principle serves it. When
two principles pull against each other:

- **Clarity beats brevity.** Three readable lines beat one dense line.
- **Clarity beats DRY.** A little duplication is better than an abstraction the
  reader has to chase. Extract a helper only when it names a real concept and the
  caller reads better for it (principle 6).
- **Clarity beats strict SOLID.** No interface, factory or layer for a single
  concrete case; apply SOLID when a real second case or seam exists.
- **Explicit beats magic.** Prefer visible control flow to a decorator or
  metaclass that hides it, even if the magic is shorter.

Still unclear? Pick the version a new teammate would understand fastest.

### Is it simple enough? Beck's four rules

When you cannot tell whether code is simple enough, run Kent Beck's four rules of
simple design in order; an earlier rule wins a tie with a later one:

1. **Passes the tests.** It works. Nothing below matters until this holds.
2. **Reveals intention.** A reader sees what it is for without decoding it. This
   is the north star above.
3. **No duplication.** Each fact lives in one place, but only once a real concept
   earns the abstraction (principle 6, and "clarity beats DRY").
4. **Fewest elements.** Drop anything that serves none of the three rules above
   (YAGNI).

The order is the point: reveal intention before removing duplication, and never
add an element that hurts readability to satisfy a lower rule. (Kent Beck, via
Martin Fowler, "Beck Design Rules".)

## Principles

1. **Obvious over clever.** Prefer the plain solution a competent engineer reaches
   first. If a one-liner needs a mental unpack, write the three readable lines.
2. **Name things fully.** Intention-revealing names (`monthly_category_matrix`,
   not `mcm`). Match the project's domain glossary if it has one. No cryptic
   abbreviations.
3. **Explain the why, not the what.** Comments justify a non-obvious decision, a
   tradeoff, or a gotcha. Never narrate what the code already says.
4. **Linear flow.** Read top to bottom like prose. Guard clauses for edge cases
   early; avoid deep nesting. One function does one job.
5. **Consistent shape.** Sibling functions look alike: same param order, same
   return shape, same error handling. Predictability is readability.
6. **Don't over-abstract.** A helper earns its place only when it removes real
   duplication or names a real concept, not before.
7. **Length is fine; density is not.** Many short obvious functions beat few dense
   ones. Split a file when it mixes unrelated concerns; a function past roughly 40
   lines (more than one screen) is a split candidate.
8. **Make the contract visible, and document it human-first.** Type public
   functions using the language's own system (Python hints, TypeScript and C# and
   Java typed signatures, Go typed params). The signature plus one line of intent
   should tell the reader how to use it without reading the body. Give public or
   exported symbols, and any function past the split threshold (principle 7), a
   doc comment saying what it is for and when to reach for it (not a restatement
   of the signature); note non-obvious inputs, outputs, side effects and gotchas.
   For private one-liners follow the project's existing convention: if it
   documents sparingly, do the same.
9. **Handle errors honestly.** Catch the specific error you expect, not a blanket
   catch-all that hides bugs. Never swallow an error silently; if you log or
   re-raise, include enough context to act on. Let unexpected failures surface.
10. **Keep side effects at the edges.** Separate pure logic (decisions,
    calculations, shaping data) from IO (database, network, files, clock). Pure
    functions are trivial to read and test; wrap the IO thinly around them.
11. **Write prose like a human.** In doc comments, comments, commit messages and
    READMEs, do not use a dash as a clause connector (em dash or spaced
    `word - word`); it reads as machine-generated. Use a comma, colon, parentheses
    or full stop, and avoid arrow glyphs. Hyphens inside words are fine
    (`case-insensitive`, `read-only`).

## Examples (before and after)

Worked before/after examples live in per-language files so this guide stays
short and you load only the calibration you need. Each file covers the same
principles in that language's own idioms.

| Language | File | When to open it |
| --- | --- | --- |
| Python | `reference/python.md` | Writing or reviewing Python. |
| TypeScript | `reference/typescript.md` | Writing or reviewing TypeScript. |
| JavaScript | `reference/javascript.md` | Writing or reviewing plain (frontend) JavaScript, no framework. |
| React | `reference/react.md` | Writing or reviewing React components. Extension file; builds on the JavaScript and TypeScript files. |
| Go | `reference/go.md` | Writing or reviewing Go. |
| Java | `reference/java.md` | Writing or reviewing Java. |
| C# | `reference/csharp.md` | Writing or reviewing C#. |
| Any other | `reference/general.md` | A language not listed above, or when you want the principle stated language-agnostically. |
| Style and smells | `reference/style-and-smells.md` | Examples for the judgement principles (1, 3, 5, 6, 7, 11) and the smells, shared across languages. |

The language files carry the same eight-example Core in the same order; the Core
is identical across them, but each file's optional language-specific extras
differ. `reference/react.md` and `reference/style-and-smells.md` are not Core
files:
`react.md` covers React-specific shapes and points back to the JavaScript and
TypeScript Core; `style-and-smells.md` covers the principles that are about
judgement rather than a code shape, once for all languages.

The reference files only add worked examples; they do not hold any rule of their
own. If the language is not listed, or no example fits, the principles, tie-breaks,
Beck's four rules and the smell list in this file still apply in full. Hold to
them and translate them into the target language's idioms; `reference/general.md`
gives language-agnostic pseudocode to calibrate against when you need it.

## SOLID (apply with judgement)

Readability comes first (see the tie-break rules), but still design with SOLID in
mind, and never add ceremony for a single case (YAGNI). The throughline: depend
on abstractions and give each unit one job, so a change touches one place instead
of rippling. Each principle earns its keep only when a real second case or seam
exists; until then, the plain version wins.

- **S, Single Responsibility:** one reason to change per module, class, function.
  A class that both computes a thing and sends it over the network has two reasons
  to change; split them (worked example in the Java and general reference files).
- **O, Open/Closed:** open for extension, closed for modification. Add a new
  behaviour behind an interface instead of editing a stable `if`/`switch` every
  time a case appears.
- **L, Liskov:** an implementation is safely usable wherever its interface is,
  same contract, no weaker guarantees and no surprise exceptions.
- **I, Interface Segregation:** small focused interfaces; no client forced to
  depend on (or stub) methods it never calls.
- **D, Dependency Inversion:** high-level code depends on an abstraction (a
  provider, a repository), not a concrete vendor or library at the call site;
  inject the concrete implementation from the edge.

Worked SOLID examples (Open/Closed, Dependency Inversion, Single Responsibility)
are in the per-language files and in `reference/general.md`. Canonical references:
the SOLID definitions on Wikipedia and Baeldung's "A Solid Guide to SOLID
Principles".

## Smells to fix

The principles above say what good looks like; these are extra detection signals
not already covered by a numbered principle. Fix the structural ones first, they
hide bugs or block change. Worked examples for several of these smells are in
`reference/style-and-smells.md`.

Structural:

- A function or class doing too much: it needs internal section comments, or has
  "and" in its name.
- Duplicated logic, or shotgun surgery (one change forces edits across many files,
  signalling a missing seam).
- Feature envy: logic that mostly touches another module's data belongs there.
- Leaky abstraction: an interface exposing its implementation.

Readability:

- Boolean trap: `f(true, false)` is unreadable at the call site; use named args or
  distinct functions.
- Long parameter lists or data clumps: group related args into a small object.
- Primitive obsession: model the concept instead of passing bare strings or dicts.
- Clever comprehensions or expressions doing real work; unfold them.
- Magic numbers or strings: name them as constants.
- A file with section banners (`# ---- accounts ----`) is several modules in a
  trench coat; each banner is a candidate split.
- Test code treated as second class: unclear test names (a name should state the
  behaviour), no arrange-act-assert shape, or shared fixtures that hide what each
  test sets up. Tests are read more than most code.
- Dead code: delete it.

## When refactoring

- **Keep the public API stable.** When you split a module, re-export the same
  names from a facade so callers don't change. A readability refactor should cost
  the rest of the codebase nothing.
- **Lean on the tests.** Green before and after with no test edits proves the
  behaviour and interface are unchanged. If a refactor forces test changes, that
  is a behaviour change: call it out.
- **One kind of change per commit.** Don't mix moving code with changing logic;
  reviewers can't tell a pure move from a silent fix otherwise.

### Technique: extract the mechanical half of repeated boilerplate

A common shape: the same boilerplate across many functions where only a small
inner part differs (for example, a set of "update only the fields the caller
passed" functions, identical except for the per-field handling). Keep the varying
logic explicit in each caller and extract only the identical mechanical half into
one small named helper. The helper names the concept, callers stay readable, no
magic appears. Skip it when there is only one such function (YAGNI).

## Check before committing

Read the diff as a stranger would; rewrite any line that makes you pause to
decode it. Then run through:

- [ ] Names reveal intent; no cryptic abbreviations (principle 2).
- [ ] Flow reads top to bottom; edge cases guarded early (principle 4).
- [ ] No function past the split threshold left dense or undocumented
      (principles 7, 8).
- [ ] Errors caught specifically; nothing swallowed silently (principle 9).
- [ ] Side effects kept at the edges; pure logic separated (principle 10).
- [ ] No dash as a clause connector, no arrow glyphs in prose (principle 11).
- [ ] Public API unchanged by any refactor; tests green with no edits.
- [ ] One kind of change per commit.
- [ ] A structural smell or SOLID violation a cheap change would fix is fixed,
      if it keeps the code simple.

## References

The principles here are the author's own framing, but they lean on well-known
prior work. For the reader who wants the source:

- Kent Beck's four rules of simple design, via Martin Fowler:
  https://martinfowler.com/bliki/BeckDesignRules.html
- SOLID principles (definitions):
  https://en.wikipedia.org/wiki/SOLID
- "A Solid Guide to SOLID Principles", Baeldung:
  https://www.baeldung.com/solid-principles
- Python caching idioms (`functools.lru_cache`), standard library docs:
  https://docs.python.org/3/library/functools.html
- "Caching in Python Using the LRU Cache Strategy", Real Python:
  https://realpython.com/lru-cache-python/
