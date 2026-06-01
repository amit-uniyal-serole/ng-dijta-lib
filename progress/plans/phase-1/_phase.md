# Phase 1: MF i18n for Module Federation Remotes

**Status:** in_progress
**Started:** 2026-05-14
**Target:** —

## Goal

Ship a complete in-library solution for Angular Module Federation remotes to register, lazy-load, and consume their own Transloco translations under a remote-scoped namespace — replacing the per-remote `setTranslation`-in-constructor pattern. Land the release-pipeline fix first so every subsequent MF i18n release publishes a real GitHub changelog describing the new APIs to downstream consumers. The feature ships in four sequential PRs; epic E01 is no-version-bump CI work and epics E02–E04 each ship a library minor.

## Exit Criteria

- [ ] `npm run verify` green across the workspace at every release boundary
- [x] `projects/ng-dijta/src/public-api.ts` re-exports every new public symbol via `./lib/mf-i18n`
- [ ] `@ngdx/dijta/webpack` sub-path resolves to the helper in `dist/ng-dijta`
- [ ] One pilot remote registered against the new stack with `'foo' | dxi18n` templates and `withDxRemote(...)` webpack config
- [ ] `npm run doc` produces no new warnings — every new public class / input / output has JSDoc per `.claude/rules/jsdoc.md`
- [x] Every release in this phase shows a real Conventional-Commits-derived body on GitHub Releases (no "version bump only" placeholder)

## Version Bump Strategy

| Epic | Release version |
|------|-----------------|
| P1-E01 | n/a (CI / release tooling, no library code) |
| P1-E02 | 18.8.0 |
| P1-E03 | 18.9.0 |
| P1-E04 | 18.10.0 |

Confirm with the maintainer before tagging — these are proposals, not commitments.

## Epics

| # | Epic | Title | Status | Dependencies |
|---|------|-------|--------|--------------|
| P1-E01 | [Plan](P1-E01-release-changelog-fix.md) | Fix Nx Release changelog so GitHub Releases include real commit details | done | — |
| P1-E02 | [Plan](P1-E02-mf-i18n-runtime.md) | DxRemoteI18nModule + DxLangLoaderService (runtime foundation) | done | P1-E01 |
| P1-E03 | [Plan](P1-E03-mf-i18n-pipe-directive-service.md) | DxI18nPipe + DxRemoteI18nDirective + DxI18nService + strict mode | done | P1-E02 |
| P1-E04 | [Plan](P1-E04-mf-i18n-webpack-helper.md) | withDxRemote webpack helper + sub-path export `@ngdx/dijta/webpack` | planned | P1-E03 |

## Dependency Graph

```text
P1-E01 (release changelog fix — ships first so all subsequent releases get real notes)
  └── P1-E02 (runtime foundation, 18.8.0)
        └── P1-E03 (pipe / directive / service, 18.9.0)
              └── P1-E04 (webpack helper + sub-path export, 18.10.0)
```

> **Never bundle a runtime API change with the build-time helper in the same PR.**

## Cross-Cutting Constraints

| Constraint |
|---|
| Composition over inheritance — pipe / directive must not extend `TranslocoPipe` / `TranslocoDirective` |
| Strict-mode default = `isDevMode()`; lenient prod fallback returns the raw key |
| Race-safe lazy loading: in-flight `Map`, staleness check, destroy guard |
| Single source of truth for shared peer ranges (`DX_PEER_RANGES`) |
| Register-once guard (`@Optional() @SkipSelf()`) on `DxRemoteI18nModule` |
| Nested remote registration unsupported in v1 |
| Co-occurrence with native `provideTranslocoScope` inside a registered remote is forbidden |
| Every release in this phase emits a real changelog body — enforced by the CI guard added in P1-E01 |
