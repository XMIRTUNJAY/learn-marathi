# Learn Marathi — Bol Marathi content & SEO site

Standalone Astro site that turns the **Bol Marathi** Flutter app's real
curriculum into indexable learning content and funnels readers toward
the app. Sibling of `engineering-notebook` (which is a separate
portfolio site — do not merge the two). Notebook architecture is the
reference: static Astro, content-driven routes, `BaseHead` SEO,
sitemap, minimal JS, Vercel-friendly.

## Source of truth

App curriculum lives in `C:\Users\kumar\bol_marathi`:

- `content/units/unit_*.json` — 26 units × 6 lessons (grammar,
  culture, speaking, listening, Hindi→Marathi bridge,
  sentence-builder)
- `lib/content/generated_vocab.dart` — 1002 trilingual words

Never hand-copy content. Sync it:

```bash
npm run sync
```

This regenerates the committed snapshots in `src/data/learn/`
(`units.json`, `vocab.json`, `meta.json`). Override the app path
with `BOL_MARATHI_ROOT=/path/to/bol_marathi`.

## App link config

The app is **not on the Play Store yet**. Store URLs live in
`src/data/app.ts` (`playStoreUrl: null`, `comingSoon: true`).
When hosted, set the URL + `comingSoon: false` — every CTA updates.

## Waitlist (+ built-in A/B test)

- **Footer CTA = inline form.** Paste a Formspree endpoint into
  `waitlistFormAction` in `src/data/app.ts` (Formspree → New Form →
  copy `https://formspree.io/f/xxxxxx`). Empty = mailto fallback.
- **Everywhere else = mailto** (`/app/` buttons, AppCTA panels).
  This split is deliberate: compare `waitlist_signup` (footer form)
  vs `waitlist_click` (mailto) via the `data-funnel` hooks to see
  which converts before committing to one mechanism.
- After submit, Formspree redirects back to `/app/#joined`, which
  shows a confirmation note (pure CSS `:target`, no JS).

## Develop

```bash
npm install
npm run dev
npm run build
```

## Deploy

GitHub Pages project site: **https://xmirtunjay.github.io/learn-marathi/**
via `.github/workflows/deploy.yml` (builds `main` with `withastro/action`).
For a custom domain / Vercel later: set `site` to the domain and drop
`base` in `astro.config.mjs`, and update `public/robots.txt`.

## Docs

- `docs/CONTENT_ARCHITECTURE.md` — architecture report
- `docs/CONTENT_INVENTORY.md` — what exists, what becomes pages
- `docs/FUNNEL.md` — SEO clusters → CTA → app map
