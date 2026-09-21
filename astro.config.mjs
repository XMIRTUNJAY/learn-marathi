// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://xmirtunjay.github.io/learn-marathi/
// (Same pattern as engineering-notebook. For a custom domain / Vercel,
// set site to the domain and drop `base`.)
export default defineConfig({
	site: 'https://xmirtunjay.github.io',
	base: '/learn-marathi',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
	viewTransitions: true,
});
