---
description: Clean up code quality issues without changing behaviour
model: sonnet
---

# Code Cleanup

Tidy code without changing behaviour. The goal is safe housekeeping — NO functional changes, no refactors, no new features, no "while I'm here" improvements.

## Scope

If arguments specify a file, component folder, or path, clean only that area. Otherwise, scan the whole library under [projects/ng-dijta/src/lib/](../../projects/ng-dijta/src/lib/).

## Checks and Fixes

1. **Unused imports** — Remove imports not referenced in the file.
2. **Trailing whitespace** — Strip trailing spaces/tabs and stray blank lines at EOF.
3. **Selector prefix** — Every component under `projects/ng-dijta/src/lib/components/` has `selector: 'dx-*'`.
4. **CSS variable usage** — Replace hardcoded hex/rgb/hsl in component SCSS with Material theme tokens (`mat.get-theme-color(...)`) or declared `--dx-*` design tokens (see `.claude/rules/theming.md`).
5. **Access modifiers** — Injected dependencies are `private readonly`; template-only members are `protected` in new code (do not mass-convert existing decorator-based components).
6. **Barrel hygiene** — Every component folder has an `index.ts` that re-exports the component + module; `projects/ng-dijta/src/public-api.ts` re-exports each public symbol.
7. **Dead files** — Delete `.bak`, `.orig`, `~`, and empty spec files that never got filled in.
8. **Commented-out code** — Remove, do not leave as `// old: ...`.

## What NOT to Do

- Do NOT convert `@Input()` / `@Output()` to signal APIs during cleanup (use `/migrate` for that).
- Do NOT convert `*ngIf` / `*ngFor` to `@if` / `@for` during cleanup.
- Do NOT change the surrounding architecture.
- Do NOT add error handling or fallbacks.
- Do NOT touch test files unless a clearly broken import must be removed.

## Validation

After cleanup, run:

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npx ng build ng-dijta
```

All three must pass with zero errors before the cleanup is considered complete. If a cleanup change causes a failure, revert that specific change — do not try to fix an unrelated issue.

## Target

$ARGUMENTS
