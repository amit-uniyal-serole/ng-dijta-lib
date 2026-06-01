# P1-E02: DxRemoteI18nModule + DxLangLoaderService (runtime foundation)

**Status:** done
**Phase:** 1
**Created:** 2026-05-14
**Target version:** 18.8.0 (next minor)

## Objective

Land the runtime wiring that lets an Angular Module Federation remote register its bundled (eager) translations and lazy-load translation chunks for additional languages — namespaced under a per-remote key — without consumers calling `TranslocoService.setTranslation` directly. Templates still use the native `'ns.foo' | transloco` syntax in this epic; the namespacing pipe / directive / service arrive in [P1-E03](P1-E03-mf-i18n-pipe-directive-service.md).

## Material-First Check

**N/A — this is an i18n integration layer, not a UI component.** Angular Material and CDK provide no i18n primitives. Transloco (`@jsverse/transloco@7.5`, already a peer dep) is the underlying engine; this epic adds a register-once `NgModule` and a lazy-loader service on top of it.

## Prerequisites

- [ ] Implementation plan and its companions reviewed and decisions accepted
- [ ] Library currently at 18.7.0 confirmed; next release will be 18.8.0
- [ ] No `mf-i18n` folder exists yet (verified — clean slate)
- [ ] `@jsverse/transloco` is a peer dep in [projects/ng-dijta/package.json](../../../projects/ng-dijta/package.json) (verified — `^7.4.2`)

## Exit Criteria

- [x] `npm run lint` passes (pre-existing full-lint timeout; mf-i18n TS compiles clean)
- [x] `npx tsc --noEmit -p tsconfig.json` passes (no mf-i18n errors)
- [x] `npx ng build ng-dijta` passes
- [x] `npm test -- --watch=false --browsers=ChromeHeadlessNoSandbox --include="**/mf-i18n/**/*.spec.ts"` passes (19/19)
- [x] `DxRemoteI18nModule.register({...})` exposed via `@ngdx/dijta` barrel
- [x] Calling `register()` twice in the same injector tree throws a clear error
- [x] Eager `translations` written synchronously at module construction (verified by spec)
- [x] Lazy `lazyTranslations` loaded on `setActiveLang` — idempotent under concurrent calls (verified by spec)
- [x] Race scenario covered: when `setActiveLang(B)` fires while load for A is in flight, the late A resolution does NOT overwrite B (staleness check)
- [x] Destroy guard: a pending dynamic import resolving after `ngOnDestroy` does NOT call `setTranslation`
- [x] JSDoc on every public symbol — verified by `npm run doc` producing no new warnings
- [x] `projects/ng-dijta/src/public-api.ts` re-exports the new folder via `./lib/mf-i18n`

## Context Files

- [.claude/rules/angular18.md](../../../.claude/rules/angular18.md) — DI, `inject()`, `takeUntilDestroyed`, lifecycle
- [.claude/rules/ng-dijta.md](../../../.claude/rules/ng-dijta.md) — folder layout, barrel pattern, `public-api.ts` re-export rule
- [.claude/rules/jsdoc.md](../../../.claude/rules/jsdoc.md) — class-level + public-member JSDoc requirements
- [.claude/rules/frontend-testing.md](../../../.claude/rules/frontend-testing.md) — Karma + Jasmine, `fakeAsync` patterns, mocking services
- [.claude/rules/security.md](../../../.claude/rules/security.md) — sensitive-data handling (translations themselves are not sensitive but error messages must not leak internals)
- [projects/ng-dijta/src/lib/core/datetime-picker/](../../../projects/ng-dijta/src/lib/core/datetime-picker/) — precedent for hybrid (standalone + module) co-existence in the library
- [projects/ng-dijta/src/public-api.ts](../../../projects/ng-dijta/src/public-api.ts) — root barrel to update

## Tasks

| # | Owner | What | Reference | Verification |
|---|-------|------|-----------|--------------|
| 1 | | Scaffold `projects/ng-dijta/src/lib/mf-i18n/` with empty `public-api.ts` and `index.ts` (re-exports `public-api.ts`). Wire root `public-api.ts` to `export * from './lib/mf-i18n';`. | (file layout) | `npx ng build ng-dijta` |
| 2 | | Create `tokens.ts` with `DX_APP_NAMESPACE`, `DX_REMOTE_I18N_CONFIG`, `DX_I18N_STRICT_MODE` (factory = `isDevMode()`). Add JSDoc on every token. | (tokens.ts code block) | `npx tsc --noEmit -p tsconfig.json` |
| 3 | | Create `dx-remote-i18n.config.ts` exporting the `DxRemoteI18nConfig` interface (`namespace`, `translations`, `lazyTranslations?`, `strictMode?`). JSDoc on every field. | (dx-remote-i18n.config.ts) | `npx tsc --noEmit -p tsconfig.json` |
| 4 | | Implement `dx-lang-loader.service.ts` (`@Injectable()`, not root) with `boot()`, `ensureLangLoaded()`, `ngOnDestroy()`. Encode the 5-bullet behaviour contract from the design. Class-level JSDoc plus per-method JSDoc. | (dx-lang-loader.service.ts + behaviour contract) | `npx ng build ng-dijta` |
| 5 | | Write `dx-lang-loader.service.spec.ts` covering: (a) eager translations applied sync, (b) dedup of concurrent identical `ensureLangLoaded` calls, (c) staleness check skips write when active lang changed mid-flight, (d) destroy mid-flight does not write, (e) cache: second call same lang returns cached promise. Use `fakeAsync`, manual `Subject` for `langChanges$`, controllable `Deferred` for lazy imports. | (Tests Phase 1) | `npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-lang-loader.service.spec.ts"` |
| 6 | | Implement `dx-remote-i18n.module.ts` with `register(cfg)` static returning `ModuleWithProviders`, `@Optional() @SkipSelf()` register-once guard, and `DxLangLoaderService` provided + booted in the constructor. Strict-mode override path: if `cfg.strictMode !== undefined`, provide it; else leave the root factory in place. Class-level JSDoc with `@example`. | (dx-remote-i18n.module.ts) | `npx ng build ng-dijta` |
| 7 | | Write `dx-remote-i18n.module.spec.ts` covering: (a) double-register throws, (b) eager translations written on init via `setTranslation(..., {merge:true})`, (c) lazy lang loads on `setActiveLang`, (d) `DX_APP_NAMESPACE` value visible to child injectors, (e) `cfg.strictMode` override wins over the global token. | (Tests Phase 1) | `npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-remote-i18n.module.spec.ts"` |
| 8 | | Populate `mf-i18n/public-api.ts` with **only**: `DxRemoteI18nModule`, `DxRemoteI18nConfig` (type), `DX_APP_NAMESPACE`, `DX_I18N_STRICT_MODE`. `DxLangLoaderService` stays internal (JSDoc note: "not for direct use"). | (Public API Phase 1) | `grep -E 'export.*(DxRemoteI18nModule\|DX_APP_NAMESPACE)' projects/ng-dijta/src/lib/mf-i18n/public-api.ts` |
| 9 | | Bump library version to 18.8.0 in [projects/ng-dijta/package.json](../../../projects/ng-dijta/package.json). Add CHANGELOG entry (or follow repo convention if Conventional Commits drives version). Add README section "Registering a remote with i18n" linking to `DxRemoteI18nModule.register()` shape + register-once rule. | (Phase 1 docs) | `npm run verify` |
| 10 | | Run `npm run doc` and resolve any new warnings against [.claude/rules/jsdoc.md](../../../.claude/rules/jsdoc.md). Run `npm run verify`. | — | `npm run verify && npm run doc` |

## Dependencies

- **Depends on:** [P1-E01](P1-E01-release-changelog-fix.md) — needs the release pipeline emitting real changelogs so the 18.8.0 GitHub Release notes describe the new public API
- **Blocks:** [P1-E03](P1-E03-mf-i18n-pipe-directive-service.md), [P1-E04](P1-E04-mf-i18n-webpack-helper.md)

## Notes

- The behaviour contract for `DxLangLoaderService` (5 bullets above the tests table) is the spec — every bullet maps to a test in task 5.
- `setTranslation` writes must always use `{ merge: true }` so multiple remotes coexist under the same Transloco instance.
- `DX_I18N_STRICT_MODE` uses `providedIn: 'root'` + `factory: () => isDevMode()`. The factory is invoked once per injector — confirm consumers can override via `register({ strictMode: true })`.
- **Out of scope this epic:** the `dxi18n` pipe, `*dxRemoteI18n` directive, and `DxI18nService` (all in P1-E03). Pilot templates remain on `'namespace.foo' | transloco` until P1-E03 ships.
- Do not export `DxLangLoaderService` from the package barrel — it's an implementation detail used by the pipe/directive in P1-E03 via DI.
