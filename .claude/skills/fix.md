---
description: Apply a bug fix with regression test and full validation
model: sonnet
---

# /fix

Apply a targeted bug fix. Diagnose → fix → regression test → verify → commit. Use `/hotfix` for urgent production-blocking incidents.

## Workflow

1. **Diagnose** — use `/debug` if the root cause is not yet identified
2. **Locate** — find the affected file(s)
3. **Reproduce** — write a failing spec
4. **Fix** — minimal change that turns the spec green
5. **Validate** — lint + types + targeted tests
6. **Commit** — conventional commit (`fix(...)`) via `/commit`

## Step 1 — Understand the Issue

Identify:
- Error or unexpected behaviour
- Reproduction steps
- Expected vs. actual behaviour
- Affected component / service / directive / pipe / theme token

If the root cause is not clear, run `/debug` first.

## Step 2 — Locate the Problem

Read the relevant files in `projects/ng-dijta/src/` or `projects/practice/src/`. Look at the surrounding code before changing anything — the project's established patterns (decorator APIs, NgModules, external templates) matter more than "modern" defaults.

## Step 3 — Write a Failing Spec

A fix without a regression test is incomplete. Add an `it(...)` that reproduces the bug against the CURRENT code and fails:

```typescript
it('renders empty label without crashing', () => {
  component.label = undefined as unknown as string;
  fixture.detectChanges();
  expect(() => fixture.nativeElement.querySelector('.dx-foo__label')).not.toThrow();
});
```

Run it to confirm it fails:

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{affected}.spec.ts"
```

## Step 4 — Apply the Fix

Examples of valid shapes — always pick the minimal change that matches the surrounding code style:

### Null guard on an input

```typescript
// Before
this.formatted = this.label.toUpperCase();

// After
this.formatted = this.label?.toUpperCase() ?? '';
```

### Template guard

```html
<!-- Before -->
<span class="dx-foo__label">{{ label }}</span>

<!-- After -->
<span class="dx-foo__label" *ngIf="label">{{ label }}</span>
```

### Theme token

```scss
// Before
color: #333333;

// After
color: mat.get-theme-color($theme, on-surface);
```

### Subscription leak

```typescript
// Before
this.svc.items$.subscribe(items => this.items = items);

// After
this.svc.items$
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(items => this.items = items);
```

## Step 5 — Validate

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{affected}.spec.ts"
npx ng build ng-dijta
```

Confirm the regression spec now passes AND no other specs regress.

## Step 6 — Commit

Use `/commit` with `fix(...)` scope. If the fix exposed a broader design issue, don't pile on — log it as a follow-up and keep this PR focused.

## Fix Checklist

- [ ] Root cause identified (not just the symptom)
- [ ] Regression spec added; fails before, passes after
- [ ] No new issues introduced
- [ ] Lint + typecheck + tests green
- [ ] `npx ng build ng-dijta` clean
- [ ] Change stays in scope — no opportunistic refactors
- [ ] Follows the surrounding component's style (decorator vs. signals, NgModule layout, external templates)

## Related

- `/debug` — diagnose first
- `/fe-test` — write additional coverage
- `/hotfix` — urgent incident flow
- `/commit` — commit the fix
