# Contributing

Thanks for improving these skills. This guide is mostly about `codecraft`, whose
examples follow a fixed shape so the corpus stays consistent as it grows.

## Repo layout

```
skills/<name>/SKILL.md            # the always-loaded guidance body
skills/<name>/reference/*.md      # examples and detail, loaded on demand
```

`SKILL.md` holds the rules (principles, tie-breaks, smells, the checklist). It is
loaded for the whole session, so anything universal must live there, never only in
a reference file. The `reference/` files hold worked examples and are opened on
demand, one at a time.

## Adding a language to `codecraft`

Create `skills/codecraft/reference/<language>.md`. Every language file carries the
**same eight-example Core, in the same order**, each rendered in that language's
own idioms:

1. Name things fully, name the magic number (principle 2)
2. Linear flow with guard clauses (principle 4)
3. Make the contract visible, document it (principle 8)
4. Handle errors honestly (principle 9)
5. Keep side effects at the edges (principle 10)
6. Clarity beats DRY (tie-break rule)
7. Explicit beats magic (tie-break rule)
8. Dependency Inversion (SOLID, apply with judgement)

Structure each file as:

- a short intro naming the language's idioms and pointing back to `SKILL.md`;
- a `## Core` section with the eight `###` examples above, in order;
- an optional `## Language-specific notes` section for idiomatic extras (for
  example Go error wrapping, a boolean-trap fix, an Open/Closed or Single
  Responsibility example). Extras are a bonus, not required to be uniform.

Keep examples short and `before:` / `after:` framed. They illustrate; they are not
expected to compile as-is (`/* ... */` bodies are fine). Use the language's real
idioms (its type system, its error model, its doc-comment convention).

Then add a row to the index table in `SKILL.md` and to the file list in the
`README.md`.

## Extension files

Some files are not Core files:

- `reference/react.md` covers only React-specific shapes and points back to the
  JavaScript and TypeScript Core instead of repeating it. Model a framework file
  the same way: cover only what the framework adds, link to the base language.
- `reference/style-and-smells.md` holds the judgement principles (1, 3, 5, 6, 7,
  11) and the smells, once for all languages.
- `reference/general.md` states the Core in language-agnostic pseudocode for
  languages without a dedicated file.

## Prose rules (they apply to docs too)

Per principle 11: in prose, comments and commit messages, do not use a dash as a
clause connector (no em dash, no spaced `word - word`) and no arrow glyphs. Use a
comma, colon, parentheses or full stop. Hyphens inside words are fine.

## Before you open a PR

- Check internal links resolve. From `skills/codecraft/`:
  ```bash
  grep -rhoE 'reference/[a-z-]+\.md' SKILL.md reference/*.md | sort -u \
    | while read l; do [ -f "$l" ] && echo "OK $l" || echo "MISS $l"; done
  ```
- Keep one kind of change per commit (it is in the skill, so we hold ourselves to
  it): don't mix a new language file with edits to an existing one.
