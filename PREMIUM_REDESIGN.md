# BOL MARATHI — PREMIUM REDESIGN SPECIFICATION

## Executive Summary
Transform the existing 200-page Marathi learning website from "comprehensive SEO website" to **"A premium Marathi-learning product that happens to have an excellent SEO content library."**

**Branch:** `premium-redesign` | **Base:** `main` (post hero-image audit merge)

---

## 1. CURRENT STATE AUDIT

### 1.1 Architecture Overview
- **Framework:** Astro 7.3 + TypeScript + View Transitions
- **Pages:** ~200 (Vocabulary: 28, Phrases: 10, Grammar: 7, Lessons: 26, Blog: 26, Hindi→Marathi: 22, English→Marathi: 18, plus static)
- **Content Source:** Single curriculum (`src/lib/learn.ts` + `src/data/learn/*.json`)
- **SEO Data:** `src/data/seo/*.json` (vocab-topics, phrase-pages, grammar-pages, hindi-bridges, english-paths)
- **Images:** 221 OG images in `public/og/` (recently audited and corrected)

### 1.2 Current Strengths
- ✅ Single curriculum source of truth (`learn.ts`)
- ✅ View Transitions for smooth navigation
- ✅ Devanagari typography with `Noto Sans Devanagari`
- ✅ Terracotta accent color (`#8E2D12`) from app
- ✅ Audio pronunciation (TTS + pre-generated clips)
- ✅ Flip-card vocab, tables with pronunciation toggle
- ✅ SRS review system (localStorage)
- ✅ Full SEO: JSON-LD, breadcrumbs, sitemap, hreflang
- ✅ Search with keyboard shortcuts (`/`)
- ✅ Preferences: font size, line height, reading mode
- ✅ Accessibility: skip links, focus-visible, ARIA, reduced motion

### 1.3 Critical Gaps (Premium Gap Analysis)

| Area | Current | Premium Target | Gap |
|------|---------|----------------|-----|
| **Design System** | Scattered CSS variables | Unified token system + semantic aliases | ⚠️ High |
| **Homepage** | SEO-heavy hub | Guided learning entry point | ⚠️ High |
| **Learning Path** | None visible | Visual journey START → SPEAK | ⚠️ High |
| **Entry Points** | Nav dropdowns | 3 clear: English / Hindi / Continue | ⚠️ High |
| **Vocab Pages** | Table-first | Card-first learning experience | ⚠️ High |
| **Phrase Pages** | Table-only | Conversational cards + practice | ⚠️ High |
| **Grammar Pages** | Table/explanation | Pattern → Examples → Try it | ⚠️ High |
| **Hindi→Marathi** | Bridge tables | Visual mapping Hindi ↓ Marathi | ⚠️ High |
| **Audio** | Inline buttons | First-class AudioPlayer component | ⚠️ Medium |
| **Navigation** | Dropdown groups | 3-entry + progressive disclosure | ⚠️ Medium |
| **Micro-interactions** | Basic hover/transitions | Purposeful: audio, flip, reveal, progress | ⚠️ Medium |
| **Mobile** | Functional | Touch-first, thumb-friendly | ⚠️ Medium |
| **App Bridge** | Generic CTA | Contextual: "Practice this in App" | ⚠️ Medium |

---

## 2. DESIGN PRINCIPLES

### Visual Personality
> **Warm · Intelligent · Friendly · Modern · Indian · Calm · Premium · Educational**

**Avoid:** Generic SaaS gradients, excessive glassmorphism, neon, childish cartoons, stock photography, visual clutter.

### Core Principles
1. **Clarity over cleverness** — every element teaches or guides
2. **Confidence through consistency** — unified components, predictable patterns
3. **Delightful micro-interactions** — 150-300ms, purposeful only
4. **Typography as hero** — Marathi words visually dominate
5. **Information hierarchy** — scan in 5 seconds, read in depth
6. **Guided learning** — always answer "what's next?"
5. **Visual consistency** — unified components across 200 pages
7. **Strong product identity** — unmistakably Bol Marathi

---

## 3. DESIGN TOKENS (Phase 1 Deliverable)

### 3.1 Color System
```css
/* semantic-aliases.css */
:root {
  /* Brand - Maharashtra terracotta */
  --color-primary: #8E2D12;
  --color-primary-dark: #6B1F0E;
  --color-primary-light: #C54F2C;
  --color-primary-fixed: #FFDBD1;
  --color-primary-on-fixed: #3B0900;

  /* Surfaces - warm paper */
  --color-cream: #FDFBF7;
  --color-surface: #FFFFFF;
  --color-surface-low: #F7F3EF;
  --color-container: #F0EBE3;
  --color-container-low: #F7F3EF;

  /* Text */
  --color-text: #2D1B15;
  --color-text-muted: #6D5B4E;
  --color-text-on-primary: #FFFFFF;

  /* Border */
  --color-border: #DFC0B7;

  /* Semantic */
  --color-success: #2E7D5B;
  --color-success-bg: #E8F4EC;
  --color-warning: #B8860B;
  --color-warning-bg: #FFF8E1;
  --color-error: #C62828;
  --color-error-bg: #FDEDED;

  /* Devanagari-specific */
  --color-devanagari: #2D1B15;
}
```

### 3.2 Typography Scale
```css
/* typography.css */
:root {
  /* Display — Hero, Marathi word cards */
  --text-display: clamp(2.5rem, 5vw, 4rem) / 1.15;

  /* Headlines */
  --text-h1: clamp(1.75rem, 3.5vw, 2.5rem) / 1.2;
  --text-h2: clamp(1.375rem, 2.5vw, 2rem) / 1.25;
  --text-h3: 1.25rem / 1.3;
  --text-h4: 1.125rem / 1.3;

  /* Body */
  --text-body-lg: 1.125rem / 1.7;
  --text-body: 1rem / 1.7;
  --text-body-sm: 0.875rem / 1.6;
  --text-caption: 0.75rem / 1.5;

  /* Marathi-specific */
  --text-marathi-display: clamp(2rem, 4vw, 3rem) / 1.2;
  --text-marathi-word: 1.75rem / 1.3;
  --text-marathi-body: 1.125rem / 1.8;

  /* Transliteration */
  --text-transliteration: 0.875rem / 1.5;

  /* Labels/UI */
  --text-label: 0.75rem / 1;
  --text-button: 0.9375rem / 1;
}
```

**Font Families:**
```css
--font-display: 'Mukta', 'Noto Sans Devanagari', system-ui;
--font-body: 'Mukta', 'Noto Sans Devanagari', system-ui;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```
*Mukta chosen over Noto for warmer, more distinctive Devanagari personality*

### 3.3 Spacing & Radius
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-7: 3rem;     /* 48px */
  --space-8: 4rem;     /* 64px */

  --radius-sm: 4px;
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
}
```

### 3.4 Shadows & Elevation
```css
:root {
  --shadow-xs: 0 1px 2px rgba(45,27,21,0.04);
  --shadow-sm: 0 2px 4px rgba(45,27,21,0.06);
  --shadow-md: 0 8px 20px rgba(45,27,21,0.08);
  --shadow-lg: 0 16px 40px rgba(45,27,21,0.1);
  --shadow-xl: 0 24px 60px rgba(45,27,21,0.12);
}
```

### 3.5 Transitions
```css
:root {
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-out: cubic-bezier(0.25, 0.8, 0.25, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 4. COMPONENT SYSTEM (Phase 2 Deliverable)

### 4.1 Core Components to Build
```
src/components/
├── design-system/
│   ├── index.ts                    # Export all tokens
│   ├── tokens.css                  # CSS custom properties
│   ├── Button.astro                # Primary, Ghost, Outline, Icon
│   ├── Card.astro                  # Base, Hero, Feature, Lesson
│   ├── Input.astro                 # Search, Textarea, Select
│   ├── Badge.astro                 # Label, Count, Status
│   ├── Avatar.astro                # Mascot, User, Language
│   ├── Tooltip.astro               # Hover/focus definitions
│   └── Divider.astro               # Section separators
├── learning/
│   ├── MarathiWordCard.astro       # Flip card (replace VocabCard)
│   ├── MarathiWordTable.astro      # Enhanced table (replace VocabTable)
│   ├── PhraseCard.astro            # Conversational card (replace PhraseTable)
│   ├── AudioPlayer.astro           # Replaces SayScript + inline buttons
│   ├── TranslationCard.astro       # Hindi→Marathi mapping card
│   ├── GrammarPattern.astro        # Pattern → Examples → Try it
│   ├── ExampleSentence.astro       # Marathi + Transliteration + EN/HI
│   ├── MiniQuiz.astro              # Inline practice
│   ├── PracticeCTA.astro           # Contextual app bridge
│   └── ProgressIndicator.astro     # Streak, XP, lesson progress
├── layout/
│   ├── PremiumHero.astro           # Homepage, section heroes
│   ├── LearningPath.astro          # Visual journey
│   ├── LessonHeader.astro          # Page header + objective
│   ├── SectionNav.astro            # Sticky mini-nav for long pages
│   ├── RelatedLessons.astro        # Curated 3-5 related
│   ├── SectionHead.astro           # Consistent section headers
│   ├── Breadcrumbs.astro           # Enhanced
│   ├── SectionNav.astro            # Sticky mini-nav
│   └── PremiumFooter.astro
├── navigation/
│   ├── SiteHeader.astro            # Redesigned
│   ├── NavDropdown.astro           # Progressive disclosure
│   ├── LanguageSelector.astro      # EN/HI/MR switcher
│   └── MobileNav.astro             # Sheet drawer
├── feedback/
│   ├── AudioPlayer.astro           # Full-featured
│   ├── Toast.astro                 # Success/error/info
│   ├── LoadingSkeleton.astro       # Content placeholders
│   ├── EmptyState.astro            # Empty search, no results
│   └── ErrorBoundary.astro
└── index.astro                     # Barrel export
```

---

## 5. PAGE TEMPLATES (Phase 3-8 Deliverables)

### 5.1 Homepage Template (`PremiumHome.astro`)
```astro
---
// Sections:
// 1. Hero: नमस्कार + "Learn Marathi for real conversations" + 3 entry CTAs
// 2. Learning Path: Visual journey START → SPEAK
// 3. Three Entry Points: English / Hindi / Continue
// 4. Method: Learn → Practice → Remember (3 cards)
// 5. App Bridge: "Practice this in App"
// 6. Trust: One curriculum, audited
// 7. Discovery: "What do you want to learn?" → curated paths
---
```

### 5.2 Vocabulary Page Template (`PremiumVocabPage.astro`)
```
Breadcrumb
Hero (PremiumHero)
Learning Objective (LessonHeader)
Core Lesson (MarathiWordCard grid default, table toggle)
  → Marathi word large
  → AudioPlayer
  → Transliteration toggle
  → Hindi + English
  → Example sentence
Practice (MiniQuiz)
PracticeCTA (contextual)
RelatedLessons
```

### 5.3 Phrase Page Template (`PremiumPhrasePage.astro`)
```
Breadcrumb
Hero
Objective
Conversational PhraseCards
  → Marathi phrase large
  → AudioPlayer
  → Hindi + English
  → Tip/context
Practice (MiniQuiz: "Try saying it")
PracticeCTA
RelatedLessons
```

### 5.4 Grammar Page Template (`PremiumGrammarPage.astro`)
```
Breadcrumb
Hero
Pattern (GrammarPattern)
  → Visual: मी + ___ + करतो.
Examples (ExampleSentence grid)
Try It (SentenceBuilder interactive)
PracticeCTA
RelatedLessons
```

### 5.5 Hindi→Marathi Page Template (`PremiumHindiBridgePage.astro`)
```
Breadcrumb
Hero
Visual Mapping Card (TranslationCard)
  Hindi: मुझे पानी चाहिए।
  ↓
  Marathi: मला पाणी पाहिजे.
  ↓
  Pronunciation: Malā pāṇī pāhije.
  ↓
  English: I want water.
PracticeCTA
RelatedLessons
```

### 5.6 Lesson Page Template (`PremiumLessonPage.astro`)
```
Breadcrumb
Hero (lesson art)
Objectives (3-5 bullets)
Sections (Vocab + Phrases + Grammar + Practice)
MiniQuiz per section
PracticeCTA (deep-link to app unit)
Next Lesson card
```

---

## 6. MIGRATION PLAN (Phase 9)

### 6.1 File Mapping
| Old | New | Status |
|-----|-----|--------|
| `src/styles/global.css` | `src/styles/design-system/tokens.css` + `components/design-system/tokens.css` | Replace |
| `src/components/VocabCard.astro` | `src/components/learning/MarathiWordCard.astro` | Replace |
| `src/components/VocabTable.astro` | `src/components/learning/MarathiWordTable.astro` | Replace |
| `src/components/VocabTopicPage.astro` | `src/pages/vocabulary/[slug].astro` (new template) | Replace |
| `src/components/PhraseCard.astro` | (new) `src/components/learning/PhraseCard.astro` | New |
| `src/components/PhraseTable.astro` | (new) `src/components/learning/PhraseCard.astro` | Replace |
| `src/components/PhraseTopicPage.astro` | `src/pages/phrases/[slug].astro` | Replace |
| `src/components/GrammarTopicPage.astro` | `src/pages/grammar/[slug].astro` | Replace |
| `src/components/SayScript.astro` | `src/components/learning/AudioPlayer.astro` | Replace |
| `src/pages/index.astro` | `src/pages/index.astro` (PremiumHome) | Rewrite |
| `src/pages/vocabulary/[slug].astro` | New template | New |
| `src/pages/phrases/[slug].astro` | New template | New |
| `src/pages/grammar/[slug].astro` | New template | New |
| `src/pages/hindi-to-marathi/[slug].astro` | New template | New |
| `src/pages/english-to-marathi/[slug].astro` | New template | New |
| `src/pages/lessons/[unit].astro` | New template | Rewrite |

### 6.2 SEO Preservation Checklist
- [ ] All H1/H2/H3 hierarchy preserved
- [ ] Canonical URLs unchanged
- [ ] JSON-LD structured data preserved/enhanced
- [ ] Breadcrumbs preserved
- [ ] Internal links updated to new components
- [ ] Sitemap auto-generated (unchanged)
- [ ] hreflang preserved
- [ ] Meta titles/descriptions preserved
- [ ] Alt text for images preserved
- [ ] Structured data: LearningResource, FAQPage, BreadcrumbList
- [ ] Crawlable content (no JS-only content)
- [ ] Search index rebuilt post-migration

### 6.3 Accessibility Checklist
- [ ] Semantic HTML5 landmarks
- [ ] Heading hierarchy (h1→h2→h3)
- [ ] Focus-visible on all interactive
- [ ] ARIA labels on all icon buttons
- [ ] Audio controls accessible (play/pause/seek)
- [ ] Color contrast ≥ 4.5:1 (text), ≥ 3:1 (UI)
- [ ] Reduced motion respected
- [ ] Skip links functional
- [ ] Keyboard navigation: Tab, Enter, Space, Escape
- [ ] Screen reader labels on flip cards, audio, tables
- [ ] Form labels associated
- [ ] Language attributes on Devanagari content

---

## 7. IMPLEMENTATION SEQUENCE

### Phase 1: Design Tokens & Foundation (Day 1-2)
- [ ] Create `src/styles/design-system/tokens.css`
- [ ] Create `src/components/design-system/tokens.css` (barrel)
- [ ] Update `src/styles/global.css` to import tokens
- [ ] Add Mukta font (Google Fonts)
- [ ] Verify all existing pages render with new tokens

### Phase 2: Core Design System Components (Day 2-4)
- [ ] Button, Card, Badge, Avatar, Divider, Tooltip
- [ ] AudioPlayer (replaces SayScript)
- [ ] Input (Search, Select)
- [ ] Toast, LoadingSkeleton, EmptyState

### Phase 3: Learning Components (Day 4-6)
- [ ] MarathiWordCard (flip card)
- [ ] MarathiWordTable (enhanced)
- [ ] PhraseCard (conversational)
- [ ] AudioPlayer (full-featured)
- [ ] TranslationCard (Hindi→Marathi mapping)
- [ ] GrammarPattern
- [ ] ExampleSentence
- [ ] MiniQuiz
- [ ] PracticeCTA
- [ ] ProgressIndicator

### Phase 5: Homepage Redesign (Day 8-9)
- [ ] PremiumHero
- [ ] LearningPath visual
- [ ] Three entry CTAs
- [ ] Method section
- [ ] Discovery entry points

### Phase 6-8: Page Templates (Day 10-15)
- [ ] Vocabulary page template
- [ ] Phrase page template
- [ ] Grammar page template
- [ ] Hindi→Marathi bridge template
- [ ] Lesson page template

### Phase 9: Migration & Polish (Day 16-20)
- [ ] Apply templates to all 200 pages
- [ ] SEO verification
- [ ] Accessibility audit
- [ ] Mobile testing (320, 375, 390, 412, tablet, desktop)
- [ ] Performance budget check
- [ ] Cross-browser testing

---

## 8. QUALITY GATES

### Pre-commit (husky)
```json
{
  "lint-staged": {
    "*.{astro,ts,css}": ["prettier --write", "eslint --fix"],
    "*.md": ["prettier --write"]
  }
}
```

### CI Pipeline (GitHub Actions)
```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - npm ci
      - npm run build
      - npm run lint
      - npm run typecheck
      - npm run test:a11y    # axe-core
      - npm run test:visual  # playwright screenshots
      - npm run audit:images # existing hero audit
      - npm run audit:seo    # new: check structured data, headings
```

### Quality Gates Before Merge
| Metric | Threshold |
|--------|-----------|
| Build | ✅ Pass |
| TypeScript | ✅ No errors |
| ESLint | ✅ No warnings |
| Accessibility (axe) | ✅ 0 violations |
| Visual regression | ✅ < 1% pixel diff |
| Hero image audit | ✅ 100% semantic match |
| SEO structured data | ✅ Valid |
| Bundle size (JS) | < 100KB gzipped |
| LCP (mobile) | < 2.5s |
| CLS | < 0.1 |

---

## 9. PREMIUM_REDESIGN.md MAINTENANCE

This document lives at `PREMIUM_REDESIGN.md` in repo root.

**Update on:**
- Token changes
- New component additions
- Template modifications
- Migration progress
- QA findings

**Review cadence:** Weekly during implementation, then monthly.

---

## 10. ROLLBACK PLAN

If critical issues post-deploy:
1. `git revert` merge commit
2. Vercel/Netlify instant rollback to previous deploy
3. Feature flag: `PREMIUM_REDESIGN_ENABLED` env var (if needed)

---

## 11. STAKEHOLDER SIGN-OFF

| Role | Name | Sign-off |
|------|------|----------|
| Product Designer | | ☐ |
| Lead Engineer | | ☐ |
| SEO Specialist | | ☐ |
| Accessibility Lead | ☐ |
| Content Owner | | ☐ |

---

## 12. IMPLEMENTATION STATUS (living log)

Tracks what is actually shipped on `premium-redesign`. Update on every merge.

### Phase status

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1 | Design tokens (`src/styles/design-system/tokens.css`) | ✅ Done |
| 2 | Core learning components (`src/components/learning/*`) | ✅ Done |
| 2 | Layout components (`src/components/layout/*`) | ✅ Done |
| 3 | Homepage (`src/pages/index.astro`) | ✅ Done |
| 4 | Vocabulary page (`PremiumVocabPage`) | ✅ Done |
| 5 | Phrase page (`PremiumPhrasePage`) | ✅ Done |
| 6 | Grammar page (`PremiumGrammarPage`) | ✅ Done |
| 7 | Hindi → Marathi page (`PremiumHindiBridgePage`) | ✅ Done |
| 8 | Lesson page (`PremiumLessonPage`) | ✅ Done |
| 9 | Apply components across the site | 🟡 In progress |

### Component inventory

Shipped:
- `layout/PremiumHero.astro` — hero + stat cards + expanding divider
- `layout/LearningPath.astro` — clickable START→SPEAK journey
- `layout/EntryPoints.astro` — English / Hindi / Continue entry points
- `layout/RelatedLessons.astro` — "Continue learning" graph
- `layout/SectionNav.astro` — **sticky jump-to-section nav (scroll-spy)** ← new
- `learning/AudioPlayer.astro` — accessible audio, idle/playing/paused/loading/error
- `learning/MarathiWordCard.astro`, `MarathiWordTable.astro`
- `learning/PhraseCard.astro`, `TranslationCard.astro`
- `learning/GrammarPattern.astro`, `ExampleSentence.astro`
- `learning/PracticeCTA.astro` — contextual "Learn here. Practice in the app."

Spec components still open:
- `LessonHeader` (currently inline in each template — extract when a 3rd consumer appears)
- `MiniQuiz` (currently `components/QuickPractice.astro` serves this role)
- `ProgressIndicator` (site-wide `.scroll-progress` in `Base.astro`; per-lesson stepper TBD)
- `HindiBridgeCard` (currently `learning/TranslationCard.astro` serves this role)
- `SectionNav` extensions — blog + standalone pages

### SectionNav coverage (verified via `dist/`)

```
lessons ...................... 26 pages
vocabulary ................... 28 pages
phrases ...................... 9 pages
grammar ...................... 9 pages
hindi-to-marathi ............. + new
english-to-marathi ........... + new
TOTAL ........................ 109 pages
```

### Recent changes

- Homepage: full-width sections (removed the 720px `.prose` wrapper that squeezed content), stat cards, animated divider, "How do you want to learn?" section, Remember card → `/review/`.
- Vocabulary clusters: curated clusters migrated off legacy `VocabTable`/`VocabCard`/`AppCTA` onto premium components; data-driven and curated paths now share one visual grammar.
- Added sticky `SectionNav` to lesson, vocabulary, phrase, grammar, Hindi-bridge and English-path templates with `scroll-margin-top` anchor clearance.

### Component completion (round 2)

Closed the last three gaps in the brief's required component list (§20):

- **`MiniQuiz.astro`** — inline practice interaction. Progressive enhancement: SSR-renders crawlable questions, upgrades to an interactive check/continue flow with instant feedback, keyboard support and reduced-motion safety. Renders the website→app bridge card on completion.
- **`LessonHeader.astro`** — reusable unit/lesson header (marathi title, unit kicker, objective blurb, facts, optional progress bar, lesson rail). Now powers lesson pages; the page owns the single `<h1>`.
- **`HindiBridgeCard`** — covered by the audited `TranslationCard` (Hindi → Marathi → transliteration → English), which was missing its `AudioPlayer` import and is now fixed.

Wiring:
- Lesson pages get a **"Try saying it"** quiz built from the unit's own speaking sentences, jump-linked from the sticky `SectionNav`.
- `Learn.astro` gained a `hideHeading` prop so pages that render their own header suppress the layout H1.

### Bugs fixed (round 2)

- **Duplicate `<h1>` on every lesson page and 4 blog pages** (§18 SEO violation). Site-wide duplicate-H1 count is now **0**; every page has exactly one `<h1>`.
- **`TranslationCard.astro` referenced `<AudioPlayer>` without importing it** — latent runtime/build fault on Hindi-bridge pages.
- Removed orphaned CSS block left in `PremiumLessonPage.astro` during header refactor.

### Hero image semantic audit (round 3)

The earlier "hero doesn't match the page" problem was **worse than a naming typo**:
several `public/og/*.webp` files contain the artwork of a *different topic*
(a historical content rotation). Examples found by OCR:

| File | Topic its page expects | What the file actually shows |
|------|------------------------|------------------------------|
| `og-vocabulary-adjectives.webp` | Adjectives | Office & Work Words |
| `og-vocabulary-animals.webp` | Animals | Adjectives (68 words) |
| `og-vocabulary-food.webp` | Food | Adjectives (68 words) |
| `og-vocabulary-body-parts.webp` | Body parts | Abstract Words |
| `og-vocabulary-clothing.webp` | Clothing | Transport Words |
| `og-vocabulary-shopping.webp` | Shopping | Abstract Words |
| `og-phrases-thanking-apologizing.webp` | Thanking | Phone & Messaging |
| `og-phrases-presentations-interviews.webp` | Presentations | Thanking & Apologizing |
| `og-hindi-to-marathi-questions.webp` | Questions | Shopping/Bargaining |
| `og-hindi-to-marathi-festivals.webp` | Festivals | (travel art) |

**Fix:** `src/lib/art.ts` now holds a single `CONTENT_FIX` map that points every
affected route at a file whose **OCR-verified content** matches the page topic.
19 routes corrected (vocabulary ×6, phrases ×6, grammar ×2, hindi-bridge ×5).
Where no matching art exists (`clothing`, `making-plans`) a neutral,
topic-appropriate image is used instead of a wrong one.

**Audit tool:** `tools/hero-audit.mjs` (`npm run hero:audit`) walks every built
page, extracts its hero/webp + `og:image`, and compares the image's OCR text
against the page's topic using a controlled lexicon. It exits non-zero on any
content mismatch, so it works as a CI gate.

Result after fix:

```
Pages:                199
Explicit remaps:      23
Content/topic FAIL:   0     <-- every hero matches its page
```

### Verification

```bash
npm run build            # 200 pages, 0 errors
npm run hero:audit       # exit 0, 0 content/topic failures
# every built page has exactly one <h1>:
for f in $(find dist -name index.html); do c=$(grep -o '<h1' "$f" | wc -l); [ "$c" -gt 1 ] && echo "$c $f"; done   # (no output)
```

---

*Document version: 1.1 | Updated: 2026-09-28 | Branch: premium-redesign*