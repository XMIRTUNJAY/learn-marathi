// Syncs Bol Marathi app content into this site's static data.
// Source of truth: <repo>/../bol_marathi (sibling of `blog/`):
//   content/units/*.json + lib/content/generated_vocab.dart
// Output: src/data/learn/{units,vocab,meta}.json (committed snapshots)
// Run: node ./tools/sync-learn-marathi.mjs  (or: npm run sync)
// Zero npm dependencies — plain Node 22+.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(here, '..');
// blog/learn-marathi → blog/ → bol_marathi
const appDir = process.env.BOL_MARATHI_ROOT ?? join(dirname(siteRoot), '..', 'bol_marathi');
const unitsDir = join(appDir, 'content', 'units');
const vocabFile = join(appDir, 'lib', 'content', 'generated_vocab.dart');
const outDir = join(siteRoot, 'src', 'data', 'learn');

const REQUIRED_TOP = ['unit', 'title', 'titleEn', 'subtitle', 'subtitleEn', 'intro', 'goals', 'goalsEn', 'lessons', 'vocabGroups', 'grammar', 'cultural', 'speaking', 'listening', 'bridge', 'sentenceBuilder'];

function fail(msg) {
  console.error(`sync-learn-marathi: ERROR: ${msg}`);
  process.exit(1);
}

function parseVocabDart(src) {
  const blocks = src.match(/\{[^{}]*?'id':\s*'v-[^']+'[^{}]*?\}/gs) ?? [];
  const field = (block, key) => {
    const m = block.match(new RegExp(`'${key}':\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's'));
    return m ? m[1].replace(/\\'/g, "'") : '';
  };
  return blocks.map((b) => ({
    id: field(b, 'id'),
    marathi: field(b, 'marathi'),
    hindi: field(b, 'hindi'),
    english: field(b, 'english'),
    transliteration: field(b, 'transliteration'),
    category: field(b, 'category'),
    exampleMarathi: field(b, 'exampleMarathi'),
    exampleHindi: field(b, 'exampleHindi'),
    exampleEnglish: field(b, 'exampleEnglish'),
  }));
}

let unitFiles;
try {
  unitFiles = readdirSync(unitsDir).filter((f) => /^unit_\d+\.json$/.test(f)).sort();
} catch {
  fail(`cannot read units dir: ${unitsDir} (set BOL_MARATHI_ROOT)`);
}
if (unitFiles.length === 0) fail(`no unit JSON found in ${unitsDir}`);

const units = unitFiles.map((f) => {
  const json = JSON.parse(readFileSync(join(unitsDir, f), 'utf8'));
  for (const k of REQUIRED_TOP) if (!(k in json)) fail(`${f} missing key: ${k}`);
  for (const section of ['grammar', 'cultural', 'speaking', 'listening', 'bridge', 'sentenceBuilder']) {
    if (!Array.isArray(json[section]) || json[section].length !== 6) fail(`${f} section ${section} must have 6 rows`);
  }
  return json;
});

let dartSrc;
try {
  dartSrc = readFileSync(vocabFile, 'utf8');
} catch {
  fail(`cannot read vocab file: ${vocabFile}`);
}
const vocab = parseVocabDart(dartSrc);
if (vocab.length === 0) fail(`no vocab parsed from ${vocabFile}`);
const bad = vocab.filter((v) => !v.marathi || !v.hindi || !v.english || !v.category);
if (bad.length > 0) fail(`${bad.length} vocab entries missing required fields (e.g. ${bad[0].id})`);

const byCategory = {};
for (const v of vocab) (byCategory[v.category] ??= []).push(v.id);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'units.json'), JSON.stringify(units, null, 2) + '\n');
writeFileSync(join(outDir, 'vocab.json'), JSON.stringify(vocab, null, 2) + '\n');
writeFileSync(
  join(outDir, 'meta.json'),
  JSON.stringify({ syncedAt: new Date().toISOString(), unitsCount: units.length, lessonsCount: units.length * 6, vocabCount: vocab.length, categories: Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, v.length])) }, null, 2) + '\n',
);

console.log(`sync-learn-marathi: ${units.length} units, ${vocab.length} words, ${Object.keys(byCategory).length} categories → src/data/learn/`);
