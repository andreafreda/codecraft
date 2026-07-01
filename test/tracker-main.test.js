// Black-box tests for the UserPromptSubmit hook's runtime path
// (hooks/codecraft-mode-tracker.js main()). Run the real script as a child
// process, feed it a prompt on stdin, and assert on the reminder it emits and
// the flag it writes. requestedMode itself is unit-tested in toggle.test.js.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('node:child_process');

const TRACKER = path.join(__dirname, '..', 'hooks', 'codecraft-mode-tracker.js');

function freshConfigDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'codecraft-cfg-'));
}

function runTracker(configDir, prompt) {
  const stdout = execFileSync('node', [TRACKER], {
    env: { ...process.env, CLAUDE_CONFIG_DIR: configDir },
    input: JSON.stringify({ prompt }),
    encoding: 'utf8',
  });
  const flagPath = path.join(configDir, '.codecraft-active');
  const flag = fs.existsSync(flagPath)
    ? fs.readFileSync(flagPath, 'utf8').trim()
    : null;
  return { stdout, flag };
}

test('a normal prompt emits the reminder by default (no flag = active)', () => {
  const { stdout } = runTracker(freshConfigDir(), 'write a function');
  assert.match(stdout, /CODECRAFT MODE ACTIVE/);
});

test('/codecraft off writes off and suppresses the reminder', () => {
  const { stdout, flag } = runTracker(freshConfigDir(), '/codecraft off');
  assert.strictEqual(stdout.trim(), '');
  assert.strictEqual(flag, 'off');
});

test('a normal prompt stays silent once the flag is off', () => {
  const configDir = freshConfigDir();
  fs.writeFileSync(path.join(configDir, '.codecraft-active'), 'off');
  const { stdout } = runTracker(configDir, 'refactor this module');
  assert.strictEqual(stdout.trim(), '');
});

test('/codecraft on writes on and emits the reminder', () => {
  const configDir = freshConfigDir();
  fs.writeFileSync(path.join(configDir, '.codecraft-active'), 'off');
  const { stdout, flag } = runTracker(configDir, '/codecraft on');
  assert.match(stdout, /CODECRAFT MODE ACTIVE/);
  assert.strictEqual(flag, 'on');
});
