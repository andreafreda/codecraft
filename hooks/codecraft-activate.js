#!/usr/bin/env node
// codecraft — SessionStart hook. Turns the readability lens on by default and
// injects the codecraft principles as hidden session context.
//
// State lives in ~/.claude/.codecraft-active as "on"/"off". A missing file
// means the user never toggled, which counts as on. A persisted "off" keeps it
// off across restarts until the user turns it back on.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { writeFlag, readFlag } = require('./codecraft-state');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.codecraft-active');

if (readFlag(flagPath) === 'off') {
  process.stdout.write('OK');
  process.exit(0);
}

writeFlag(flagPath, 'on');

// SKILL.md is the single source of truth for the principles. Read it live so
// edits to the skill propagate without duplicating the text here. If it can't
// be found, fall back to a short inline summary.
let body;
try {
  const skill = fs.readFileSync(
    path.join(__dirname, '..', 'skills', 'codecraft', 'SKILL.md'), 'utf8'
  );
  body = skill.replace(/^---[\s\S]*?---\s*/, '');
} catch (e) {
  body =
    'Make code read as if a thoughtful human engineer wrote it: plain, obvious, ' +
    'easy to follow. Obvious over clever. Name things fully. Guard clauses for ' +
    'edge cases. No premature abstraction. Document public contracts. Handle ' +
    'errors honestly. Keep side effects at the edges. Skip for trivial edits, ' +
    'hot-path perf, urgent hotfixes, and security review.';
}

process.stdout.write('CODECRAFT MODE ACTIVE\n\n' + body);
