// One-time asset pipeline (run manually, not in build):
//   1. public/screenshots/*.png → *.webp (q80) for the /app/ walkthrough
//   2. public/og-default.png — 1200×630 branded share image (Latin text
//      only, so it renders with any system font on any OS).
// Requires: npm install (sharp). Run: node ./tools/make-assets.mjs
import sharp from 'sharp';
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const shotsDir = join(here, '..', 'public', 'screenshots');
const pubDir = join(here, '..', 'public');

for (const f of readdirSync(shotsDir).filter((f) => f.endsWith('.png'))) {
  const base = join(shotsDir, basename(f, '.png'));
  await sharp(join(shotsDir, f)).webp({ quality: 80 }).toFile(`${base}.webp`);
  console.log(`webp: ${f}`);
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#8E2D12"/>
<rect x="80" y="200" width="120" height="120" rx="24" fill="#FDFBF7"/>
<text x="140" y="288" font-size="72" text-anchor="middle" fill="#8E2D12" font-family="sans-serif" font-weight="bold">BM</text>
<text x="240" y="250" font-size="84" fill="#FDFBF7" font-family="sans-serif" font-weight="bold">Learn Marathi</text>
<text x="240" y="310" font-size="40" fill="#FFDBD1" font-family="sans-serif">1002 words · 156 lessons · Bol Marathi app</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(pubDir, 'og-default.png'));
console.log('og: og-default.png');
if (!existsSync(join(shotsDir, 'flow-learn.webp'))) throw new Error('webp output missing');
