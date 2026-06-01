# P2-E01: Migrate library SCSS literals to `--dx-spacing-*` / `--dx-radius-*` tokens

**Status:** planned
**Phase:** 2
**Created:** 2026-05-19
**Target version:** patch bumps per merged task PR (see [_phase.md](_phase.md))

## Objective

Land the Phase 2 / Track A migration described in [doc/proposals/spacing-and-radius-scales.md](../../../doc/proposals/spacing-and-radius-scales.md): replace every scale-step `rem` / `px` literal on `padding*` / `margin*` / `gap` / `border-*radius` properties in the library's component and theme SCSS with the canonical `var(--dx-spacing-{step}, literal)` / `var(--dx-radius-{step}, literal)` references that shipped at `:root` in PR #16. Literal fallback preserved on every site — pixel-stable by construction. Out-of-scale offsets stay as literals and are surfaced in PR descriptions for a follow-up design pass; they are not silently migrated.

Track B (consumer-app migration) is **explicitly out of scope** for this epic — that work happens in consumer repositories and is tracked in [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 and T16.

## Material-First Check

**N/A — this is an SCSS theming migration, not a UI component.** Angular Material's own `density` / `shape` tokens cover Material component internals; this epic touches only the **library's own wrapper SCSS around** Material primitives (the `.dx-*` classes that add layout padding, gap, and corner radius around `mat-*` host elements). No Material override or `::ng-deep` reach-in is introduced.

## Prerequisites

- [ ] Phase 1 of the proposal shipped to `main` (PR #16, commit `a0a925a` on 2026-05-19) — **confirmed** in [partials/_default.scss:75-84](../../../projects/ng-dijta/src/lib/theme/partials/_default.scss#L75-L84)
- [ ] Phase 1 published to npm so the bundled `dist/ng-dijta/theme/_dx-theme.scss` includes the new declarations (verify with `grep '\-\-dx-spacing-xs' dist/ng-dijta/theme/_dx-theme.scss` after `npm run build`)
- [ ] Maintainer has chosen between `refactor(theme):` (patch bump per PR) and `chore(theme):` (no bump, single release at epic close) — record the decision in [_phase.md](_phase.md) before opening task 1's PR
- [ ] Practice app boots cleanly at the head of `main` so screenshots can be captured as the visual baseline (`npm start`)

## Exit Criteria

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit -p tsconfig.json` passes
- [ ] `npx ng build ng-dijta` passes
- [ ] `npm test -- --watch=false --browsers=ChromeHeadless` passes
- [ ] `npm run verify` passes
- [ ] After every task in this epic, the following grep returns no matches inside the touched domain folders:
      `grep -rE "(padding|padding-(top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end)|margin|margin-(top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end)|gap|row-gap|column-gap):\s*(0?\.25rem|0?\.5rem|1rem|1\.5rem|2rem|4px|8px|16px|24px|32px)\s*;" projects/ng-dijta/src/lib/components/<domain> --include='*.scss'`
- [ ] Equivalent grep for `border-(top-left-|top-right-|bottom-left-|bottom-right-)?radius` against `0.25rem` / `0.5rem` / `1rem` / `4px` / `8px` / `16px` returns no matches in any touched domain folder
- [ ] `dist/ng-dijta/index.d.ts` and `dist/ng-dijta/public-api.d.ts` **diff-equal** between epic start and epic end (no public TS API change)
- [ ] `dist/ng-dijta/theme/_dx-theme.scss` regenerates cleanly; gzipped byte delta measured and recorded in the final task's PR description
- [ ] Out-of-scale literals encountered during migration are listed in the relevant PR's description with the proposed design decision deferred to a follow-up
- [ ] [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 and T16 updated from "✅ pending release" → "✅ shipped + library-internal sites migrated"
- [ ] `npm run doc` produces no new warnings (no JSDoc surface changes expected — verify regardless because compodoc reads source files this epic touches)

## Context Files

- [doc/proposals/spacing-and-radius-scales.md](../../../doc/proposals/spacing-and-radius-scales.md) — the proposal driving this epic; especially the "Phase 2 — Codebase migration" and "Risks & mitigations" sections
- [.claude/rules/theming.md](../../../.claude/rules/theming.md) — token scales (spacing 5-step, radius 3-step), Guardrails 3 (no state words) and 4 (kebab-case), MD3-alias sanctioned exception
- [.claude/rules/ng-dijta.md](../../../.claude/rules/ng-dijta.md) — library structure, `dx-` prefix on every CSS class, Material-first principle
- [.claude/rules/frontend-prohibited.md](../../../.claude/rules/frontend-prohibited.md) — Tier-1 prohibition on hardcoded values where a token exists
- [projects/ng-dijta/src/lib/theme/partials/_default.scss](../../../projects/ng-dijta/src/lib/theme/partials/_default.scss) — token declarations (lines 72-84) that this epic consumes
- [scss-bundle.config.json](../../../scss-bundle.config.json) — how `dist/ng-dijta/theme/_dx-theme.scss` is built from the partials
- [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) — rows T1–T4 (spacing) and T16 (radius) to update at epic close

## Migration Rules (binding for every task)

1. **Property-aware mapping** — `padding*` / `margin*` / `gap` / `row-gap` / `column-gap` map to `--dx-spacing-*`. `border-*-radius` map to `--dx-radius-*`. A `1rem` literal on `padding` becomes `var(--dx-spacing-md, 1rem)`; the same `1rem` on `border-radius` becomes `var(--dx-radius-lg, 1rem)`. **Never** cross the families.
2. **Exact-step rule** — only literal values that exactly match a scale step migrate. The full step table:
   | Step | Spacing literal(s) | Radius literal(s) |
   |------|--------------------|-------------------|
   | `xs` | `0.25rem` / `4px`  | — |
   | `sm` | `0.5rem`  / `8px`  | `0.25rem` / `4px` |
   | `md` | `1rem`    / `16px` | `0.5rem`  / `8px` |
   | `lg` | `1.5rem`  / `24px` | `1rem`    / `16px` |
   | `xl` | `2rem`    / `32px` | — |
3. **Fallback preservation** — the original literal stays inside the `var()` fallback slot: `padding: 1rem;` → `padding: var(--dx-spacing-md, 1rem);`. Pixel-stable by construction; the variable still resolves to the same computed value (proposal §"Impact analysis").
4. **Out-of-scale stays literal** — values like `0.625rem`, `0.75rem`, `1.25rem`, `0.125rem`, `3px`, `12px`, `20px` do NOT migrate. They are surfaced in the PR description under "Out-of-scale literals encountered" so a follow-up can decide whether to add a half-step token (e.g. `--dx-spacing-md-tight`) or reshape the component to a scale step.
5. **Property scope** — do NOT migrate `width` / `height` / `min-*` / `max-*` / `top` / `left` / `right` / `bottom` / `inset` / `flex-basis` / `transform` offsets / `font-size` / `line-height`. They are out of scope even if they happen to use scale-step values today (the scales are spacing-and-radius, not geometry-at-large).
6. **Shorthand expansion** — when a shorthand mixes scale-step and out-of-scale values (e.g. `padding: 0.625rem 1rem;`), split into longhand and migrate only the matching site (`padding: 0.625rem var(--dx-spacing-md, 1rem); /* TODO: 0.625rem out-of-scale */`). The unmigrated half goes in the PR's out-of-scale list.
7. **No `::ng-deep`, no Material private API reach-in** — if a `.dx-*` class wraps a Material element and adds padding, migrate the `.dx-*` rule. Never migrate selectors inside `::ng-deep` (those are pre-existing prohibitions, see [frontend-prohibited.md](../../../.claude/rules/frontend-prohibited.md)).
8. **No re-formatting drift** — each migration changes only the right-hand side of declarations. Do not reorder properties, collapse rules, or rename selectors in the same PR.

## Tasks

> Each task is one PR. The "Domain" column lists the component dirs under [projects/ng-dijta/src/lib/components/](../../../projects/ng-dijta/src/lib/components/) (or theme path) that the task migrates. Per-task verification = the exact-step grep (rule 2) returns empty inside the listed dirs, plus the build / verify commands in the right column.

| # | Owner | What | Domain / Reference | Verification |
|---|-------|------|--------------------|--------------|
| 1 | | **Pilot — `dx-card` + `dx-button`.** Apply migration rules 1–8 to both component folders. Capture before/after screenshots of every card / button variant in the practice app and attach to the PR. Establishes the visual-diff workflow used by every later task. | `dx-card/`, `dx-button/`, `dx-floater-button/` | `npx ng build ng-dijta && npm run build` plus the exit-criteria grep over `dx-card` / `dx-button` / `dx-floater-button` returns empty |
| 2 | | **Single-field form inputs.** Migrate spacing + radius literals across the single-input family. | `dx-input/`, `dx-textarea/`, `dx-email/`, `dx-number/`, `dx-currency/`, `dx-ip/`, `dx-input-label/`, `dx-input-email/`, `dx-input-phone/`, `dx-input-url/`, `dx-input-icon/`, `dx-input-name/`, `dx-input-company/` | `npx ng build ng-dijta` + grep over the listed dirs returns empty |
| 3 | | **Selects, dropdowns, autocomplete.** | `dx-select/`, `dropdown/`, `select/`, `dx-autocomplete-select/`, `dx-chip-select/`, `dx-chip-autocomplete/`, `dx-lookup/`, `dx-multi-lookup/`, `dx-server-side-autocomplete/`, `cascader/` | `npx ng build ng-dijta` + grep returns empty |
| 4 | | **Choice controls + uploaders.** | `dx-checkbox/`, `dx-radio-button/`, `dx-toggle/`, `dx-toggle-panel/`, `dx-file-upload/`, `dx-image-upload/`, `dx-upload/`, `dx-upload-file-popup/` | `npx ng build ng-dijta` + grep returns empty |
| 5 | | **Date & time pickers.** | `dx-datepicker/`, `dx-daterange/`, `dx-datetime-picker/`, `dx-time-picker/`, `dx-input-datepicker/`, `dx-input-dob/`, `dx-activity-calendar/` | `npx ng build ng-dijta` + grep returns empty |
| 6 | | **Chips & tags.** | `dx-tag/`, `dx-tag-input/`, `dx-input-chips/` | `npx ng build ng-dijta` + grep returns empty |
| 7 | | **Tables.** | `dx-table/`, `dx-config-table/`, `dx-nested-table/`, `dx-table-filter/`, `dx-table-view-wrapper/` | `npx ng build ng-dijta` + grep returns empty |
| 8 | | **Lists, trees, kanban, dual-listbox.** | `dx-tree/`, `dx-tree-v2/`, `tree-view/`, `dx-dual-listbox/`, `dx-kanban-view/` | `npx ng build ng-dijta` + grep returns empty |
| 9 | | **Filters & criteria builders.** | `dx-advance-filter/`, `dx-criteria-filter/` | `npx ng build ng-dijta` + grep returns empty |
| 10 | | **Layout & shell.** | `dx-layout/`, `dx-page/`, `dx-header/`, `dx-footer/`, `dx-sidebar/`, `dx-section-title/`, `dx-title/`, `dx-sticky/`, `dx-content/`, `dx-page-content-menu/`, `dx-navigation-menu/`, `dx-breadcrumb/` | `npx ng build ng-dijta` + grep returns empty |
| 11 | | **Overlays & modals.** | `dx-drawer/`, `dx-popover/`, `dx-popup/`, `dx-tooltip/`, `dx-notification/`, `dx-toastr/`, `modal/`, `dx-confirm/`, `dx-popconfirm/`, `dx-color-picker/`, `dx-icon-selection-popup/` | `npx ng build ng-dijta` + grep returns empty |
| 12 | | **Tabs, alerts, status, empty, fullscreen.** | `dx-tab-group/`, `tab/`, `dx-fullscreen/`, `dx-alert-message/`, `dx-status/`, `dx-empty/` | `npx ng build ng-dijta` + grep returns empty |
| 13 | | **Tiles, charts, canvas, widgets, timeline.** | `dx-basic-tile/`, `dx-chart-tile/`, `tiles/`, `dx-chart/`, `dx-canvas/`, `dx-qrcode/`, `dx-widget/`, `dx-timeline/` | `npx ng build ng-dijta` + grep returns empty |
| 14 | | **Avatars, loaders, misc residuals.** | `dx-avatar/`, `dx-loader/`, `dx-skeleton-loader/`, `loading/`, `dx-coordinates/`, `dx-qms-core-ui/`, `image-preview/` | `npx ng build ng-dijta` + grep returns empty |
| 15 | | **Theme partials.** Migrate `projects/ng-dijta/src/lib/theme/**/*.scss` excluding `partials/_default.scss` itself (the token declarations live there and are intentionally literal). Honour rules 1–8 the same way. | `projects/ng-dijta/src/lib/theme/` (all `.scss` except `partials/_default.scss`) | `npx ng build ng-dijta && npm run build` (regenerates the bundled theme) + grep over `projects/ng-dijta/src/lib/theme` (excluding `partials/_default.scss`) returns empty |
| 16 | | **Bundle audit + gap-log update + final verify.** Run `npm run build` and `npm run build:scss`. Record uncompressed and gzipped byte size of `dist/ng-dijta/theme/_dx-theme.scss` before (snapshot from `git show <epic-start-sha>:dist/...` if dist is tracked, otherwise rebuild on `main`) and after. Update [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 and T16. Compile and merge the per-task "out-of-scale literals encountered" lists into a follow-up issue. | (no code beyond the gap-log update) | `npm run verify && npm run doc`; bundle delta documented in PR body; `git diff` of `dist/ng-dijta/index.d.ts` and `dist/ng-dijta/public-api.d.ts` between epic-start and now is empty |

## Dependencies

- **Depends on:** Phase 1 of [doc/proposals/spacing-and-radius-scales.md](../../../doc/proposals/spacing-and-radius-scales.md) (PR #16) — must be published to npm so the bundled `theme/_dx-theme.scss` carries the token declarations.
- **Blocks:** Track B (consumer-app migration) — once this epic completes, [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 / T16 fully resolve and consumers can drop their literal-fallback workarounds.

## Notes

- **Pixel stability is a structural guarantee, not a verification step.** Every migration writes `var(token, literal)` where `literal` is the original value. If the variable is undefined the literal wins; if defined it resolves to the same nominal value. The proposal documents this in §"Impact analysis" → "Visual output (library) — Pixel-stable by construction."
- **One known visual hazard, contained to Track B:** the `--dx-spacing-lg` value moved from a 2rem app-side fallback to the canonical 1.5rem library value. The library itself never had a prior `lg` value (the audit confirms this), so this epic cannot trigger a visual regression — but consumer apps will, when they upgrade. That is **Track B's** responsibility and is logged in [library-gaps.md T4](../../../doc/explore/library-gaps.md).
- **`partials/_default.scss` is intentionally excluded** from the migration — it is the declaration site and uses literals on purpose so the tokens have concrete values to resolve to.
- **The "out-of-scale literals encountered" list is the most valuable artefact** of this epic beyond the migration itself. It surfaces every place where a hand-picked value drifts from the design rhythm — input for future design / token decisions (proposal §"Open design questions" item 3).
- **Per-task PR cadence** keeps each visual diff small enough to eyeball in the practice app. Resist the temptation to batch task 6 into task 7 etc. — the small-PR pattern is part of the risk mitigation in proposal §"Risks & mitigations" R2.
- **No JSDoc / public-API changes** are expected. Run `npm run doc` regardless (per exit criteria) — compodoc reads the source files this epic touches and any incidental warning should be caught.
- **Out of scope:**
  - Track B (consumer-app migration) — see [library-gaps.md](../../../doc/explore/library-gaps.md).
  - Typography scale (`--dx-font-size-*`) — proposal §"Out of scope"; tracked separately at T17.
  - Renaming component-local SCSS variables (`$dx-card-padding` etc.) — proposal §"Out of scope"; full consolidation is a follow-up.
  - Adding `--dx-spacing-none` / `--dx-radius-full` extensions — additive and easy to add later.
  - Adding a `Guardrail 5` for raw spacing/radius literals to [theming.md](../../../.claude/rules/theming.md) — worth a separate epic once this migration completes and the steady-state pattern is proven.
