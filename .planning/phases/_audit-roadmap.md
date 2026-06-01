# Audit Remediation Roadmap

**Source:** [AUDIT.md](../../AUDIT.md) (2026-04-23)
**Created:** 2026-04-24
**Sequencing rule:** Low breaking risk → High breaking risk. Each phase is one or more PRs; risk goes up monotonically.

## Why this ordering

We ship the safe stuff first to reduce noise from the AUDIT report and build muscle memory for the change pipeline, then graduate to changes that need consumer coordination, then to visual / behavioral changes that need component-by-component verification, then to the major version migration.

## Phase Index

| # | Phase | Risk | Consumer impact | Audit items covered |
|---|---|---|---|---|
| [03](03-audit-zero-risk-fixes/_phase.md) | Zero-risk fixes | None | None | C2, C3, H6, H7, M2, M5, M6, LOW |
| [04](04-audit-typescript-cleanup/_phase.md) | TypeScript cleanup | Low | None | H1, M3, M7 |
| [05](05-audit-i18n-externalization/_phase.md) | i18n externalization | Medium | New translation keys required | H5 |
| [06](06-audit-css-token-rename/_phase.md) | CSS token rename | Medium | Deprecation notice (alias kept) | H8 |
| [07](07-audit-color-tokenization/_phase.md) | Color → theme tokens | Medium | Visual diff per family | H4 |
| [08](08-audit-material-styling-cleanup/_phase.md) | Remove `::ng-deep` + `.mat-mdc-*` | High | Visual regressions possible | H2, H3 |
| [09](09-audit-onpush-migration/_phase.md) | OnPush migration | High | Stale-UI bugs possible | M1 |
| [10](10-audit-material-first-migration/_phase.md) | Material-first migration | Breaking (semver major) | Full consumer migration | C1 |

## Dependency Graph

```text
03 (zero-risk) ─┬─ 04 (typescript)
                ├─ 05 (i18n)
                ├─ 06 (token rename)
                └─ 07 (color tokens) ── 08 (styling cleanup) ── 09 (onpush) ── 10 (material-first)
```

03–06 can run in parallel after 03 lands. 07 should land before 08 (the styling cleanup will be much easier once theme tokens already drive component colors). 08 → 09 → 10 are sequential because each one risks visual regressions that get harder to attribute when stacked.

## Project Reality

These plans use the project's actual stack, not the `/plan-epic` template defaults:

| Template default | Reality |
|---|---|
| `dijta-ui-kit` | `ng-dijta` (`@ngdx/dijta`) |
| `dijta-playground` | `practice` |
| PrimeNG | Angular Material 18 |
| `progress/plans/phase-N/` | `.planning/phases/NN-slug/` |
| `npx ng build dijta-ui-kit` | `npm run build` (library + scss-bundle) |
| `npx ng test dijta-ui-kit` | `npx ng test ng-dijta` |
| `AI.md` (machine-readable summary) | `npm run doc` (compodoc) — there is no AI.md today |

PrimeNG MCP is skipped throughout (the project uses Material). Where the audit findings reference Material reinvention (Phase 10), the planning calls for Material-primitive replacements directly.

## Exit criterion for the milestone

When phases 03–10 are complete:
- AUDIT.md re-run produces zero CRITICAL findings
- HIGH findings count ≤ 50 (from ~1,250) — long-tail `any` cleanup may continue beyond this milestone
- All MEDIUM and LOW findings cleared
- `npm run build && npm test` green
- A semver-major release is cut for Phase 10
