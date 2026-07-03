#!/usr/bin/env node
// Run one benchmark cell: suite/task/target/arm.
//
// Generation goes through `claude -p` (headless, subscription auth, no API key)
// in an isolated CLAUDE_CONFIG_DIR that holds only the credentials, so none of
// the ambient plugins or hooks (codecraft, caveman) leak into the run. The only
// thing that differs between arms is the appended system prompt.
//
// Usage: node comparison/harness/run-cell.mjs <suite>/<task>/<target>/<arm>
// Writes comparison/results/<arm>/<suite>/<task>/<target>/{solution.<ext>,
// metrics.json} and ticks the cell in comparison/PLAN.md with its numbers.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, 'arms.json'), 'utf8'));

const cell = process.argv[2];
if (!cell) { console.error('usage: run-cell.mjs <suite>/<task>/<target>/<arm>'); process.exit(1); }
const [suite, task, target, arm] = cell.split('/');
const ext = cfg.ext[target];
const armCfg = cfg.arms[arm];
if (!ext || !armCfg) { console.error('unknown target or arm:', cell); process.exit(1); }

const promptPath = path.join(REPO, 'comparison/tasks', suite, task, target, `prompt.${ext}`);
const testsPath = path.join(REPO, 'comparison/tasks', suite, task, target, `tests.${ext}`);
const prompt = fs.readFileSync(promptPath, 'utf8');

function stripFrontmatter(text) { return text.replace(/^---[\s\S]*?---\s*/, ''); }

async function armSystem() {
  if (armCfg.systemFile) {
    let t = fs.readFileSync(path.join(REPO, armCfg.systemFile), 'utf8');
    return armCfg.stripFrontmatter ? stripFrontmatter(t) : t;
  }
  if (armCfg.systemUrl) {
    const res = await fetch(armCfg.systemUrl);
    let t = await res.text();
    return armCfg.stripFrontmatter ? stripFrontmatter(t) : t;
  }
  return armCfg.system || '';
}

// Use CLAUDE_CONFIG_DIR directly when it is a dedicated, plugin-free dir (it is
// already isolated). Otherwise copy only the credentials into a temp dir.
function resolveConfigDir() {
  const provided = process.env.CLAUDE_CONFIG_DIR;
  if (provided && fs.existsSync(path.join(provided, '.credentials.json'))) {
    return { dir: provided, temp: false };
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-harness-'));
  const creds = path.join(os.homedir(), '.claude', '.credentials.json');
  if (fs.existsSync(creds)) fs.copyFileSync(creds, path.join(dir, '.credentials.json'));
  return { dir, temp: true };
}

function modelLabel(model) {
  if (model.includes('haiku')) return 'haiku';
  if (model.includes('sonnet')) return 'sonnet';
  if (model.includes('opus')) return 'opus';
  return model;
}

function claudeRun(userPrompt, systemPrompt, configDir, model) {
  const args = ['-p', userPrompt, '--output-format', 'json', '--model', model];
  if (systemPrompt) args.push('--append-system-prompt', systemPrompt);
  const out = execFileSync('claude', args, {
    env: { ...process.env, CLAUDE_CONFIG_DIR: configDir },
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  const json = JSON.parse(out);
  const usage = json.usage || {};
  return {
    text: json.result ?? '',
    tokensIn: (usage.input_tokens || 0) + (usage.cache_read_input_tokens || 0) + (usage.cache_creation_input_tokens || 0),
    tokensOut: usage.output_tokens || 0,
  };
}

function extractCode(text) {
  const fence = text.match(/```[a-z]*\n([\s\S]*?)```/i);
  return (fence ? fence[1] : text).trim() + '\n';
}

function scoreSolution(file) {
  const out = execFileSync('node', [path.join(REPO, 'comparison/scoring/score.mjs'), file], { encoding: 'utf8' });
  return JSON.parse(out);
}

function updatePlan(cellId, label, pass, composite, tokens) {
  const planPath = path.join(REPO, 'comparison/PLAN.md');
  const marker = '`' + cellId + '`';
  const seg = ` — [${label}] pass: ${pass}, composite: ${composite}, tokens: ${tokens}`;
  const lines = fs.readFileSync(planPath, 'utf8').split('\n').map((line) => {
    if (!line.includes(marker)) return line;
    return line.replace('- [ ]', '- [x]').replace(new RegExp(` — \\[${label}\\][^—]*`), '') + seg;
  });
  fs.writeFileSync(planPath, lines.join('\n'));
}

const main = async () => {
  const model = process.argv[3] || cfg.model;
  const label = modelLabel(model);
  const system = await armSystem();
  const { dir: configDir, temp } = resolveConfigDir();
  const ask = `Complete the following ${target} code. Output only the complete code, no prose.\n\n${prompt}`;

  let gen = claudeRun(ask, system, configDir, model);
  let tokensIn = gen.tokensIn, tokensOut = gen.tokensOut;
  let code = extractCode(gen.text);

  if (armCfg.twoPass) {
    // Second pass: refine the just-written code with the arm's system prompt.
    const refineAsk = `Refine this ${target} code for readability without changing behavior. Output only the code.\n\n${code}`;
    const refined = claudeRun(refineAsk, system, configDir, model);
    tokensIn += refined.tokensIn; tokensOut += refined.tokensOut;
    code = extractCode(refined.text);
  }

  const outDir = path.join(REPO, 'comparison/results', label, arm, suite, task, target);
  fs.mkdirSync(outDir, { recursive: true });
  const solutionPath = path.join(outDir, `solution.${ext}`);
  fs.writeFileSync(solutionPath, code);

  const score = scoreSolution(solutionPath);

  // Correctness gate: implemented for Python; other runtimes are mounted per run.
  let pass = 'skipped';
  if (target === 'python') {
    const testsSrc = fs.readFileSync(testsPath, 'utf8');
    const entry = (testsSrc.match(/entry_point:\s*(\w+)/) || [])[1] || 'candidate';
    const runner = path.join(outDir, '_gate.py');
    fs.writeFileSync(runner, `${code}\n\n${testsSrc}\n\ncheck(${entry})\n`);
    try { execFileSync('python', [runner], { encoding: 'utf8' }); pass = 'yes'; }
    catch (e) { pass = 'no'; }
    fs.rmSync(runner, { force: true });
  }

  const metrics = {
    cell, arm, model, tokens_in: tokensIn, tokens_out: tokensOut,
    pass, composite: score.composite, raw: score.raw,
  };
  fs.writeFileSync(path.join(outDir, 'metrics.json'), JSON.stringify(metrics, null, 2));
  updatePlan(cell, label, pass, score.composite, tokensIn + tokensOut);
  if (temp) fs.rmSync(configDir, { recursive: true, force: true });

  console.log(JSON.stringify(metrics, null, 2));
};

main().catch((e) => { console.error('cell failed:', e.message); process.exit(1); });
