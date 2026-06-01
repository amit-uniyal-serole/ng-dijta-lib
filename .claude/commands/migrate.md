---
description: Safe, targeted migrations (signals, control flow, minor version bumps)
model: sonnet
---

# Migrate

Perform a safe, targeted migration across ng-dijta. Never run as a "modernize everything" sweep — pick a single migration, confine it to an owner-selected scope, verify after every component.

## Supported Migrations

| Key | Migration |
|-----|-----------|
| `signals` | Convert a specific component from `@Input()` / `@Output()` to `input()` / `output()` / `model()` |
| `control-flow` | Convert `*ngIf` / `*ngFor` / `*ngSwitch` to `@if` / `@for` / `@switch` |
| `host-bindings` | Convert `@HostBinding` / `@HostListener` to the `host` object |
| `inject` | Convert constructor injection to `inject()` |
| `angular-minor` | Apply `ng update @angular/core@18.x @angular/cli@18.x` inside the 18.x line |
| `material-minor` | Apply `ng update @angular/material@18.x @angular/cdk@18.x` inside the 18.x line |
| `transloco-v8` | Dedicated migration to Transloco 8 (requires separate plan) |

## Usage

- `/migrate <key> <scope>` — e.g. `/migrate signals dx-button`, `/migrate control-flow projects/practice/src/app/dashboard`
- `/migrate angular-minor` — framework upgrade inside same major

## Ground Rules

1. **Scope is mandatory.** A migration either names a single component, a single folder, or a specific `ng update` pair. No `--all`.
2. **Tests first.** If the target has no `*.spec.ts`, stop and ask the user to add one (or use `/fe-test`) before migrating.
3. **One migration at a time.** Don't bundle `signals` and `control-flow` in the same PR.
4. **No half-migrations.** Either finish the scope completely or revert — mixed decorator / signal APIs in the same class are prohibited.
5. **Respect stack reality.** This project is Angular 18 + Material + Karma/Jasmine. Signals and `@if/@for` are ENCOURAGED but NOT required; do not migrate a component just because it exists.

## Flow

### Step 1: Confirm Scope + Tests

```bash
# Find target
ls projects/ng-dijta/src/lib/components/{target}/

# Check tests exist
ls projects/ng-dijta/src/lib/components/{target}/*.spec.ts
```

If there is no spec, ask the user to add one first.

### Step 2: Branch

```bash
git checkout -b chore/migrate-{key}-{target}
```

### Step 3: Apply Migration

#### `signals`

```typescript
// Before
@Input() label!: string;
@Input() disabled = false;
@Output() readonly saved = new EventEmitter<Item>();

// After (signal API — requires matching template updates: `label()`, `disabled()`)
readonly label = input.required<string>();
readonly disabled = input(false, { transform: booleanAttribute });
readonly saved = output<Item>();
```

- Update all `this.label` / `this.disabled` references to call them as signals (`this.label()`)
- Update templates to call signals (`{{ label() }}`, `[class.is-disabled]="disabled()"`)
- Keep setters/getters only if consumers rely on them — otherwise remove

#### `control-flow`

```html
<!-- Before -->
<div *ngIf="loading">...</div>
<div *ngFor="let item of items; trackBy: trackById">...</div>

<!-- After -->
@if (loading) { <div>...</div> }
@for (item of items; track item.id) { <div>...</div> }
```

Remove unused `trackBy` functions after the conversion.

#### `inject`

```typescript
// Before
constructor(private readonly router: Router, private readonly svc: Svc) {}

// After
private readonly router = inject(Router);
private readonly svc = inject(Svc);
```

Be careful with components that use DI tokens with `@Optional()`, `@SkipSelf()`, or `@Host()` — wire the corresponding `InjectFlags`.

#### `angular-minor` / `material-minor`

```bash
# Confirm current version
npx ng version

# Run inside 18.x line — NEVER jump major
npx ng update @angular/core@~18 @angular/cli@~18
npx ng update @angular/material@~18 @angular/cdk@~18
```

After the update:
- `npm ci` to refresh the lockfile
- `npm run verify` must pass
- Commit `package.json` + `package-lock.json` together

### Step 4: Verify

```bash
npm run lint
npx tsc --noEmit -p tsconfig.json
npx ng build ng-dijta
npm test -- --watch=false --browsers=ChromeHeadless --include="**/{target}.spec.ts"
```

For broader migrations, run the full `npm run verify`.

### Step 5: Commit + PR

Use a `chore(ng-dijta):` commit for migrations that do not change behaviour:

```
chore(ng-dijta): migrate dx-button inputs to signal API
```

Include a one-line test plan in the PR body: what spec proves behaviour is preserved.

## Don't-Dos

- Do NOT rewrite `templateUrl` / `styleUrls` files inline during a signals migration — the project keeps external files
- Do NOT convert an NgModule-based component to standalone as part of a signals migration; that is a separate migration entirely
- Do NOT mass-run an Angular CLI schematic across the whole workspace — scope it

$ARGUMENTS
