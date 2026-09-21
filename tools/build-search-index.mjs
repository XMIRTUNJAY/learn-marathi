// Build-time search index generator.
// Reads canonical snapshots (src/data/learn/*.json) for words + units,
// and extracts inline clusters/phraseSets/grammarTopics from src/lib/learn.ts
// with a balanced-bracket scanner (regex alone breaks on nested braces).
import fs from 'fs';

function extractArrayBody(source, declName) {
	const marker = `export const ${declName}`;
	const start = source.indexOf(marker);
	if (start === -1) return '';
	const bracket = source.indexOf('[', start);
	let depth = 0;
	let inStr = null;
	let escaped = false;
	for (let i = bracket; i < source.length; i++) {
		const ch = source[i];
		if (inStr) {
			if (escaped) escaped = false;
			else if (ch === '\\') escaped = true;
			else if (ch === inStr) inStr = null;
			continue;
		}
		if (ch === "'" || ch === '"' || ch === '`') inStr = ch;
		else if (ch === '[') depth++;
		else if (ch === ']') {
			depth--;
			if (depth === 0) return source.slice(bracket + 1, i);
		}
	}
	return '';
}

function splitTopLevelObjects(body) {
	const blocks = [];
	let depth = 0;
	let inStr = null;
	let escaped = false;
	let current = -1;
	for (let i = 0; i < body.length; i++) {
		const ch = body[i];
		if (inStr) {
			if (escaped) escaped = false;
			else if (ch === '\\') escaped = true;
			else if (ch === inStr) inStr = null;
			if (current >= 0) blocks[current] += ch;
			continue;
		}
		if (ch === "'" || ch === '"' || ch === '`') inStr = ch;
		else if (ch === '{') {
			if (depth === 0) {
				current = blocks.length;
				blocks.push('');
			}
			depth++;
		} else if (ch === '}') {
			depth--;
		}
		if (current >= 0) blocks[current] += ch;
		if (depth === 0 && current >= 0 && ch === '}') current = -1;
	}
	return blocks.filter((b) => b.trim().startsWith('{'));
}

function field(block, name) {
	const m = block.match(new RegExp(`${name}:\\s*'([^']*)'`, 's'));
	return m ? m[1] : '';
}

function strArray(block, name) {
	const m = block.match(new RegExp(`${name}:\\s*\\[([^\\]]*)\\]`, 's'));
	if (!m) return [];
	return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

function buildIndex() {
	const learnTs = fs.readFileSync('src/lib/learn.ts', 'utf8');
	const vocab = JSON.parse(fs.readFileSync('src/data/learn/vocab.json', 'utf8'));
	const units = JSON.parse(fs.readFileSync('src/data/learn/units.json', 'utf8'));

	const index = [];

	// Vocabulary clusters (inline in learn.ts)
	for (const block of splitTopLevelObjects(extractArrayBody(learnTs, 'clusters'))) {
		const title = field(block, 'title');
		const slug = field(block, 'slug');
		const description = field(block, 'description');
		if (!title || !slug) continue;
		const categories = strArray(block, 'categories');
		index.push({
			id: `vocab-${slug}`,
			title,
			type: 'vocabulary',
			url: `/learn-marathi/vocabulary/${slug}/`,
			description: description || `${categories.join(', ')} words`,
			keywords: [title, ...categories, 'vocabulary', 'words'].join(' ').toLowerCase(),
		});
	}

	// Phrase sets (inline in learn.ts)
	for (const block of splitTopLevelObjects(extractArrayBody(learnTs, 'phraseSets'))) {
		const title = field(block, 'title');
		const slug = field(block, 'slug');
		if (!title || !slug) continue;
		const categories = strArray(block, 'categories');
		index.push({
			id: `phrase-${slug}`,
			title,
			type: 'phrases',
			url: `/learn-marathi/phrases/${slug}/`,
			description: field(block, 'description') || `${categories.join(', ')} phrases`,
			keywords: [title, ...categories, 'phrases'].join(' ').toLowerCase(),
		});
	}

	// Grammar topics (inline in learn.ts)
	for (const block of splitTopLevelObjects(extractArrayBody(learnTs, 'grammarTopics'))) {
		const title = field(block, 'title');
		const slug = field(block, 'slug');
		if (!title || !slug) continue;
		index.push({
			id: `grammar-${slug}`,
			title,
			type: 'grammar',
			url: `/learn-marathi/grammar/${slug}/`,
			description: field(block, 'description'),
			keywords: [title, field(block, 'intent'), 'grammar', 'rules'].join(' ').toLowerCase(),
		});
	}

	// Units (canonical JSON snapshot)
	for (const u of units) {
		index.push({
			id: `unit-${u.unit}`,
			title: `Unit ${u.unit}: ${u.titleEn}`,
			type: 'lesson',
			url: `/learn-marathi/lessons/${u.unit}/`,
			description: u.subtitleEn || '',
			keywords: [`unit ${u.unit}`, u.titleEn, u.title, 'lesson'].join(' ').toLowerCase(),
		});
	}

	// Words (canonical JSON snapshot, all 1002)
	const words = Array.isArray(vocab) ? vocab : Object.values(vocab);
	for (const w of words) {
		if (!w.id || !w.marathi || !w.english) continue;
		index.push({
			id: `word-${w.id}`,
			title: w.marathi,
			type: 'word',
			url: `/learn-marathi/vocabulary/`,
			description: `${w.english}${w.hindi ? ` (${w.hindi})` : ''}`,
			keywords: [w.marathi, w.english, w.hindi, w.transliteration].filter(Boolean).join(' ').toLowerCase(),
		});
	}

	return index;
}

const index = buildIndex();
fs.writeFileSync('public/search-index.json', JSON.stringify(index, null, 2));
console.log(`Search index built with ${index.length} entries`);
