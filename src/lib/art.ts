// Visible page art. Uses WebP with PNG fallback for OG/social.
// LQIP uses WebP for tiny blur-up placeholders.
//
// SEMANTIC MAPPING: each route maps to an image whose VISUAL CONTENT matches the
// page topic. Verified by OCR of every public/og/*.webp (tools/ocr-digest.txt).
//
// IMPORTANT: several base-named files hold the content of a DIFFERENT topic
// (a historical content rotation). Those routes are remapped below to the file
// that actually contains the matching art. Re-verify with:
//   npm run build && node tools/hero-audit.mjs
import { siteUrl } from './site';
import lqipManifest from '../data/lqip.json';
import ogManifest from '../data/og-manifest.json';

// route -> content-verified image base (without the "og-" prefix or extension).
// Only routes whose content differs from the default route-derived name appear here.
const CONTENT_FIX: Record<string, string> = {
  // ---- Vocabulary: base file held a different topic's art ----
  'vocabulary/adjectives': 'og-vocabulary-animals',      // this .webp actually shows "68 Describing Words (विशेषणे)"
  'vocabulary/animals': 'og-vocabulary-birds',           // animals page → birds art (animal family); no dedicated animals art exists
  'vocabulary/food': 'og-quiz-food',                     // "Quiz: Food Words" art
  'vocabulary/body-parts': 'og-hindi-to-marathi-health-body', // "Health & Body: Symptoms, Doctor Visit"
  'vocabulary/clothing': 'og-vocabulary',                // no clothing art exists → neutral vocabulary builder art
  'vocabulary/shopping': 'og-vocabulary-money-shopping', // "Marathi Money & Shopping Words"

  // ---- Phrases: content rotation among the phrase set ----
  'phrases/making-plans': 'og-phrases-daily',                    // no "plans" art → daily phrases art
  'phrases/office-work': 'og-hindi-to-marathi-work-career',      // "Work & Career: Jobs, Office"
  'phrases/phone-and-messaging': 'og-phrases-thanking-apologizing',   // this .webp actually shows "Phone & Messaging"
  'phrases/thanking-apologizing': 'og-phrases-presentations-interviews', // this .webp actually shows "Thanking & Apologizing"
  'phrases/presentations-interviews': 'og-phrases-business-meetings',   // art shows "प्रस्तुती करा" (presentation)
  'phrases/shopping': 'og-vocabulary-money-shopping',            // "Money & Shopping Words"

  // ---- Grammar ----
  'grammar/commands-polite': 'og-blog-polite-marathi',   // "Polite Marathi: Honorifics & Respect"
  'grammar/postpositions': 'og-hindi-to-marathi-postpositions', // "Postpositions: Cases, Meanings & Usage"

  // ---- Hindi → Marathi: base file held a different topic's art ----
  'hindi-to-marathi/advanced-structures': 'og-grammar-passive-causative', // "Passive & Causative"
  'hindi-to-marathi/daily-conversation': 'og-phrases-daily',              // daily phrases art
  'hindi-to-marathi/festivals': 'og-vocabulary-culture-festivals',        // "Marathi Festival Words: Diwali to Gudi Padwa"
  'hindi-to-marathi/questions': 'og-english-to-marathi-asking-questions', // "Question Words (काय, कुठे, कधी)"
  'hindi-to-marathi/shopping': 'og-vocabulary-money-shopping',            // "Money & Shopping Words"
  'hindi-to-marathi/time-seasons': 'og-english-to-marathi-time-seasons',  // "Time, Clock & Seasons"
  'hindi-to-marathi/travel': 'og-english-to-marathi-transport-travel',    // "Transport, Travel & Getting Around"

  // ---- Static / index ----
  'blog': 'og-blog-index',                                // situational-guide art
  'english-to-marathi/words': 'og-blog-pune-newcomer-words', // "Marathi Words for Pune Newcomers"
};

function baseFor(route: string): string {
  const fallback = route === '' ? 'og-home' : `og-${route.replace(/\//g, '-')}`;
  return CONTENT_FIX[route] ?? fallback;
}

export function pageArt(route: string): string {
  return siteUrl(`/og/${baseFor(route)}.webp`);
}

export function pageArtPng(route: string): string {
  return siteUrl(`/og/${baseFor(route)}.png`);
}

export function pageLQIP(route: string): string {
  const base = baseFor(route);
  return (lqipManifest as Record<string, string>)[`${base}.webp`] ?? '';
}

// Exposed for audit tooling.
export function getAllRouteMappings(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const route of ogManifest.routes) out[route] = baseFor(route);
  return out;
}
