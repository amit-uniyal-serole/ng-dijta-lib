---
description: Diagnose ng-dijta issues — builds, types, Karma tests, runtime, theme
model: sonnet
---

# /debug

Investigate errors, unexpected behaviour, and performance issues in `ng-dijta` or `practice`. Diagnosis + suggested fix. Does NOT apply the fix — use `/fix` for that.

## Workflow

1. **Gather** — full error, file(s), reproduction steps, expected vs. actual
2. **Reproduce** — write a failing spec or manual repro
3. **Analyse** — isolate root cause
4. **Diagnose** — explain WHY
5. **Suggest** — propose the minimal fix

## Common Error Classes

### Build Errors (ng-packagr)

```bash
npx ng build ng-dijta 2>&1 | tail -80
```

Typical causes:
- Missing re-export in `projects/ng-dijta/src/public-api.ts` (or per-component `index.ts`)
- Circular import via barrel files
- `@Input()` type that resolves to `any` in the `.d.ts`
- Template references a component declaration that's not in its module's `imports`
- Third-party import that doesn't match this project's stack (Angular Material + Karma)

### Type Errors

```bash
npx tsc --noEmit -p tsconfig.json 2>&1 | head -50
```

Typical causes:
- Missing null-check on an `Input`
- Wrong generic on `EventEmitter<T>`
- Signal vs. decorator API mixed in the same class (see [signals-state.md](../rules/signals-state.md))

### Test Failures (Karma + Jasmine)

```bash
# Single spec, headless
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{target}.spec.ts"

# With source map and reporters
npm test -- --watch=false --browsers=ChromeHeadless --code-coverage=false
```

Typical causes:
- Component's NgModule not imported in `TestBed.configureTestingModule`
- Decorator input set but `fixture.detectChanges()` not called after
- Signal input set without `await fixture.whenStable()`
- `fakeAsync` missing `tick()` before assertion
- Material component's ARIA changing in a minor release (accept the update if intentional)

### Runtime Errors

| Error | Likely Cause |
|-------|--------------|
| `Cannot read properties of undefined` | Missing null-guard on an optional `@Input` |
| `ExpressionChangedAfterItHasBeenCheckedError` | State mutated in `ngAfterViewInit`/`ngAfterContentInit` without `cdr.markForCheck()` |
| `NG0100` | Writing to a signal during change detection |
| `NG0200` | Circular DI dependency — often a service importing a component module |
| `NG0201: No provider for ...` | Missing import / provider, or lazy module forgot to provide the service |
| `NG0300: Multiple components match node with tagname ...` | Two components share a selector — check `dx-*` prefix uniqueness |

### Theme / Styling

```bash
# Is the --dx-* token declared anywhere?
grep -rn "--dx-{token}" projects/ng-dijta/src/lib/theme/

# Is the Material theme token available at the call site?
grep -rn "mat.get-theme-color" projects/ng-dijta/src/lib/components/{target}/
```

Typical causes:
- Component SCSS hardcodes a color instead of reading Material theme tokens
- `--dx-*` used without a fallback for consumers that didn't import the bundled theme
- Selector scoped under `:host` is too specific — Material's own selectors win

### Test Debugging Helpers

```typescript
// Decorator-based input
component.label = 'test';
fixture.detectChanges();
console.log(element.innerHTML);

// Signal-based input
fixture.componentRef.setInput('label', 'test');
await fixture.whenStable();
console.log(element.innerHTML);
```

## Diagnosis Template

```markdown
## Debug Report

### Issue
{One-line description}

### Error
```
{Full stack / output}
```

### Root Cause
{Why this happens — reference specific line / rule}

### Suggested Fix
```typescript
// Before
{problematic code}

// After
{fixed code}
```

### Prevention
{Rule / test / lint to stop regression}
```

## Symptom → Fix Cheatsheet

| Symptom | Fix |
|---------|-----|
| Decorator input not reflected in DOM during tests | Call `fixture.detectChanges()` after the assignment |
| Signal input not reflected in DOM during tests | `fixture.componentRef.setInput(...)` then `await fixture.whenStable()` |
| Material component's dark mode looks wrong | Confirm color comes from `mat.get-theme-color(...)`, not hardcoded |
| `--dx-*` token "not applied" in a consumer | Check the consumer imported `dist/ng-dijta/theme.scss` |
| ng-packagr error "Cannot find module" | Missing re-export in `public-api.ts` or `index.ts` |
| `NullInjectorError` in Karma | Component's NgModule not imported in `TestBed` |
| Focus outline missing on Material button | `prefers-reduced-motion` CSS or theme override hiding `.cdk-keyboard-focused` |

## Related

- `/fix` — apply the fix
- `/fe-test` — cover the fix with a spec
- `/fe-review` — validate before PR
