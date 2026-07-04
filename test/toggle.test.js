// Tests for requestedMode, the prompt-to-toggle parser in
// hooks/codecraft-mode-tracker.js. requestedMode expects a trimmed,
// lowercased prompt, which is how the hook calls it.

const test = require('node:test');
const assert = require('node:assert');

const { requestedMode } = require('../hooks/codecraft-mode-tracker');

const cases = [
  // Slash command.
  ['/codecraft', 'on'],
  ['/codecraft on', 'on'],
  ['/codecraft off', 'off'],
  ['/codecraft stop', 'off'],
  ['/codecraft disable', 'off'],
  ['/codecraft sideways', null],
  // Natural language, only when "codecraft" is named alongside intent.
  ['turn on codecraft', 'on'],
  ['please enable codecraft for this', 'on'],
  ['stop codecraft now', 'off'],
  ['can you disable codecraft', 'off'],
  // "codecraft off/on" and "codecraft mode on/off" phrasings.
  ['codecraft off', 'off'],
  ['codecraft mode on', 'on'],
  // No clear request.
  ['codecraft is a nice idea', null],
  ['write a function', null],
  ['turn off dark mode', null],
  // Ambiguous mentions: an intent word and "codecraft" both appear, but not in
  // a directive relationship, so the toggle must not flip.
  ['stop, codecraft is fine but change the naming', null],
  ['i like codecraft, but turn off the dark theme', null],
  ['codecraft, stop overthinking this function', null],
  ['should i enable telemetry? codecraft can wait', null],
  // Incidental mentions in longer prompts must not flip the global flag: on|off
  // as part of a noun phrase, a negated request, or a hyphenated compound.
  ['the old codecraft off switch was broken', null],
  ['codecraft on top of the existing setup', null],
  ['do not turn off codecraft', null],
  ["don't stop codecraft", null],
  ['enable codecraft-style linting', null],
];

for (const [prompt, expected] of cases) {
  test(`requestedMode(${JSON.stringify(prompt)}) is ${JSON.stringify(expected)}`, () => {
    assert.strictEqual(requestedMode(prompt), expected);
  });
}
