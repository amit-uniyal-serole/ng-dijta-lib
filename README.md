# ng-dijta

An enterprise-class Angular 18 UI component library built on top of **Angular Material** — 100+ production-ready `dx-*` components covering forms, tables, layout, navigation, feedback, and data display.

[![Angular](https://img.shields.io/badge/Angular-18.1-dd0031.svg)](https://angular.dev)
[![Angular Material](https://img.shields.io/badge/Material-18.1-3f51b5.svg)](https://material.angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6.svg)](https://www.typescriptlang.org)
[![Transloco](https://img.shields.io/badge/Transloco-7.5-00c7b7.svg)](https://jsverse.github.io/transloco/)
[![npm](https://img.shields.io/badge/npm-%40ngdx%2Fdijta-cb3837.svg)](https://repository.serole.com/)

## ✨ Features

- **100+ high-quality components** covering every common enterprise-app need
- **Angular Material first** — every component wraps or extends Material primitives so it automatically inherits the Material theme, density, and accessibility
- **Reactive Forms ready** — every input component implements `ControlValueAccessor` with validation support
- **Internationalized** via [`@jsverse/transloco`](https://jsverse.github.io/transloco/) (v7.5) — every ARIA label and user-facing string is translatable
- **Permission-aware** — components integrate with [CASL](https://casl.js.org/) for fine-grained ability-based rendering
- **Themeable** — single SCSS bundle exposes Material theme tokens and `--dx-*` design tokens; dark mode supported via the theme system
- **Accessible** — WCAG AA targets; keyboard navigation, ARIA, and focus management delegated to Angular Material + CDK
- **Tree-shakeable** module-based architecture — import only what you use from the `@ngdx/dijta` barrel
- **Type-safe** — strict TypeScript, no `any` in the public API
- **Documented** — every component has its own `README.md` with full API reference and usage examples

## 🖥 Environment Support

| Requirement | Version |
|-------------|---------|
| Angular | 18.1.x |
| Angular Material / CDK | 18.1.x |
| TypeScript | 5.4 |
| Node.js | ≥ 18.19.1 |
| Browsers | Modern evergreen browsers (Chrome, Firefox, Edge, Safari). IE is **not** supported. |

Peer dependencies also include `moment`, `echarts`, `ngx-echarts`, `@casl/ability`, `@jsverse/transloco`, `libphonenumber-js`, `cropperjs`, `inputmask`, `ngx-mask`, `dompurify`, `mobx`, and `tui-calendar` — see [projects/ng-dijta/package.json](projects/ng-dijta/package.json).

## 📦 Installation

```bash
npm install @ngdx/dijta
```

## 🔨 Usage

### 1. Register required modules

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DxInputModule,
  DxButtonModule,
  UI_COMPONENT_CONFIG,
  UI_COMPONENT,
} from '@ngdx/dijta';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    DxInputModule,
    DxButtonModule,
    // ...other DxXxxModule imports as needed
  ],
  providers: [
    // Global UI configuration (outline style, label position, etc.)
    { provide: UI_COMPONENT_CONFIG, useValue: UI_COMPONENT },
    // Drives currency and date formatting
    { provide: LOCALE_ID, useValue: 'en-IN' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### 2. Use a component in a template

```html
<dx-input
  [formControl]="nameControl"
  dxLabel="Full name"
  outline="floating">
</dx-input>

<dx-button
  title="Submit"
  dxType="primary"
  (onActionSelect)="onSubmit()">
</dx-button>
```

### 3. Import the theme SCSS

In your app's global stylesheet (`styles.scss`):

```scss
@use '@angular/material'as mat;
@import '@angular/material/prebuilt-themes/deeppurple-amber.css';
@import "node_modules/@ngdx/dijta/theme/\_dx-theme";


:root {
  --input-focused-fc:   #1d6cc0;
  --input-border-fc:    #6f7287;
  --input-label-fc:     rgba(0, 0, 0, 0.6);
  --input-label-fw:     normal;
  --error-fc:           #bd3232;
  --input-border-width: 1px;
}
```

## 🌐 Registering a Module Federation Remote with i18n

`DxRemoteI18nModule` (introduced in v18.8.0) lets an Angular Module Federation remote register
its bundled translations and lazy-load per-language chunks under a remote-scoped namespace —
without calling `TranslocoService.setTranslation` directly.

### Register once at the remote root

```ts
// remote.module.ts
import { DxRemoteI18nModule } from '@ngdx/dijta';
import * as enTranslations from './i18n/en.json';

@NgModule({
  imports: [
    DxRemoteI18nModule.register({
      namespace: 'my-remote',           // must be unique across all remotes
      translations: { en: enTranslations },
      lazyTranslations: {
        fr: () => import('./i18n/fr.json'),
        de: () => import('./i18n/de.json'),
      },
    }),
  ],
})
export class MyRemoteModule {}
```

### Register-once rule

`DxRemoteI18nModule.register()` must be called **exactly once** per remote at the root of that
remote's NgModule tree. Calling it a second time in a child module (or in the same injector)
throws a descriptive error at startup.

### Available public API

| Export | Type | Description |
|--------|------|-------------|
| `DxRemoteI18nModule` | `NgModule` | Root module — import via `.register(cfg)` |
| `DxRemoteI18nConfig` | `interface` | Config shape passed to `.register()` |
| `DX_APP_NAMESPACE` | `InjectionToken<string>` | Inject to read this remote's namespace key |
| `DX_I18N_STRICT_MODE` | `InjectionToken<boolean>` | Inject to read the active strict-mode flag |

### Translating in a remote (v18.9.0+)

After registering with `DxRemoteI18nModule`, use the `dxi18n` pipe, `*dxRemoteI18n` directive,
or `DxI18nService` to write bare keys — the namespace is prepended automatically.

#### Pipe

```html
<!-- 'greeting' resolves to 'my-remote.greeting' in the active language -->
<span>{{ 'greeting' | dxi18n }}</span>

<!-- With interpolation params -->
<span>{{ 'items.count' | dxi18n:{ count: items.length } }}</span>
```

#### Structural directive

```html
<ng-container *dxRemoteI18n="let t">
  <h1>{{ t('title') }}</h1>
  <p>{{ t('body', { count: items.length }) }}</p>
</ng-container>
```

The directive awaits lazy language bundles before first render and re-renders cleanly on
language switches — rapid switches apply only the last resolved language (render-token guard).

#### Service (programmatic)

```ts
import { DxI18nService } from '@ngdx/dijta';

@Injectable({ providedIn: 'root' })
export class MyFeatureService {
  private readonly i18n = inject(DxI18nService);

  getGreeting(): string {
    return this.i18n.translate('greeting');            // → 'my-remote.greeting'
  }

  greeting$ = this.i18n.selectTranslate('greeting');  // Observable, updates on lang change
}
```

#### Strict-mode behaviour

| Condition | `DX_APP_NAMESPACE` absent | Result |
|-----------|--------------------------|--------|
| Strict (`DX_I18N_STRICT_MODE = true`, default in dev) | Throws `Error` | Catches misconfiguration early |
| Lenient (`DX_I18N_STRICT_MODE = false`, default in prod) | `console.warn` + returns raw key | Silent graceful fallback |
| `register({ strictMode: true })` | Always throws | Per-remote opt-in regardless of env |
| `register({ strictMode: false })` | Always lenient | Per-remote opt-out for prod parity in dev |

#### Available public API (v18.9.0)

| Export | Type | Description |
|--------|------|-------------|
| `DxRemoteI18nModule` | `NgModule` | Root module — import via `.register(cfg)` |
| `DxRemoteI18nConfig` | `interface` | Config shape passed to `.register()` |
| `DX_APP_NAMESPACE` | `InjectionToken<string>` | Inject to read this remote's namespace key |
| `DX_I18N_STRICT_MODE` | `InjectionToken<boolean>` | Inject to read the active strict-mode flag |
| `DxI18nPipe` | Standalone `@Pipe` | `'key' \| dxi18n` — auto-namespaced translation pipe |
| `DxRemoteI18nDirective` | Standalone `@Directive` | `*dxRemoteI18n="let t"` — lazy-load-aware structural directive |
| `DxTranslateFn` | `type` | Type of the `t` function exposed by `*dxRemoteI18n` |
| `DxI18nService` | `@Injectable` | Programmatic facade — `translate`, `selectTranslate`, `translateObject` |

## 🔧 Webpack helper (`@ngdx/dijta/webpack`)

The `@ngdx/dijta/webpack` sub-path ships a Node-only build helper that collapses a Module Federation remote's webpack config to a few lines and ensures all remotes share the same peer-dependency version ranges via a single `DX_PEER_RANGES` object.

### Quick start

```js
// webpack.config.js (remote)
const { withDxRemote } = require('@ngdx/dijta/webpack');

module.exports = withDxRemote({
  name: 'myRemote',
  exposes: { './MyModule': './src/app/my-feature/my-feature.module.ts' },
});
```

`withDxRemote` produces a complete webpack config with:
- `output.uniqueName`, `output.publicPath: 'auto'`, `experiments.outputModule: true`
- `ModuleFederationPlugin` with all Angular + Material + Transloco + dijta singletons pre-wired
- `DefinePlugin` setting `__APP_NAMESPACE__` to the remote name

### `extraShared`

Pass `extraShared` to merge additional shared packages without replacing the defaults:

```js
module.exports = withDxRemote({
  name: 'myRemote',
  exposes: { './Widget': './src/...' },
  extraShared: { 'my-state-lib': { singleton: true, requiredVersion: '^2.0.0' } },
});
```

### `DX_PEER_RANGES` — upgrade workflow

```js
const { DX_PEER_RANGES } = require('@ngdx/dijta/webpack');
// { angular: '^18.2.0', material: '^18.1.0', transloco: '^7.5.0', dijta: '^18.10.0' }
```

When a new `@ngdx/dijta` minor ships, the maintainer bumps the relevant range in `DX_PEER_RANGES`. Remotes pick up the change automatically on their next `npm i @ngdx/dijta@latest` — no per-remote config change required.

See [projects/ng-dijta/webpack/README.md](projects/ng-dijta/webpack/README.md) for full documentation.

## 🔗 Links

| | |
|--|--|
| Generated API docs | run `npm run doc` (compodoc) |
| Preview application | [projects/practice](projects/practice) — `npm start` |
| Per-component docs | see the `README.md` in each folder under [projects/ng-dijta/src/lib/components/](projects/ng-dijta/src/lib/components/) |

## ⌨️ Development

```bash
# Install
npm install

# Build library + bundled SCSS theme
npm run build

# Watch build (library only)
npm run watch

# Serve the preview app
npm start

# Run tests
npm test

# Lint
npm run lint

# Type-check without emitting
npm run typecheck

# Full verification (lint + typecheck + test + build)
npm run verify

# Generate compodoc API documentation
npm run doc

# Run Storybook
npm run storybook
```

## 📺 Components

All components are exported from the `@ngdx/dijta` barrel. Click a component name to open its API reference.

### General

| Component | Description |
|-----------|-------------|
| [`dx-button`](projects/ng-dijta/src/lib/components/dx-button/README.md) | Primary/secondary button with icon, loading state, multi-action dropdown, confirmation popover, and permission gating |
| [`dx-floater-button`](projects/ng-dijta/src/lib/components/dx-floater-button/README.md) | Floating action button (FAB) |

### Layout

| Component | Description |
|-----------|-------------|
| [`dx-layout`](projects/ng-dijta/src/lib/components/dx-layout/README.md) | Top-level layout with header / content / sider / footer slots |
| [`dx-header`](projects/ng-dijta/src/lib/components/dx-header/README.md) | Application header bar |
| [`dx-footer`](projects/ng-dijta/src/lib/components/dx-footer/README.md) | Application footer bar |
| [`dx-sidebar`](projects/ng-dijta/src/lib/components/dx-sidebar/README.md) | Collapsible side navigation panel |
| [`dx-drawer`](projects/ng-dijta/src/lib/components/dx-drawer/README.md) | Sliding drawer with service-driven open/close |
| [`dx-content`](projects/ng-dijta/src/lib/components/dx-content/README.md) | Page content container |
| [`dx-page`](projects/ng-dijta/src/lib/components/dx-page/README.md) | Standard page shells (403, 404, etc.) |
| [`dx-sticky`](projects/ng-dijta/src/lib/components/dx-sticky/README.md) | Sticky positioning wrapper |
| [`dx-section-title`](projects/ng-dijta/src/lib/components/dx-section-title/README.md) | Section heading with actions slot |
| [`dx-title`](projects/ng-dijta/src/lib/components/dx-title/README.md) | Page / section title |

### Navigation

| Component | Description |
|-----------|-------------|
| [`dx-breadcrumb`](projects/ng-dijta/src/lib/components/dx-breadcrumb/README.md) | Route-aware breadcrumb trail |
| [`dropdown`](projects/ng-dijta/src/lib/components/dropdown/README.md) | `[dDropDown]` directive + overlay |
| [`dx-navigation-menu`](projects/ng-dijta/src/lib/components/dx-navigation-menu/README.md) | Hierarchical navigation menu |
| [`dx-page-content-menu`](projects/ng-dijta/src/lib/components/dx-page-content-menu/README.md) | On-page anchor / accordion menu |
| [`dx-tab-group`](projects/ng-dijta/src/lib/components/dx-tab-group/README.md) | Tab group with lazy content projection |
| [`tab`](projects/ng-dijta/src/lib/components/tab/README.md) | `d-tabs` / `d-tab` — richer tabs with scroll / add / close |

### Data Entry — Form Controls

Every input below implements `ControlValueAccessor` and integrates with reactive forms.

#### Text inputs

| Component | Description |
|-----------|-------------|
| [`dx-input`](projects/ng-dijta/src/lib/components/dx-input/README.md) | Base text input wrapping `matInput` with outline / floating-label options |
| [`dx-textarea`](projects/ng-dijta/src/lib/components/dx-textarea/README.md) | Multi-line text input |
| [`dx-input-label`](projects/ng-dijta/src/lib/components/dx-input-label/README.md) | Shared label + error presentation used by other inputs |
| [`dx-input-icon`](projects/ng-dijta/src/lib/components/dx-input-icon/README.md) | Text input with prefix / suffix icons |
| [`dx-input-chips`](projects/ng-dijta/src/lib/components/dx-input-chips/README.md) | Input that produces chips on separator keys |
| [`dx-tag-input`](projects/ng-dijta/src/lib/components/dx-tag-input/README.md) | Tag entry with validation + autocomplete |

#### Structured inputs

| Component | Description |
|-----------|-------------|
| [`dx-input-email`](projects/ng-dijta/src/lib/components/dx-input-email/README.md) | Email input with validation |
| [`dx-email`](projects/ng-dijta/src/lib/components/dx-email/README.md) | Simplified email entry |
| [`dx-input-url`](projects/ng-dijta/src/lib/components/dx-input-url/README.md) | URL input with validation |
| [`dx-input-phone`](projects/ng-dijta/src/lib/components/dx-input-phone/README.md) | International phone input (`libphonenumber-js`) |
| [`dx-input-name`](projects/ng-dijta/src/lib/components/dx-input-name/README.md) | Person-name input |
| [`dx-input-company`](projects/ng-dijta/src/lib/components/dx-input-company/README.md) | Company-name input |
| [`dx-input-dob`](projects/ng-dijta/src/lib/components/dx-input-dob/README.md) | Date-of-birth input |
| [`dx-ip`](projects/ng-dijta/src/lib/components/dx-ip/README.md) | Segmented IPv4 / IPv6 address input |
| [`dx-coordinates`](projects/ng-dijta/src/lib/components/dx-coordinates/README.md) | Latitude / longitude input |
| [`dx-number`](projects/ng-dijta/src/lib/components/dx-number/README.md) | Masked numeric input |
| [`dx-currency`](projects/ng-dijta/src/lib/components/dx-currency/README.md) | Locale-aware currency input |

#### Date & time

| Component | Description |
|-----------|-------------|
| [`dx-datepicker`](projects/ng-dijta/src/lib/components/dx-datepicker/README.md) | Single-date picker |
| [`dx-input-datepicker`](projects/ng-dijta/src/lib/components/dx-input-datepicker/README.md) | Date picker with text-input entry |
| [`dx-daterange`](projects/ng-dijta/src/lib/components/dx-daterange/README.md) | Date-range picker |
| [`dx-datetime-picker`](projects/ng-dijta/src/lib/components/dx-datetime-picker/README.md) | Combined date + time picker |
| [`dx-time-picker`](projects/ng-dijta/src/lib/components/dx-time-picker/README.md) | Time picker |

#### Selection

| Component | Description |
|-----------|-------------|
| [`dx-select`](projects/ng-dijta/src/lib/components/dx-select/README.md) | Wraps `mat-select` with single / multi, search, custom options |
| [`select`](projects/ng-dijta/src/lib/components/select/README.md) | `d-select` — advanced select with virtual scroll / lazy loading |
| [`dx-autocomplete-select`](projects/ng-dijta/src/lib/components/dx-autocomplete-select/README.md) | Autocomplete with static options |
| [`dx-server-side-autocomplete`](projects/ng-dijta/src/lib/components/dx-server-side-autocomplete/README.md) | Autocomplete with async / remote options |
| [`cascader`](projects/ng-dijta/src/lib/components/cascader/README.md) | Multi-level cascading select |
| [`dx-chip-select`](projects/ng-dijta/src/lib/components/dx-chip-select/README.md) | Select rendered as chips |
| [`dx-chip-autocomplete`](projects/ng-dijta/src/lib/components/dx-chip-autocomplete/README.md) | Autocomplete that produces selected chips |
| [`dx-lookup`](projects/ng-dijta/src/lib/components/dx-lookup/README.md) | Single-record lookup field |
| [`dx-multi-lookup`](projects/ng-dijta/src/lib/components/dx-multi-lookup/README.md) | Multi-record lookup field |
| [`dx-dual-listbox`](projects/ng-dijta/src/lib/components/dx-dual-listbox/README.md) | Move-left / move-right dual list |
| [`dx-checkbox`](projects/ng-dijta/src/lib/components/dx-checkbox/README.md) | Wraps `mat-checkbox` with label + error slots |
| [`dx-radio-button`](projects/ng-dijta/src/lib/components/dx-radio-button/README.md) | Radio group |
| [`dx-toggle`](projects/ng-dijta/src/lib/components/dx-toggle/README.md) | Slide-toggle wrapper |
| [`dx-toggle-panel`](projects/ng-dijta/src/lib/components/dx-toggle-panel/README.md) | Expand / collapse panel with toggle |
| [`dx-color-picker`](projects/ng-dijta/src/lib/components/dx-color-picker/README.md) | `dx-colors` + `dxColorsTrigger` color picker |

#### Upload

| Component | Description |
|-----------|-------------|
| [`dx-upload`](projects/ng-dijta/src/lib/components/dx-upload/README.md) | General-purpose file upload with drag & drop and picture list |
| [`dx-file-upload`](projects/ng-dijta/src/lib/components/dx-file-upload/README.md) | File upload backed by `FileUploadControl` |
| [`dx-image-upload`](projects/ng-dijta/src/lib/components/dx-image-upload/README.md) | Image upload with preview + crop (`cropperjs`) |
| [`dx-upload-file-popup`](projects/ng-dijta/src/lib/components/dx-upload-file-popup/README.md) | Dialog-based file uploader |

#### Filters

| Component | Description |
|-----------|-------------|
| [`dx-advance-filter`](projects/ng-dijta/src/lib/components/dx-advance-filter/README.md) | Panel of advanced filter inputs |
| [`dx-criteria-filter`](projects/ng-dijta/src/lib/components/dx-criteria-filter/README.md) | Criteria-builder (field + operator + value) |
| [`dx-table-filter`](projects/ng-dijta/src/lib/components/dx-table-filter/README.md) | Table-scoped filter dialog |

### Data Display

| Component | Description |
|-----------|-------------|
| [`dx-table`](projects/ng-dijta/src/lib/components/dx-table/README.md) | Feature-rich table (sort menus, pagination, selection, column config) |
| [`dx-config-table`](projects/ng-dijta/src/lib/components/dx-config-table/README.md) | Configurable table driven by a `DxTableConfig` object |
| [`dx-nested-table`](projects/ng-dijta/src/lib/components/dx-nested-table/README.md) | Tree-table for hierarchical data |
| [`dx-table-view-wrapper`](projects/ng-dijta/src/lib/components/dx-table-view-wrapper/README.md) | Shell around tables (toolbar + filters + pagination) |
| [`dx-kanban-view`](projects/ng-dijta/src/lib/components/dx-kanban-view/README.md) | Kanban board |
| [`dx-card`](projects/ng-dijta/src/lib/components/dx-card/README.md) | Card shell (plus sibling profile / listing / details cards) |
| [`dx-basic-tile`](projects/ng-dijta/src/lib/components/dx-basic-tile/README.md) | Simple tile |
| [`dx-chart-tile`](projects/ng-dijta/src/lib/components/dx-chart-tile/README.md) | Chart inside a tile wrapper |
| [`tiles`](projects/ng-dijta/src/lib/components/tiles/README.md) | KPI / monitoring / wrapper tile primitives |
| [`dx-widget`](projects/ng-dijta/src/lib/components/dx-widget/README.md) | Dashboard list widget |
| [`dx-chart`](projects/ng-dijta/src/lib/components/dx-chart/README.md) | ECharts wrapper (`ngx-echarts`) |
| [`dx-tree`](projects/ng-dijta/src/lib/components/dx-tree/README.md) | Hierarchical tree view |
| [`dx-tree-v2`](projects/ng-dijta/src/lib/components/dx-tree-v2/README.md) | Next-generation tree view |
| [`tree-view`](projects/ng-dijta/src/lib/components/tree-view/README.md) | Low-level tree-view primitives (CDK-style) |
| [`dx-activity-calendar`](projects/ng-dijta/src/lib/components/dx-activity-calendar/README.md) | Activity calendar (`tui-calendar`) |
| [`dx-timeline`](projects/ng-dijta/src/lib/components/dx-timeline/README.md) | Vertical activity timeline |
| [`dx-avatar`](projects/ng-dijta/src/lib/components/dx-avatar/README.md) | User avatar with badges and group support |
| [`dx-tag`](projects/ng-dijta/src/lib/components/dx-tag/README.md) | `d-tag` / `d-tags` — label tag |
| [`dx-status`](projects/ng-dijta/src/lib/components/dx-status/README.md) | Status chip + `[dxStatusChip]` directive |
| [`dx-canvas`](projects/ng-dijta/src/lib/components/dx-canvas/README.md) | Canvas host with draw events |
| [`dx-qrcode`](projects/ng-dijta/src/lib/components/dx-qrcode/README.md) | QR-code renderer |

### Feedback

| Component | Description |
|-----------|-------------|
| [`dx-alert-message`](projects/ng-dijta/src/lib/components/dx-alert-message/README.md) | Inline alert / info message |
| [`dx-notification`](projects/ng-dijta/src/lib/components/dx-notification/README.md) | Notification list + item |
| [`dx-toastr`](projects/ng-dijta/src/lib/components/dx-toastr/README.md) | Toastr service (success / info / warn / error) |
| [`dx-loader`](projects/ng-dijta/src/lib/components/dx-loader/README.md) | Full-screen / inline spinner |
| [`dx-skeleton-loader`](projects/ng-dijta/src/lib/components/dx-skeleton-loader/README.md) | Skeleton placeholder |
| [`loading`](projects/ng-dijta/src/lib/components/loading/README.md) | `[dLoading]` directive + `LoadingService` |
| [`dx-empty`](projects/ng-dijta/src/lib/components/dx-empty/README.md) | Empty-state placeholder |
| [`dx-tooltip`](projects/ng-dijta/src/lib/components/dx-tooltip/README.md) | `[dx-tooltip]` directive |
| [`dx-popover`](projects/ng-dijta/src/lib/components/dx-popover/README.md) | Rich popover with actions |
| [`dx-popconfirm`](projects/ng-dijta/src/lib/components/dx-popconfirm/README.md) | Inline confirmation popover |
| [`dx-confirm`](projects/ng-dijta/src/lib/components/dx-confirm/README.md) | Confirmation dialog (`MatDialog`-based) |
| [`dx-popup`](projects/ng-dijta/src/lib/components/dx-popup/README.md) | Generic popup dialog |
| [`modal`](projects/ng-dijta/src/lib/components/modal/README.md) | `ModalService` + `d-modal` + `DialogService` |
| [`image-preview`](projects/ng-dijta/src/lib/components/image-preview/README.md) | `[dImagePreview]` directive + `d-image-preview` modal |
| [`dx-fullscreen`](projects/ng-dijta/src/lib/components/dx-fullscreen/README.md) | Fullscreen toggle |
| [`dx-icon-selection-popup`](projects/ng-dijta/src/lib/components/dx-icon-selection-popup/README.md) | Icon picker dialog |

### Domain-specific

| Component | Description |
|-----------|-------------|
| [`dx-qms-core-ui`](projects/ng-dijta/src/lib/components/dx-qms-core-ui/README.md) | `dx-evidence-upload` — QMS evidence capture |

## 📖 Per-component docs

Every component ships with its own `README.md` that follows a strict NG-ZORRO-style format:

- YAML frontmatter (`category`, `type`, `title`)
- **When To Use** — usage guidance
- **API** — parameter tables, events, methods, types
- **Examples** — at least two working snippets
- **Import** — the correct `@ngdx/dijta` `NgModule` to import

See [projects/ng-dijta/src/lib/components/dx-button/README.md](projects/ng-dijta/src/lib/components/dx-button/README.md) as the reference.

## 🤝 Contributing

This library is maintained by **Serole Technologies**. Internal contributors:

1. Create a feature branch from `master`
2. Follow the conventions in [CLAUDE.md](CLAUDE.md) and [.claude/rules/](.claude/rules/)
3. Run `npm run verify` before opening a PR
4. Ensure every new public component, input, output, and method has JSDoc and a README entry

## 🚀 Release Process

Releases are published automatically on every merge to `main` via [`.github/workflows/release.yml`](.github/workflows/release.yml) using [Nx Release](https://nx.dev/features/manage-releases) and [Conventional Commits](https://www.conventionalcommits.org/).

### Conventional Commits (required)

Every commit that should appear in the GitHub Release changelog **must** use a Conventional Commit subject with the `ng-dijta` scope:

| Prefix | Version bump | Example |
|--------|-------------|---------|
| `feat(ng-dijta):` | minor | `feat(ng-dijta): add dx-status-badge component` |
| `fix(ng-dijta):` | patch | `fix(ng-dijta): restore focus outline on dx-button` |
| `feat(ng-dijta)!:` or `BREAKING CHANGE:` | major | `feat(ng-dijta)!: rename DxAlertModule to DxAlertMessageModule` |
| `chore(ng-dijta):` | none | `chore(ng-dijta): update snapshot fixtures` |

Commits without the `(ng-dijta)` scope are not included in the library changelog.

### Merge policy

The repo uses **regular merge commits** (not squash). Individual commits on a feature branch are visible in `git log` and must themselves follow the Conventional Commits format above — the merge commit subject is not used for version calculation.

### Reading GitHub Releases

Each release page at [github.com/Serole/ng-dijta/releases](https://github.com/Serole/ng-dijta/releases) lists every `feat:` and `fix:` commit with a link to the commit. The changelog is generated by Nx Release using the unified `nx release --skip-publish` command, which walks commits from the previous `ng-dijta@*` tag to HEAD before any version-bump commit is created — ensuring real commit entries appear rather than the "version bump only" placeholder.

### Manual release (workflow_dispatch)

Navigate to **Actions → Release → Run workflow** and optionally supply:
- `specifier` — override the version bump (`patch`, `minor`, `major`, or an exact version like `18.10.0`). Leave empty to let Conventional Commits decide.
- `first_release` — check only when there is no previous `ng-dijta@*` tag.

## 📄 Authors

- **Serole Technologies** — [serole.com](https://www.serole.com/)

## License

UNLICENSED — distributed via the private `@ngdx/dijta` registry at `https://repository.serole.com/`.

