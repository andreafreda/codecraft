#!/usr/bin/env node
// Deterministic readability scorer (v0, heuristic, dependency-free).
//
// Usage: node score.mjs <solution-file> [rubric.json]
// Prints JSON: { file, raw, sub, composite } where composite is 0.00 to 10.00.
//
// This is an approximation: metrics are computed with light comment and string
// stripping plus language-agnostic heuristics, not a real parser. It is
// deterministic (same input, same output), which is what matters for a fair
// comparison; a tree-sitter version can replace the heuristics later.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];
const rubricPath = process.argv[3] || path.join(here, 'rubric.json');

if (!file) {
  console.error('usage: node score.mjs <solution-file> [rubric.json]');
  process.exit(1);
}

const rubric = JSON.parse(fs.readFileSync(rubricPath, 'utf8'));
const source = fs.readFileSync(file, 'utf8');

const clamp = (x) => Math.max(0, Math.min(10, x));
const round = (x, d = 2) => { const p = 10 ** d; return Math.round(x * p) / p; };

// Remove comments and string bodies so they do not inflate the metrics.
function stripCommentsAndStrings(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
    .replace(/#[^\n]*/g, ' ')
    .replace(/"(\\.|[^"\\])*"|'(\\.|[^'\\])*'|`(\\.|[^`\\])*`/g, '""');
}

const code = stripCommentsAndStrings(source);
const codeLines = code.split('\n').filter((line) => line.trim().length > 0);
const lineCount = Math.max(codeLines.length, 1);

// avg_line_length: measured on the original non-empty lines, for realistic width.
const originalLines = source.split('\n').filter((line) => line.trim().length > 0);
const avgLineLength = originalLines.reduce((sum, line) => sum + line.length, 0)
  / Math.max(originalLines.length, 1);

// max_nesting: brace depth where braces exist, otherwise indentation levels.
let maxNesting = 0;
if (/[{}]/.test(code)) {
  let depth = 0;
  for (const ch of code) {
    if (ch === '{') { depth += 1; maxNesting = Math.max(maxNesting, depth); }
    else if (ch === '}') { depth = Math.max(0, depth - 1); }
  }
} else {
  const indentUnit = 4;
  const indents = codeLines.map((line) =>
    line.match(/^[ \t]*/)[0].replace(/\t/g, '    ').length);
  maxNesting = Math.round(Math.max(0, ...indents) / indentUnit);
}

// cyclomatic_density: decision points per 10 code lines.
const decisions = (code.match(/\b(if|elif|for|while|case|catch|when)\b|&&|\|\||\?/g) || []).length;
const cyclomaticDensity = (decisions / lineCount) * 10;

// magic_number_density: numeric literals other than -1, 0, 1, 2, per 10 code lines.
const numbers = (code.match(/(?<![\w.])-?\d+(?:\.\d+)?/g) || [])
  .filter((n) => !['0', '1', '2', '-1'].includes(n));
const magicNumberDensity = (numbers.length / lineCount) * 10;

// single_char_ident_ratio: fraction of identifiers that are a single character.
const keywords = new Set(['if', 'else', 'elif', 'for', 'while', 'case', 'catch',
  'when', 'return', 'function', 'def', 'func', 'class', 'const', 'let', 'var',
  'public', 'private', 'protected', 'static', 'void', 'int', 'string', 'boolean',
  'bool', 'new', 'true', 'false', 'null', 'none', 'import', 'from', 'package',
  'type', 'interface', 'enum', 'in', 'of', 'is', 'and', 'or', 'not']);
const identifiers = (code.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) || [])
  .filter((word) => !keywords.has(word));
const singleCharIdentRatio = identifiers.length
  ? identifiers.filter((word) => word.length === 1).length / identifiers.length
  : 0;

const raw = {
  avg_line_length: round(avgLineLength),
  max_nesting: maxNesting,
  cyclomatic_density: round(cyclomaticDensity),
  magic_number_density: round(magicNumberDensity),
  single_char_ident_ratio: round(singleCharIdentRatio, 3),
};

// All metrics are "lower is better": 10 at good, 0 at bad, linear between.
function subScore(value, good, bad) {
  return clamp((10 * (bad - value)) / (bad - good));
}

const sub = {};
let weightedSum = 0;
let weightTotal = 0;
for (const [name, cfg] of Object.entries(rubric.metrics)) {
  const s = subScore(raw[name], cfg.good, cfg.bad);
  sub[name] = round(s);
  const weight = cfg.weight ?? 1;
  weightedSum += s * weight;
  weightTotal += weight;
}
const composite = round(weightedSum / weightTotal);

console.log(JSON.stringify({ file, raw, sub, composite }, null, 2));
