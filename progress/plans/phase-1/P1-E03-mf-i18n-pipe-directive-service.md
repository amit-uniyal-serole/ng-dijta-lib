# P1-E03: DxI18nPipe + DxRemoteI18nDirective + DxI18nService + strict mode

**Status:** done
**Phase:** 1
**Created:** 2026-05-14
**Target version:** 18.9.0

## Objective

Add the consumer-facing translation surface on top of the runtime foundation from [P1-E02](P1-E02-mf-i18n-runtime.md): a `dxi18n` pipe, a `*dxRemoteI18n` structural directive, and a `DxI18nService` facade — each of which automatically prepends the remote namespace (from `DX_APP_NAMESPACE`) so consumer code uses bare keys (`'foo'` instead of `'remoteName.foo'`). Includes the strict-mode behaviour contract: dev throws on missing namespace, prod logs + returns the raw key.

## Material-First Check

**N/A — i18n integration layer.** No Material or CDK primitive provides namespaced translation. The pipe / directive are built standalone (consistent with the `core/datetime-picker/` precedent in the library) and use **composition** with `TranslocoService` — they intentionally do NOT extend `TranslocoPipe` or `TranslocoDirective` .

## Prerequisites

- [ ] [P1-E02](P1-E02-mf-i18n-runtime.md) merged — `DxRemoteI18nModule`, `DxLangLoaderService`, `DX_APP_NAMESPACE`, `DX_I18N_STRICT_MODE` available
- [ ] Pilot remote registered against P1-E02 and green for one sprint with `'ns.foo' | transloco` templates (per the phase gate)

## Exit Criteria

- [x] `npm run lint` passes
- [x] `npx tsc --noEmit -p tsconfig.json` passes (no mf-i18n errors; pre-existing errors elsewhere unrelated)
- [x] `npx ng build ng-dijta` passes
- [x] `npm test -- --watch=false --browsers=ChromeHeadless --include="**/mf-i18n/**/*.spec.ts"` passes (55/55)
- [x] `DxI18nPipe`, `DxRemoteI18nDirective`, `DxI18nService` exposed via `@ngdx/dijta` barrel
- [x] `{{ 'foo' | dxi18n }}` resolves to the value at `${namespace}.foo` and re-renders on `setActiveLang`
- [x] `<ng-container *dxRemoteI18n="let t">{{ t('foo') }}</ng-container>` works; awaits lazy lang load before first render
- [x] `DxI18nService.translate / selectTranslate / translateObject / setActiveLang / getActiveLang / langChanges$` all prepend the namespace
- [x] Strict-mode behaviour matrix verified by spec:
  - dev (`isDevMode() === true`): missing namespace throws
  - prod (`isDevMode() === false`): missing namespace logs + returns raw key
  - `register({ strictMode: true })` override forces throw regardless of dev mode
- [x] No `TranslocoPipe` or `TranslocoDirective` import anywhere in `src/lib/mf-i18n/` (composition rule enforced by composition-contract.spec.ts)
- [x] `projects/ng-dijta/src/public-api.ts` continues to re-export `./lib/mf-i18n` (auto-picked up via the folder's `public-api.ts`)
- [x] `npm run doc` produces no new warnings
- [ ] Pilot remote migrated end-to-end: templates from `| transloco` → `| dxi18n`, `*transloco="let t"` → `*dxRemoteI18n="let t"`, `TranslocoService` → `DxI18nService` (verification in pilot's repo, not this one)

## Context Files

- [P1-E02](P1-E02-mf-i18n-runtime.md) — token contracts, register-once rule, loader service API
- [.claude/rules/angular18.md](../../../.claude/rules/angular18.md) — standalone pipe / directive, `inject()`, signal APIs (preferred where they fit), `takeUntilDestroyed`
- [.claude/rules/ng-dijta.md](../../../.claude/rules/ng-dijta.md) — barrel pattern, public-api re-export
- [.claude/rules/i18n.md](../../../.claude/rules/i18n.md) — Transloco 7.5 usage; note `translateSignal` is v8-only and explicitly OUT of scope here
- [.claude/rules/jsdoc.md](../../../.claude/rules/jsdoc.md) — class + member JSDoc requirements; `@example` mandatory on the pipe and directive
- [.claude/rules/frontend-testing.md](../../../.claude/rules/frontend-testing.md) — `TestBed` patterns for pipes, structural directives, services
- [.claude/rules/performance.md](../../../.claude/rules/performance.md) — `pure: false` pipe carries a re-eval cost; document why it's necessary
- [projects/ng-dijta/src/lib/core/datetime-picker/](../../../projects/ng-dijta/src/lib/core/datetime-picker/) — standalone precedent in the library
- `node_modules/@jsverse/transloco/lib/transloco.service.d.ts` — confirm `selectTranslate` / `translateObject` signatures stay aligned across passthrough methods

## Tasks

| # | Owner | What | Reference | Verification |
|---|-------|------|-----------|--------------|
| 1 | | Implement `dx-i18n.pipe.ts` as a standalone `@Pipe({ name: 'dxi18n', pure: false })` using composition (NOT extending `TranslocoPipe`). 3-arg API: `(key, params?, lang?)`. Memoize subscription on `fullKey + activeLang` change. Strict-mode fail path returns raw key in lenient mode, throws in strict. Class-level JSDoc with `@example`. | (DxI18nPipe code block) | `npx ng build ng-dijta` |
| 2 | | Write `dx-i18n.pipe.spec.ts`: (a) namespace prepended, (b) re-renders on `setActiveLang`, (c) interp params passthrough, (d) 3rd-arg `lang` override, (e) strict-mode throws / lenient returns raw key when `DX_APP_NAMESPACE` missing, (f) unsubscribes on destroy (no `markForCheck` after destroy). | (Tests Phase 2) | `npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-i18n.pipe.spec.ts"` |
| 3 | | Implement `dx-remote-i18n.directive.ts` as standalone structural directive `[dxRemoteI18n]`. Embedded view receives `$implicit: TranslateFn` where `t(key, params) => transloco.translate(`${ns}.${key}`, params)`. **Await `DxLangLoaderService.ensureLangLoaded(activeLang)` before each `render()`** to support lazy langs. Track a render token to handle rapid lang switches. Class-level JSDoc with `@example`. | (DxRemoteI18nDirective code block + caveat) | `npx ng build ng-dijta` |
| 4 | | Write `dx-remote-i18n.directive.spec.ts`: (a) `t` closure receives namespaced calls, (b) re-renders on `langChanges$`, (c) awaits lazy lang via `DxLangLoaderService` before render, (d) rapid lang switch — last switch wins (render token), (e) cleans up subscription on destroy. | (Tests Phase 2) | `npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-remote-i18n.directive.spec.ts"` |
| 5 | | Implement `dx-i18n.service.ts` (`@Injectable({ providedIn: 'root' })`) facade. Methods: `translate`, `selectTranslate`, `translateObject<T>`, `setActiveLang`, `getActiveLang`, `langChanges$` (readonly). All key-accepting methods prepend the namespace from `DX_APP_NAMESPACE`. Same strict-mode fail path as the pipe. Behaviour matrix from the design mirrored in JSDoc. | (DxI18nService code block + behaviour matrix) | `npx ng build ng-dijta` |
| 6 | | Write `dx-i18n.service.spec.ts`: (a) namespace prepended on `translate / selectTranslate / translateObject`, (b) passthrough for `getActiveLang / setActiveLang / langChanges$` (no namespace mutation), (c) strict vs lenient missing-namespace path, (d) `cfg.strictMode: true` override wins over `isDevMode()`. | (Tests Phase 2) | `npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-i18n.service.spec.ts"` |
| 7 | | Add to `mf-i18n/public-api.ts`: `DxI18nPipe`, `DxRemoteI18nDirective`, `DxI18nService`. Root `public-api.ts` already re-exports the folder — verify no duplicate exports. | (Public API Phase 2 additions) | `grep -E 'DxI18nPipe\|DxRemoteI18nDirective\|DxI18nService' projects/ng-dijta/src/lib/mf-i18n/public-api.ts` |
| 8 | | Add regression test (or lint rule, if cheap) that fails the build if any file under `src/lib/mf-i18n/` imports `TranslocoPipe` or `TranslocoDirective` from `@jsverse/transloco`. Composition-only contract. | (Blocker #1) | `! grep -rE "from '@jsverse/transloco'" projects/ng-dijta/src/lib/mf-i18n \| grep -E "TranslocoPipe\|TranslocoDirective"` |
| 9 | | Bump library version to 18.9.0 in [projects/ng-dijta/package.json](../../../projects/ng-dijta/package.json). README "Translating in a remote" section: pipe / directive / service usage, behaviour matrix table, strict-mode opt-out. | (Phase 2 docs) | `npm run verify` |
| 10 | | Run `npm run doc`, resolve any new warnings. Run `npm run verify`. | — | `npm run verify && npm run doc` |

## Dependencies

- **Depends on:** [P1-E02](P1-E02-mf-i18n-runtime.md)
- **Blocks:** [P1-E04](P1-E04-mf-i18n-webpack-helper.md)

## Notes

- **Composition, not inheritance**  — `TranslocoPipe` / `TranslocoDirective` internals churn between minor versions; we shield against that.
- The pipe is `pure: false` because it must re-evaluate on `langChanges$`. Document the performance trade-off in JSDoc and `.claude/rules/performance.md` checklist.
- The directive must inject `DxLangLoaderService` (provided by `DxRemoteI18nModule.register()`). Using the directive outside a module that has called `register()` should throw at construction via Angular's DI — covered by a spec.
- `translateSignal()` is a Transloco 8 API. The library is on 7.5. **Do not add it in this epic.** Deferred to a future v2.
- Directive name resolved to `*dxRemoteI18n` . Aliasing to `*dxI18n` is a future-only consideration if explicitly requested.
- Strict-mode messages must NOT include translation keys with sensitive interpolation values (security.md). Restrict messages to the namespace token state.
