// One-shot import of human-made OG art (see REPORT.md).
// Source: <SRC_ROOT>/<folder>/screen.png  →  public/og/<target>.png
// All outputs resized to exactly 1200×630 (fit: fill — portrait art
// stretches rather than crops, per owner decision). Generator
// (make-og-pages) skips existing files, so re-runs never clobber these.
// Run: node ./tools/import-og-art.mjs
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = 'C:\\Users\\kumar\\Downloads\\stitch_bol_marathi_mascot_animations\\stitch_bol_marathi_mascot_animations';
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og');

const direct = [
  'og_home', 'og_app', 'og_hindi_to_marathi', 'og_english_to_marathi',
  'og_lessons_01', 'og_lessons_04', 'og_lessons_08', 'og_lessons_09',
  'og_lessons_11', 'og_lessons_12', 'og_lessons_14', 'og_lessons_16',
  'og_lessons_17', 'og_lessons_18', 'og_lessons_19', 'og_lessons_20',
  'og_lessons_21', 'og_lessons_22', 'og_lessons_23', 'og_lessons_24',
  'og_lessons_25', 'og_lessons_26',
  'og_grammar_postpositions', 'og_grammar_pronouns', 'og_grammar_questions',
  'og_grammar_sentence_structure', 'og_grammar_verbs',
  'og_phrases_daily', 'og_phrases_greetings', 'og_phrases_shopping', 'og_phrases_travel',
  'og_quiz_beginners', 'og_quiz_colors', 'og_quiz_daily_life', 'og_quiz_family',
  'og_quiz_food', 'og_quiz_numbers_time', 'og_quiz_shopping', 'og_quiz_travel', 'og_quiz_verbs',
  'og_hi_app', 'og_hi_shabd', 'og_hi_vakya',
  'og_how_to_say_good_morning_in_marathi', 'og_how_to_say_hello_in_marathi',
  'og_how_to_say_sorry_in_marathi', 'og_how_to_say_thank_you_in_marathi',
  'og_marathi_alphabet', 'og_marathi_days_months', 'og_marathi_numbers',
  'og_marathi_pronunciation', 'og_marathi_vs_hindi',
  'og_blog_at_the_doctor', 'og_blog_autorickshaw_taxi', 'og_blog_emotions_feelings',
  'og_blog_festival_greetings', 'og_blog_first_day_work', 'og_blog_grocery_shopping',
  'og_blog_hindi_speaker_traps', 'og_blog_index', 'og_blog_money_prices',
  'og_blog_ordering_food', 'og_blog_polite_marathi', 'og_blog_pune_newcomer_words',
  'og_blog_school_talk', 'og_blog_small_talk_intro', 'og_blog_weather_talk',
  'og_about', 'og_contact', 'og_how_it_works', 'og_privacy',
  'og_hindi_to_marathi_phrases', 'og_english_to_marathi_phrases', 'og_english_to_marathi_words',
  'og_lessons_02', 'og_lessons_03', 'og_lessons_05', 'og_lessons_06',
  'og_lessons_07', 'og_lessons_10', 'og_lessons_13', 'og_lessons_15',
];
const renames = {
  og_start_learning_marathi: 'og-start',
  og_anki_decks: 'og-downloads',
  og_hindi_se_marathi: 'og-hi',
  og_fallback_brand_card: 'og-default',
  og_marathi_vocabulary: 'og-vocabulary',
  og_marathi_phrases: 'og-phrases',
  og_marathi_grammar: 'og-grammar',
  og_marathi_lessons: 'og-lessons',
  og_marathi_quiz: 'og-quiz',
  og_marathi_family_words: 'og-vocabulary-family',
  og_marathi_food_words: 'og-vocabulary-food',
  og_marathi_travel_words: 'og-vocabulary-travel',
  og_marathi_shopping_words: 'og-vocabulary-shopping',
  og_marathi_numbers_time: 'og-vocabulary-numbers-time',
  og_essential_marathi_verbs: 'og-vocabulary-verbs',
  og_marathi_words_for_daily_life: 'og-vocabulary-daily-life',
  og_marathi_colors: 'og-vocabulary-colors',
  'og_hindi_to_marathi_words.png_1': 'og-hindi-to-marathi-words',
};

let ok = 0, missing = [];
const jobs = [...direct.map((d) => [d, d.replace(/_/g, '-').replace(/^og-/, 'og-')]), ...Object.entries(renames)];
for (const [folder, target] of jobs) {
  // Source dirs are literally named e.g. `og_about.png` (or `..._1` for variants).
  const candidates = [folder + '.png', folder].map((d) => join(SRC, d, 'screen.png'));
  const src = candidates.find((p) => existsSync(p));
  if (!src) { missing.push(folder); continue; }
  // Landscape art (OG ratio): clean resize. Portrait art: letterbox on
  // brand cream — stretching destroys the composition (verified).
  const meta = await sharp(src).metadata();
  const landscape = meta.width && meta.height && meta.width / meta.height > 1.5;
  await (landscape
    ? sharp(src).resize(1200, 630, { fit: 'fill' })
    : sharp(src).resize(1200, 630, { fit: 'contain', background: '#FDFBF7' })
  ).png().toFile(join(outDir, `${target}.png`));
  ok++;
}
console.log(`import-og-art: ${ok} imported, missing: ${missing.join(', ') || 'none'}`);
