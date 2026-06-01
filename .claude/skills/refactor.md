---
description: Safe refactoring with behaviour preservation (ng-dijta, Angular 18)
model: sonnet
---

# /refactor

Restructure code to improve quality WITHOUT changing external behaviour. For API-style migrations (signal APIs, control flow, `inject()`), prefer `/migrate` — it has scope guards.

## Principles

1. **Preserve behaviour.** No functional changes.
2. **Small steps.** One refactor at a time.
3. **Test first.** If there is no spec, add one — otherwise you're changing untested code.
4. **Validate often.** Run tests after every step.

## Workflow

1. **Assess** — read the target, understand current behaviour, check test coverage
2. **Cover** — add specs if coverage is thin
3. **Refactor** — smallest viable change
4. **Validate** — lint + types + tests

## Step 1 — Assess

```bash
ls projects/ng-dijta/src/lib/components/{target}/
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{target}.spec.ts"
```

If there's no spec or coverage is thin, STOP and add specs first (use `/fe-test`).

## Step 2 — Common Refactorings

### Extract method

Move a block inside a component into a named `private` method. Keep the public surface identical.

### Replace magic value with constant

```typescript
// Before
if (value.length > 16) { ... }

// After
private static readonly MAX_LABEL_LENGTH = 16;
if (value.length > DxFooComponent.MAX_LABEL_LENGTH) { ... }
```

### Decorator → signal API (single component only)

Only acceptable when the ENTIRE component converts. Mixed APIs in the same class are prohibited. For multi-component migrations, use `/migrate signals` with scope.

```typescript
// Before
@Input() value = '';
@Output() valueChange = new EventEmitter<string>();

// After
readonly value = input('');
readonly valueChange = output<string>();
```

Update templates (`{{ value() }}`) and all `this.value` references.

### Constructor injection → `inject()`

```typescript
// Before
constructor(private readonly router: Router, private readonly svc: Svc) {}

// After
private readonly router = inject(Router);
private readonly svc = inject(Svc);
```

### Getter with logic → `computed()` (signal-API components only)

```typescript
// Before
get isValid(): boolean {
  return this.value.length > 0 && !this.hasError;
}

// After (only if value/hasError are already signals)
readonly isValid = computed(() => this.value().length > 0 && !this.hasError());
```

### `::ng-deep` → Material theme override

Do NOT convert `::ng-deep` to "just use `!important`". Move the override into Material theme partials under `projects/ng-dijta/src/lib/theme/`.

## Do NOT

- Change a library component's `templateUrl` / `styleUrls` to inline "because rules say so" — this project keeps external files (`/migrate` has no option for this)
- Convert NgModule-based components to standalone as part of a refactor
- Rename exported symbols from `public-api.ts` (that's a breaking change, not a refactor)
- Mix decorator and signal APIs in the same class
- "Modernize" code that currently works and has no bug

## Incremental Approach

1. Make ONE change
2. Run targeted tests
3. If green, commit (`refactor(ng-dijta): …`)
4. Repeat

```bash
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{target}.spec.ts"
```

## Full Validation

```bash
npm run verify            # lint + typecheck + tests + build
npm run build:scss        # if theme touched
```

## Checklist

- [ ] Existing specs cover current behaviour
- [ ] Each change small and isolated
- [ ] Tests green after every step
- [ ] No functional changes
- [ ] No `::ng-deep` introduced
- [ ] No mixed decorator/signal APIs
- [ ] No hardcoded colors introduced

## Risk Table

| Refactor | Risk | Notes |
|----------|------|-------|
| Rename private method | Low | IDE rename |
| Extract method | Low | Keep signatures |
| Constructor → `inject()` | Low | Unless `@Optional`/`@Host` used |
| Decorator → signal API (one component) | Medium | Update template + consumers; use `/migrate` for multi-component |
| Control flow (`*ngFor` → `@for`) | Medium | Preserve `track` semantics |
| Change public API | Breaking | Needs `feat!` + docs |
| Merge/split components | High | Plan, then use `/plan-epic` |

## Related

- `/migrate` — scoped API migrations with guardrails
- `/fe-build` — new component patterns
- `/fe-test` — add coverage first
- `/fe-review` — validate after
