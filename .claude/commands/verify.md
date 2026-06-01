---
description: Full project verification — lint, types, tests, build, theming guardrails, a11y/i18n checks
model: sonnet
---

# Verify

Run the complete verification suite for the `ng-dijta` workspace. Execute each section in order, stop only for red results.

## Steps

### 1. Build Validation

```bash
npm run lint                                 # Angular ESLint
npx tsc --noEmit -p tsconfig.json            # Type check
npx ng build ng-dijta                        # Library build
npm run build:scss                           # Bundle theme SCSS
npm test -- --watch=false --browsers=ChromeHeadless
```

`npm run verify` runs lint → typecheck → test → build together; use it when there is time for the long path.

### 2. Prohibited Pattern Detection

Scan `projects/ng-dijta/src/` and `projects/practice/src/`. This project allows decorator APIs, NgModules, `*ngIf`, constructor injection, and `templateUrl` — do NOT flag them. Flag only what [frontend-prohibited.md](../rules/frontend-prohibited.md) treats as prohibited:

```bash
# Wrong selector prefix
grep -rn "selector: ['\"]app-" --include="*.ts" projects/ng-dijta/

# ::ng-deep in components
grep -rn "::ng-deep" --include="*.scss" projects/

# any-type declarations
grep -rnE ": any[;,)\s]" --include="*.ts" projects/ng-dijta/src/lib/

# Deep imports from the library barrel
grep -rn "from '@ngdx/dijta/lib/" --include="*.ts" projects/
```

### 3. Theming Guardrails (from [theming.md](../rules/theming.md))

1. **No hardcoded colors in components** — no hex / rgb / hsl in `projects/ng-dijta/src/lib/components/**/*.scss`
2. **No color libraries in components** — no `chroma` / `tinycolor` / `color-convert` imports from component code
3. **Scheme-agnostic `--dx-*` names** — no `light` / `dark` / `default` / `hover` / `focus` / `disabled` / `pressed` / `selected` / `expanded` substrings
4. **Kebab-case `--dx-*` names** — no camelCase fragments

```bash
grep -rE "(#[0-9a-fA-F]{3,8}|rgb\(|hsl\()" --include="*.scss" projects/ng-dijta/src/lib/components/ | grep -v "^\s*//" | head -20
grep -rE "import.*(chroma|tinycolor|color-convert)" --include="*.ts" projects/ng-dijta/src/lib/components/
grep -rE "var\(--dx-[^)]*-(light|dark|default|hover|active|disabled|focus|pressed|selected|expanded)-" --include="*.scss" projects/ng-dijta/
grep -rE "var\(--dx-[a-z0-9-]*[a-z][A-Z]" --include="*.scss" projects/ng-dijta/
```

### 4. Accessibility Quick Check

- Every `mat-icon-button` has an `aria-label`
- Decorative `<mat-icon>` has `aria-hidden="true"`
- No generic `aria-label="Action"` / `aria-label="Click"` values

### 5. i18n Quick Check

- No hardcoded user-facing strings in templates (heuristic grep for `>[A-Z][a-zA-Z ]{3,}<` inside component templates)
- Every ARIA label goes through the `transloco` pipe or `TranslocoService`

### 6. Public API & Docs

- Every new component folder has `index.ts` exporting its component + module
- Every new public symbol is re-exported from [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts)
- `npm run doc` produces no new warnings (compodoc)

## Output Format

```
Lint:           PASS | FAIL
Types:          PASS | FAIL
Library build:  PASS | FAIL
Tests:          PASS | FAIL (X passed, Y failed)
Prohibited:     PASS | N violations
Theming:        4/4 PASS | N violations
A11y:           PASS | N findings
i18n:           PASS | N findings
Public API:     PASS | N missing exports
Docs:           PASS | N warnings
```

## Modes

- `/verify --quick` — steps 1 and 2 only
- `/verify --theme` — step 3 only
- `/verify --lint` — steps 2-5 (no build, no tests)
- `/verify --docs` — step 6 only

$ARGUMENTS
