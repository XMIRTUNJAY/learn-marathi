// Bol Marathi app funnel config — single place to update on launch.
// The app is NOT on the Play Store yet: keep playStoreUrl null and
// comingSoon true. Once hosted, set playStoreUrl + comingSoon: false
// (+ optional screenshots) and every CTA updates with no template edits.
export const BOL_MARATHI_APP = {
  name: 'Bol Marathi',
  tagline: 'Learn Marathi from Hindi — words, phrases, listening, speaking.',
  // e.g. 'https://play.google.com/store/apps/details?id=com.bolmarathi.app'
  playStoreUrl: null as string | null,
  appStoreUrl: null as string | null,
  waitlistUrl: null as string | null,
  comingSoon: true,
  comingSoonNote: 'Bol Marathi is in closed testing and coming soon to Android.',
  // Waitlist: footer CTA is an inline form posting here; everywhere
  // else stays mailto (deliberate A/B split). Paste a Formspree
  // endpoint (https://formspree.io → New Form → copy
  // https://formspree.io/f/xxxxxx). Empty = footer shows mailto too.
  // See README "Waitlist". Monitored inbox for mailto path:
  contactEmail: 'mrxubr@gmail.com',
  waitlistFormAction: 'https://formspree.io/f/xqpaeejw',
  // Privacy-friendly analytics (Plausible/Umami): paste the tracker
  // script URL here (e.g. https://plausible.io/js/script.js). Empty =
  // no tracker loads. Extra attributes (data-domain / data-website-id)
  // go in analyticsAttrs.
  analyticsScript: '',
  analyticsAttrs: {} as Record<string, string>,
  waitlistSubject: 'Notify me — Bol Marathi launch',
  // App walkthrough in tab-flow order: Learn → Practice → Progress → Profile.
  screenshots: [
    { src: '/screenshots/flow-learn.webp', alt: 'Learn home — daily goal, continue learning and due reviews', step: '1 · Learn' },
    { src: '/screenshots/flow-practice.webp', alt: 'Practice Hub — retention stats, recommendations and practice modes', step: '2 · Practice' },
    { src: '/screenshots/flow-progress.webp', alt: 'Progress — streak, XP, weekly practice and skill map', step: '3 · Progress' },
    { src: '/screenshots/flow-profile.webp', alt: 'Profile — badges, app language and audio settings', step: '4 · Profile' },
  ] as { src: string; alt: string; step: string }[],
};
