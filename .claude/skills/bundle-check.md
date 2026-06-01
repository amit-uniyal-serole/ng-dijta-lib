---
description: Library bundle sanity — size, exports, public API drift
model: sonnet
---

# /bundle-check

Sanity-check the published `@ngdx/dijta` shape after a build. Not a deep bundle-analysis tool — surfaces the things that actually break consumers.

## When to Use

- Before `/release`
- After a dependency bump (`/migrate angular-minor`, `/migrate material-minor`)
- When a PR touches `projects/ng-dijta/src/public-api.ts`

## Scope

- `/bundle-check` — full check
- `/bundle-check size` — size-only
- `/bundle-check api` — public-API drift only

## Steps

### 1. Build fresh

```bash
rm -rf dist/ng-dijta
npx ng build ng-dijta
npm run build:scss
```

A dirty `dist/` hides stale entry points.

### 2. Size snapshot

```bash
du -sh dist/ng-dijta
du -sh dist/ng-dijta/*.js 2>/dev/null | sort -k1 -h | tail -20
du -sh dist/ng-dijta/fesm2022/ 2>/dev/null | sort -k1 -h | tail -20
```

Compare against the previous release:

```bash
git show $(git describe --tags --abbrev=0 2>/dev/null):package.json | grep version
```

Flag any single file >30% larger than last release.

### 3. Entry-point sanity

```bash
# All documented entry points built
ls dist/ng-dijta/package.json dist/ng-dijta/fesm2022/ng-dijta.mjs 2>/dev/null

# dist/package.json advertises the right publishConfig
grep -A2 '"publishConfig"' dist/ng-dijta/package.json
```

### 4. Public API drift

```bash
# Exports named by public-api.ts
grep "^export " projects/ng-dijta/src/public-api.ts | sort > /tmp/ngdijta.api.current

# Diff against the last released version
git show $(git describe --tags --abbrev=0):projects/ng-dijta/src/public-api.ts 2>/dev/null \
  | grep "^export " | sort > /tmp/ngdijta.api.previous

diff -u /tmp/ngdijta.api.previous /tmp/ngdijta.api.current
```

A removed export without a `feat!:` or `BREAKING CHANGE:` commit is a problem.

### 5. Deep-import usage in consumers

```bash
# Anyone in the workspace still importing from @ngdx/dijta/lib/...
grep -rn "from '@ngdx/dijta/lib/" --include="*.ts" projects/
```

### 6. Theme bundle present

```bash
ls dist/ng-dijta/theme.scss 2>/dev/null || echo "MISSING theme.scss"
```

The consumer-facing SCSS bundle MUST exist after a release build; produced by `scss-bundle` per [scss-bundle.config.json](../../scss-bundle.config.json).

### 7. compodoc clean

```bash
npm run doc 2>&1 | tail -30
```

Warnings mean missing JSDoc or stale references. Fix before release.

## Report

```markdown
## Bundle Check

### Size
- `dist/ng-dijta`: {size} ({delta vs last release})
- Largest file: {name} — {size}

### Public API
- Added: N
- Removed: N (breaking? yes/no)
- Renamed: N

### Bundle Artifacts
- [ ] `dist/ng-dijta/package.json`
- [ ] `dist/ng-dijta/fesm2022/ng-dijta.mjs`
- [ ] `dist/ng-dijta/theme.scss`

### Deep-Import Violations
- {file:line}

### Docs
- compodoc warnings: N
```

## Related

- `/release` — publish flow
- `/docs` — compodoc + JSDoc coverage
- `/check-deps` — upstream upgrade status
