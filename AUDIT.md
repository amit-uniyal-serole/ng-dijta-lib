# Frontend Compliance Audit — ng-dijta (Entire Codebase)

**Date:** 2026-04-23
**Branch:** `upgrade`
**Scope:** `projects/ng-dijta/src/lib/` (library) and `projects/practice/src/` (demo app, lower scrutiny).
**Stack:** Angular 18.1 + Angular Material 18 + Transloco 7.5 + Karma/Jasmine (per [CLAUDE.md](CLAUDE.md)).

**Calibration note:** The `/audit` command checklist references some Angular 21 / PrimeNG patterns that CLAUDE.md explicitly flags as "aspirational / out of date." Findings below use the project's *actual* rules (Tier 1–3) — `NgModule`, `@Input()`, `*ngIf`, `templateUrl`, constructor injection, etc. are **NOT** flagged.

---

## Severity Summary

| Severity | Count | Categories |
|---|---|---|
| **CRITICAL** | 19 | Material-first violations (4 components), `bypassSecurityTrust*` without `@security` (15) |
| **HIGH** | ~1,250 | `any` (1,106), Material-internals selectors (29), `::ng-deep` (15), hardcoded colors (~200+ in components), hardcoded i18n strings (10), missing icon-button labels (4), decorative icons missing `aria-hidden` (~46), missing public-api exports (2), token scheme/state words (5) |
| **MEDIUM** | ~70 | Missing OnPush (234/274), `@ts-ignore` instead of `@ts-expect-error` (7), TODOs (4), missing `prefers-reduced-motion` (~30), missing per-component `index.ts` (2), duplicate public-api exports (4) |
| **LOW** | 2 | Practice-app internal-path imports |

No `eval`, no `localStorage` token storage, no sensitive-data logging, no `translateSignal` (Transloco-8-only) usage detected.

---

## CRITICAL — Fix Before Release

### C1. Material-first violations (Tier 1: [angular-material.md](.claude/rules/angular-material.md))

Per the project's **MANDATORY Material-first rule**, these reimplement Material primitives instead of wrapping them:

| Component | Should wrap | Issue |
|---|---|---|
| [modal](projects/ng-dijta/src/lib/components/modal/modal.component.scss) | `MatDialog` | Custom `position: fixed` overlay stack, manual z-index, custom animations |
| [dx-confirm](projects/ng-dijta/src/lib/components/dx-confirm/) | `MatDialog` | Custom DOM overlay + button handling |
| [dx-toastr](projects/ng-dijta/src/lib/components/) | `MatSnackBar` | Custom toast/portal infrastructure duplicating snackbar |
| [dx-tooltip](projects/ng-dijta/src/lib/components/dx-tooltip/base.ts) | `matTooltip` | Custom directive reinventing overlay positioning |

`dropdown` (CDK-based) is borderline — uses `CdkConnectedOverlay` directly when `mat-menu` would suffice for most cases. **MEDIUM**.

### C2. `bypassSecurityTrust*` without `@security` JSDoc (15 sites)

Per [security.md](.claude/rules/security.md), every bypass MUST carry an `@security` JSDoc tag explaining why the source is trusted. None of the 15 sites do.

Highest-risk (HTML bypass — XSS surface):
- [dx-table-html.component.ts:71](projects/ng-dijta/src/lib/components/dx-table/components/dx-table-html/dx-table-html.component.ts#L71) — `bypassSecurityTrustHtml`
- [image-preview/safe.pipe.ts:15-19](projects/ng-dijta/src/lib/components/image-preview/safe.pipe.ts#L15-L19)
- [dx-loader/safe-html.pipe.ts:12](projects/ng-dijta/src/lib/components/dx-loader/safe-html.pipe.ts#L12)
- [email-detail-view.component.ts:25](projects/ng-dijta/src/lib/components/dx-email/email-detail-view/email-detail-view.component.ts#L25)
- [modal-container.component.ts:55](projects/ng-dijta/src/lib/components/modal/modal-container.component.ts#L55)
- [directive/safe/safe.pipe.ts:28-36](projects/ng-dijta/src/lib/directive/safe/safe.pipe.ts#L28-L36) (uses DOMPurify — good — but still needs `@security` justification)

Lower-risk (URL/Style/ResourceUrl): `dx-qrcode` (×2), `flex-table`, `dx-table-text-cell`, `file-picker.service`, `preview-lightbox`.

### C3. Icon-only buttons missing `aria-label` (Tier 1: a11y)

[dx-table-menu.component.html:3-13](projects/ng-dijta/src/lib/components/dx-table/components/dx-table-menu/dx-table-menu.component.html#L3-L13) — 4 `<button mat-icon-button>` with bare `<mat-icon>` (edit / image / chat_bubble_outline / more_vert) and no `aria-label`. Screen-reader users get no name for any of them.

---

## HIGH — Fix Before Merge

### H1. `any` type — 1,106 instances
Concentrated in `core/` (`window-ref`, `document-ref`, `overlay-container`, `currency`), table/lookup components, and a few directives. Many are legitimate `(type as any)` workarounds for Angular Material/CDK private types — but the count is high enough to warrant a sweep. Worst clusters:
- [core/window-ref/document-ref.service.ts:7-18](projects/ng-dijta/src/lib/core/window-ref/document-ref.service.ts#L7-L18)
- [core/UI/model/keyValue.ts:12-15](projects/ng-dijta/src/lib/core/UI/model/keyValue.ts)
- [core/datetime-picker/calendar.ts:243-246](projects/ng-dijta/src/lib/core/datetime-picker/calendar.ts#L243-L246)

### H2. Targeting Material internals (`.mat-mdc-*` / `.mdc-*`) — 29 sites
Brittle against Material upgrades. Highest concentration:
- [dx-table.component.scss](projects/ng-dijta/src/lib/components/dx-table/components/dx-table/dx-table.component.scss) — 5 sites
- [treetable.component.scss](projects/ng-dijta/src/lib/components/dx-nested-table/component/treetable.component.scss) — ~9 sites
- [dx-server-side-autocomplete.component.scss](projects/ng-dijta/src/lib/components/dx-server-side-autocomplete/dx-server-side-autocomplete.component.scss) — 6 sites
- Plus `dx-tab-group`, `dx-button`, `dx-input-phone`, `dx-toggle`, `dx-select`, `dx-autocomplete-select`

### H3. `::ng-deep` — 15 sites (Tier 2 forbidden)
[image-preview](projects/ng-dijta/src/lib/components/image-preview/image-preview.component.scss), [dx-file-upload](projects/ng-dijta/src/lib/components/dx-file-upload/), [button-group](projects/ng-dijta/src/lib/components/dx-button/ngx/button-group.component.scss) (×3), [dx-fullscreen](projects/ng-dijta/src/lib/components/dx-fullscreen/dx-fullscreen.component.scss) (×3), [modal](projects/ng-dijta/src/lib/components/modal/modal.component.scss) (×2), [file-picker](projects/ng-dijta/src/lib/components/dx-image-upload/core/file-picker.component.scss), [mat-select-search](projects/ng-dijta/src/lib/components/dx-autocomplete-select/mat-select-search/mat-select-search.component.scss).

### H4. Hardcoded colors in component SCSS — large surface
648 raw matches in component SCSS; major concentrations in `dx-color-picker/components/panel/panel.component.scss` (`#fff`, `#222`, `#ccc`, `#de0f00`, `#e8ebed`, `#595b65`), `dx-skeleton-loader`, `dx-widget/dx-list-widget`, `dx-button/ngx`, `dx-tag`. Many are in legitimately custom widgets, but every one violates [theming.md](.claude/rules/theming.md) Guardrail 1.

### H5. Hardcoded user-facing strings (i18n)
- Placeholders: [dx-bulk-actions.component.html:32, 34](projects/ng-dijta/src/lib/components/dx-table/components/dx-bulk-actions/dx-bulk-actions.component.html#L32), [dx-dual-listbox.component.html:85](projects/ng-dijta/src/lib/components/dx-dual-listbox/dx-dual-listbox.component.html#L85), [dx-select.component.html:42](projects/ng-dijta/src/lib/components/dx-select/dx-select.component.html#L42)
- Tooltips: [dx-edit-table-row.component.html:4-19](projects/ng-dijta/src/lib/components/dx-table/components/dx-edit-table-row/dx-edit-table-row.component.html#L4-L19) (Save Changes / Cancel Changes / Edit / Delete), [dx-table.component.html:9](projects/ng-dijta/src/lib/components/dx-table/components/dx-table/dx-table.component.html#L9) ("Arrange Columns"), [dx-inline-dropdown.component.html:23](projects/ng-dijta/src/lib/components/dx-table/components/dx-inline-dropdown/dx-inline-dropdown.component.html#L23) ("Error")

### H6. Decorative icons missing `aria-hidden="true"` — ~46+ sites
Sampled in [dx-edit-table-row](projects/ng-dijta/src/lib/components/dx-table/components/dx-edit-table-row/dx-edit-table-row.component.html#L5), [dx-action](projects/ng-dijta/src/lib/components/dx-table/components/dx-action/dx-action.component.html#L6-L7), [dx-table](projects/ng-dijta/src/lib/components/dx-table/components/dx-table/dx-table.component.html#L12), [dx-input-chips](projects/ng-dijta/src/lib/components/dx-input-chips/dx-input-chips.component.html#L21).

### H7. Missing `public-api.ts` exports
- [dx-popconfirm](projects/ng-dijta/src/lib/components/dx-popconfirm/) — has module, not exported
- [dx-qrcode](projects/ng-dijta/src/lib/components/dx-qrcode/) — has component, not exported

### H8. CSS-variable scheme/state words (Tier 2: theming.md Guardrail 3)
- [theme/pagination/_pagination.scss:7, 273](projects/ng-dijta/src/lib/theme/pagination/_pagination.scss#L7) — `--dx-pagination-button-disabled`
- [theme/material-override/_checkbox.scss](projects/ng-dijta/src/lib/theme/material-override/_checkbox.scss) — `--dx-checkbox-selected-icon-color`, `--dx-checkbox-selected-checkmark-color` (lines 2, 3, 10, 11, 14, 17)

---

## MEDIUM — Tech Debt

| # | Finding | Count |
|---|---|---|
| M1 | Components without `ChangeDetectionStrategy.OnPush` | 234 / 274 (85%) |
| M2 | SCSS with `transition`/`animation`/`@keyframes` but no `@media (prefers-reduced-motion: reduce)` | ~30 files |
| M3 | `@ts-ignore` (should be `@ts-expect-error` with reason) | 7 sites — [dx-tree:153](projects/ng-dijta/src/lib/components/dx-tree/dx-tree.component.ts#L153), [dx-dual-listbox:538-545](projects/ng-dijta/src/lib/components/dx-dual-listbox/dx-dual-listbox.component.ts#L538), [dx-tooltip/base.ts:295](projects/ng-dijta/src/lib/components/dx-tooltip/base.ts#L295), [file-picker.service.ts:17](projects/ng-dijta/src/lib/components/dx-image-upload/core/file-picker.service.ts#L17), [dx-chart:99](projects/ng-dijta/src/lib/components/dx-chart/dx-chart.component.ts#L99) |
| M4 | TODO / FIXME / HACK comments | 4 — [dx-currency.directive:198](projects/ng-dijta/src/lib/core/UI/core/currency/directive/dx-currency.directive.ts#L198), [dx-qrcode/types.ts:60](projects/ng-dijta/src/lib/components/dx-qrcode/types.ts#L60), [file-picker.component.ts:169](projects/ng-dijta/src/lib/components/dx-image-upload/core/file-picker.component.ts#L169), [mention.directive.ts:189](projects/ng-dijta/src/lib/directive/mentions/dx-mention.directive.ts#L189) |
| M5 | Component folders missing `index.ts` barrel | 2 — `dx-confirm`, `dx-tree-v2` |
| M6 | Duplicate exports in `public-api.ts` | 4 — lines 14, 62, 71, 119 (dx-table, dx-tooltip, tab, trim-input.directive) |
| M7 | Suspicious fire-and-forget subscribe | [file-picker.component.ts:172](projects/ng-dijta/src/lib/components/dx-image-upload/core/file-picker.component.ts#L172), [dx-multi-lookup.component.ts:120](projects/ng-dijta/src/lib/components/dx-multi-lookup/dx-multi-lookup.component.ts#L120) — verify `ngOnDestroy` cleanup |

---

## LOW — Practice App

- [practice/app.module.ts:13, 16](projects/practice/src/app/app.module.ts#L13) — relative imports `../../../ng-dijta/src/lib/components/...` instead of `@ngdx/dijta` (line 5 shows the correct pattern).

---

## Clean — No Findings

- ✓ No `app-` selectors in library (all `dx-*`)
- ✓ No `eval()` / `new Function()`
- ✓ No `localStorage` for tokens / passwords / secrets
- ✓ No sensitive data in `console.*`
- ✓ No `translateSignal` (Transloco-8 API not accidentally used)
- ✓ No `chroma`/`tinycolor`/`color-convert` in component code
- ✓ No camelCase in `--dx-*` variable names
- ✓ Practice app has no a11y / i18n violations of its own

---

## Recommended Remediation Order

1. **C2** — Add `@security` JSDoc to all 15 `bypassSecurityTrust*` sites (mechanical, ~1 hr).
2. **C3** + **H6** — Fix `dx-table-menu` icon buttons + sweep `aria-hidden="true"` onto decorative `<mat-icon>` (mostly mechanical, biggest a11y win).
3. **H5** — Migrate hardcoded tooltips/placeholders to Transloco keys (blocks i18n).
4. **H7** + **M5** + **M6** — Clean up `public-api.ts` (10 minutes; high leverage for consumers).
5. **C1** — Plan migration of `modal` / `dx-confirm` / `dx-toastr` / `dx-tooltip` to Material primitives. This is the largest item — propose as a dedicated phase, not a single PR.
6. **H3** + **H2** — Replace `::ng-deep` and Material-internals selectors as Material 18 styling APIs allow.
7. **H1** + **H4** — Long-tail cleanup of `any` and hardcoded colors; track via incremental sweeps per component family.
