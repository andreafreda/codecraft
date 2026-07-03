// Correctness gate: assemble the model's solution with the benchmark's hidden
// tests into one runnable program and run it. Returns 'yes' (tests passed),
// 'no' (compiled/ran but a test failed), or 'skipped' (no runtime wired for this
// target). This is objective execution, not a quality judgement.
//
// The tests are MultiPL-E / HumanEval fixtures. Their shape differs by language:
//   - python: tests define `check(candidate)`; we append `check(<entry_point>)`.
//   - js/ts:  tests are a standalone driver ending in `test()` that references
//             the function by name; we just concatenate solution + tests.
//   - java:   tests are a fragment (`}` closing the method, a `main` with the
//             asserts, then `}` closing the class). We inject that `main` into
//             the solution's class and run with assertions on (`-ea`). The
//             prompt boilerplate imports `org.javatuples`, so that jar is on the
//             classpath (harness/lib).
// A non-zero exit code means a failed assertion or a crash: gate 'no'.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const JAVATUPLES = path.join(HERE, 'lib', 'javatuples-1.2.jar');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ccbench-gate-'));
}

function runProgram(source, ext, cmd, args) {
  const dir = tmpDir();
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

// The `main` (with the asserts) lives in the tests fragment between its first
// `}` (closes the solution method) and its last `}` (closes the class). Inject
// it into the solution's class, just before that class's final `}`.
function injectMain(solution, tests) {
  const mainBlock = tests.slice(tests.indexOf('}') + 1, tests.lastIndexOf('}'));
  return `${solution.slice(0, solution.lastIndexOf('}'))}\n${mainBlock}\n}\n`;
}

function runJava(code, tests) {
  const dir = tmpDir();
  const src = path.join(dir, 'Problem.java');
  fs.writeFileSync(src, injectMain(code, tests));
  const cp = `.${path.delimiter}${JAVATUPLES}`;
  try {
    execFileSync('javac', ['-cp', JAVATUPLES, src], { cwd: dir, stdio: 'ignore' });
    execFileSync('java', ['-ea', '-cp', cp, 'Problem'], { cwd: dir, stdio: 'ignore' });
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
  java(code, tests) {
    return runJava(code, tests);
  },
};

export function runGate(target, code, tests) {
  const gate = GATES[target];
  return gate ? gate(code, tests) : 'skipped';
}
