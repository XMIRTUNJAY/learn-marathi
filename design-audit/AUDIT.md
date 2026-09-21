# Bol Marathi Website — UX/UI Audit & Premium Redesign (Iteration 1)

Date: 2026-09-20 · Baseline: `main` @ 8199b36 · Auditor: senior product design review
Baselines: `design-audit/baseline/*.png` (home desktop/mobile, unit desktop/mobile, vocab desktop, app page)

---

## 1. What the site is today

Astro 7 static site, 101 pages, deployed to GitHub Pages. Tokens in
`src/styles/global.css` mirror the Bol Marathi app design system (terracotta
`#8e2d12`, parchment surfaces, bordered 16px cards, elevation 0). Vocab/phrase
tables have device TTS + pre-generated clips. CTA engine routes beta → waitlist
correctly. JSON-LD suite, hreflang, canonical, sitemap all present.

**What already works (preserve):**
- One-product feel: site tokens = app tokens (colors, spacing, radius)
- Calm, warm palette; consistent bordered cards; no gradient/glass noise
- `:focus-visible` + selection styling; `aria-current` nav; breadcrumbs
- 52px tap targets; `table-scroll` on mobile; working hamburger menu
- TTS audio on vocab tables; unit prev/next pager; honest byline/reviewer
- SEO plumbing: titles/descs in limits, JSON-LD, hreflang, sitemap-index
- App page is genuinely good: stat strip, walkthrough, weakest-words, FAQ

---

## 2. Scorecard (honest)

| Dimension                | Score /10 | Current State | Main Issue |
| ------------------------ | --------: | ------------- | ---------- |
| First impression         |         6 | Warm, clear copy, but text-only hero with small type; content scale (26/156/1002) invisible above fold | Hero has no visual anchor or stats |
| Trust                    |         8 | Byline, reviewer-pending honesty, methodology page, "never invented for the web" | Nothing misleading; minor: reviewer still pending |
| Information architecture |         7 | Breadcrumbs, pager, hub + sections; all pages ≤3 clicks deep | Homepage repeats 6 cards twice (Popular vs Vocabulary) |
| Onboarding               |         6 | `/start/` 6-step path exists and is good | Homepage doesn't route beginners there emphatically; no method loop |
| Pedagogy                 |         5 | Strong content, bridges, practice guidance text | Unit pages behave like documentation: speaking table has **no audio**, no lesson-progress indication |
| Interactivity            |         6 | TTS on vocab tables, roman toggle, quizzes, details FAQ | Unit speaking table (the core practice content) is inert |
| Visual design            |         7 | Consistent tokens, calm cards, decent type scale | No webfont actually loaded — tokens name Noto Sans Devanagari but system fallback renders; display type has no distinct voice |
| Mobile UX                |         7 | 1-col stacks, no overflow, 52px targets | 1200×630 art banner sits above the fold on every learn page (~350px before content) |
| Accessibility            |         7 | focus-visible, aria-labels, table regions, lang attrs | No skip-to-content link; emoji-only 🔊 buttons have aria-labels (OK) |
| Performance              |         8 | Zero JS libs, static, lazy images | No webfont (helps perf, hurts identity); Google Translate script on every page (deferred) |
| SEO                      |         9 | Titles, descs, canonical, JSON-LD, hreflang, sitemap-index, llms.txt | Solid; keyword targeting already mapped |
| Premium feel             |         6 | Calm, warm, cohesive | Hero typography weak; no distinct brand type voice (webfont missing) |
| Retention                |         5 | Unit pager exists | No progress indication within units; no "next lesson" emphasis beyond pager |
| Brand identity           |         7 | Terracotta + म monogram + consistent art | Art system good; type voice generic without webfont |

**Overall: 6.6/10** — a credible, calm, well-plumbed site whose main deficits
are (a) typography never loads its intended fonts, (b) hero doesn't sell the
scale, (c) unit pages are documentation, not learning product.

---

## 3. Top 10 problems (Impact × Frequency × Strategic ÷ Effort)

| Rank | Problem | Evidence | Why It Matters | Fix | Effort | Impact |
| ---- | ------- | -------- | -------------- | --- | ------ | ------ |
| 1 | Intended webfonts never load | `global.css:14-15` names Noto Sans Devanagari/Mukta; no `<link>`/`@font-face` anywhere | Every visitor sees system fallback; Devanagari rendering varies by OS; display type has no voice | Preconnect + Google Fonts stylesheet, `display=swap`, weights 400/500/600/700 | S | H |
| 2 | Unit speaking table has no audio | `lessons/[unit].astro:44-60` inline table, no `.say` buttons (vocab tables have them) | The core practice content is inert; inconsistent with vocab pages | Shared `SayScript.astro` + global `.say` style; audio buttons on sentences | S–M | H |
| 3 | Hero doesn't show scale or answer "why" above fold | `index.astro:65-78` text-only hero, small h1, no stats | First impression + onboarding; 26/156/1002 invisible until footer | Stat strip under hero CTAs; stronger display type; secondary CTA → Explore 156 lessons | M | H |
| 4 | No learning-method loop on homepage | No Learn→Practice→Remember section; "Why Bol Marathi" bullets buried mid-page | Philosophy is the brand; onboarding needs the loop visual | 3-step method section linking vocabulary/app | S | M–H |
| 5 | No progress indication within units | Unit pages: 6 lessons interleaved in one table, no rail/dots | Learner can't see position/remaining; retention | Lesson rail (6 pills, anchor links) + row anchors | S | M |
| 6 | 1200×630 art banner above the fold on mobile learn pages | `Learn.astro:51-53` full-width figure before any text | ~350px of image before content on 390px screens | Cap hero-figure height on ≤640px (object-fit cover) | S | M |
| 7 | Homepage repeats 6 cards twice | `index.astro` popular[] ∩ vocabulary clusters: Greetings, Family, Food, Travel, Numbers, Daily | Endless page, diluted choices, duplicate links | Trim Popular to unique search-intent pages (Numbers 1–20, Days & months, Pronunciation) | S | M |
| 8 | No skip-to-content link | `Base.astro:71-77` — keyboard/screen-reader users tab through 9 nav links per page | WCAG 2.4.1 bypass-blocks | Visually-hidden skip link to `#main` | S | M |
| 9 | App waitlist dominates hero secondary CTA | `index.astro:75` hero secondary = "Join the Android Waitlist" | Free content should feel generous, not a teaser; app CTA belongs later | Secondary → "Explore 156 Lessons"; AppCTA panel (already present) handles app | S | M |
| 10 | Google Translate script loads on every page | `SiteFooter.astro:82` third-party JS | Page weight; CLS risk; needed only on demand | Acceptable for now (deferred, try/catch); revisit as interaction-load | S | L |

**Deliberately NOT in iteration 1:** accounts/saved progress (Phase 2), PWA/
offline (Phase 3), mascot system, dark mode (app is light-only by design),
homepage art hero image (cards carry art), new dependencies beyond fonts.

---

## 4. Redesign direction (brand personality)

**Warm · Intelligent · Culturally rooted · Calm · Practical**

- **Warm:** parchment surfaces, terracotta accent, Devanagari given room to breathe
- **Intelligent:** patterns-not-rules framing; method loop made visible
- **Culturally rooted:** real curriculum, culture notes, म monogram, no stereotypes
- **Calm:** elevation 0, bordered cards, restrained motion (hover/focus only)
- **Practical:** every page answers "where am I / what next"; 52px targets

Avoids: SaaS dashboard, children's app, textbook PDF, Duolingo clone,
gradients/glassmorphism/floating cards.

## 5. Design system (as implemented — small, app-mirrored)

**Colors:** primary `#8e2d12` · container `#c54f2c` · fixed tint `#ffdbd1` ·
on-fixed `#3b0900` · bg `#fdfbf7` · surface `#ffffff` · text `rgb(45,27,21)` ·
muted `rgb(109,91,78)` · border `rgb(223,192,183)` · success `#2e7d5b` /
`#e8f4ec` · warning/error: app has none (not invented for web)

**Typography:** Noto Sans Devanagari (400/500/600/700, `display=swap`) →
Mukta → system-ui. H1 26→32px · H2 22px · H3 18px · body 17px/1.65 ·
small 0.82–0.9rem · `:lang(mr/hi)` line-height 1.75 · labels 12–13px
uppercase +0.08–0.1em tracking

**Spacing:** 4/8/12/16/24/32/48/64 (`--space-1..8`) · **Radius:** 4/16/24/full ·
**Shadows:** none (elevation 0, app-consistent)

**Components:** SiteHeader (sticky, hamburger), Breadcrumbs, Hero+StatStrip,
MethodLoop, CardGrid/UnitCard/WordTable(VocabTable+TTS), AppCTA (state
engine), WaitlistForm, LessonRail, Pager, SiteFooter. Nothing more.

---

## 6. Interaction roadmap

- **Phase 1 — website-friendly (this PR):** sentence audio, lesson rail,
  roman toggle, quizzes, details FAQ, hover/focus states, stat strip
- **Phase 2 — account-based:** saved progress (localStorage), streaks,
  weak words, personalized review — only after demand signals
- **Phase 3 — mobile app:** spaced repetition engine, speech practice,
  offline, notifications. The website must NOT duplicate the app.

## 7. Success metrics (no invented baselines)

| Metric | Current | Target | Instrument |
| ------ | ------- | ------ | ---------- |
| Indexed pages | ~100 submitted, indexing pending | 90%+ indexed | Search Console Pages report |
| Organic impressions/clicks | 0 (no data yet) | baseline +30% in 90d | Search Console Performance |
| home → /lessons/ or /start/ click | not instrumented | >8% of home sessions | Plausible/Umami funnels (env vars ready) |
| Unit page → app CTA click | not instrumented | >3% | `data-funnel` events via analytics |
| Waitlist signups | manually tested, working | grow via footer+CTA | Formspree dashboard |
| Repeat visits | not instrumented | >25% returning | analytics return-visitor rate |

## 8. Microcopy (shipped in this PR)

- **Hero H1:** "Learn Marathi from Hindi or English." (kept — it answers who)
- **Primary CTA:** "Start Learning Free" (kept)
- **Secondary CTA:** "Explore 156 Lessons" (was waitlist — free content first)
- **Stat strip:** "26 units · 156 lessons · 1,002 words · free" (new)
- **Method loop:** "Learn → Practice → Remember" (new section)
- **Lesson rail label:** "Lessons in this unit" (new)
- **Audio button:** `aria-label="Listen: <word>"` (existing pattern, now on units)

## 9. SEO content strategy (network already built; iteration-1 notes)

The hub → vocabulary/phrases/grammar/lessons/blog tree exists with 100 URLs
in the sitemap. Iteration 1 strengthens it without stuffing: homepage method
section adds contextual internal links (vocabulary ↔ app), Popular trim
removes 6 duplicate links, unit pages gain anchor-rich lesson rail. Related
cross-linking already ships via RelatedContent + breadcrumbs. Future: lesson-
level pages (156 URLs) only if Search Console shows unit-page demand.

---

## 10. Iteration-1 implementation (what changed, files, risks)

**Changed:** (1) webfonts in BaseHead; (2) homepage hero + stat strip +
method loop + Popular dedupe; (3) unit-page sentence audio + lesson rail;
(4) mobile hero-figure cap; (5) skip-to-content link.

**Files:** `src/components/BaseHead.astro`, `src/pages/index.astro`,
`src/pages/lessons/[unit].astro`, `src/components/VocabTable.astro`,
`src/components/SayScript.astro` (new), `src/layouts/Base.astro`,
`src/layouts/Learn.astro`, `src/styles/global.css`.

**Risks & mitigations:** third-party font CSS (preconnect + swap; already
using Google CDN for translate); say-script refactor keeps `window.__sayInit`
single-bind guard; no routes/content changed; app state untouched.

**Preserved:** all 101 routes, 1002 words, 26 units, CTA engine states,
waitlist form, JSON-LD, hreflang, canonical, sitemap.
