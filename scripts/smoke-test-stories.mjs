#!/usr/bin/env node
/**
 * Smoke-test every story registered in a running Storybook.
 *
 * Loads http://localhost:6006/index.json, then for every entry of type
 * "story" navigates a headless Chromium to iframe.html?id=<id>&viewMode=story
 * and checks:
 *
 *   - the #storybook-root element ends up with at least one rendered child
 *   - no console errors or uncaught page errors fire while the story is open
 *
 * Reports per-story pass/fail plus a summary. Exits non-zero if any story
 * fails so the script is CI-friendly.
 *
 * Usage:
 *   node scripts/smoke-test-stories.mjs               # against :6006
 *   STORYBOOK_URL=http://localhost:6007 node ...      # custom URL
 *   STORY_LIMIT=20 node ...                           # smoke-test first 20
 */
import { chromium } from 'playwright';

const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006';
const STORY_LIMIT = process.env.STORY_LIMIT ? Number(process.env.STORY_LIMIT) : Infinity;
// STORY_FILTER is a case-insensitive substring or /regex/ match against the
// story id; only matching stories are tested. Example:
//   STORY_FILTER=select node scripts/smoke-test-stories.mjs
//   STORY_FILTER='/(select|table)/i' node ...
const STORY_FILTER = (() => {
  const raw = process.env.STORY_FILTER;
  if (!raw) return null;
  const re = raw.match(/^\/(.+)\/([gimsuy]*)$/);
  return re ? new RegExp(re[1], re[2]) : new RegExp(raw, 'i');
})();
const PER_STORY_TIMEOUT_MS = 8000;
const NAV_TIMEOUT_MS = 15000;

// Console error patterns that are noisy/known-irrelevant and should NOT
// fail a story. Add sparingly.
const IGNORABLE_ERROR_PATTERNS = [
  /Failed to load resource.*fonts\.googleapis/i,
  /404.*\.woff2/i,
  /Synchronous XMLHttpRequest/i,
];

function isIgnorable(message) {
  return IGNORABLE_ERROR_PATTERNS.some((re) => re.test(message));
}

async function fetchIndex() {
  const res = await fetch(`${STORYBOOK_URL}/index.json`);
  if (!res.ok) throw new Error(`GET /index.json -> HTTP ${res.status}`);
  return res.json();
}

async function checkStory(page, id) {
  const url = `${STORYBOOK_URL}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`;
  const errors = [];

  const onConsole = (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (!isIgnorable(text)) errors.push(`console.error: ${text}`);
  };
  const onPageError = (err) => {
    const text = err?.message || String(err);
    if (!isIgnorable(text)) errors.push(`pageerror: ${text}`);
  };
  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  let rendered = false;
  let navError = null;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
    rendered = await page
      .waitForFunction(
        () => {
          const root =
            document.querySelector('#storybook-root') ||
            document.querySelector('#root');
          if (!root) return false;
          // Storybook injects "No Preview" / error pages with known classes when
          // a story fails to load.
          if (root.querySelector('.sb-show-errordisplay, .sb-errordisplay'))
            return false;
          return root.children.length > 0;
        },
        null,
        { timeout: PER_STORY_TIMEOUT_MS }
      )
      .then(() => true)
      .catch(() => false);
  } catch (e) {
    navError = e.message;
  }

  page.off('console', onConsole);
  page.off('pageerror', onPageError);

  return { id, rendered, navError, errors };
}

async function main() {
  console.log(`Smoke-testing stories at ${STORYBOOK_URL}\n`);
  const index = await fetchIndex();
  const allStories = Object.values(index.entries).filter((e) => e.type === 'story');
  const filtered = STORY_FILTER
    ? allStories.filter((s) => STORY_FILTER.test(s.id))
    : allStories;
  const stories = filtered.slice(0, STORY_LIMIT);
  const filterNote = STORY_FILTER ? ` (filter: ${STORY_FILTER})` : '';
  console.log(`Found ${allStories.length} stories. Testing ${stories.length}${filterNote}.\n`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 720 } });
  const page = await ctx.newPage();

  const fails = [];
  const blanks = [];
  let pass = 0;

  let i = 0;
  for (const story of stories) {
    i += 1;
    const r = await checkStory(page, story.id);
    const status = r.rendered && r.errors.length === 0 ? 'PASS' : r.rendered ? 'WARN' : 'FAIL';
    if (status === 'PASS') pass += 1;
    else if (status === 'FAIL') {
      fails.push(r);
      if (!r.rendered) blanks.push(r.id);
    } else {
      fails.push(r);
    }
    if (i % 25 === 0 || i === stories.length) {
      process.stdout.write(
        `\r[${i}/${stories.length}] pass=${pass} fail=${fails.length}   `
      );
    }
  }
  process.stdout.write('\n\n');

  await browser.close();

  console.log(`Summary: ${pass} pass / ${fails.length} fail (of ${stories.length})\n`);

  if (fails.length) {
    const groupBlank = fails.filter((f) => !f.rendered);
    const groupErr = fails.filter((f) => f.rendered && f.errors.length);
    if (groupBlank.length) {
      console.log(`Blank render (${groupBlank.length} stories):`);
      for (const f of groupBlank.slice(0, 50)) {
        console.log(`  - ${f.id}${f.navError ? `  [nav: ${f.navError}]` : ''}`);
      }
      if (groupBlank.length > 50) console.log(`  ... and ${groupBlank.length - 50} more`);
      console.log();
    }
    if (groupErr.length) {
      console.log(`Rendered with errors (${groupErr.length} stories, first 30):`);
      for (const f of groupErr.slice(0, 30)) {
        console.log(`  - ${f.id}`);
        for (const e of f.errors.slice(0, 2)) console.log(`      ${e.slice(0, 200)}`);
      }
      if (groupErr.length > 30) console.log(`  ... and ${groupErr.length - 30} more`);
    }
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
