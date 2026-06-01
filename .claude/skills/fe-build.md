---
description: Create or modify Angular components for ng-dijta (Angular 18 + Material)
model: sonnet
---

# /fe-build

Implement a component in `ng-dijta` (library) or `practice` (preview app) following project conventions.

## Prerequisites

- Read [.claude/agents/fe-component-builder.md](../agents/fe-component-builder.md) for full patterns
- Read [.claude/rules/ng-dijta.md](../rules/ng-dijta.md) for library conventions
- Read [.claude/rules/angular-material.md](../rules/angular-material.md) for Material usage
- Grep `projects/ng-dijta/src/lib/components/` for a similar existing `dx-*` component

## Workflow

1. **Material-first check** — Angular Material or CDK covers most UI needs; use the primitive
2. **Understand** — read the task / epic / rule files
3. **Scaffold** — create the folder structure (see `/scaffold`)
4. **Implement** — write the component per conventions
5. **Template + styles** — external `templateUrl` + `styleUrls` (library standard)
6. **Test** — Karma + Jasmine spec (see `/fe-test`)
7. **Public API** — re-export from `index.ts` and `public-api.ts`
8. **Verify** — `npm run lint && npx ng build ng-dijta`

## Target Project

| Project | When |
|---------|------|
| `projects/ng-dijta/` | Shared reusable components (the library) |
| `projects/practice/` | Preview / demo app that consumes the library |

## Material-First Approach (MANDATORY)

Before writing ANY custom UI:

1. Check [Angular Material components](https://material.angular.io/components/categories) — most needs are already there (button, form field, dialog, menu, table, tabs, stepper, snackbar, autocomplete, date picker, tree, expansion, chips, tooltip, slide toggle, progress bar/spinner, toolbar, sidenav, divider)
2. Check CDK primitives — `Overlay`, `A11yModule` (`FocusTrap`, `LiveAnnouncer`), `DragDropModule`, `LayoutModule` (`BreakpointObserver`), `ScrollingModule` (`cdk-virtual-scroll-viewport`), `PortalModule`
3. Only build custom when Material + CDK have no answer — document why in the PR

## Key Requirements

- `ChangeDetectionStrategy.OnPush` on every new component
- **Library components** follow the NgModule-based pattern used by the existing components (`dx-foo/dx-foo.component.ts` + `dx-foo.module.ts` + `index.ts`) with **external** `templateUrl` / `styleUrls`
- `dx-` prefix on selector and CSS classes
- Decorator API (`@Input()` / `@Output()`) is valid here — match the surrounding code. Signal APIs (`input()` / `output()` / `model()`) are encouraged for brand-new components but never mix both in the same class
- All colors via Material theme tokens (`mat.get-theme-color`) or declared `--dx-*` design tokens with fallbacks; never hardcode hex / rgb / hsl
- All user-facing strings and ARIA labels through Transloco (`| transloco`), keys prefixed `dx.`
- Subscriptions tear down with `takeUntilDestroyed(this.destroyRef)` or explicit `Subscription` cleanup
- Re-export every new public symbol from `projects/ng-dijta/src/public-api.ts` via a per-component `index.ts`
- JSDoc on the class + every public input / output (see [jsdoc.md](../rules/jsdoc.md))

## Validation

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npx ng build ng-dijta
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{name}.spec.ts"
```

For practice-app work also run `npx ng build` (default project = practice).

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Custom dropdown / dialog / date picker | Use `mat-select` / `MatDialog` / `mat-datepicker` |
| Spec framework mismatch | Karma + Jasmine — see [frontend-testing.md](../rules/frontend-testing.md) |
| `selector: 'app-...'` on a library component | Use `dx-` |
| Hardcoded color in SCSS | `mat.get-theme-color($theme, surface)` or `var(--dx-*, fallback)` |
| Component not in `public-api.ts` | Add per-component `index.ts` barrel + re-export |
| `::ng-deep` to style a Material child | Use Material theme overrides or CDK API |
| Missing JSDoc on public input | Add class-level + input-level JSDoc (compodoc depends on it) |
| Mixing `@Input()` and `input()` in the same class | Pick one API for the whole class |

## Related

- [fe-component-builder.md](../agents/fe-component-builder.md) — full patterns
- `/scaffold` — generate the boilerplate
- `/fe-test` — write tests
- `/fe-review` — validate compliance
