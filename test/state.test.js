// Tests for the flag persistence in hooks/codecraft-state.js.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { writeFlag, readFlag, getFlagPath } = require('../hooks/codecraft-state');

// A fresh flag path inside a throwaway temp dir, so tests never touch ~/.claude.
function freshFlagPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codecraft-'));
  return path.join(dir, '.codecraft-active');
}

test('writeFlag then readFlag round-trips a valid mode', () => {
  const flagPath = freshFlagPath();
  writeFlag(flagPath, 'off');
  assert.strictEqual(readFlag(flagPath), 'off');
});

test('writeFlag creates missing parent directories', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'codecraft-'));
  const flagPath = path.join(dir, 'nested', 'deeper', '.codecraft-active');
  writeFlag(flagPath, 'on');
  assert.strictEqual(readFlag(flagPath), 'on');
});

test('readFlag returns null when the file is missing', () => {
  assert.strictEqual(readFlag(freshFlagPath()), null);
});

test('readFlag rejects a value outside the known modes', () => {
  const flagPath = freshFlagPath();
  fs.writeFileSync(flagPath, 'maybe');
  assert.strictEqual(readFlag(flagPath), null);
});

test('readFlag trims surrounding whitespace and lowercases', () => {
  const flagPath = freshFlagPath();
  fs.writeFileSync(flagPath, '  ON\n');
  assert.strictEqual(readFlag(flagPath), 'on');
});

test('getFlagPath honors CLAUDE_CONFIG_DIR', () => {
  const previous = process.env.CLAUDE_CONFIG_DIR;
  const configDir = path.join(os.tmpdir(), 'codecraft-cfg');
  process.env.CLAUDE_CONFIG_DIR = configDir;
  try {
    assert.strictEqual(getFlagPath(), path.join(configDir, '.codecraft-active'));
  } finally {
    if (previous === undefined) {
      delete process.env.CLAUDE_CONFIG_DIR;
    } else {
      process.env.CLAUDE_CONFIG_DIR = previous;
    }
  }
});
