# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-quick.test.ts >> Quick visual check >> screenshot: vocab-adjectives
- Location: playwright-quick.test.ts:23:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('h1') with timeout 10000ms
  - waiting for locator('h1')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import fs from 'fs';
  3  | import path from 'path';
  4  | import { fileURLToPath } from 'url';
  5  | 
  6  | const __dirname = path.dirname(fileURLToPath(import.meta.url));
  7  | const DIST_DIR = path.resolve(__dirname, 'dist');
  8  | const BASE_URL = `file://${DIST_DIR}`;
  9  | 
  10 | // Pages to capture
  11 | const pages = [
  12 |   { url: '/', name: 'home' },
  13 |   { url: '/vocabulary/', name: 'vocab-index' },
  14 |   { url: '/vocabulary/adjectives/', name: 'vocab-adjectives' },
  15 |   { url: '/phrases/', name: 'phrases-index' },
  16 |   { url: '/hindi-to-marathi/', name: 'hindi-index' },
  17 | ];
  18 | 
  19 | test.describe('Quick visual check', () => {
  20 |   test.setTimeout(60000);
  21 |   
  22 |   for (const page of pages) {
  23 |     test(`screenshot: ${page.name}`, async ({ page: pwPage }) => {
  24 |       await pwPage.goto(`${BASE_URL}${page.url}`, { waitUntil: 'networkidle' });
  25 |       await pwPage.waitForLoadState('domcontentloaded');
  26 |       
  27 |       // Wait a bit for rendering
  28 |       await pwPage.waitForTimeout(2000);
  29 |       
  30 |       // Take full page screenshot
  31 |       await pwPage.screenshot({ 
  32 |         path: `playwright-screenshots/${page.name}.png`, 
  33 |         fullPage: true 
  34 |       });
  35 |       
  36 |       // Also take above-fold screenshot
  37 |       await pwPage.screenshot({ 
  38 |         path: `playwright-screenshots/${page.name}-above-fold.png`, 
  39 |         fullPage: false 
  40 |       });
  41 |       
  42 |       // Just verify page loaded
> 43 |       await expect(pwPage.locator('h1')).toBeVisible({ timeout: 10000 });
     |                                          ^ Error: expect(locator).toBeVisible() failed
  44 |     });
  45 |   }
  46 | });
```