#!/usr/bin/env node
// codecraft: SessionStart hook. Turns the readability lens on by default and
// injects the codecraft principles as hidden session context.
//
// State lives in ~/.claude/.codecraft-active as "on"/"off". A missing file
// means the user never toggled, which counts as on. A persisted "off" keeps it
// off across restarts until the user turns it back on.

const fs = require('node:fs');
const path = require('node:path');
const { getFlagPath, writeFlag, readFlag } = require('./codecraft-state');

const flagPath = getFlagPath();

if (readFlag(flagPath) === 'off') {
  process.stdout.write('OK');
  process.exit(0);
}

// Normalize a missing or implicit-on flag to an explicit "on", so later reads
// (and the toggle) see the same value the user is now getting.
writeFlag(flagPath, 'on');

// SKILL.md is the single source of truth for the principles. Read it live so
// edits to the skill propagate without duplicating the text here. If it can't
// be found, fall back to a short inline summary.
let body;
try {
  const skillMarkdown = fs.readFileSync(
    path.join(__dirname, '..', 'skills', 'codecraft', 'SKILL.md'), 'utf8'
  );
  // Drop the YAML frontmatter; only the guidance body is useful as context.
  body = skillMarkdown.replace(/^---[\s\S]*?---\s*/, '');
} catch {
  // Deliberately terse: a longer copy of the principles here would be a second
  // place to keep in sync with SKILL.md. This only runs if SKILL.md is missing.
  body = 'Apply the codecraft readability lens: make code read as if a thoughtful '
    + 'human wrote it, obvious over clever. (Full principles unavailable: SKILL.md '
    + 'was not found next to this hook.)';
}

process.stdout.write('CODECRAFT MODE ACTIVE\n\n' + body);
