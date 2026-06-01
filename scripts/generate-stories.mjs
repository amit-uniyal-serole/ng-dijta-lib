#!/usr/bin/env node
/**
 * Generate baseline `*.stories.ts` files for every dx-* component, including
 * subfolder components. Idempotent: skips components that already have a story.
 *
 * Per-component output:
 *   - moduleMetadata importing the component's owning NgModule (same-folder
 *     `*.module.ts` containing `declarations: [<ComponentName>]`, walking up
 *     parent folders if not found)
 *   - argTypes for every @Input() (control type inferred from TS type)
 *   - action argType for every @Output()
 *   - A `Default` story
 *
 * Limitations (acceptable for a baseline):
 *   - Required inputs (`@Input() foo!: string`) get no default arg — Storybook
 *     will render the component with `undefined` and many templates `*ngIf` over
 *     them, so the canvas may look empty. Hand-tune the Default story afterwards.
 *   - Complex object inputs get `control: 'object'`.
 *   - Components with no resolvable module are skipped with a console warning.
 *
 * Usage:
 *   node scripts/generate-stories.mjs
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORY_BY_FOLDER } from './categorize-stories.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'projects/ng-dijta/src/lib/components');

const skipped = [];
const generated = [];
const preExisting = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.isFile()) files.push(p);
  }
  return files;
}

function inferControl(type) {
  if (!type) return { control: 'object' };
  const t = type.trim();
  if (t === 'boolean' || t === 'BooleanInput') return { control: 'boolean' };
  if (t === 'string') return { control: 'text' };
  if (t === 'number') return { control: 'number' };
  // Literal-union of strings? e.g. "'a' | 'b' | ''"
  const literalUnion = t.match(/^(['"][^'"]*['"]\s*(\|\s*['"][^'"]*['"]\s*)+)$/);
  if (literalUnion) {
    const options = [...t.matchAll(/['"]([^'"]*)['"]/g)].map((m) => m[1]);
    return { control: { type: 'inline-radio' }, options };
  }
  if (t === 'TemplateRef<any>' || /TemplateRef</.test(t)) return null; // no control
  return { control: 'object' };
}

function escapeStringForTs(s) {
  // Single-quoted TS string: collapse whitespace, escape backslash and quotes.
  const collapsed = String(s).replace(/\s+/g, ' ').trim();
  return collapsed.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function normalizeType(t) {
  if (!t) return t;
  return t.replace(/\s+/g, ' ').trim().slice(0, 120);
}

/**
 * Parse a component .ts source. Returns:
 *   { className, selector, inputs: [{ name, type, default, required }], outputs: [{ name, type }] }
 */
function parseComponent(src) {
  const classMatch = src.match(/export\s+class\s+([A-Z][A-Za-z0-9_]*Component)(<[^>]+>)?/);
  if (!classMatch) return null;
  const className = classMatch[1];
  const isGeneric = !!classMatch[2];
  const selectorMatch = src.match(/@Component\(\s*{[\s\S]*?selector:\s*['"]([^'"]+)['"]/);
  const selector = selectorMatch ? selectorMatch[1] : null;

  const inputs = [];
  const seenInputs = new Set();
  const RESERVED_NAMES = new Set(['public', 'private', 'protected', 'static', 'readonly', 'override']);
  // Property-style: @Input() [public|private|protected] [readonly] name(!|? ): Type = default;
  const inputPropRe = /@Input\(\)\s+(?:(?:public|private|protected|static|readonly|override)\s+)*([a-zA-Z_$][\w$]*)(!|\?)?\s*(?::\s*([^=;]+?))?\s*(?:=\s*([^;]+?))?\s*;/g;
  let m;
  while ((m = inputPropRe.exec(src))) {
    const [, name, marker, rawType, rawDefault] = m;
    if (!name || RESERVED_NAMES.has(name) || seenInputs.has(name)) continue;
    seenInputs.add(name);
    inputs.push({
      name,
      type: rawType?.trim() ?? null,
      default: rawDefault?.trim() ?? null,
      required: marker === '!' && rawDefault == null,
    });
  }
  // Setter-style: @Input() set name(value: Type) { ... }
  const inputSetterRe = /@Input\(\)\s+set\s+([a-zA-Z_$][\w$]*)\s*\(\s*[^:)]+:\s*([^)]+?)\)/g;
  while ((m = inputSetterRe.exec(src))) {
    const [, name, rawType] = m;
    if (!name || RESERVED_NAMES.has(name) || seenInputs.has(name)) continue;
    seenInputs.add(name);
    inputs.push({ name, type: rawType.trim(), default: null, required: false });
  }
  // Decorator-on-its-own-line + next-line variants
  const inputLineRe = /@Input\(\)\s*\n\s*(?:(?:public|private|protected|static|readonly|override)\s+)*([a-zA-Z_$][\w$]*)(!|\?)?\s*(?::\s*([^=;]+?))?\s*(?:=\s*([^;]+?))?\s*;/g;
  while ((m = inputLineRe.exec(src))) {
    const [, name, marker, rawType, rawDefault] = m;
    if (!name || RESERVED_NAMES.has(name) || seenInputs.has(name)) continue;
    seenInputs.add(name);
    inputs.push({
      name,
      type: rawType?.trim() ?? null,
      default: rawDefault?.trim() ?? null,
      required: marker === '!' && rawDefault == null,
    });
  }

  const outputs = [];
  const seenOutputs = new Set();
  const outputRe = /@Output\(\)\s+(?:(?:public|private|protected|static|readonly|override)\s+)*([a-zA-Z_$][\w$]*)(?:\s*:\s*EventEmitter<([^>]+)>)?/g;
  while ((m = outputRe.exec(src))) {
    const [, name, payload] = m;
    if (!name || RESERVED_NAMES.has(name) || seenOutputs.has(name)) continue;
    seenOutputs.add(name);
    outputs.push({ name, payload: payload?.trim() ?? null });
  }

  return { className, isGeneric, selector, inputs, outputs };
}

/**
 * Detect which `<ng-content select="dx-X">` slots a component's template
 * projects. Returns a sorted set of slot names — only those actually present
 * in the markup are returned. Used by buildStorySource() to emit a
 * `WithSlots` story that fills each detected slot.
 */
async function detectProjectionSlots(componentFile) {
  const htmlPath = componentFile.replace(/\.component\.ts$/, '.component.html');
  let html;
  try { html = await fs.readFile(htmlPath, 'utf8'); } catch { return []; }
  const slots = new Set();
  const re = /ng-content\s+select="(dx-(?:label|prefix|suffix|hint|error))"/g;
  let m;
  while ((m = re.exec(html))) slots.add(m[1]);
  // Stable order matches the visual order most consumers want.
  return ['dx-label', 'dx-prefix', 'dx-suffix', 'dx-hint', 'dx-error'].filter((s) => slots.has(s));
}

/**
 * Pattern 2 fix: pre-build a workspace-wide map of every declared component
 * class -> its owning NgModule file. Old approach only walked parent folders;
 * many ng-dijta modules declare components from sibling/distant folders, so
 * the parent-walk missed them and Storybook rendered NG0304 "is not a known
 * element".
 */
async function buildComponentToModuleMap(allFiles) {
  const map = new Map(); // ComponentClassName -> { className, filePath }
  const moduleFiles = allFiles.filter((p) => p.endsWith('.module.ts'));
  for (const p of moduleFiles) {
    const src = await fs.readFile(p, 'utf8');
    const modClassMatch = src.match(/export\s+class\s+([A-Z][A-Za-z0-9_]*Module)/);
    if (!modClassMatch) continue;
    const moduleClassName = modClassMatch[1];
    // Pull contents of every declarations: [...] array in the file
    const declRe = /declarations\s*:\s*\[([^\]]*)\]/g;
    let m;
    while ((m = declRe.exec(src))) {
      const names = m[1]
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter((s) => /^[A-Z][A-Za-z0-9_]*Component$/.test(s));
      for (const name of names) {
        if (!map.has(name)) map.set(name, { className: moduleClassName, filePath: p });
      }
    }
  }
  return map;
}

function relImport(fromFile, toFile) {
  let rel = path.relative(path.dirname(fromFile), toFile).replace(/\\/g, '/');
  rel = rel.replace(/\.ts$/, '');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function buildArgTypes(inputs, outputs) {
  const lines = [];
  for (const inp of inputs) {
    const normalized = normalizeType(inp.type);
    const ctrl = inferControl(normalized);
    if (!ctrl) continue;
    const desc = normalized ? `Type: \`${normalized}\`.` : '';
    let entry = `    ${inp.name}: { `;
    if (ctrl.control === 'boolean') entry += `control: 'boolean'`;
    else if (ctrl.control === 'text') entry += `control: 'text'`;
    else if (ctrl.control === 'number') entry += `control: 'number'`;
    else if (ctrl.control === 'object') entry += `control: 'object'`;
    else if (typeof ctrl.control === 'object' && ctrl.control.type === 'inline-radio') {
      entry += `control: { type: 'inline-radio' }, options: ${JSON.stringify(ctrl.options)}`;
    }
    if (desc) entry += `, description: '${escapeStringForTs(desc)}'`;
    entry += ` },`;
    lines.push(entry);
  }
  for (const out of outputs) {
    lines.push(`    ${out.name}: { action: '${out.name}' },`);
  }
  return lines.join('\n');
}

/**
 * Match an input to a fixture from _mock-data.ts. CONSERVATIVE: require both
 * the input name AND a strong type signal (not just one) — passing the wrong
 * shape at runtime causes a different crash than passing undefined / {}.
 *
 * If you want broader fixture coverage, hand-tune the story rather than
 * widening these rules — the cost of false positives across 260+ stories is
 * higher than the cost of fixture-less defaults.
 */
function pickFixture(name, rawType) {
  const t = (normalizeType(rawType) || '');
  const tl = t.toLowerCase();
  const n = (name || '').toLowerCase();
  const isArray = /\[\]\s*$/.test(t) || /^Array</.test(t) || /^ReadonlyArray</.test(t);

  // Require name match AND a type that's either an array OR contains the
  // shape keyword. String / boolean / number scalar inputs never match a
  // fixture — they get the type-aware default in safeDefaultForType.
  const isScalar = /^string\b/.test(tl) || /^number\b/.test(tl) || /^boolean\b/.test(tl);
  if (isScalar) return null;

  // Highly specific shape pairings — name AND type must both signal the shape.
  if ((n === 'columns' || n === 'columnsdef') && isArray && /column/i.test(t)) return 'mockColumns';
  if ((n === 'breadcrumbs' || n === 'breadcrumb') && /breadcrumb/i.test(t)) return 'mockBreadcrumbs';
  if ((n === 'cards' || n === 'kanbancards') && isArray && /(card|kanban)/i.test(t)) return 'mockKanbanCards';
  if ((n === 'timeline' || n === 'events') && isArray && /(timeline|event)/i.test(t)) return 'mockTimelineEvents';
  if (n === 'notifications' && isArray && /notification/i.test(t)) return 'mockNotifications';
  if ((n === 'menulist' || n === 'menuitems') && isArray && /menu/i.test(t)) return 'mockMenuItems';
  if ((n === 'tags') && isArray && /tag/i.test(t)) return 'mockTags';
  if (n === 'files' && isArray && /file/i.test(t)) return 'mockFiles';
  if (n === 'users' && isArray && /user/i.test(t)) return 'mockUsers';
  if (n === 'options' && isArray && /option/i.test(t)) return 'mockOptions';
  if ((n === 'rows' || n === 'records' || n === 'datasource') && isArray) return 'mockRows';

  // Singular fixtures — also strict
  if (n === 'user' && /user/i.test(t) && !isArray) return 'mockUser';
  if (n === 'card' && /card/i.test(t) && !isArray) return 'mockKanbanCard';
  if (n === 'file' && /file/i.test(t) && !isArray) return 'mockFile';

  return null;
}

/**
 * Pattern 1 fix: for a REQUIRED input with no declared default, emit a safe
 * placeholder so the component's ngOnInit / template doesn't blow up on .map,
 * .length, destructuring, etc. We can't synthesise specific fields (card.id)
 * but a typed empty value unblocks the common iterate/spread/check patterns.
 */
function safeDefaultForType(rawType) {
  const t = normalizeType(rawType);
  if (!t) return null;
  if (/\[\]\s*$/.test(t) || /^Array</.test(t) || /^ReadonlyArray</.test(t)) return '[]';
  if (t === 'string' || /^string\b/.test(t)) return "'Sample'";
  if (t === 'boolean' || t === 'BooleanInput' || /^boolean\b/.test(t)) return 'false';
  if (t === 'number' || /^number\b/.test(t)) return '0';
  // Literal-string union — use the first option
  const litOpts = [...t.matchAll(/['"]([^'"]*)['"]/g)].map((m) => m[1]);
  if (litOpts.length) return `'${litOpts[0].replace(/'/g, "\\'")}'`;
  // Function-shaped type
  if (/^\(.*\)\s*=>/.test(t) || /^Function\b/.test(t)) return '() => undefined';
  // TemplateRef — skip; can't synthesise
  if (/TemplateRef</.test(t) || /EventEmitter</.test(t)) return null;
  // Everything else (object / interface / class) — plain empty object. The
  // outer `Meta<any>` typing makes args loosely typed, so no `as any` cast
  // is needed. Casts break Storybook's acorn-based static story indexer.
  return '{}';
}

/**
 * Name+type combinations that should default to a sensible non-empty sample.
 * Limited to a few cases where the shape AND intent are clear (selectable
 * options, menu items) so the canvas isn't empty out of the box.
 */
function specificSampleForInput(name, rawType) {
  const t = normalizeType(rawType) || '';
  if (name === 'options' && /KeyValueModel\[\]|KeyValue\[\]|Option\[\]/.test(t)) {
    return `[
      { keyTt: 'option-1', valueTt: 'Option 1' },
      { keyTt: 'option-2', valueTt: 'Option 2' },
      { keyTt: 'option-3', valueTt: 'Option 3' },
    ]`;
  }
  return null;
}

function buildArgs(inputs) {
  const lines = [];
  // Note: auto-fixture matching (pickFixture) was attempted but produced a
  // net-negative impact at smoke-test scale — passing the wrong shape at
  // runtime caused different crashes than the type-aware default. The
  // fixtures in _mock-data.ts remain valuable as a hand-author resource;
  // import them explicitly when you tune individual stories.
  const fixtures = new Set();
  for (const inp of inputs) {
    const t = normalizeType(inp.type);
    // Path 0: specific name+type matches (e.g. options: KeyValueModel[])
    const sample = specificSampleForInput(inp.name, inp.type);
    if (sample) {
      lines.push(`    ${inp.name}: ${sample},`);
      continue;
    }
    // Path A: declared default exists — re-emit when types match.
    if (inp.default != null) {
      const d = inp.default;
      if (d === 'true' || d === 'false') {
        if (!t || /^boolean\b/.test(t) || t === 'BooleanInput') {
          lines.push(`    ${inp.name}: ${d},`);
          continue;
        }
      } else if (/^-?\d+(\.\d+)?$/.test(d)) {
        if (!t || /^number\b/.test(t)) {
          lines.push(`    ${inp.name}: ${d},`);
          continue;
        }
      } else if (/^['"][^'"]*['"]$/.test(d)) {
        const literalVal = d.slice(1, -1);
        if (!t || /^string\b/.test(t)) {
          lines.push(`    ${inp.name}: ${d},`);
          continue;
        }
        const literalOpts = [...t.matchAll(/['"]([^'"]*)['"]/g)].map((m) => m[1]);
        if (literalOpts.length && literalOpts.includes(literalVal)) {
          lines.push(`    ${inp.name}: ${d},`);
          continue;
        }
      }
    }
    // Path B: NO declared default — synthesise a type-aware placeholder for
    // EVERY input (not just required ones) so Storybook's Controls panel
    // populates with concrete values and the canvas shows the component in
    // a non-empty state. TemplateRef / EventEmitter inputs are skipped.
    const placeholder = safeDefaultForType(inp.type);
    if (placeholder != null) {
      lines.push(`    ${inp.name}: ${placeholder},`);
    }
  }
  return { argsBody: lines.join('\n'), fixtures: [...fixtures] };
}

function buildStorySource({
  storyTitle,
  componentClassName,
  isGeneric,
  componentImportPath,
  moduleClassName,
  moduleImportPath,
  inputs,
  outputs,
  needsAnimations,
  selector,
  isControlValueAccessor,
  relImportToMockData,
  relImportToLabelDirective,
  projectionSlots,
  supportsOuterLabel,
}) {
  const typeRef = 'any';
  void componentClassName; void isGeneric;
  const argTypes = buildArgTypes(inputs, outputs);
  const { argsBody: args, fixtures } = buildArgs(inputs);
  const animationsImport = needsAnimations
    ? `import { provideAnimations } from '@angular/platform-browser/animations';\n`
    : '';
  const animationsProvider = needsAnimations ? `\n      providers: [provideAnimations()],` : '';
  // Import every fixture the story actually uses, from the central
  // _mock-data.ts library. Component folders nest 1..5 deep under
  // src/lib/components, so we compute the relative path each time.
  const mockImport = fixtures.length
    ? `import { ${fixtures.join(', ')} } from '${relImportToMockData}';\n`
    : '';

  // Build a string of [input]="input" property bindings for the template.
  // Custom render() stories need this — without it, the args spread into
  // props but never reaches the component's inputs, so changing a control
  // in Storybook's UI has no effect on the canvas.
  // EventEmitter / TemplateRef outputs are excluded (handled separately).
  const inputBindings = inputs
    .filter((i) => i.name && !/^(id)$/.test(i.name))
    .map((i) => `[${i.name}]="${i.name}"`)
    .join(' ');

  // Pattern 3 fix: ControlValueAccessor components (`NG_VALUE_ACCESSOR` provider
  // OR injecting `NgControl`) require a form parent or they throw
  // `NullInjectorError: No provider for NgControl`. Render them inside a
  // reactive form host with a single bound FormControl so they can resolve
  // their value accessor.
  let formImport = '';
  let formProvider = '';
  let renderBlock = '';
  if (isControlValueAccessor && selector) {
    formImport = `import { FormControl, ReactiveFormsModule } from '@angular/forms';\n`;
    formProvider = `, ReactiveFormsModule`;
    // For components that project a dx-label slot, include a basic label
    // by default so the canvas shows a meaningfully-decorated control even
    // on the Default story. When the component also supports
    // outline='outer-label', also project the [dxLabel] sibling — the
    // component's own CSS toggles which label is visible based on the
    // outline mode (both inside dx-select; not external siblings, because
    // the [dxLabel] ng-content selector only sees child light-DOM nodes).
    const slotChildren = [];
    if (supportsOuterLabel) slotChildren.push('<p dxLabel>Field label</p>');
    if (projectionSlots && projectionSlots.includes('dx-label')) slotChildren.push('<dx-label>Field label</dx-label>');
    const defaultLabel = slotChildren.length
      ? `\n      ${slotChildren.join('\n      ')}\n    `
      : '';
    renderBlock = `

export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: \`<${selector} [formControl]="control" ${inputBindings}>${defaultLabel}</${selector}>\`,
  }),
};
`;
  }

  // dx-label / [dxLabel] is a standalone directive. Stories that emit
  // WithSlots or WithOuterLabel use it inside the projected content (or as a
  // sibling), so the directive class must be present in the story's
  // moduleMetadata.imports — otherwise the <dx-label> element is treated as
  // an unknown HTML tag and its content never appears in the canvas.
  let labelDirectiveImport = '';
  let labelDirectiveProvider = '';
  const needsLabelDirective =
    (projectionSlots && projectionSlots.includes('dx-label')) || supportsOuterLabel;
  if (needsLabelDirective) {
    labelDirectiveImport = `import { DxLabelDirective } from '${relImportToLabelDirective}';\n`;
    labelDirectiveProvider = `, DxLabelDirective`;
  }

  // WithSlots story — emitted when the component's template projects any of
  // dx-label / dx-prefix / dx-suffix / dx-hint / dx-error (or the outer
  // `[dxLabel]` directive). Slots are always rendered (Angular content
  // projection captures children at view-create time and doesn't re-run for
  // *ngIf/@if-toggled children — so conditional projection silently fails).
  // To hide a slot, clear its text control in the Controls panel.
  let withSlotsBlock = '';
  const hasAnySlot =
    (projectionSlots && projectionSlots.length) || supportsOuterLabel;
  if (hasAnySlot && selector) {
    const slotArgs = [];
    const slotArgTypes = [];
    const outerBlocks = [];
    const innerBlocks = [];

    if (supportsOuterLabel) {
      slotArgs.push(`    outerLabelText: 'Field label'`);
      slotArgTypes.push(
        `    outerLabelText: { control: 'text', description: '<p dxLabel> outer-label text. Visible when outline = "outer-label". Clear to hide.', table: { category: 'Slots' } }`
      );
      // `<p dxLabel>` is projected as a CHILD of the host via
      // <ng-content select="[dxLabel]">. It's NOT a sibling — the
      // component's own template places its outer-mat-label position.
      innerBlocks.push(`<p dxLabel>{{ outerLabelText }}</p>`);
    }

    if (projectionSlots.includes('dx-label')) {
      slotArgs.push(`    labelText: 'Field label'`);
      slotArgTypes.push(
        `    labelText: { control: 'text', description: '<dx-label> inline label text. Clear to hide.', table: { category: 'Slots' } }`
      );
      innerBlocks.push(`<dx-label>{{ labelText }}</dx-label>`);
    }
    if (projectionSlots.includes('dx-prefix')) {
      slotArgs.push(`    prefixIcon: 'home'`);
      slotArgTypes.push(
        `    prefixIcon: { control: 'text', description: '<dx-prefix> Material Icons name. Clear to hide.', table: { category: 'Slots' } }`
      );
      innerBlocks.push(
        `<dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>`
      );
    }
    if (projectionSlots.includes('dx-suffix')) {
      slotArgs.push(`    suffixIcon: 'help'`);
      slotArgTypes.push(
        `    suffixIcon: { control: 'text', description: '<dx-suffix> Material Icons name. Clear to hide.', table: { category: 'Slots' } }`
      );
      innerBlocks.push(
        `<dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>`
      );
    }
    if (projectionSlots.includes('dx-hint')) {
      slotArgs.push(`    hintText: 'Helper text for the field.'`);
      slotArgTypes.push(
        `    hintText: { control: 'text', description: '<dx-hint> helper text. Clear to hide.', table: { category: 'Slots' } }`
      );
      innerBlocks.push(`<dx-hint>{{ hintText }}</dx-hint>`);
    }
    if (projectionSlots.includes('dx-error')) {
      slotArgs.push(`    errorText: ''`);
      slotArgTypes.push(
        `    errorText: { control: 'text', description: '<dx-error> error text. Set a value to show.', table: { category: 'Slots' } }`
      );
      innerBlocks.push(`<dx-error>{{ errorText }}</dx-error>`);
    }
    const hostOpen =
      `<${selector}${isControlValueAccessor ? ' [formControl]="control"' : ''} ${inputBindings}>`;
    const hostBlock =
      hostOpen +
      (innerBlocks.length ? '\n      ' + innerBlocks.join('\n      ') + '\n    ' : '') +
      `</${selector}>`;

    const templateBody = hostBlock;
    void outerBlocks;
    const propsExpr = isControlValueAccessor
      ? `{ ...args, control: new FormControl(null) }`
      : `args`;

    withSlotsBlock = `

export const WithSlots: Story = {
  args: {
${slotArgs.join(',\n')},
  },
  argTypes: {
${slotArgTypes.join(',\n')},
  },
  render: (args) => ({
    props: ${propsExpr},
    template: \`
    ${templateBody}\`,
  }),
};
`;
  }

  const defaultExport = renderBlock || `

export const Default: Story = {};
`;

  return `import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
${animationsImport}${formImport}${labelDirectiveImport}${mockImport}import { ${componentClassName} } from '${componentImportPath}';
import { ${moduleClassName} } from '${moduleImportPath}';

const meta: Meta<${typeRef}> = {
  title: '${storyTitle}',
  component: ${componentClassName},
  decorators: [
    moduleMetadata({
      imports: [${moduleClassName}${formProvider}${labelDirectiveProvider}],${animationsProvider}
    }),
  ],
  argTypes: {
${argTypes}
  },${args ? `\n  args: {\n${args}\n  },` : ''}
};

export default meta;
type Story = StoryObj<${typeRef}>;
${defaultExport}${withSlotsBlock}`;
}

async function main() {
  const allFiles = await walk(COMPONENTS_DIR);
  const componentFiles = allFiles.filter(
    (p) => p.endsWith('.component.ts') && !p.endsWith('.spec.ts')
  );

  // Pattern 2: build the workspace-wide Component -> Module map ONCE.
  const componentToModule = await buildComponentToModuleMap(allFiles);

  for (const file of componentFiles) {
    const dir = path.dirname(file);
    const base = path.basename(file, '.component.ts');
    const storyPath = path.join(dir, `${base}.stories.ts`);

    if (allFiles.includes(storyPath)) {
      preExisting.push(path.relative(ROOT, storyPath));
      continue;
    }

    const src = await fs.readFile(file, 'utf8');
    const parsed = parseComponent(src);
    if (!parsed) {
      skipped.push({ file: path.relative(ROOT, file), reason: 'no Component class found' });
      continue;
    }

    const mod = componentToModule.get(parsed.className);
    if (!mod) {
      skipped.push({
        file: path.relative(ROOT, file),
        reason: `no NgModule declares ${parsed.className}`,
      });
      continue;
    }

    const componentImportPath = relImport(storyPath, file);
    const moduleImportPath = relImport(storyPath, mod.filePath);
    const relImportToMockData = relImport(
      storyPath,
      path.join(ROOT, 'projects/ng-dijta/src/lib/stories/_mock-data.ts')
    );
    const relImportToLabelDirective = relImport(
      storyPath,
      path.join(ROOT, 'projects/ng-dijta/src/lib/directive/label/label.directive.ts')
    );

    // Title: derive from full relative path (folder + basename) so that
    // multiple components in the same folder produce distinct story IDs.
    // The top-level folder picks the sidebar category (see
    // scripts/categorize-stories.mjs); unmapped folders fall back to
    // 'Components' and the run prints a warning.
    const relDir = path.relative(COMPONENTS_DIR, dir).split(path.sep).join('/');
    const topFolder = (relDir || base).split('/')[0];
    const category = CATEGORY_BY_FOLDER[topFolder] || 'Components';
    if (!CATEGORY_BY_FOLDER[topFolder]) {
      console.warn(`  no category mapping for '${topFolder}' — add it to scripts/categorize-stories.mjs`);
    }
    const storyTitle = relDir ? `${category}/${relDir}/${base}` : `${category}/${base}`;

    const needsAnimations =
      /@angular\/material/.test(src) ||
      /Animation|trigger\(|state\(/.test(src);

    // Pattern 3: ControlValueAccessor components need a form parent. Detect via
    // the NG_VALUE_ACCESSOR provider OR direct NgControl injection.
    const isControlValueAccessor =
      /NG_VALUE_ACCESSOR/.test(src) || /\bNgControl\b/.test(src);
    const projectionSlots = await detectProjectionSlots(file);
    // Detect outline: '...' | 'outer-label' | '...' literal union on any @Input
    const supportsOuterLabel = parsed.inputs.some(
      (i) => i.name === 'outline' && /['"]outer-label['"]/.test(i.type || '')
    );

    const story = buildStorySource({
      storyTitle,
      componentClassName: parsed.className,
      isGeneric: parsed.isGeneric,
      componentImportPath,
      moduleClassName: mod.className,
      moduleImportPath,
      inputs: parsed.inputs,
      outputs: parsed.outputs,
      needsAnimations,
      selector: parsed.selector,
      isControlValueAccessor,
      relImportToMockData,
      relImportToLabelDirective,
      projectionSlots,
      supportsOuterLabel,
    });

    await fs.writeFile(storyPath, story, 'utf8');
    generated.push(path.relative(ROOT, storyPath));
  }

  console.log(`Generated: ${generated.length} story files`);
  console.log(`Pre-existing (left untouched): ${preExisting.length}`);
  console.log(`Skipped: ${skipped.length}`);
  if (skipped.length) {
    console.log('\nSkipped components:');
    for (const s of skipped.slice(0, 50)) console.log(`  - ${s.file}: ${s.reason}`);
    if (skipped.length > 50) console.log(`  ... and ${skipped.length - 50} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
