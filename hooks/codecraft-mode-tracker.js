#!/usr/bin/env node
// codecraft — UserPromptSubmit hook. Handles the on/off toggle and re-injects a
// short reminder each turn so the lens survives long sessions and context
// compaction instead of drifting away mid-conversation.

const { getFlagPath, writeFlag, readFlag } = require('./codecraft-state');

const flagPath = getFlagPath();

const REMINDER =
  'CODECRAFT MODE ACTIVE. When writing, implementing, or refactoring code, or ' +
  'reviewing a diff: obvious over clever, name things fully, guard clauses, no ' +
  'premature abstraction, document public contracts, handle errors honestly, ' +
  'keep side effects at the edges. Skip for trivial edits, hot-path perf, urgent ' +
  'hotfixes, and security review.';

// Maps a prompt to the mode it explicitly requests, or null if it asks for
// neither. Covers the "/codecraft [on|off]" command and natural language such
// as "turn off codecraft".
function requestedMode(prompt) {
  if (prompt.startsWith('/codecraft')) {
    const arg = prompt.split(/\s+/)[1] || 'on';
    if (arg === 'off' || arg === 'stop' || arg === 'disable') return 'off';
    if (arg === 'on') return 'on';
    return null;
  }
  if (/\bcodecraft\b/.test(prompt)) {
    if (/\b(stop|disable|deactivate|turn off)\b/.test(prompt)) return 'off';
    if (/\b(activate|enable|turn on|start)\b/.test(prompt)) return 'on';
  }
  return null;
}

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

    // Reinforce every turn unless the user has turned it off.
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
