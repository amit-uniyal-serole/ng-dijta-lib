# ng-dijta — AI Operational Guide

Angular UI component library (`@ngdx/dijta`, module `ng-dijta`) plus a `practice` preview app.
Frontend-only — no backend, no multi-tenancy, no API generation.

## Tech Stack

| Technology | Version |
|-----------|---------|
| Angular | 18.1 |
| TypeScript | 5.4 |
| Angular Material | 18.1 |
| Angular CDK | 18.1 |
| @jsverse/transloco | 7.5 |
| Karma + Jasmine | 6.3 / 3.8 |
| SCSS | — |
| Package Manager | npm |
| ng-packagr | 18.1 |
| scss-bundle | 3.x |
| Compodoc | 1.x |

## Workspace Structure

```
projects/
├── ng-dijta/     — Shared UI library (ng-packagr): components, theme, services, directives, pipes
└── practice/     — Preview / showcase application for the library
```

## Build Commands

```bash
# Build library + bundle SCSS (library must build first — practice depends on it)
npm run build

# Build library only
npx ng build ng-dijta

# Watch build (development)
npm run watch

# Serve the practice app (dev)
npm start

# Tests (Karma + Jasmine)
npm test -- --watch=false --browsers=ChromeHeadless

# Lint + typecheck
npm run lint
npx tsc --noEmit -p tsconfig.json

# Full verify (lint → typecheck → test → build)
npm run verify

# API docs (Compodoc)
npm run doc
```

## Naming Conventions

| Context | Prefix |
|---------|--------|
| Component selectors | `dx-` |
| CSS classes | `dx-` |
| Translation keys | `dx.` |
| TypeScript exports | `Dx` / `DX_` |

## Import Rules

```typescript
// CORRECT — package barrel
import { DxButtonComponent, DxAlertMessageComponent } from '@ngdx/dijta';

// WRONG — deep internal path
import { DxButtonComponent } from '@ngdx/dijta/lib/components/dx-button/dx-button.component';
```

Every public component / service / model is re-exported from
[projects/ng-dijta/src/public-api.ts](projects/ng-dijta/src/public-api.ts) via a per-component
`index.ts` barrel.

## Key Architecture

- **Library components** — [projects/ng-dijta/src/lib/components/](projects/ng-dijta/src/lib/components/)
- **Core** — [projects/ng-dijta/src/lib/core/](projects/ng-dijta/src/lib/core/)
- **Services** — [projects/ng-dijta/src/lib/service/](projects/ng-dijta/src/lib/service/)
- **Directives / Pipes / Animations** — sibling folders under `src/lib/`
- **Theme** — Material theme + `--dx-*` design tokens; bundled via `scss-bundle` (see [scss-bundle.config.json](scss-bundle.config.json))
- **i18n** — `@jsverse/transloco` 7.5, `dx.` key prefix
- **Permissions** — CASL (`@casl/ability`, `@casl/angular`)

## Library Component Rules

1. **External templates + styles** — library components use `templateUrl` / `styleUrls`; ng-packagr supports both, and the codebase standard is external files.
2. **NgModule-based** — dominant pattern; each component ships its own module. A small subset is standalone — match the surrounding file; do not convert without reason.
3. **Re-export from `public-api.ts`** — every public symbol goes through a per-component `index.ts` and then [projects/ng-dijta/src/public-api.ts](projects/ng-dijta/src/public-api.ts).
4. **Material-first** — use `mat-*` primitives and CDK where they exist; build custom only when neither does.
5. **Decorator API (`@Input()` / `@Output()`) is valid** — it's the dominant API. Signal APIs (`input()` / `output()` / `model()`) are encouraged for brand-new components but never mixed with decorator APIs in the same class.
6. **`ChangeDetectionStrategy.OnPush`** on every new component.
7. **Prefix `dx-`** on selector and every CSS class.
8. **Colors** — Material theme tokens or declared `--dx-*` design tokens with fallbacks. No hardcoded hex / rgb / hsl in component SCSS.

## Rules Hierarchy

Rule files live in [.claude/rules/](.claude/rules/). Rule hierarchy precedence is defined in [.claude/rules/rules-hierarchy.md](.claude/rules/rules-hierarchy.md):

| Tier | Rules |
|------|-------|
| 1 (Non-Negotiable) | `frontend-prohibited.md`, `security.md`, `accessibility.md` |
| 2 (Core Patterns) | `angular18.md`, `angular-material.md`, `ng-dijta.md`, `i18n.md`, `performance.md`, `theming.md` |
| 3 (Quality) | `frontend-style-guide.md`, `frontend-testing.md`, `jsdoc.md`, `ai-md-maintenance.md` |

## Workflows

Slash commands live in [.claude/commands/](.claude/commands/); user-invokable skills live in
[.claude/skills/](.claude/skills/); specialised agents live in [.claude/agents/](.claude/agents/).
All three are triggered by typing `/name` — Claude routes to the right kind automatically.

### Commands (workflow drivers)

| Task | Invocation |
|------|------------|
| Explore the codebase | `/explore` |
| Research a requirement | `/research` |
| Plan an epic | `/plan-epic` |
| Implement next epic task | `/implement` |
| Migrate a scope (signals, control-flow, minor upgrades) | `/migrate` |
| Quick health check | `/status` |
| Compliance audit | `/audit` |
| Full verification | `/verify` |
| Cleanup code (no behaviour change) | `/cleanup` |
| Check dependency freshness | `/check-deps` |
| Regenerate + check API docs | `/docs` |
| Urgent production fix | `/hotfix` |
| Trigger a release | `/release` |

### Skills (focused tasks)

| Task | Invocation |
|------|------------|
| Scaffold a component | `/scaffold` |
| Build component behaviour | `/fe-build` |
| Write tests | `/fe-test` |
| Code review | `/fe-review` |
| Diagnose an issue | `/debug` |
| Apply a bug fix | `/fix` |
| Refactor safely | `/refactor` |
| Accessibility check | `/a11y-check` |
| Theme / token audit | `/theme-audit` |
| Bundle + public-API sanity | `/bundle-check` |
| Conventional commit | `/commit` |
| Open a pull request | `/pr` |

### Agents (specialists, invoked by other flows)

- `architect` — planning and API design (Opus)
- `fe-component-builder` — implement Angular 18 + Material components
- `fe-reviewer` — PR-grade rule compliance
- `fe-test-agent` — Karma + Jasmine spec author
- `material-expert` — "does Material already cover this?" lookup + theming
- `a11y-expert` — WCAG AA audits, ARIA / keyboard / focus design

## Release Process

Releases publish via [.github/workflows/release.yml](.github/workflows/release.yml) on `main` (auto) or `workflow_dispatch` (manual). Use `/release` to drive it safely; `release.yml` computes the version from Conventional Commits when no specifier is supplied.
