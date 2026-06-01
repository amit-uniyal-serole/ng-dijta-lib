---
description: Quick health check — git, build, tests, lint
model: haiku
---

# Project Health Check

Quick pulse check on the ng-dijta workspace. Fast (<~2 min). No modifications.

## Checks

1. **Git** — current branch, uncommitted changes, ahead/behind remote (`git status -sb`)
2. **Lint** — `npm run lint` (Angular ESLint)
3. **Types** — `npx tsc --noEmit -p tsconfig.json`
4. **Library build** — `npx ng build ng-dijta`
5. **Tests** — `npm test -- --watch=false --browsers=ChromeHeadless` and report pass/fail counts
6. **Prohibited quick scan** — grep for `::ng-deep`, hex colors in library SCSS, `any` types, deep library imports from consumers:

```bash
grep -rn "::ng-deep" --include="*.scss" projects/ng-dijta/src/lib/ | wc -l
grep -rE "#[0-9a-fA-F]{6}" --include="*.scss" projects/ng-dijta/src/lib/components/ | head -5
grep -rn "from '@ngdx/dijta/lib/" --include="*.ts" projects/ | head -5
```

## Output

Concise table:

```
| Check            | Status | Details                 |
|------------------|--------|-------------------------|
| Git              | OK     | main, 2 uncommitted     |
| Lint             | OK     | 0 warnings              |
| Types            | OK     | 0 errors                |
| Library Build    | OK     | 0 errors                |
| Tests            | OK     | 42 passed, 0 failed     |
| Prohibited Scan  | OK     | None found              |
```

If the user passes `--fast`, skip the build step.

$ARGUMENTS
