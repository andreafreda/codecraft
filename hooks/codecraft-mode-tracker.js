#!/usr/bin/env node
// codecraft — UserPromptSubmit hook. Handles the on/off toggle and keeps the
// lens salient each turn with a minimal reminder.
//
// The full principles are injected once by the SessionStart hook, and again
// after each compaction (SessionStart fires with source "compact"). So this
// per-turn note only has to carry salience, not restate the content, which
// keeps its accumulated context cost small over a long session.

const { getFlagPath, writeFlag, readFlag } = require('./codecraft-state');

const REMINDER =
  'CODECRAFT MODE ACTIVE — apply the codecraft readability lens to any code you ' +
  'write or review this turn.';

// Maps a prompt to the mode it explicitly requests, or null if it asks for
// neither. Covers the "/codecraft [on|off]" command and natural language such
// as "turn off codecraft". The prompt is expected already trimmed and lowercased.
//
// The natural-language patterns require the intent word to sit right next to
// "codecraft" (as a verb before it, or "codecraft [mode] on|off" after it), so
// a passing mention like "stop, codecraft is fine but..." does not flip the
// toggle.
function requestedMode(prompt) {
  if (prompt.startsWith('/codecraft')) {
    const arg = prompt.split(/\s+/)[1] || 'on';
    if (arg === 'off' || arg === 'stop' || arg === 'disable') return 'off';
    if (arg === 'on') return 'on';
    return null;
  }

  const off = /\b(turn off|stop|disable|deactivate)\s+(the\s+)?codecraft\b|\bcodecraft(\s+mode)?\s+(off|stop|disabled?)\b/;
  const on = /\b(turn on|enable|activate|start)\s+(the\s+)?codecraft\b|\bcodecraft(\s+mode)?\s+(on|enabled?)\b/;
  if (off.test(prompt)) return 'off';
  if (on.test(prompt)) return 'on';
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
    } catch (e) {
      // Silent fail — a dropped reminder is harmless.
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = { requestedMode };
