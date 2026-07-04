// Unit tests for the pure string transforms in comparison/harness/gate.mjs.
// These carry the gate's trickiest assumptions (balanced-paren rewriting,
// scaffold and import reconstruction), so they are worth pinning down in
// isolation, apart from the language runtimes they normally feed.

import test from 'node:test';
import assert from 'node:assert';

import {
  gateError,
  nodeSupportsStripTypes,
  injectMain,
  promptPreamble,
  ensureGoScaffold,
  ensureClassScaffold,
  ensureGoImports,
  valueEqualize,
} from '../comparison/harness/gate.mjs';

test('gateError maps a missing runtime to skipped, everything else to no', () => {
  assert.strictEqual(gateError({ code: 'ENOENT' }), 'skipped');
  assert.strictEqual(gateError({ code: 'ETIMEDOUT' }), 'no');
  assert.strictEqual(gateError(new Error('assertion failed')), 'no');
});

test('nodeSupportsStripTypes is true on the runner (Node >= 22.6)', () => {
  // The suite itself requires a modern Node; this guards the version math.
  assert.strictEqual(typeof nodeSupportsStripTypes(), 'boolean');
  const [major] = process.versions.node.split('.').map(Number);
  if (major >= 23) assert.strictEqual(nodeSupportsStripTypes(), true);
});

test('promptPreamble drops the prompt signature (its last non-empty line)', () => {
  assert.strictEqual(promptPreamble('line1\nline2\nsig\n'), 'line1\nline2');
});

test('ensureGoScaffold splices the prompt preamble only when package is missing', () => {
  const prompt = 'package cyc_test\n\nimport (\n\t"testing"\n)\n\nfunc f() {\n';
  const bodyOnly = 'func f() { return }';
  assert.match(ensureGoScaffold(bodyOnly, prompt), /^package cyc_test/);
  const withPkg = 'package cyc_test\nfunc f() { return }';
  assert.strictEqual(ensureGoScaffold(withPkg, prompt), withPkg);
});

test('ensureClassScaffold wraps a bare method and closes the class', () => {
  const prompt = 'import java.util.*;\nclass Problem {\n    public static int f(int x) {\n';
  const method = 'public static int f(int x) { return x; }';
  const wrapped = ensureClassScaffold(method, prompt);
  assert.match(wrapped, /class Problem \{/);
  assert.ok(wrapped.trimEnd().endsWith('}'));
  const withClass = 'class Problem { public static int f(int x){ return x; } }';
  assert.strictEqual(ensureClassScaffold(withClass, prompt), withClass);
});

test('injectMain places the test main before the class closing brace', () => {
  const solution = 'class Problem {\n  static int f() { return 1; }\n}';
  const tests = '    }\n    public static void main(String[] a) { assert(f()==1); }\n\n}';
  const out = injectMain(solution, tests);
  assert.match(out, /static int f\(\) \{ return 1; \}/);
  assert.match(out, /public static void main/);
  assert.ok(out.trimEnd().endsWith('}'));
});

test('ensureGoImports guarantees testing and fmt for the tests', () => {
  const src = 'package p\n\nimport (\n)\n\nfunc f() {}\n';
  const out = ensureGoImports(src);
  assert.match(out, /"testing"/);
  assert.match(out, /"fmt"/);
});

test('ensureGoImports adds a stdlib package the code references but did not import', () => {
  const src = 'package p\n\nimport (\n\t"testing"\n\t"fmt"\n)\n\nfunc f(s string) bool { return strings.Contains(s, "x") }\n';
  const out = ensureGoImports(src);
  assert.match(out, /"strings"/);
});

test('ensureGoImports does not duplicate an import already present', () => {
  const src = 'package p\n\nimport (\n\t"testing"\n\t"fmt"\n\t"strings"\n)\n\nfunc f() { strings.Trim("a", "b") }\n';
  const out = ensureGoImports(src);
  assert.strictEqual(out.match(/"strings"/g).length, 1);
});

test('valueEqualize rewrites x.Equals(y) to VEq(x, y) across balanced parens', () => {
  const input = 'Debug.Assert(SortThird((new List<long>(new long[]{1L}))).Equals((new List<long>(new long[]{1L}))));';
  const out = valueEqualize(input);
  assert.match(out, /VEq\(SortThird\(\(new List<long>\(new long\[\]\{1L\}\)\)\), \(new List<long>\(new long\[\]\{1L\}\)\)\)/);
  assert.doesNotMatch(out, /\.Equals\(/);
});

test('valueEqualize leaves text without .Equals untouched', () => {
  const input = 'Debug.Assert(F(1) == 2);';
  assert.strictEqual(valueEqualize(input), input);
});
