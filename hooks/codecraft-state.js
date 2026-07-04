#!/usr/bin/env node
// codecraft: persists the on/off state as a small flag file.
//
// The flag holds a non-secret "on"/"off" string in the user's own ~/.claude
// dir, so plain best-effort read/write is enough. A missing file means the
// user never toggled, which the hooks treat as on (active by default).

const fs = require('fs');
const path = require('path');
const os = require('os');

const VALID_MODES = ['off', 'on'];

// Location of the flag file, honoring CLAUDE_CONFIG_DIR so both hooks agree on
// where the state lives.
function getFlagPath() {
  const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
  return path.join(claudeDir, '.codecraft-active');
}

function writeFlag(flagPath, mode) {
  try {
    fs.mkdirSync(path.dirname(flagPath), { recursive: true });
    fs.writeFileSync(flagPath, String(mode), { mode: 0o600 });
  } catch {
    // Best-effort: if the write fails, the mode falls back to the default.
  }
}

function readFlag(flagPath) {
  try {
    const raw = fs.readFileSync(flagPath, 'utf8').trim().toLowerCase();
    return VALID_MODES.includes(raw) ? raw : null;
  } catch {
    return null;
  }
}

module.exports = { VALID_MODES, getFlagPath, writeFlag, readFlag };
