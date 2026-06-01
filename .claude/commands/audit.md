---
description: Frontend compliance audit for ng-dijta (Angular 18 + Material + Karma)
model: sonnet
---

# Frontend Compliance Audit

Scan the ng-dijta codebase for prohibited patterns, compliance violations, and code quality gaps.

## Usage

- `/audit` — Full audit
- `/audit components` — Component compliance only
- `/audit theme` — Theme / SCSS audit only
- `/audit a11y` — Accessibility audit only
- `/audit i18n` — Hardcoded strings / missing Transloco usage

## What This Audit Checks

This project is **Angular 18 + Angular Material + Karma/Jasmine**. Patterns that generic Angular-21 rule sets label "legacy" are still valid here (NgModules, `@Input()` / `@Output()`, `*ngIf` / `*ngFor`, constructor injection, `templateUrl` / `styleUrls`). Flag a pattern only when the rule hierarchy in `.claude/rules/` treats it as prohibited for THIS codebase.

### 1. Prohibited Patterns (always block)

```bash
# Selectors missing dx- prefix
grep -rn "selector: ['\"]app-" --include="*.ts" projects/ng-dijta/

# ::ng-deep usage in components
grep -rn "::ng-deep" --include="*.scss" projects/

# Hardcoded colors in library component SCSS
grep -rE "(#[0-9a-fA-F]{3,8}|rgb\(|hsl\()" --include="*.scss" \
  projects/ng-dijta/src/lib/components/ | grep -v "^\s*//"

# any-typed declarations
grep -rnE ": any[;,)\s]" --include="*.ts" projects/

# Color manipulation libraries in components
grep -rnE "import.*(chroma|tinycolor|color-convert)" --include="*.ts" \
  projects/ng-dijta/src/lib/components/

# Unsubscribed observables (rough heuristic; ignore spec files)
grep -rn "\.subscribe(" --include="*.ts" projects/ng-dijta/src/ | \
  grep -vE "takeUntilDestroyed|takeUntil|\.spec\.ts"
```

### 2. Public API Drift

- Every component under `projects/ng-dijta/src/lib/components/` has an `index.ts` that re-exports the component + module
- Every public component / service / model is re-exported via [projects/ng-dijta/src/public-api.ts](../../projects/ng-dijta/src/public-api.ts)
- No consumer is importing from deep `@ngdx/dijta/lib/...` paths

### 3. i18n Hygiene (per `.claude/rules/i18n.md`)

```bash
# Hardcoded ARIA labels
grep -rnE "aria-label=\"[A-Z]" --include="*.html" projects/

# Bindings that bypass the transloco pipe
grep -rnE "\[attr\.aria-label\]=\"'[^']+'\"" --include="*.html" projects/ | grep -v transloco
```

- All user-facing strings go through the `transloco` pipe (or `TranslocoService.translate()` in TS)
- ARIA labels are translatable

### 4. Accessibility (WCAG AA, per `.claude/rules/accessibility.md`)

- Icon-only `mat-icon-button` elements have an explicit `aria-label` (not `"Action"` or other generic value)
- Decorative `<mat-icon>` elements carry `aria-hidden="true"`
- Form inputs have `<mat-label>` or `aria-label`
- Project respects `prefers-reduced-motion`

### 5. Theming Guardrails (per `.claude/rules/theming.md`)

- No hardcoded hex / rgb / hsl colors in component SCSS
- No color-manipulation libraries (`chroma`, `tinycolor`, `color-convert`) imported from component code
- No scheme words (`light`, `dark`, `default`, `hover`, `focus`, `disabled`, `pressed`) inside `--dx-*` variable names
- No camelCase fragments in `--dx-*` names

### 6. Test Hygiene (per `.claude/rules/frontend-testing.md`)

- Every public component has a co-located `*.spec.ts`
- Specs use the Karma + Jasmine APIs documented in [frontend-testing.md](../rules/frontend-testing.md)

## Severity

| Level | Definition | Action |
|-------|------------|--------|
| **CRITICAL** | Security, accessibility, or public-API regression | Block merge |
| **HIGH** | Prohibited pattern | Fix before PR |
| **MEDIUM** | Tech debt, tests missing, JSDoc missing | Fix before PR |
| **LOW** | Style-only | Next cleanup pass |

## Output

Produce a table grouped by severity with file path, line number, and the specific rule violated. Link rule files from `.claude/rules/`.

$ARGUMENTS
