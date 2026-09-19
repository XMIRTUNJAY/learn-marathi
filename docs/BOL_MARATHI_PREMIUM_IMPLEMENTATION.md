# Premium Implementation Report (2026-09-19, 2nd pass)

## Completed

- **Audits:** `docs/BOL_MARATHI_PREMIUM_AUDIT.md` (strengths, P0–P2 gaps),
  `docs/BOL_MARATHI_LANGUAGE_QA.md` (scan + triage), `tools/qa-scan.mjs`
  (repeatable, read-only), `docs/BOL_MARATHI_SEARCH_INTENT_MAP.md`.
- **CTA honesty:** "Get Bol Marathi" removed pre-launch. Engine now has
  vocabulary / phrase / grammar / lesson / general / subtle variants with
  missing-capability copy; pre-launch label is "Join the Android
  Waitlist" → /app/; store labels appear only when `playStoreUrl` set.
  3-level placement (subtle → contextual → general) across all templates.
- **Homepage:** hero answers what/who/why; primary waitlist CTA +
  secondary "Start Learning Free" → /start/; path picker (beginner /
  Hindi / English / हिंदी); popular-topics grid; why-section; visible
  FAQ + FAQPage schema; WebSite schema; byline.
- **Start Here:** `/start/` 6-step beginner journey, all steps real.
- **Lessons:** data-driven SEO H1s for all 26 units (from verified
  README focus), URLs unchanged; practice-suggestions section;
  subtle + lesson + general CTAs; prev/next kept.
- **Search-intent pages (3):** /how-to-say-{hello,thank-you,sorry}-in-
  marathi/ via shared `WordGuide` template; each backed by a verified
  vocab entry + notes; unique titles/descriptions; cross-linked.
  Numbers 1–100 and days/months deliberately NOT shipped (data
  insufficient — documented).
- **Trust:** /about/, /how-it-works/, /contact/, /privacy/ (honest re:
  Translate cookies, no tracking); footer navs; "Curated by Bol
  Marathi" byline on all Learn pages.
- **Data:** sync extended with `note`/`noteEn` (all 1002 have notes);
  fixed LM-0001 at app source + re-synced.

## Pages created (8)

`/start/`, `/about/`, `/how-it-works/`, `/contact/`, `/privacy/`,
`/how-to-say-hello-in-marathi/`, `/how-to-say-thank-you-in-marathi/`,
`/how-to-say-sorry-in-marathi/` (+ audit/QA/intent docs, not indexed
as content — docs/ isn't under src/pages).

## Pages modified

All templates (CTA variants), index (hero/paths/FAQ/schema),
`[unit]` (H1/title/practice/CTAs), `[cluster]`/`[set]`/`[topic]`/
HI/EN words/phrases (3-level CTAs), footer (trust navs), BaseHead
(og default — prior pass), Learn (h1/byline).

## Content corrected

LM-0001 (`v-an2-11` घोडा→घोडी) at `bol_marathi` source + re-sync.
Three unverified claims removed from new pages before publish
(morning-greeting scope, बरं reply, सॉरी usage). Transliteration
drift flagged, not rewritten.

## Verification

`npm run build`: 65 pages, 0 errors. Internal links: OK (64 pages).
Duplicate titles: none. Duplicate descriptions: none. noindex: 404
only. Sitemap: 64 URLs. QA scan: 2 remaining findings, both
legitimate polysemy.

## Remaining / next phase

- App repo: re-run `dart tool/gen_unit_content.dart` + tests for
  LM-0001; native review of transliteration (LM-0004).
- P1 content: numbers data, days/months audit, pronunciation guide,
  Hindi cluster mirrors, Hindi CTA copy variants.
- Post-launch: flip `playStoreUrl`, add testimonials/ratings only
  when real, consider form-based waitlist + single analytics vendor.
