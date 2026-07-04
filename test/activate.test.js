// Black-box tests for the SessionStart hook (hooks/codecraft-activate.js).
// The hook is a side-effecting script, so we run the real file as a child
// process with an isolated CLAUDE_CONFIG_DIR and assert on its stdout and the
// flag file it writes.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ACTIVATE = path.join(__dirname, '..', 'hooks', 'codecraft-activate.js');

function freshConfigDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'codecraft-cfg-'));
}

function runActivate(scriptPath, configDir) {
  const stdout = execFileSync('node', [scriptPath], {
    env: { ...process.env, CLAUDE_CONFIG_DIR: configDir },
    input: '{}',
    encoding: 'utf8',
  });
  const flagPath = path.join(configDir, '.codecraft-active');
  const flag = fs.existsSync(flagPath)
    ? fs.readFileSync(flagPath, 'utf8').trim()
    : null;
  return { stdout, flag };
}

test('activate injects the lens and turns the flag on by default', () => {
  const { stdout, flag } = runActivate(ACTIVATE, freshConfigDir());
  assert.match(stdout, /^CODECRAFT MODE ACTIVE/);
  assert.strictEqual(flag, 'on');
});

test('activate strips the SKILL.md frontmatter from the injected body', () => {
  const { stdout } = runActivate(ACTIVATE, freshConfigDir());
  assert.doesNotMatch(stdout, /name:\s*codecraft/); // frontmatter removed
  assert.match(stdout, /#\s*codecraft/);            // body heading present
});

test('activate short-circuits to OK when the flag is off, and stays off', () => {
  const configDir = freshConfigDir();
  fs.writeFileSync(path.join(configDir, '.codecraft-active'), 'off');
  const { stdout, flag } = runActivate(ACTIVATE, configDir);
  assert.strictEqual(stdout.trim(), 'OK');
  assert.doesNotMatch(stdout, /MODE ACTIVE/);
  assert.strictEqual(flag, 'off');
});

test('activate falls back to an inline summary when SKILL.md is missing', () => {
  // Copy the hooks into a bare tree with no skills/ folder, so the SKILL.md
  // read fails and the inline fallback runs.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'codecraft-root-'));
  const hooksDir = path.join(root, 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  for (const file of ['codecraft-activate.js', 'codecraft-state.js']) {
    fs.copyFileSync(path.join(__dirname, '..', 'hooks', file), path.join(hooksDir, file));
  }

  const { stdout } = runActivate(path.join(hooksDir, 'codecraft-activate.js'), freshConfigDir());
  assert.match(stdout, /^CODECRAFT MODE ACTIVE/);
  assert.match(stdout, /obvious over clever/i); // inline fallback text, not SKILL.md
});
