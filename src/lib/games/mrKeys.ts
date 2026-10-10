// Romanization hints for on-screen Devanagari keys — educational labels and
// keyboard ordering only; NEVER used for comparison logic (all comparisons
// use graphemes.ts akshara units).

const BASE_ROMAN: Record<string, string> = {
	'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
	'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
	'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
	'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
	'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
	'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
	'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'ळ': 'la',
	'क्ष': 'ksha', 'ज्ञ': 'dnya',
	'अ': 'a', 'आ': 'a', 'इ': 'i', 'ई': 'i', 'उ': 'u', 'ऊ': 'u',
	'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
	'अं': 'an', 'अः': 'ah',
};

const MATRA_ROMAN: Record<string, string> = {
	'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u', 'ृ': 'ru',
	'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ः': 'h',
	'ॅ': 'e', 'ॉ': 'o', '़': '',
};

/** Approximate romanization of one akshara (e.g. का → "ka", स्का → "ska"). */
export function romanize(akshara: string): string {
	const full = BASE_ROMAN[akshara];
	if (full !== undefined) return full;
	let out = '';
	for (const ch of akshara) {
		if (ch === '्') continue; // virama — the conjunct reads via its letters
		const m = MATRA_ROMAN[ch];
		if (m !== undefined) {
			out += m;
			continue;
		}
		const b = BASE_ROMAN[ch];
		if (b !== undefined) {
			out += b.replace(/a$/, '');
			continue;
		}
		out += ch;
	}
	return out || akshara;
}
