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
  waitlistSubject: 'Notify me — Bol Marathi launch',
  screenshots: [
    { src: '/screenshots/shot-listen.png', alt: 'Listen & pick quiz in Bol Marathi' },
    { src: '/screenshots/shot-feedback.png', alt: 'Instant right/wrong feedback after each answer' },
    { src: '/screenshots/shot-builder.png', alt: 'Sentence builder — arrange Marathi words in order' },
    { src: '/screenshots/shot-phrases.png', alt: 'Phrase collections — greetings, common phrases and more' },
    { src: '/screenshots/shot-settings.png', alt: 'Audio speed, microphone check, daily goal and reminders' },
  ],
  contactEmail: 'hello@bolmarathi.app',
};
