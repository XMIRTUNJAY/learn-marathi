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
  // Waitlist: mailto CTA on /app/ ("Join the waitlist"). Set this to a
  // monitored inbox — every waitlist click opens an email to this address.
  contactEmail: 'mrxubr@gmail.com',
  waitlistSubject: 'Notify me — Bol Marathi launch',
  // App walkthrough in tab-flow order: Learn → Practice → Progress → Profile.
  screenshots: [
    { src: '/screenshots/flow-learn.png', alt: 'Learn home — daily goal, continue learning and due reviews', step: '1 · Learn' },
    { src: '/screenshots/flow-practice.png', alt: 'Practice Hub — retention stats, recommendations and practice modes', step: '2 · Practice' },
    { src: '/screenshots/flow-progress.png', alt: 'Progress — streak, XP, weekly practice and skill map', step: '3 · Progress' },
    { src: '/screenshots/flow-profile.png', alt: 'Profile — badges, app language and audio settings', step: '4 · Profile' },
  ] as { src: string; alt: string; step: string }[],
  contactEmail: 'mrxubr@gmail.com',
};
