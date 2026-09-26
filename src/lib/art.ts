// Visible page art. Uses WebP with PNG fallback for OG/social.
// LQIP uses WebP for tiny blur-up placeholders.
import { siteUrl } from './site';
import lqipManifest from '../data/lqip.json';

export function pageArt(route: string): string {
  const base = route === '' ? 'og-home' : `og-${route.replace(/\//g, '-')}`;
  return siteUrl(`/og/${base}.webp`);
}

export function pageArtPng(route: string): string {
  const base = route === '' ? 'og-home' : `og-${route.replace(/\//g, '-')}`;
  return siteUrl(`/og/${base}.png`);
}

export function pageLQIP(route: string): string {
  const base = route === '' ? 'og-home' : `og-${route.replace(/\//g, '-')}`;
  return (lqipManifest as Record<string, string>)[`${base}.webp`] ?? '';
}
