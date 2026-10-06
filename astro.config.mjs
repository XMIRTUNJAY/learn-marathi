// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://xmirtunjay.github.io/learn-marathi/
// (Same pattern as engineering-notebook. For a custom domain / Vercel,
// set site to the domain and drop `base`.)
//
// Sitemap freshness: @astrojs/sitemap does not emit <lastmod> by default.
// We stamp every URL with the build date so crawlers get a recency signal on
// each deploy. (A per-file git-date would be more granular but requires a
// git dependency at build time; the CI build does not have one.)
const buildDate = new Date().toISOString();

export default defineConfig({
	site: 'https://xmirtunjay.github.io',
	base: '/learn-marathi',
	trailingSlash: 'always',
	integrations: [
		mdx(),
		sitemap({
			serialize(item) {
				return { ...item, lastmod: buildDate };
			},
		}),
	],
	viewTransitions: true,
});
