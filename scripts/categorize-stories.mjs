#!/usr/bin/env node
/**
 * Rewrite the `title:` prefix of every `*.stories.ts` file under
 * projects/ng-dijta/src/lib/components/ so the Storybook sidebar groups by
 * the 8 categories documented in stories/STORY_AUTHORING.md (Form Inputs,
 * Buttons, Data Display, Overlays, Layout, Feedback, Navigation, Utilities)
 * instead of one flat "Components" node.
 *
 * Mapping is by TOP-LEVEL component folder name. Stories whose title already
 * starts with one of the 8 categories are left alone.
 *
 * Usage:
 *   node scripts/categorize-stories.mjs           # dry-run, prints planned edits
 *   node scripts/categorize-stories.mjs --write   # writes changes
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'projects/ng-dijta/src/lib/components');
const WRITE = process.argv.includes('--write');

export const CATEGORY_BY_FOLDER = {
  // Form Inputs
  cascader: 'Form Inputs',
  dropdown: 'Form Inputs',
  'dx-autocomplete-select': 'Form Inputs',
  'dx-checkbox': 'Form Inputs',
  'dx-chip-autocomplete': 'Form Inputs',
  'dx-chip-select': 'Form Inputs',
  'dx-color-picker': 'Form Inputs',
  'dx-coordinates': 'Form Inputs',
  'dx-currency': 'Form Inputs',
  'dx-datepicker': 'Form Inputs',
  'dx-daterange': 'Form Inputs',
  'dx-datetime-picker': 'Form Inputs',
  'dx-dual-listbox': 'Form Inputs',
  'dx-email': 'Form Inputs',
  'dx-file-upload': 'Form Inputs',
  'dx-image-upload': 'Form Inputs',
  'dx-input': 'Form Inputs',
  'dx-input-chips': 'Form Inputs',
  'dx-input-company': 'Form Inputs',
  'dx-input-datepicker': 'Form Inputs',
  'dx-input-dob': 'Form Inputs',
  'dx-input-email': 'Form Inputs',
  'dx-input-icon': 'Form Inputs',
  'dx-input-label': 'Form Inputs',
  'dx-input-name': 'Form Inputs',
  'dx-input-phone': 'Form Inputs',
  'dx-input-url': 'Form Inputs',
  'dx-ip': 'Form Inputs',
  'dx-lookup': 'Form Inputs',
  'dx-multi-lookup': 'Form Inputs',
  'dx-number': 'Form Inputs',
  'dx-radio-button': 'Form Inputs',
  'dx-select': 'Form Inputs',
  'dx-server-side-autocomplete': 'Form Inputs',
  'dx-tag-input': 'Form Inputs',
  'dx-textarea': 'Form Inputs',
  'dx-time-picker': 'Form Inputs',
  'dx-toggle': 'Form Inputs',
  'dx-upload': 'Form Inputs',
  select: 'Form Inputs',

  // Buttons
  'dx-button': 'Buttons',
  'dx-floater-button': 'Buttons',

  // Data Display
  'dx-activity-calendar': 'Data Display',
  'dx-advance-filter': 'Data Display',
  'dx-avatar': 'Data Display',
  'dx-basic-tile': 'Data Display',
  'dx-canvas': 'Data Display',
  'dx-card': 'Data Display',
  'dx-chart': 'Data Display',
  'dx-chart-tile': 'Data Display',
  'dx-config-table': 'Data Display',
  'dx-criteria-filter': 'Data Display',
  'dx-kanban-view': 'Data Display',
  'dx-nested-table': 'Data Display',
  'dx-qrcode': 'Data Display',
  'dx-status': 'Data Display',
  'dx-table': 'Data Display',
  'dx-table-filter': 'Data Display',
  'dx-table-view-wrapper': 'Data Display',
  'dx-tag': 'Data Display',
  'dx-timeline': 'Data Display',
  'dx-tree': 'Data Display',
  'dx-tree-v2': 'Data Display',
  'dx-widget': 'Data Display',
  'image-preview': 'Data Display',
  tiles: 'Data Display',
  'tree-view': 'Data Display',

  // Overlays
  'dx-confirm': 'Overlays',
  'dx-drawer': 'Overlays',
  'dx-fullscreen': 'Overlays',
  'dx-icon-selection-popup': 'Overlays',
  'dx-notification': 'Overlays',
  'dx-popconfirm': 'Overlays',
  'dx-popover': 'Overlays',
  'dx-popup': 'Overlays',
  'dx-toastr': 'Overlays',
  'dx-tooltip': 'Overlays',
  'dx-upload-file-popup': 'Overlays',
  modal: 'Overlays',

  // Layout
  'dx-content': 'Layout',
  'dx-footer': 'Layout',
  'dx-header': 'Layout',
  'dx-layout': 'Layout',
  'dx-page': 'Layout',
  'dx-page-content-menu': 'Layout',
  'dx-section-title': 'Layout',
  'dx-sidebar': 'Layout',
  'dx-sticky': 'Layout',
  'dx-title': 'Layout',
  'dx-toggle-panel': 'Layout',

  // Feedback
  'dx-alert-message': 'Feedback',
  'dx-empty': 'Feedback',
  'dx-loader': 'Feedback',
  'dx-skeleton-loader': 'Feedback',
  loading: 'Feedback',

  // Navigation
  'dx-breadcrumb': 'Navigation',
  'dx-navigation-menu': 'Navigation',
  'dx-tab-group': 'Navigation',
  tab: 'Navigation',

  // Utilities
  'dx-qms-core-ui': 'Utilities',
};

const CATEGORIES = new Set([
  'Form Inputs',
  'Buttons',
  'Data Display',
  'Overlays',
  'Layout',
  'Feedback',
  'Navigation',
  'Utilities',
]);

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.isFile() && p.endsWith('.stories.ts')) out.push(p);
  }
  return out;
}

function topFolder(filePath) {
  const rel = path.relative(COMPONENTS_DIR, filePath);
  return rel.split(path.sep)[0];
}

function rewriteTitle(src, category) {
  // Match the meta-level `title: 'Components/...'` only — argTypes/args may
  // also have `title:` keys, but those use different prefixes (e.g. plain
  // strings like 'Sample' / 'Save'). We anchor to `Components/` to be safe.
  const re = /(title:\s*['"])Components\/([^'"]+)(['"])/;
  if (!re.test(src)) return null;
  return src.replace(re, (_m, lead, rest, trail) => `${lead}${category}/${rest}${trail}`);
}

async function main() {
  const files = await walk(COMPONENTS_DIR);
  const unmapped = new Set();
  const edits = [];

  for (const file of files) {
    const folder = topFolder(file);
    const category = CATEGORY_BY_FOLDER[folder];
    if (!category) {
      unmapped.add(folder);
      continue;
    }
    const src = await fs.readFile(file, 'utf8');
    // Already in a known category?
    const already = new RegExp(
      `title:\\s*['"](${[...CATEGORIES].map((c) => c.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})/`
    ).test(src);
    if (already) continue;
    const next = rewriteTitle(src, category);
    if (!next || next === src) continue;
    edits.push({ file, folder, category });
    if (WRITE) await fs.writeFile(file, next, 'utf8');
  }

  for (const e of edits) {
    console.log(`${e.category.padEnd(13)}  ${path.relative(ROOT, e.file)}`);
  }
  console.log(`\n${edits.length} files ${WRITE ? 'rewritten' : 'would be rewritten (use --write)'}.`);
  if (unmapped.size) {
    console.log(`\nWARNING — no category mapping for folder(s):`);
    for (const f of [...unmapped].sort()) console.log(`  ${f}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
