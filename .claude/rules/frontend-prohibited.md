# Frontend Prohibited Patterns

**Scope:** Patterns strictly forbidden in the ng-dijta Angular 18 + Material frontend.

**Enforcement:** Zero tolerance. Violations result in code review rejection.

---

## Quick Reference

### Angular Material Usage (CRITICAL — Material-First)

- **Material-first**: NEVER build custom UI when Angular Material provides the component. Material components automatically follow the shared SCSS theme.
- **Shared wrappers** that standardize Material usage go in the `ng-dijta` library. Do NOT duplicate wrappers across feature apps.
- **Styling**: Use Material theme tokens / Material SCSS mixins for colors, typography, shape, density. Do NOT hardcode colors.
- **Do NOT** reinvent Material primitives (tooltips, dialogs, menus, date pickers, tables, autocomplete, snackbars, etc.). See [angular-material.md](angular-material.md) for the full inventory.

### Custom UI When Material Provides It (FORBIDDEN)

| Forbidden | Use Angular Material Instead |
|-----------|-------------------------------|
| Custom modal/overlay | `MatDialog` |
| Custom dropdown/select | `mat-select` |
| Custom date picker | `mat-datepicker` |
| Custom tooltip | `matTooltip` |
| Custom toast/notification | `MatSnackBar` |
| Custom menu | `mat-menu` |
| Custom accordion | `mat-expansion-panel` |
| Custom tabs | `mat-tab-group` |
| Custom spinner/progress | `mat-progress-spinner`, `mat-progress-bar` |
| Custom autocomplete | `mat-autocomplete` |
| Custom sidenav/drawer | `mat-sidenav` |
| Custom stepper | `mat-stepper` |
| Custom tree | `mat-tree` |
| Custom toolbar | `mat-toolbar` |
| Custom chips | `mat-chip-list` |
| Custom button | `mat-button`, `mat-raised-button`, `mat-icon-button` |
| Custom form field / input wrapper | `mat-form-field` + `matInput` |
| Custom checkbox / radio / toggle | `mat-checkbox`, `mat-radio-button`, `mat-slide-toggle` |
| Custom data table | `mat-table` + `MatPaginatorModule` + `MatSortModule` |
| Custom divider | `mat-divider` |

### Accessibility (CRITICAL)

| Forbidden | Alternative |
|-----------|-------------|
| Icon-only button without explicit accessible name | Add meaningful `aria-label` / `aria-labelledby` |
| Generic accessible names such as `"Action"` | Use context-specific labels such as `"Notifications"` |
| Input with placeholder-only labeling | Add `<mat-label>` or explicit `aria-label` |
| Decorative icon announced by screen readers | Add `aria-hidden="true"` |
| Overriding Material's built-in keyboard handling | Use Material's defaults |

### Security

| Forbidden | Alternative |
|-----------|-------------|
| Unsanitized `[innerHTML]` with user input | Angular's automatic sanitization (don't bypass) |
| `bypassSecurityTrust*` without `@security` JSDoc tag explaining why | Justified + documented bypass only |
| Concatenating user input into templates | Property binding |
| `eval()` / `Function(...)` with user input | Never — no alternative, just don't |
| Sensitive data in `console.log` | Never log tokens, passwords, PII |
| Persisting tokens in `localStorage` | `sessionStorage` or HttpOnly cookie |

### Styling

| Forbidden | Alternative |
|-----------|-------------|
| Hardcoded colors (hex, rgb, hsl) | Material theme tokens / mixins from `_theme.scss` |
| Inline styles | Component SCSS |
| `::ng-deep` | Proper component encapsulation; `::ng-deep` is deprecated |
| Leaking styles outside component (`ViewEncapsulation.None` + unscoped selectors) | Keep styles scoped; if `Encapsulation.None` is needed, scope every selector with the component's host class |

### Naming & Structure

| Forbidden | Alternative |
|-----------|-------------|
| `app-` prefix on library selectors | `dx-` |
| camelCase selectors | kebab-case |
| PascalCase file names | kebab-case |
| Importing from deep `@ngdx/dijta/lib/...` paths in consumers | Import from the package barrel `@ngdx/dijta` |
| New library components missing from `projects/ng-dijta/src/public-api.ts` | Re-export via per-component `index.ts` barrel |

### Templates

| Forbidden | Alternative |
|-----------|-------------|
| Arrow functions invoked in bindings (`(click)="() => doX()"`) | Reference a component method |
| Complex logic in bindings | Move to a method or getter |
| Referencing a signal property without `()` | Call it `someSignal()` — but prefer to avoid mixing signal and decorator APIs in the same component |

### RxJS

| Forbidden | Alternative |
|-----------|-------------|
| Subscriptions without teardown | `takeUntilDestroyed()` (Angular 18) or manual unsubscribe via `Subscription` / `Subject` |
| Long chains of nested `.subscribe()` | Flatten with `switchMap` / `mergeMap` |
| Leaking `BehaviorSubject`s from components as `Subject` | Expose as `Observable` via `.asObservable()` |

### TypeScript

| Forbidden | Alternative |
|-----------|-------------|
| `any` type | `unknown`, explicit interface, or generic |
| `// @ts-ignore` | `// @ts-expect-error` with a reason, or fix the type |
| Non-null assertions (`!`) on values that can actually be null | Proper null handling |

---

## What is NOT Prohibited (clarifications)

This codebase is Angular 18 with a large existing decorator-and-module surface. The following are **ALLOWED** despite appearing in older Angular-21-era rule sets:

- `@NgModule`, `declarations`, `exports`, `providers`
- `@Input()` / `@Output()` decorators with `EventEmitter`
- `*ngIf`, `*ngFor`, `*ngSwitch`, `ngClass`, `ngStyle`
- Constructor injection (`constructor(private svc: MySvc)`)
- `@HostBinding`, `@HostListener`, `@ViewChild`, `@ContentChild`
- `ChangeDetectorRef` / `markForCheck()` where explicitly needed
- `BehaviorSubject` / `Subject` for component state
- `templateUrl` / `styleUrls` in library components (ng-packagr supports external files; 274 components use them)
- Karma + Jasmine (`describe`, `beforeEach`, `fakeAsync`, `tick`) — the project test runner
- `async` pipe in templates

Signal APIs (`signal()`, `computed()`, `input()`, `output()`, `model()`) are encouraged for new components but are NOT required.

---

## Severity

| Violation | Action |
|-----------|--------|
| Any Tier 1 prohibited pattern | Block merge |
| Security violation | Immediate fix |
| Accessibility violation | Immediate fix |
| Style violation | Fix before merge |
