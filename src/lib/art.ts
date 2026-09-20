// Visible page art. Same files as OG images (public/og/) — one asset,
// two jobs: social card + on-page thumbnail/banner. Falls back to the
// section card, then the brand default. All art is lazy-loaded by callers.
import { siteUrl } from './site';

export function pageArt(route: string): string {
  const file = route === '' ? 'og-home.png' : `og-${route.replace(/\//g, '-')}.png`;
  return siteUrl(`/og/${file}`);
}
