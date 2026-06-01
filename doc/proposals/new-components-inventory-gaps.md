# New Components — Inventory Gap Survey (Proposal)

**Status:** Proposed — not implemented
**Authored:** 2026-05-20
**Scope:** Survey of `dx-*` component gaps in [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) and a recommended first-wave shortlist.

---

## TL;DR

1. The library exposes ~85 `dx-*` components today. Several common **Angular Material primitives have no `dx-*` wrapper** (stepper, accordion, slider, button-toggle group, toolbar, bottom-sheet, badge, generic progress).
2. A small set of **composite patterns** is also missing (confirm dialog, inline edit, description list, avatar group, rating, stat card, search bar, comment thread).
3. Recommended first wave: **`dx-stepper`, `dx-accordion`, `dx-badge`, `dx-segmented`, `dx-confirm-dialog`, `dx-copy`** — pure Material / CDK wrappers (or thin composites), no new runtime dependencies, each unblocks a recurring pattern in consumer apps.

---

## Motivation

- Consumer apps are reinventing common Material wrappers (confirm dialogs, copy buttons, segmented filters) inline, in feature code, without going through the library's theme / a11y / i18n protocols.
- The library already wraps the majority of Material's catalogue (form fields, table, datepicker, tabs, autocomplete, snackbar / toastr, tooltip, dialog, drawer). The missing primitives form a coherent, small gap rather than a broad rebuild.
- Each gap below is a known Material primitive or CDK utility — Material-first compliance is automatic; the work is wrapper-shaped (tokens, i18n keys, JSDoc), not invention.

---

## Material-first gap analysis

Confirmed by inspecting [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts) against the Angular Material 18.1 component catalogue.

### Material / CDK primitives with no `dx-*` wrapper

| Material / CDK primitive | Suggested wrapper | Why useful |
|---|---|---|
| `MatStepper` | `dx-stepper` | Multi-step wizards / onboarding / form flows |
| `MatExpansionPanel` / `MatAccordion` | `dx-accordion` | Collapsible sections (FAQ, settings groups) |
| `MatSlider` | `dx-slider` | Numeric / range selection (filters, thresholds) |
| `MatButtonToggleGroup` | `dx-segmented` | Segmented control / mutually exclusive toolbar toggles |
| `MatToolbar` | `dx-toolbar` | Page / dialog action bars (separate concern from `dx-header`) |
| `MatBottomSheet` | `dx-bottom-sheet` | Mobile-friendly action sheet |
| `matBadge` directive | `dx-badge` | Counts / "new" dots on icons & buttons |
| `MatProgressBar` / `MatProgressSpinner` | `dx-progress` | Consistent determinate / indeterminate API (`dx-loader` & `dx-skeleton-loader` exist but no general progress) |
| CDK `Clipboard` service | `dx-copy` (button + directive) | Copy-to-clipboard with toast feedback |
| CDK drag + resize | `dx-split-pane` | Resizable two-pane layouts (editors, master-detail) |

### Composite / pattern wrappers (build on existing `dx-*`)

No single Material primitive — these are conventional patterns repeatedly reinvented in consumer apps.

| Component | Built from | Use case |
|---|---|---|
| `dx-confirm-dialog` | `MatDialog` + standard layout | Pre-built confirm-delete pattern with i18n keys |
| `dx-inline-edit` | `dx-input` + edit/save state | Click-to-edit field |
| `dx-description-list` | semantic `<dl>` | Read-only key / value pairs (item detail headers) |
| `dx-avatar-group` | `dx-avatar` + overflow `+N` | Assignee / collaborator stacks |
| `dx-rating` | `mat-icon` + keyboard handling | Star / score input (no Material primitive) |
| `dx-empty-state` (illustration variant) | `dx-empty` + slot | Branded empty / error illustrations |
| `dx-stat` / `dx-metric` | small numeric card | Dashboard KPIs (delta arrow, sparkline slot) — `dx-basic-tile` is heavier |
| `dx-search-bar` | `dx-input` + `dx-autocomplete-select` + recent-searches | App-level search affordance |
| `dx-comment-thread` | list + textarea | Activity / comments stream |

### Content-display utilities

| Component | Notes |
|---|---|
| `dx-code-block` | Code snippet display with copy button — uses CDK `Clipboard`. Syntax-highlighting via slot / strategy so the library doesn't take a hard highlighter dep. |
| `dx-markdown` | Sanitised markdown render. Needs an opt-in adapter (e.g. `marked`) — peer-dep approach to keep bundle lean. |
| `dx-carousel` | Image / content carousel with autoplay, keyboard nav, pause-on-hover. No Material primitive — CDK `A11yModule` + custom. |
| `dx-tour` / `dx-coachmark` | Guided product-tour overlays — CDK `Overlay` + step orchestration. |

---

## Recommended first wave (shortlist)

Optimised for "Material primitive with no wrapper, used in most apps":

1. **`dx-stepper`** — multi-step flows are missing and consumers hand-roll them
2. **`dx-accordion`** — pairs with existing `dx-toggle-panel` / `dx-drawer` but covers a different surface
3. **`dx-badge`** — small, ubiquitous, almost free to ship
4. **`dx-segmented`** (`MatButtonToggleGroup`) — common filter / view-mode control
5. **`dx-confirm-dialog`** — replaces a pattern every consumer reinvents
6. **`dx-copy`** — tiny, CDK-backed, immediate quality-of-life win

All six:
- Wrap a single Material primitive or CDK utility (no new runtime dependencies).
- Have well-defined accessible behaviour built into Material — no custom keyboard / focus code needed beyond `aria-label` plumbing.
- Are small (1 component each, 1–2 inputs, 0–1 outputs) — appropriate for a single epic.

---

## Cross-cutting requirements (apply to every new component)

| Concern | Requirement |
|---|---|
| **API style** | Signal APIs (`input()` / `output()` / `model()`), `OnPush`, external `templateUrl` / `styleUrls`, NgModule + per-component `index.ts`, re-export from [public-api.ts](../../projects/ng-dijta/src/public-api.ts). |
| **i18n** | Every label / `aria-label` routed through Transloco — keys follow `dx.{domain}.{context}.{description}`. Transloco 7.5 — `translate()` / `selectTranslate()`, no v8 signal API. |
| **Accessibility** | Keep Material's built-in roles, keyboard, focus management. Add explicit `aria-label`s on icon-only triggers. |
| **Theme tokens** | Material theme + canonical `--dx-spacing-*` / `--dx-radius-*` scale. No hardcoded colors. |
| **Docs** | Class-level JSDoc + `@example`, `@default` on every optional input, regen `npm run doc` cleanly. |
| **Tests** | Karma + Jasmine — initialisation, inputs, outputs, a11y attributes. |

---

## Out of scope

- **Charts beyond `dx-chart` / `dx-chart-tile` / `dx-canvas`** — there's already library surface here; new chart types belong inside `dx-chart`, not as new top-level components.
- **Form orchestration** — `dx-form-builder` family is not part of this survey.
- **Backend-shaped components** — `dx-config-table`, `dx-server-side-autocomplete` style features that require app-specific data contracts.
- **Branding / illustration** — `dx-empty-state` illustration variant only if a consumer brings the artwork.

---

## Open questions

- [ ] Which of the four buckets (Material gap fillers / composite patterns / content-display / shortlist) should the first epic target?
- [ ] Is there a known consumer use case driving this (a feature blocked on a missing primitive), or is this a general inventory-completion exercise?
- [ ] Any appetite for non-trivial deps (`marked` for markdown, syntax highlighter), or strict "library stays dep-light"?

---

## Recommendation

Proceed with the **shortlist (1–6 above)** as a single epic. They are pure Material / CDK wrappers (or thin composites), follow established patterns, carry no new runtime deps, and each unblocks a recurring pattern in consumer apps.

The composite / content-display tiers are higher-effort and should wait for a real consumer ask — `dx-markdown` and `dx-carousel` especially deserve a concrete driving use case before investing.

Next step: `/plan-epic` to turn the shortlist (or a chosen subset) into an implementation plan.
