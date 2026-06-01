# P1-E04: withDxRemote webpack helper + sub-path export `@ngdx/dijta/webpack`

**Status:** in_progress
**Phase:** 1
**Created:** 2026-05-14
**Target version:** 18.10.0

## Objective

Ship a Node-only build helper (`withDxRemote`) that collapses a remote's Module Federation webpack config to a ~5-line call, plus a single source of truth for shared peer ranges (`DX_PEER_RANGES`) so library / Transloco / Angular version upgrades propagate to all 30+ remotes via `npm i @ngdx/dijta@latest`. Exposed as a secondary entry point `@ngdx/dijta/webpack` via ng-packagr's sub-path mechanism.

## Material-First Check

**N/A — this is build-time tooling (Node.js / webpack config), not an Angular component.** No Material / CDK overlap exists. The helper composes `@module-federation/webpack` outputs; we do not reimplement that plugin.

## Prerequisites

- [x] [P1-E03](P1-E03-mf-i18n-pipe-directive-service.md) merged — runtime + consumer surface complete and adopted by the pilot remote
- [x] Decision confirmed: shipped via **ng-packagr `assets` copy + post-build patch** (`scripts/patch-dist-webpack.js`), not the ng-packagr secondary entry mechanism. Rationale: ng-packagr secondary entries run the Angular compilation pipeline (ngc + tsc), which is incompatible with plain Node.js CommonJS. Sub-path import (`@ngdx/dijta/webpack`) is preserved by patching the dist `package.json` `exports` map — consumer surface is unchanged.

## Exit Criteria

- [x] `npx ng build ng-dijta` succeeds with the new secondary entry
- [x] Generated `dist/ng-dijta/package.json` exposes `./webpack` in `exports` (or equivalent ng-packagr output)
- [x] `require('@ngdx/dijta/webpack')` from a sibling Node project returns `{ withDxRemote, DX_PEER_RANGES }`
- [x] `withDxRemote({ name, exposes })` returns a webpack config object with:
  - `output.uniqueName === name`, `output.publicPath === 'auto'`
  - `experiments.outputModule === true`
  - A `ModuleFederationPlugin` instance with the expected `shared` map (`@angular/core`, `@angular/common`, `@angular/router`, `@angular/forms`, `@jsverse/transloco`, `@ngdx/dijta` (with `includeSecondaries.skip: ['@ngdx/dijta/webpack']`), `@angular/material`, `@angular/cdk`)
  - A `DefinePlugin` instance defining `__APP_NAMESPACE__` as `JSON.stringify(name)`
- [x] `extraShared` merges (not replaces) the default `shared` map
- [x] Pinned versions in the `shared` map all read from the same `DX_PEER_RANGES` object — changing one without the other fails the Node-side test
- [ ] Pilot remote's `webpack.config.js` collapses to a ~5-line form using `withDxRemote(...)` and still builds + loads inside the shell *(downstream remote work — outside library repo)*
- [x] Library version bumped to 18.10.0 — and `DX_PEER_RANGES.dijta` updated to match
- [x] `npm run verify` green (library lint / typecheck / Karma tests do not touch the helper directly; helper tests run via the Node spec from task 6 — `npm run test:webpack` → 10/10 pass)

## Context Files

- [.claude/rules/security.md](../../../.claude/rules/security.md) — no untrusted scripts, validate inputs in build code
- [.claude/rules/performance.md](../../../.claude/rules/performance.md) — singleton sharing for `@angular/core` etc.
- [projects/ng-dijta/ng-package.json](../../../projects/ng-dijta/ng-package.json) — current primary entry config; will get a sibling secondary entry
- `node_modules/ng-packagr/docs/secondary-entrypoints.md` (if present) or ng-packagr docs online — confirm secondary entry discovery rules

## Tasks

| # | Owner | What | Reference | Verification |
|---|-------|------|-----------|--------------|
| 1 | | Create `projects/ng-dijta/webpack/ng-package.json` with `{ "lib": { "entryFile": "index.js" } }`. **Verify that the directory containing only `.js` files does not invoke the Angular pipeline** — confirm against the local ng-packagr version. If it does, switch to a sentinel `.d.ts` + tsconfig setup or fall back to a separate `@ngdx/dijta-webpack` package. | (sub-path export wiring) | `npx ng build ng-dijta` (no Angular pipeline errors on the JS-only folder) |
| 2 | | Create `projects/ng-dijta/webpack/peer-ranges.js` exporting `DX_PEER_RANGES = { angular, transloco, dijta }`. Single source of truth — every consumer of the helper reads this object. Initial values: `angular: '^18.2.0'`, `transloco: '^7.5.0'`, `dijta: '^18.10.0'` (matches the version bump in task 8). | (DX_PEER_RANGES block) | `node -e "console.log(require('./projects/ng-dijta/webpack/peer-ranges.js'))"` |
| 3 | | Create `projects/ng-dijta/webpack/with-dx-remote.js` exporting `withDxRemote({ name, exposes, extraShared = {} })`. Build the config with `output`, `experiments`, `ModuleFederationPlugin`, `DefinePlugin`. Use `require('@module-federation/webpack')` for `share()` and the plugin constructor. Internal `kebab(s)` helper for `filename`. | (withDxRemote code block) | Node smoke: `node -e "const {withDxRemote} = require('./projects/ng-dijta/webpack'); console.log(JSON.stringify(withDxRemote({name:'demo',exposes:{}})))"` |
| 4 | | Create `projects/ng-dijta/webpack/index.js` that re-exports `withDxRemote` and `DX_PEER_RANGES`. | (index.js) | `node -e "const m = require('./projects/ng-dijta/webpack'); console.log(Object.keys(m))"` |
| 5 | | Write `projects/ng-dijta/webpack/README.md`: usage example, peer-range upgrade workflow, `extraShared` semantics, sub-path import note, escape-hatch reference . | (Phase 3 docs) | `ls projects/ng-dijta/webpack/README.md` |
| 6 | | Add Node-side test(s) at `projects/ng-dijta/webpack/__tests__/with-dx-remote.spec.js`: (a) returns expected `shared` map keys + versions sourced from `DX_PEER_RANGES`, (b) regression — modifying `DX_PEER_RANGES.angular` reflects in every `@angular/*` entry, (c) `DefinePlugin` defines `__APP_NAMESPACE__` from the `name` arg, (d) `extraShared` merges without replacing defaults, (e) `@ngdx/dijta` shared entry includes `includeSecondaries.skip: ['@ngdx/dijta/webpack']`. Pick the lightest runner — `node --test` (built-in test runner) is acceptable; if Jest already present in the repo, use it. Add an npm script `npm run test:webpack`. | (Tests Phase 3) | `npm run test:webpack` |
| 7 | | Verify the generated `dist/ng-dijta` exposes the sub-path: inspect `dist/ng-dijta/package.json` for the `exports` field (or `main` + folder fallback ng-packagr emits for secondary entries) and try `require('@ngdx/dijta/webpack')` from a temporary scratch node project against `dist/ng-dijta`. | (Phase 3 done-when) | `node -e "const m = require('./dist/ng-dijta/webpack'); console.log(typeof m.withDxRemote)"` (after `npm run build`) |
| 8 | | Bump library version to 18.10.0 in [projects/ng-dijta/package.json](../../../projects/ng-dijta/package.json). Update `DX_PEER_RANGES.dijta` (peer-ranges.js) to match. Confirm both stay in sync via the regression test from task 6. | (Blocker #5) | `node -e "const r = require('./projects/ng-dijta/webpack/peer-ranges'); const p = require('./projects/ng-dijta/package.json'); console.log(r.dijta, p.version)"` |
| 9 | | Update root README "Webpack helper" section: `withDxRemote` example, `DX_PEER_RANGES` upgrade workflow. | (Phase 3 docs) | `grep -i 'withDxRemote' README.md projects/ng-dijta/README.md` |
| 10 | | `npm run verify` and `npm run doc`. | — | `npm run verify && npm run doc` |

## Dependencies

- **Depends on:** [P1-E03](P1-E03-mf-i18n-pipe-directive-service.md)
- **Blocks:** none

## Notes

- **This is a build-time helper. It does NOT import Angular code.** The `webpack/` folder is plain Node JS; Karma + Jasmine do not test it.
- ng-packagr secondary entry discovery is by folder + `ng-package.json`. If the helper-as-secondary fails (Angular pipeline tries to compile `.js` as TS), the escape hatch  is to publish `@ngdx/dijta-webpack` as a separate package and update the consumer template to install both. Document the decision before proceeding past task 1.
- The `@ngdx/dijta` shared entry **must** set `includeSecondaries.skip: ['@ngdx/dijta/webpack']` — sharing the helper itself across remotes would be useless and risks duplicate-module errors.
- Pinned ranges in `DX_PEER_RANGES` give a single source of truth for shared peer versions. Document the upgrade flow: bump `DX_PEER_RANGES.dijta` whenever a remote-affecting minor ships; remotes pick it up on their next `npm i`.
- **Do not** mix this with a runtime API change in the same PR .
