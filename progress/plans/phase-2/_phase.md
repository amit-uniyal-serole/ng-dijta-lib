# Phase 2: Theme Token Consolidation

**Status:** not_started
**Started:** —
**Target:** —

## Goal

Land the library-side migration that consumes the canonical `--dx-spacing-*` and `--dx-radius-*` token scales declared at `:root` in [partials/_default.scss](../../../projects/ng-dijta/src/lib/theme/partials/_default.scss) (shipped in Phase 1 of [doc/proposals/spacing-and-radius-scales.md](../../../doc/proposals/spacing-and-radius-scales.md), PR #16, commit `a0a925a`). Replace the raw `rem` / `px` literals scattered across ~100 component SCSS partials and ~100 theme partials with `var(--dx-spacing-{step}, literal)` / `var(--dx-radius-{step}, literal)` references — fallback preserved so the bundle stays pixel-stable by construction. Track-B consumer-app migration is out of scope (tracked in [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 and T16).

## Exit Criteria

- [ ] `npm run verify` green at every PR boundary in the phase
- [ ] No `(padding|margin|gap|border-radius)` declaration in `projects/ng-dijta/src/lib/components/**/*.scss` or `projects/ng-dijta/src/lib/theme/**/*.scss` uses a bare scale-step literal (`0.25rem` / `0.5rem` / `1rem` / `1.5rem` / `2rem` and their `4px` / `8px` / `16px` / `24px` / `32px` equivalents) — every site routes through `var(--dx-spacing-*, literal)` or `var(--dx-radius-*, literal)`
- [ ] `dist/ng-dijta/index.d.ts` and `dist/ng-dijta/public-api.d.ts` show **zero diff** between phase start and phase end
- [ ] Gzipped `dist/ng-dijta/theme/_dx-theme.scss` measured before and after; delta documented in the final epic notes (proposal expects neutral to -1%)
- [ ] Practice app screenshots before / after each domain batch confirm pixel-stable rendering (no `lg` 1.5rem ↔ 2rem regressions inside the library — Track-B consumer hazard does not apply here)
- [ ] [doc/explore/library-gaps.md](../../../doc/explore/library-gaps.md) rows T1–T4 and T16 updated to "shipped + library-internal sites migrated" once the epic completes

## Version Bump Strategy

| Epic | Release version | Rationale |
|------|-----------------|-----------|
| P2-E01 | one patch bump per merged PR | Each domain batch is a `refactor(theme):` — Conventional Commits maps to patch. Consider grouping later batches under `chore(theme):` (no bump) if the patch-release cadence becomes noisy; decide with the maintainer before merging task 1. |

Confirm with the maintainer before tagging.

## Epics

| # | Epic | Title | Status | Dependencies |
|---|------|-------|--------|--------------|
| P2-E01 | [Plan](P2-E01-spacing-radius-library-migration.md) | Migrate library SCSS literals to `--dx-spacing-*` / `--dx-radius-*` tokens | planned | Phase 1 spacing/radius tokens shipped (PR #16) |

## Dependency Graph

```text
Phase 1 of spacing-and-radius-scales proposal (PR #16, shipped)
  └── P2-E01 (library-internal migration — this phase)
        └── Track B (consumer-app migration, tracked separately in library-gaps.md)
```

## Cross-Cutting Constraints

| Constraint |
|---|
| Preserve the literal as the `var()` fallback on every replacement — pixel-stable by construction |
| Only migrate values that **exactly** match a scale step. Out-of-scale offsets (e.g. `0.625rem`, `1.25rem`, `0.75rem`) stay as literals and are flagged in the PR description for a follow-up design decision |
| Property selectivity: `padding*` / `margin*` / `gap` / `row-gap` / `column-gap` → spacing; `border-*radius` → radius. Do NOT migrate `width` / `height` / `flex-basis` / `min-*` / `max-*` / `top` / `left` / `right` / `bottom` |
| No public TypeScript API change — `dist/ng-dijta/index.d.ts` and `dist/ng-dijta/public-api.d.ts` must show zero diff between phase start and phase end |
| No scheme branching, no state words in any new variable reference (Guardrails 3 & 4 of [theming.md](../../../.claude/rules/theming.md)) |
| Each task = one PR. PRs stay small enough for visual review (one domain batch each) |
| Material internals are not touched — only the library's wrapper SCSS around Material primitives |
