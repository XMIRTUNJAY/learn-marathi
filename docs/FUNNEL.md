# Funnel Map

**intent → landing → related → CTA → destination.**
Copy + store URLs render from `src/data/app.ts`
(`comingSoon: true` until the Play Store listing is live).

## Clusters

- **Beginner:** "learn marathi for beginners" → `/` →
  `/vocabulary/beginners/` → phrases, Unit 01 → soft + strong CTA
  → `/app/`
- **Hindi → Marathi:** "hindi to marathi words/sentences" →
  `/hindi-to-marathi/` → words → phrases → Units 01–02 →
  lesson CTA → `/app/`
- **Daily life:** "marathi family/food words" →
  `/vocabulary/<cluster>/` → related → unit → practice CTA →
  `/app/`
- **Travel + shopping:** "marathi travel/shopping phrases" →
  `/phrases/travel/` → `/vocabulary/travel/` → Units 14–15 →
  strong CTA → `/app/`
- **Grammar:** "marathi pronouns/sentence structure" →
  `/grammar/<topic>/` → related unit → lesson CTA → `/app/`
- **Lessons:** navigational → `/lessons/` →
  `/lessons/<unit>/` → next-unit + lesson CTA → `/app/`

## CTA variants (`src/components/AppCTA.astro`)

- `soft` — "Want to practice these words? Listen, speak, build
  sentences and review with spaced repetition in Bol Marathi."
  + `Practice in Bol Marathi`
- `strong` — "Learn Marathi beyond reading…" +
  `Download Bol Marathi`
- `lesson` — "Finished this lesson? Continue your Marathi
  practice in Bol Marathi." + `Continue Learning →`

Coming-soon mode links all CTAs to `/app/` with the
`comingSoonNote`. Set `playStoreUrl` on launch — no template edits.

## Events (conceptual, no vendor V1)

`page_view`, `content_engagement`, `app_cta_click`,
`download_click`.
