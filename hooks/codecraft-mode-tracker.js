#!/usr/bin/env node
// codecraft — UserPromptSubmit hook. Handles the on/off toggle and re-injects a
// short reminder each turn so the lens survives long sessions and context
// compaction instead of drifting away mid-conversation.

const path = require('path');
const os = require('os');
const { writeFlag, readFlag } = require('./codecraft-state');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.codecraft-active');

const REMINDER =
  'CODECRAFT MODE ACTIVE. When writing, implementing, or refactoring code, or ' +
  'reviewing a diff: obvious over clever, name things fully, guard clauses, no ' +
  'premature abstraction, document public contracts, handle errors honestly, ' +
  'keep side effects at the edges. Skip for trivial edits, hot-path perf, urgent ' +
  'hotfixes, and security review.';

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Explicit toggle: "/codecraft [on|off]". Bare "/codecraft" means on.
    if (prompt.startsWith('/codecraft')) {
      const arg = prompt.split(/\s+/)[1] || 'on';
      if (arg === 'off' || arg === 'stop' || arg === 'disable') {
        writeFlag(flagPath, 'off');
      } else if (arg === 'on') {
        writeFlag(flagPath, 'on');
      }
    // Natural language toggle: only acts when "codecraft" is named alongside intent.
    } else if (/\bcodecraft\b/.test(prompt)) {
      if (/\b(stop|disable|deactivate|turn off)\b/.test(prompt)) {
        writeFlag(flagPath, 'off');
      } else if (/\b(activate|enable|turn on|start)\b/.test(prompt)) {
        writeFlag(flagPath, 'on');
      }
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
