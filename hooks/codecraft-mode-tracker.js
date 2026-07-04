#!/usr/bin/env node
// codecraft: UserPromptSubmit hook. Handles the on/off toggle and keeps the
// lens salient each turn with a minimal reminder.
//
// The full principles are injected once by the SessionStart hook, and again
// after each compaction (SessionStart fires with source "compact"). So this
// per-turn note only has to carry salience, not restate the content, which
// keeps its accumulated context cost small over a long session.

const { getFlagPath, writeFlag, readFlag } = require('./codecraft-state');

const REMINDER =
  'CODECRAFT MODE ACTIVE: apply the codecraft readability lens to any code you ' +
  'write or review this turn.';

// Maps a prompt to the mode it explicitly requests, or null if it asks for
// neither. Covers the "/codecraft [on|off]" command and natural language such
// as "turn off codecraft". An unrecognized "/codecraft" argument is a no-op
// (null). The prompt is expected already trimmed and lowercased.
//
// A toggle flips a persistent, global flag, so the natural-language patterns are
// deliberately conservative to avoid flipping it on an incidental mention. Three
// guards: a negator anywhere ("do not turn off codecraft") is a no-op; the
// "codecraft [mode] on|off" phrasing only counts with on|off at the end, so
// "codecraft off switch" and "codecraft on top of the setup" do not match; and
// "codecraft" must not be part of a hyphenated compound ("codecraft-style").
function requestedMode(prompt) {
  const text = prompt.trim();

  if (text === '/codecraft' || text.startsWith('/codecraft ')) {
    const arg = text.split(/\s+/)[1] || 'on';
    if (arg === 'off' || arg === 'stop' || arg === 'disable') return 'off';
    if (arg === 'on') return 'on';
    return null;
  }

  // A negated request never flips the flag ("do not turn off codecraft").
  if (/\b(do not|don'?t|never|without|cannot|can'?t|won'?t)\b/i.test(text)) return null;

  // Two shapes count as a toggle, split out so each pattern stays simple. A verb
  // directing codecraft ("turn off codecraft", "stop codecraft now"), with
  // "codecraft" whole so the compound "codecraft-style" does not count; or
  // "codecraft [mode] on|off" as the trailing command, anchored at the end so
  // "codecraft off switch" and "codecraft on top of the setup" do not match.
  const verbOff = /\b(turn off|stop|disable|deactivate)\s+(the\s+)?codecraft\b(?!-)/i;
  const verbOn = /\b(turn on|enable|activate|start)\s+(the\s+)?codecraft\b(?!-)/i;
  const tailOff = /\bcodecraft(\s+mode)?\s+(off|stop|disabled?)[.!]?$/i;
  const tailOn = /\bcodecraft(\s+mode)?\s+(on|enabled?)[.!]?$/i;

  if (verbOff.test(text) || tailOff.test(text)) return 'off';
  if (verbOn.test(text) || tailOn.test(text)) return 'on';
  return null;
}

// Read the prompt from stdin, apply any toggle it requests, and reinforce the
// lens for the turn unless the user has turned it off.
function main() {
  const flagPath = getFlagPath();
  let input = '';
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    try {
      const data = JSON.parse(input);
      const prompt = (data.prompt || '').trim().toLowerCase();

      const mode = requestedMode(prompt);
      if (mode) {
        writeFlag(flagPath, mode);
      }

      if (readFlag(flagPath) !== 'off') {
        process.stdout.write(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: 'UserPromptSubmit',
            additionalContext: REMINDER
          }
        }));
      }
    } catch {
      // Silent fail: a dropped reminder is harmless.
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = { requestedMode };
