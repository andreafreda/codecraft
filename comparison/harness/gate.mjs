// Correctness gate: assemble the model's solution with the benchmark's hidden
// tests into one runnable program and run it. Returns 'yes' (tests passed),
// 'no' (compiled/ran but a test failed), or 'skipped' (no runtime wired for this
// target). This is objective execution, not a quality judgement.
//
// The tests are MultiPL-E / HumanEval fixtures. Their shape differs by language:
//   - python: tests define `check(candidate)`; we append `check(<entry_point>)`.
//   - js/ts:  tests are a standalone driver ending in `test()` that references
//             the function by name; we just concatenate solution + tests.
// A non-zero exit code means a failed assertion or a crash: gate 'no'.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';

function runProgram(source, ext, cmd, args) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ccbench-gate-'));
  const file = path.join(dir, `g.${ext}`);
  fs.writeFileSync(file, source);
  try {
    execFileSync(cmd, [...args, file], { stdio: 'ignore' });
    return 'yes';
  } catch {
    return 'no';
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// target -> how to assemble the runnable program and how to run it. Languages
// without an entry here fall through to 'skipped'.
const GATES = {
  python(code, tests) {
    const entry = (tests.match(/entry_point:\s*(\w+)/) || [])[1] || 'candidate';
    return runProgram(`${code}\n\n${tests}\n\ncheck(${entry})\n`, 'py', 'python', []);
  },
  javascript(code, tests) {
    return runProgram(`${code}\n${tests}\n`, 'js', 'node', []);
  },
  typescript(code, tests) {
    return runProgram(`${code}\n${tests}\n`, 'ts', 'node', ['--experimental-strip-types']);
  },
};

export function runGate(target, code, tests) {
  const gate = GATES[target];
  return gate ? gate(code, tests) : 'skipped';
}
