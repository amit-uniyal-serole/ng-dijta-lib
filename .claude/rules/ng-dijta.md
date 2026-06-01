# ng-dijta Library Rules

**Scope:** Usage patterns for the `ng-dijta` (`@ngdx/dijta`) shared Angular UI library and its Angular-Material-first principle.

---

## Core Principle: Angular Material-First

- **Material-first** — Use Angular Material / CDK primitives before building custom components. Build custom UI only when Material / CDK does not provide the required capability.
- **Styling** — SCSS + Material theme tokens. Component-scoped SCSS for layout tweaks. No hardcoded colors.
- **Shared components** go in `ng-dijta`. Feature / demo components go in the `practice` preview app or in downstream consuming applications.
- **Import path** — `@ngdx/dijta` (the package barrel). Deep `@ngdx/dijta/lib/...` imports are forbidden.

---

## Component Inventory

`ng-dijta` exposes many `dx-*` components under [projects/ng-dijta/src/lib/components/](../../projects/ng-dijta/src/lib/components/). Consult [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) for the authoritative list before building anything new — the library already includes wrappers for forms, inputs, buttons, tables, date/time pickers, tiles, cards, charts, and more.

Before adding a new component, grep the existing component folders to confirm a `dx-*` wrapper doesn't already exist.

---

## Creating New Components in ng-dijta

### When to Create

- A UI pattern will be used in **2+ places** across consuming applications
- The pattern wraps Angular Material to enforce consistent branding / behaviour
- The pattern fills a gap where Material does not provide a component

### Where to Create

```
projects/ng-dijta/src/lib/components/dx-{name}/
├── dx-{name}.component.ts
├── dx-{name}.component.html
├── dx-{name}.component.scss
├── dx-{name}.component.spec.ts
├── dx-{name}.module.ts
└── index.ts
```

### Component Rules

1. **External `templateUrl` + `styleUrls`** — this is the standard pattern across the existing library components. ng-packagr supports both; match the surrounding code. (Inline templates are acceptable only for trivially small presentational components.)
2. **NgModule-based** — the dominant pattern. Each component ships its own `NgModule` that declares and exports the component. A small subset of components is standalone — match the surrounding file's pattern; do not convert without reason.
3. **`ChangeDetectionStrategy.OnPush`** on every new component.
4. **Decorator API (`@Input()` / `@Output()`) is valid** — it's the dominant pattern. Signal APIs (`input()` / `output()` / `model()`) are encouraged for brand-new components but never mixed with decorator APIs in the same class.
5. **Content projection** (`<ng-content>` slots) over configuration objects where it produces a cleaner consumer surface.
6. **Material theme tokens + declared `--dx-*` tokens** for all colors. No hardcoded hex / rgb / hsl. See [theming.md](theming.md).
7. **Prefix `dx-`** on selector and every CSS class.
8. **Re-export from `public-api.ts`** — every new public symbol goes through a per-component `index.ts` barrel and then [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts).
9. **JSDoc** — class-level + every public input / output (see [jsdoc.md](jsdoc.md)). compodoc consumes it.

---

## Import Pattern

```typescript
// CORRECT — package barrel
import {
  DxButtonComponent,
  DxAlertMessageComponent,
  DxCurrencyModule,
} from '@ngdx/dijta';

// WRONG — deep internal path
import { DxButtonComponent } from '@ngdx/dijta/lib/components/dx-button/dx-button.component';
```

---

## Library Structure Reference

| Folder | Contents |
|--------|----------|
| `src/lib/components/` | All `dx-*` components |
| `src/lib/core/` | Shared core logic |
| `src/lib/service/` | Global services (`global-config`, `http`, `number-format`, etc.) |
| `src/lib/directive/` | Directives |
| `src/lib/pipe/` | Pipes |
| `src/lib/animation/` | Angular animations |
| `src/lib/permission/` | CASL-based permissions |
| `src/lib/theme/` | SCSS theme (`_theme.scss`, `_style.scss`, `tokens/`, component-level theme partials) |
| `src/lib/utils/` | Utility helpers |
| `src/lib/interface/` | Public TypeScript interfaces |

---

## Angular Material Implementation Protocol (MANDATORY)

> **Zero custom implementation when Angular Material provides the component.** Material components follow the library's theme automatically — no custom color code needed.

### Before Writing ANY UI Component:

1. **Check Material first** — Consult [angular-material.md](angular-material.md). If Material has the component, use it directly.
2. **If Material has it → use it** — Import the Material module, use the component API as documented. It will follow theme, density, and typography configured in `_theme.scss`.
3. **List Material's built-in behaviours** — keyboard nav, ARIA, focus management. Keep them; do not reimplement.
4. **Customize via theming / SCSS overrides only** — Material theme tokens or component-scoped styles. Avoid behaviour overrides.
5. **Build custom only when Material has NOTHING** — Consider CDK primitives (`Overlay`, `A11yModule`, `PortalModule`, `DragDropModule`, `ScrollingModule`, `LayoutModule`) before hand-rolling DOM logic.

---

## Accessibility Protocol (MANDATORY)

1. **Every interactive control must have an accessible name** — visible label, `aria-label`, or `aria-labelledby`, routed through Transloco.
2. **Icon-only actions must use specific labels** — never generic `"Action"` / `"Button"`.
3. **Inputs must be labelled** — via `<mat-label>` inside `<mat-form-field>`, or an explicit `aria-label`.
4. **Decorative icons hide from AT** — `aria-hidden="true"` on non-semantic `<mat-icon>`.
5. **Trust Material's built-in a11y** — do not override its ARIA attributes or keyboard handlers.

---

## Checklist

- [ ] Angular Material checked before building any UI component
- [ ] Material / CDK primitive used when one covers the need (zero custom reimplementation)
- [ ] Existing `dx-*` component reused where available
- [ ] New component created under `projects/ng-dijta/src/lib/components/dx-{name}/`
- [ ] External `templateUrl` / `styleUrls` (match surrounding library code)
- [ ] NgModule that declares + exports the component (unless matching a standalone neighbour)
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] Decorator OR signal API throughout — not both
- [ ] Per-component `index.ts` barrel
- [ ] Re-exported from `projects/ng-dijta/src/public-api.ts`
- [ ] Imported from `@ngdx/dijta` barrel in consumers (not internal paths)
- [ ] Styling uses Material theme tokens or declared `--dx-*` tokens with fallbacks (no hardcoded colors)
- [ ] JSDoc on class + every public input / output
- [ ] Spec present (Karma + Jasmine)
