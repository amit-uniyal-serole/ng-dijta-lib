---
description: Code review for ng-dijta changes — Angular 18 + Material + Karma compliance
model: sonnet
---

# /fe-review

Validate frontend code against project rules before commit or PR. Report findings only — do not edit.

## Modes

| Mode | Scope | When |
|------|-------|------|
| Full (default) | All checks below | Before opening a PR |
| `--quick` | Lint + types + tests | During local development |
| `--diff` | Only files changed vs. `main` | Mid-feature sanity check |

## Workflow

1. **Collect changed files** — `git diff --name-only main...HEAD`
2. **Lint / types / tests** — fast, mechanical checks
3. **Rules scan** — prohibited patterns from [frontend-prohibited.md](../rules/frontend-prohibited.md)
4. **Material / theming / a11y / i18n** — per-domain rule files
5. **Report** — findings grouped by severity

## Automated Checks

```bash
# Mechanical
npm run lint
npx tsc --noEmit -p tsconfig.json
npm test -- --watch=false --browsers=ChromeHeadless

# Selector prefix (library)
grep -rn "selector: ['\"]app-" --include="*.ts" projects/ng-dijta/

# ::ng-deep in components
grep -rn "::ng-deep" --include="*.scss" projects/

# any-type
grep -rnE ": any[;,)\s]" --include="*.ts" projects/ng-dijta/src/

# Hardcoded colors in library component SCSS
grep -rE "(#[0-9a-fA-F]{3,8}|rgb\(|hsl\()" --include="*.scss" \
  projects/ng-dijta/src/lib/components/ | grep -v "^\s*//"

# Deep library imports from consumers
grep -rn "from '@ngdx/dijta/lib/" --include="*.ts" projects/

# Unsubscribed observables (heuristic)
grep -rn "\.subscribe(" --include="*.ts" projects/ng-dijta/src/ | \
  grep -vE "takeUntilDestroyed|takeUntil|\.spec\.ts"

# Mixed signal + decorator APIs in the same file
grep -lE "@Input\(\)" projects/ng-dijta/src/lib/components/**/*.ts 2>/dev/null \
  | xargs grep -l "input\(" 2>/dev/null | head -20
```

## Review Checklist

### Structure
- [ ] Correct selector prefix `dx-` on library components
- [ ] Component has `ChangeDetectionStrategy.OnPush`
- [ ] Library component folder has `index.ts` re-exporting the component + module
- [ ] `projects/ng-dijta/src/public-api.ts` re-exports every new public symbol
- [ ] Decorator OR signal API throughout the class — not both

### Material-First
- [ ] Checked whether Angular Material / CDK already covers the need (no custom re-implementations)
- [ ] Material module imported (e.g. `MatDialogModule`) — not Material classes directly

### Styling
- [ ] No hardcoded hex / rgb / hsl in component SCSS
- [ ] Colors from Material theme tokens (`mat.get-theme-color`) or declared `--dx-*` tokens with fallbacks
- [ ] No `::ng-deep`
- [ ] No color-manipulation libraries (`chroma`, `tinycolor`, `color-convert`) imported from component code

### Accessibility
- [ ] Icon-only interactive elements have a Transloco-backed `aria-label`
- [ ] Decorative `<mat-icon>` has `aria-hidden="true"`
- [ ] Form inputs have `<mat-label>` or an explicit `aria-label`
- [ ] Trusts Material's built-in keyboard handling (no redundant reimplementation)

### i18n
- [ ] Every user-facing string goes through `| transloco` (or `TranslocoService`)
- [ ] ARIA labels are translatable
- [ ] Keys use `dx.{domain}.{context}.{description}` format

### RxJS
- [ ] Subscriptions cleaned up (`takeUntilDestroyed(destroyRef)` or explicit teardown)
- [ ] `toSignal()` result cached

### Docs
- [ ] JSDoc on the class with `@example`
- [ ] JSDoc on every public input / output / model
- [ ] `@default` on every optional input
- [ ] `npm run doc` produces no new warnings

## Output Format

```markdown
## Frontend Review: {Name}

### Summary
- Status: PASS / FAIL / NEEDS CHANGES
- Critical: X | High: Y | Medium: Z

### Critical
1. **{Rule}** — {path}:{line}
   - Current: `{code}`
   - Required: `{fix}`

### Compliance
- Angular 18: X/10
- Material / Theming: X/10
- Accessibility: X/10
- i18n: X/10
- Public API & Docs: X/10
```

## Related

- [fe-reviewer.md](../agents/fe-reviewer.md) — full reviewer agent
- [frontend-prohibited.md](../rules/frontend-prohibited.md) — forbidden patterns
- `/audit` — broader compliance scan
- `/verify` — build + tests + theming guardrails
