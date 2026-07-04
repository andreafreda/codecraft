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

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const JAVATUPLES = path.join(HERE, 'lib', 'javatuples-1.2.jar');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'ccbench-gate-'));
}

// A generated solution can loop forever, so every gate run is bounded; a
// missing runtime is an infrastructure gap, not a wrong answer, so it is
// reported as 'skipped' rather than a false 'no'. Everything else (a failed
// assertion, a compile error, a timeout) is a genuine 'no'.
const GATE_TIMEOUT_MS = 60000;
const EXEC_OPTS = { stdio: 'ignore', timeout: GATE_TIMEOUT_MS, killSignal: 'SIGKILL' };

function gateError(err) {
  return err.code === 'ENOENT' ? 'skipped' : 'no';
}

function nodeSupportsStripTypes() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  return major > 22 || (major === 22 && minor >= 6);
}

function runProgram(source, ext, cmd, args) {
  const dir = tmpDir();
  const file = path.join(dir, `g.${ext}`);
  fs.writeFileSync(file, source);
  try {
    execFileSync(cmd, [...args, file], EXEC_OPTS);
    return 'yes';
  } catch (err) {
    return gateError(err);
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

// Go: the prompt is a `_test` package with the function; the tests file adds a
// `TestX` that calls it and `t.Errorf`s on mismatch. Concatenate into one
// `_test.go` in a throwaway module and run `go test`. The `go` binary is taken
// from PATH (override with CCBENCH_GO), so this returns 'skipped' if go is absent.
function runGo(code, tests, prompt) {
  code = ensureGoScaffold(code, prompt);
  const go = process.env.CCBENCH_GO || 'go';
  const dir = tmpDir();
  fs.writeFileSync(path.join(dir, 'go.mod'), 'module gate\n\ngo 1.21\n');
  fs.writeFileSync(path.join(dir, 'sol_test.go'), ensureGoImports(`${code}\n${tests}\n`));
  try {
    execFileSync(go, ['test', './...'], { cwd: dir, ...EXEC_OPTS });
    return 'yes';
  } catch (e) {
    return gateError(e);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// C#: the fixtures compare returned values with `List<T>.Equals`, which is
// reference equality in .NET, so a correct collection-returning solution would
// fail. Rewrite each `<A>.Equals(<B>)` into `VEq(<A>, <B>)` (a JSON value
// compare injected below), walking balanced parens to split receiver A from
// argument B. Scalars serialize to themselves, so this stays correct for the
// non-collection tasks too.
function valueEqualize(tests) {
  let out = '', i = 0;
  const NEEDLE = '.Equals(';
  while (i < tests.length) {
    const idx = tests.indexOf(NEEDLE, i);
    if (idx === -1) { out += tests.slice(i); break; }
    let j = idx - 1, depth = 0, start = idx;
    while (j >= 0) {
      const c = tests[j];
      if (c === ')') depth++;
      else if (c === '(') {
        if (depth === 0) break;
        depth--;
      }
      else if (depth === 0 && !/[A-Za-z0-9_.[\]<>]/.test(c)) break;
      j--; start = j + 1;
    }
    const A = tests.slice(start, idx);
    let k = idx + NEEDLE.length, d = 1;
    const bStart = k;
    while (k < tests.length && d > 0) {
      if (tests[k] === '(') d++;
      else if (tests[k] === ')') { d--; if (d === 0) break; }
      k++;
    }
    const B = tests.slice(bStart, k);
    out += `${tests.slice(i, start)}VEq(${A}, ${B})`;
    i = k + 1;
  }
  return out;
}

const CSPROJ = '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup>'
  + '<OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework>'
  + '<Nullable>disable</Nullable><ImplicitUsings>disable</ImplicitUsings>'
  + '<DefineConstants>DEBUG</DefineConstants></PropertyGroup></Project>';

const VEQ = 'static bool VEq(object a, object b){ return '
  + 'System.Text.Json.JsonSerializer.Serialize(a)=='
  + 'System.Text.Json.JsonSerializer.Serialize(b); }';

// The name-constrained prompt sometimes makes the model return only the
// function/method, dropping the scaffolding the prompt showed (Go's `package`
// and imports, Java/C#'s class + imports). The prompt always ends with the
// signature line, so its preamble is the prompt minus that last line. If the
// solution is missing the scaffold keyword, splice the preamble back on so the
// program compiles, this is reconstruction, not correction of the logic.
function promptPreamble(prompt) {
  const lines = prompt.replace(/\s+$/, '').split('\n');
  lines.pop();
  return lines.join('\n');
}

function ensureGoScaffold(code, prompt) {
  return /^\s*package\s/m.test(code) ? code : `${promptPreamble(prompt)}\n${code}`;
}

// The go tests always use `testing` and `fmt`, but the model may drop those
// imports because its own function does not use them and go forbids unused
// imports. Guarantee they are in the combined program's import block so the
// tests compile, this fixes the harness's own unfairness, not the logic.
function ensureGoImports(src) {
  // Always needed by the tests; plus any stdlib package the code clearly
  // references but forgot to import (go forbids unused imports, so the model
  // sometimes ships the usage without the import). This adds only imports whose
  // `pkg.` usage is present in the source: reconstruction, not logic change.
  const need = ['"testing"', '"fmt"'];
  const stdlib = ['strings', 'sort', 'math', 'strconv', 'unicode', 'regexp', 'bytes', 'errors'];
  for (const pkg of stdlib) {
    if (new RegExp(String.raw`\b${pkg}\.`).test(src) && !new RegExp(`"${pkg}"`).test(src)) {
      need.push(`"${pkg}"`);
    }
  }
  const block = src.match(/import\s*\(([\s\S]*?)\)/);
  if (block) {
    let body = block[1];
    for (const imp of need) if (!body.includes(imp)) body += `\n\t${imp}`;
    return src.replace(block[0], `import (${body}\n)`);
  }
  const single = src.match(/import\s+("[^"]+")/);
  if (single) {
    const all = [single[1], ...need.filter((n) => n !== single[1])];
    return src.replace(single[0], `import (\n\t${all.join('\n\t')}\n)`);
  }
  return src.replace(/^(package[^\n]*\n)/m, `$1import (\n\t${need.join('\n\t')}\n)\n`);
}

function ensureClassScaffold(code, prompt) {
  return /\bclass\s/.test(code) ? code : `${promptPreamble(prompt)}\n${code}\n}\n`;
}

function runCs(code, tests, prompt) {
  code = ensureClassScaffold(code, prompt);
  const dotnet = process.env.CCBENCH_DOTNET || 'dotnet';
  const transformed = valueEqualize(tests);
  const mainBlock = transformed.slice(transformed.indexOf('}') + 1, transformed.lastIndexOf('}'));
  const program = `${code.slice(0, code.lastIndexOf('}'))}\n${mainBlock}\n${VEQ}\n}\n`;
  const dir = tmpDir();
  fs.writeFileSync(path.join(dir, 'proj.csproj'), CSPROJ);
  fs.writeFileSync(path.join(dir, 'Program.cs'), program);
  try {
    execFileSync(dotnet, ['run', '-c', 'Debug'], { cwd: dir, ...EXEC_OPTS });
    return 'yes';
  } catch (e) {
    return gateError(e);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function runJava(code, tests, prompt) {
  code = ensureClassScaffold(code, prompt);
  const dir = tmpDir();
  const src = path.join(dir, 'Problem.java');
  fs.writeFileSync(src, injectMain(code, tests));
  const cp = `.${path.delimiter}${JAVATUPLES}`;
  try {
    execFileSync('javac', ['-cp', JAVATUPLES, src], { cwd: dir, ...EXEC_OPTS });
    execFileSync('java', ['-ea', '-cp', cp, 'Problem'], { cwd: dir, ...EXEC_OPTS });
    return 'yes';
  } catch (e) {
    return gateError(e);
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
    // Type stripping (`node --experimental-strip-types`) needs Node >= 22.6;
    // on older Node the flag is rejected and the cell would look like a failed
    // solution, so skip rather than record a false 'no'.
    if (!nodeSupportsStripTypes()) return 'skipped';
    return runProgram(`${code}\n${tests}\n`, 'ts', 'node', ['--experimental-strip-types']);
  },
  java(code, tests, prompt) {
    return runJava(code, tests, prompt);
  },
  go(code, tests, prompt) {
    return runGo(code, tests, prompt);
  },
  csharp(code, tests, prompt) {
    return runCs(code, tests, prompt);
  },
};

export function runGate(target, code, tests, prompt) {
  const gate = GATES[target];
  return gate ? gate(code, tests, prompt) : 'skipped';
}

// Exported for unit tests: the pure string transforms and helpers, which carry
// the trickiest assumptions in the gate (see harness.test.mjs).
export {
  gateError,
  nodeSupportsStripTypes,
  injectMain,
  promptPreamble,
  ensureGoScaffold,
  ensureClassScaffold,
  ensureGoImports,
  valueEqualize,
};
