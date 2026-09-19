// Canonical website content model for Learn Marathi.
// Field-for-field subset of the Bol Marathi app source:
//   content/units/unit_*.json + lib/content/generated_vocab.dart
// Generated snapshots live in src/data/learn/*.json (see tools/).

import unitsData from '../data/learn/units.json';
import vocabData from '../data/learn/vocab.json';
import { siteUrl } from './site';

export type Word = {
  id: string;
  marathi: string;
  hindi: string;
  english: string;
  transliteration: string;
  category: string;
  exampleMarathi: string;
  exampleHindi: string;
  exampleEnglish: string;
  note: string;
  noteEn: string;
};

export type GrammarRow = { lesson: number; title: string; titleEn: string; text: string; textEn: string; note?: string };
export type CultureRow = { lesson: number; title: string; titleEn: string; text: string; textEn: string; note?: string };
export type SpeakingRow = { lesson: number; sentence: string; hindi: string; english: string; tip: string };
export type ListeningRow = { lesson: number; marathi: string; hindi: string; english: string; speaker: string };
export type BridgeRow = {
  lesson: number; hindi: string; english: string; marathi: string;
  map: Record<string, string>; mapEn: Record<string, string>;
  grammar: string; grammarEn: string;
};
export type BuilderRow = {
  lesson: number; prompt: string; promptEn: string; tokens: string[];
  answer: string[]; hindi: string; hindiEn: string;
};

export type Unit = {
  unit: string; title: string; titleEn: string; subtitle: string; subtitleEn: string;
  intro: string; goals: string[]; goalsEn: string[]; lessons: number; vocabGroups: string[];
  grammar: GrammarRow[]; cultural: CultureRow[]; speaking: SpeakingRow[];
  listening: ListeningRow[]; bridge: BridgeRow[]; sentenceBuilder: BuilderRow[];
};

export const units = unitsData as Unit[];
export const vocab = vocabData as Word[];

export const wordsByCategory = (categories: string[]): Word[] =>
  vocab.filter((w) => categories.includes(w.category));

export type Cluster = {
  slug: string;
  title: string;
  description: string;
  intent: string;
  categories: string[];
  unitRefs: string[];
  related: { label: string; href: string }[];
};

// Curated clusters only — every cluster has ≥15 real entries (merged
// small categories). No per-word thin pages.
export const clusters: Cluster[] = [
  {
    slug: 'beginners',
    title: '100+ Marathi Words for Beginners',
    description: 'The first Marathi words to learn: greetings, yes/no, please, numbers and everyday essentials with Hindi and English meanings.',
    intent: 'learn marathi for beginners; marathi words for beginners',
    categories: ['Greetings', 'Phrases', 'Numbers', 'Colors'],
    unitRefs: ['01', '02'],
    related: [
      { label: 'Marathi greetings & daily phrases', href: siteUrl('/phrases/greetings/') },
      { label: 'Hindi to Marathi words', href: siteUrl('/hindi-to-marathi/words/') },
      { label: 'Unit 01 — Marathi Fundamentals', href: siteUrl('/lessons/01/') },
    ],
  },
  {
    slug: 'colors',
    title: 'Marathi Colors',
    description: 'Marathi color words — with Hindi meanings, pronunciation and example sentences from the Bol Marathi curriculum.',
    intent: 'marathi colors; marathi colour names',
    categories: ['Colors'],
    unitRefs: ['01', '20'],
    related: [
      { label: 'Beginner words', href: siteUrl('/vocabulary/beginners/') },
      { label: 'Daily-use Marathi words', href: siteUrl('/vocabulary/daily-life/') },
      { label: 'Unit 20 — Review & Mastery', href: siteUrl('/lessons/20/') },
    ],
  },
  {
    slug: 'food',
    title: 'Marathi Food Words',
    description: 'Marathi words for food, vegetables, grains and eating — with Hindi meanings, pronunciation and example sentences.',
    intent: 'marathi food words; marathi food vocabulary',
    categories: ['Food'],
    unitRefs: ['03'],
    related: [
      { label: 'Daily-use Marathi words', href: siteUrl('/vocabulary/daily-life/') },
      { label: 'Daily conversation phrases', href: siteUrl('/phrases/daily/') },
      { label: 'Unit 03 — Everyday Vocabulary', href: siteUrl('/lessons/03/') },
    ],
  },
  {
    slug: 'family',
    title: 'Marathi Family Words',
    description: 'Marathi words for family members and people — with Hindi meanings, pronunciation and examples.',
    intent: 'marathi family words; marathi relations',
    categories: ['Family', 'People', 'Pronouns'],
    unitRefs: ['03', '05'],
    related: [
      { label: 'Marathi pronouns (grammar)', href: siteUrl('/grammar/pronouns/') },
      { label: 'Beginner words', href: siteUrl('/vocabulary/beginners/') },
      { label: 'Unit 05 — Pronouns & People', href: siteUrl('/lessons/05/') },
    ],
  },
  {
    slug: 'travel',
    title: 'Marathi Travel Words & Phrases',
    description: 'Marathi words for travel, directions, tickets and stays — plus the phrases travellers actually use.',
    intent: 'marathi travel words; marathi travel phrases',
    categories: ['Travel', 'Directions'],
    unitRefs: ['14', '15'],
    related: [
      { label: 'Travel phrases', href: siteUrl('/phrases/travel/') },
      { label: 'Shopping & market words', href: siteUrl('/vocabulary/shopping/') },
      { label: 'Unit 14 — Nature & Travel', href: siteUrl('/lessons/14/') },
    ],
  },
  {
    slug: 'shopping',
    title: 'Marathi Shopping & Market Words',
    description: 'Marathi words for shopping, price, bargaining and the market — with numbers for prices.',
    intent: 'marathi shopping words; marathi market phrases',
    categories: ['Shopping', 'Numbers'],
    unitRefs: ['09'],
    related: [
      { label: 'Numbers & time', href: siteUrl('/vocabulary/numbers-time/') },
      { label: 'Travel words', href: siteUrl('/vocabulary/travel/') },
      { label: 'Unit 09 — Shopping & Market', href: siteUrl('/lessons/09/') },
    ],
  },
  {
    slug: 'numbers-time',
    title: 'Marathi Numbers, Time & Days',
    description: 'Marathi numbers, clock time, days and seasons — with Hindi meanings and pronunciation.',
    intent: 'marathi numbers; marathi time; marathi days',
    categories: ['Numbers', 'Time'],
    unitRefs: ['01', '16'],
    related: [
      { label: 'Shopping words (prices)', href: siteUrl('/vocabulary/shopping/') },
      { label: 'Beginner words', href: siteUrl('/vocabulary/beginners/') },
      { label: 'Unit 16 — Time & Seasons', href: siteUrl('/lessons/16/') },
    ],
  },
  {
    slug: 'verbs',
    title: 'Essential Marathi Verbs',
    description: 'The most useful Marathi verbs — eat, drink, go, come, do — with Hindi meanings and sentence examples.',
    intent: 'marathi verbs; marathi action words',
    categories: ['Verbs'],
    unitRefs: ['02', '04'],
    related: [
      { label: 'Marathi verbs (grammar)', href: siteUrl('/grammar/verbs/') },
      { label: 'Sentence structure', href: siteUrl('/grammar/sentence-structure/') },
      { label: 'Unit 04 — Core Sentence Patterns', href: siteUrl('/lessons/04/') },
    ],
  },
  {
    slug: 'daily-life',
    title: 'Marathi Words for Daily Life',
    description: 'Marathi words for home, routine, body and everyday objects — the vocabulary daily conversation is built from.',
    intent: 'marathi daily use words; marathi home words',
    categories: ['Home', 'Routine', 'Body', 'Adjectives', 'Adverbs'],
    unitRefs: ['03', '10'],
    related: [
      { label: 'Food words', href: siteUrl('/vocabulary/food/') },
      { label: 'Daily conversation phrases', href: siteUrl('/phrases/daily/') },
      { label: 'Unit 03 — Everyday Vocabulary', href: siteUrl('/lessons/03/') },
    ],
  },
];

export type PhraseSet = {
  slug: string;
  title: string;
  description: string;
  intent: string;
  unitRefs: string[];
  related: { label: string; href: string }[];
};

export const phraseSets: PhraseSet[] = [
  {
    slug: 'greetings',
    title: 'Marathi Greetings & Polite Phrases',
    description: 'How to greet, thank, apologise and be polite in Marathi — with Hindi and English meanings.',
    intent: 'marathi greetings; namaskar in marathi',
    unitRefs: ['01'],
    related: [
      { label: 'Beginner words', href: siteUrl('/vocabulary/beginners/') },
      { label: 'Daily conversation', href: siteUrl('/phrases/daily/') },
      { label: 'Unit 01 — Marathi Fundamentals', href: siteUrl('/lessons/01/') },
    ],
  },
  {
    slug: 'daily',
    title: 'Marathi Phrases for Daily Conversation',
    description: 'Everyday Marathi sentences — introductions, needs, feelings — mapped from Hindi so Hindi speakers get them instantly.',
    intent: 'marathi daily conversation; daily use marathi sentences',
    unitRefs: ['01', '02'],
    related: [
      { label: 'Hindi to Marathi phrases', href: siteUrl('/hindi-to-marathi/phrases/') },
      { label: 'Essential verbs', href: siteUrl('/vocabulary/verbs/') },
      { label: 'Unit 02 — Survival Marathi', href: siteUrl('/lessons/02/') },
    ],
  },
  {
    slug: 'travel',
    title: 'Marathi Travel Phrases',
    description: 'Tickets, stations, stays and directions — the Marathi phrases travellers need, with Hindi meanings.',
    intent: 'marathi travel phrases',
    unitRefs: ['14', '15'],
    related: [
      { label: 'Travel words', href: siteUrl('/vocabulary/travel/') },
      { label: 'Shopping words', href: siteUrl('/vocabulary/shopping/') },
      { label: 'Unit 14 — Nature & Travel', href: siteUrl('/lessons/14/') },
    ],
  },
];

export type GrammarTopic = {
  slug: string;
  title: string;
  description: string;
  intent: string;
  unitRefs: string[];
  // Explicit {unit, lessons} picks — every row shown is verified to
  // belong to the topic (no keyword guessing across note bodies).
  picks: { unit: string; lessons: number[] }[];
  related: { label: string; href: string }[];
};

export const grammarTopics: GrammarTopic[] = [
  {
    slug: 'pronouns',
    title: 'Marathi Pronouns',
    description: 'I, you, he/she, we, they in Marathi — with Hindi comparison and example sentences from the curriculum.',
    intent: 'marathi pronouns; mi tu to in marathi',
    unitRefs: ['01', '05', '07'],
    picks: [
      { unit: '05', lessons: [1, 2, 3, 4, 5, 6] },
      { unit: '01', lessons: [4] },
    ],
    related: [
      { label: 'Family words', href: siteUrl('/vocabulary/family/') },
      { label: 'Sentence structure', href: siteUrl('/grammar/sentence-structure/') },
      { label: 'Unit 05 — Pronouns & People', href: siteUrl('/lessons/05/') },
    ],
  },
  {
    slug: 'verbs',
    title: 'Marathi Verbs & Tenses',
    description: 'How Marathi verbs work — everyday verbs, continuous tense and the SOV sentence pattern, compared with Hindi.',
    intent: 'marathi verbs grammar; marathi tenses',
    unitRefs: ['01', '04', '21'],
    picks: [
      { unit: '04', lessons: [3, 4, 5, 6] },
      { unit: '01', lessons: [5] },
      { unit: '21', lessons: [5, 6] },
    ],
    related: [
      { label: 'Essential verbs', href: siteUrl('/vocabulary/verbs/') },
      { label: 'Sentence structure', href: siteUrl('/grammar/sentence-structure/') },
      { label: 'Unit 04 — Core Sentence Patterns', href: siteUrl('/lessons/04/') },
    ],
  },
  {
    slug: 'sentence-structure',
    title: 'Marathi Sentence Structure',
    description: 'Marathi is Subject–Object–Verb, like Hindi. Learn the pattern with real examples and sentence-building practice.',
    intent: 'marathi sentence structure; marathi grammar',
    unitRefs: ['01', '04', '08'],
    picks: [
      { unit: '01', lessons: [6] },
      { unit: '04', lessons: [1, 2] },
      { unit: '08', lessons: [1, 2] },
    ],
    related: [
      { label: 'Hindi to Marathi sentences', href: siteUrl('/hindi-to-marathi/phrases/') },
      { label: 'Marathi verbs', href: siteUrl('/grammar/verbs/') },
      { label: 'Unit 01 — Marathi Fundamentals', href: siteUrl('/lessons/01/') },
    ],
  },
];

export const getUnit = (no: string): Unit => {
  const u = units.find((x) => x.unit === no);
  if (!u) throw new Error(`Unknown unit: ${no}`);
  return u;
};

// Search-oriented H1s per unit. Derived from the verified curriculum
// (unit titles + focus column in bol_marathi/content/units/README.md).
// URLs and curriculum identity are unchanged — only the displayed H1
// and title answer search intent.
export const unitSeo: Record<string, { h1: string; blurb: string }> = {
  '01': { h1: 'Marathi Basics for Beginners: Greetings, First Words & Sentences', blurb: 'Alphabet, greetings and your first 50 words.' },
  '02': { h1: 'Survival Marathi: Essential Verbs & Everyday Questions', blurb: 'Possession, questions and verbs for daily situations.' },
  '03': { h1: 'Everyday Marathi Vocabulary: Family, Home & Food Words', blurb: '100+ high-frequency words for home life.' },
  '04': { h1: 'Marathi Sentence Patterns: Build Correct SOV Sentences', blurb: 'Movement verbs, compound verbs and ability.' },
  '05': { h1: 'Marathi Pronouns & People: I, You, He, She Explained', blurb: 'Full pronoun paradigm plus kinship words.' },
  '06': { h1: 'Marathi Pronunciation Guide: Sounds Hindi Speakers Must Learn', blurb: 'Retroflex, nasal, visarga and anusvara.' },
  '07': { h1: 'Marathi Questions: Question Words & How to Ask Anything', blurb: 'Question words and their everyday usage.' },
  '08': { h1: 'Marathi Postpositions: Location & Relation Markers', blurb: 'The small words that anchor every sentence.' },
  '09': { h1: 'Marathi Shopping Words: Market, Price & Bargaining', blurb: 'Price, units and bargaining phrases.' },
  '10': { h1: 'Marathi Health Words: Body, Symptoms & Doctor Visits', blurb: 'Describe symptoms and visit a doctor.' },
  '11': { h1: 'Marathi for School & Work: Education and Office Words', blurb: 'School, interviews and office life.' },
  '12': { h1: 'Marathi Technology Words: Devices, Internet & Safety', blurb: 'Talk about phones, internet and safety.' },
  '13': { h1: 'Marathi Festivals & Culture: Ganesh, Diwali, Gudi Padwa', blurb: 'Festival words and cultural context.' },
  '14': { h1: 'Marathi Nature & Travel Words: Sahyadri, Konkan & Wildlife', blurb: 'Landscapes, travel and wildlife.' },
  '15': { h1: 'Marathi Travel Phrases: Tickets, Stations & Stays', blurb: 'Book, navigate and stay anywhere in Maharashtra.' },
  '16': { h1: 'Marathi Numbers, Time & Seasons: Clock, Calendar, Days', blurb: 'Tell time and talk about seasons.' },
  '17': { h1: 'Marathi Emotions & Feelings Words: Joy, Sorrow, Empathy', blurb: 'Say how you feel, precisely.' },
  '18': { h1: 'Marathi Hobbies & Leisure Words: Sports, Arts & Practice', blurb: 'Talk about what you love doing.' },
  '19': { h1: 'Marathi for Work & Career: Jobs, Interviews & Growth', blurb: 'Job search and workplace language.' },
  '20': { h1: 'Marathi Review & Mastery Test: Everything So Far', blurb: 'Cumulative review across all topics.' },
  '21': { h1: 'Advanced Marathi Grammar: Prefixes, Compounds & Voice', blurb: 'Take grammar beyond the basics.' },
  '22': { h1: 'Marathi Literature & Poetry: Saints to Modern Poets', blurb: 'Abhanga, ovi and modern poetry.' },
  '23': { h1: 'Business Marathi: Trade, Finance & Contracts', blurb: 'Professional and commercial language.' },
  '24': { h1: 'Marathi Media & News Words: Press, Broadcast & Social', blurb: 'Follow Marathi news and media.' },
  '25': { h1: 'Advanced Marathi Conversation: Debate & Presentation', blurb: 'Argue, present and persuade.' },
  '26': { h1: 'Marathi Final Assessment: Mock Exam & Certificate', blurb: 'Prove your Marathi end to end.' },
};

/** Phrases for a set: speaking rows of referenced units (real app content). */
export const phrasesFor = (set: PhraseSet): (SpeakingRow & { unit: string })[] =>
  set.unitRefs.flatMap((no) => getUnit(no).speaking.map((s) => ({ ...s, unit: no })));

/** Bridge rows (Hindi→Marathi) of referenced units. */
export const bridgesFor = (unitRefs: string[]): (BridgeRow & { unit: string })[] =>
  unitRefs.flatMap((no) => getUnit(no).bridge.map((b) => ({ ...b, unit: no })));
