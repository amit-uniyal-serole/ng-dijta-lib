# Frontend Style Guide

**Scope:** File naming, directory structure, class organization, and coding conventions for the ng-dijta Angular 18 frontend.

---

## File Naming

| File Type | Pattern | Example |
|-----------|---------|---------|
| Component | `{name}.component.ts` | `dx-button.component.ts` |
| Template | `{name}.component.html` | `dx-button.component.html` |
| Styles | `{name}.component.scss` | `dx-button.component.scss` |
| Module | `{name}.module.ts` | `dx-button.module.ts` |
| Barrel | `index.ts` | `index.ts` |
| Tests | `{name}.component.spec.ts` | `dx-button.component.spec.ts` |
| Service | `{name}.service.ts` | `global-config.service.ts` |
| Guard | `{name}.guard.ts` | `auth.guard.ts` |
| Interceptor | `{name}.interceptor.ts` | `auth.interceptor.ts` |
| Pipe | `{name}.pipe.ts` | `status.pipe.ts` |
| Directive | `{name}.directive.ts` | `autofocus.directive.ts` |
| Model / Interface | `{name}.model.ts` / `{name}.interface.ts` | `item.model.ts` |
| Enum | `{name}.enum.ts` | `status.enum.ts` |

### Rules

1. **kebab-case** for all file names
2. File name MUST match the primary export
3. Tests co-locate with source (same directory)
4. One primary concept per file
5. Each component folder exports its component + module via an `index.ts` barrel

---

## Directory Structure

### Library (`ng-dijta`)

```
projects/ng-dijta/src/lib/
├── components/      # dx-* components (each in its own folder: component + module + index)
├── core/            # Shared core logic
├── service/         # Global services (global-config, http, number-format, ...)
├── directive/       # Directives
├── pipe/            # Pipes
├── animation/       # Angular animations
├── permission/      # CASL-based permissions
├── interface/       # Public TypeScript interfaces
├── theme/           # SCSS theme partials and tokens
└── utils/           # Utility helpers
```

### Practice App

```
projects/practice/src/
├── app/
└── assets/
```

---

## Component Selector Naming

| App | Prefix | Example |
|-----|--------|---------|
| Library (`ng-dijta`) | `dx-` | `dx-button` |
| Practice app | `dx-` | `dx-demo-page` |

```typescript
// CORRECT
@Component({ selector: 'dx-item-card' })

// WRONG
@Component({ selector: 'app-item-card' })    // Wrong prefix
@Component({ selector: 'itemCard' })          // camelCase
```

---

## Class Member Organization

Use the following order. The decorator-based lines are included because this codebase is predominantly decorator-based — keep signal and decorator APIs in matching slots.

```typescript
@Component({...})
export class DxItemDetailComponent {
  // 1. INJECTED DEPENDENCIES
  private readonly itemService = inject(ItemService);      // new code
  constructor(private readonly router: Router) { }          // legacy (existing files)

  // 2. INPUTS
  @Input() itemId!: string;                                  // legacy
  readonly status = input<'active' | 'draft'>('draft');     // new code

  // 3. OUTPUTS
  @Output() readonly saved = new EventEmitter<Item>();       // legacy
  readonly cancelled = output<void>();                       // new code

  // 4. MODEL INPUTS (signal-based two-way)
  readonly isEditing = model(false);

  // 5. VIEW / CONTENT QUERIES
  @ViewChild('form') formRef!: NgForm;                       // legacy
  readonly formRef2 = viewChild<NgForm>('form');            // new code

  // 6. INTERNAL STATE
  private readonly _loading = signal(false);
  private readonly _item = signal<Item | null>(null);

  // 7. DERIVED STATE
  readonly loading = this._loading.asReadonly();
  readonly canSubmit = computed(() => !this._loading() && this._item() !== null);

  // 8. LIFECYCLE / EFFECTS
  ngOnInit(): void { this.loadItem(); }

  // 9. PUBLIC METHODS
  refresh(): void { }

  // 10. PROTECTED METHODS (template helpers)
  protected saveItem(): void { }

  // 11. PRIVATE METHODS
  private loadItem(): void { }
}
```

---

## Access Modifiers

| Member Type | Modifier |
|-------------|----------|
| Injected dependencies | `private readonly` |
| Inputs / Outputs / Queries | `readonly` (signal APIs) or public (decorator APIs, per convention) |
| Template-only members | `protected` (strongly preferred for new code) |
| Internal state | `private readonly` |
| Public API methods | (implicit public) |

---

## SCSS Conventions

### BEM-Like Naming

```scss
// Component: dx-item-card
:host {
  display: block;
}

.dx-item-card {
  &__header { }
  &__body { }
  &__footer { }
  &__actions { }

  &--selected { }
  &--draft { }
}
```

### Use Material Theme Tokens / DX Design Tokens

```scss
// CORRECT — Material theme tokens via mixin
@use '@angular/material' as mat;

.dx-item-card {
  background: mat.get-theme-color($theme, surface);
  color: mat.get-theme-color($theme, on-surface);
}

// CORRECT — DX design tokens declared in projects/ng-dijta/src/lib/theme/tokens/
.dx-item-card {
  border-radius: var(--dx-radius-md, 0.5rem);
  padding: var(--dx-spacing-md, 1rem);
}

// WRONG — Hardcoded colors / dimensions
.dx-item-card {
  background: #fff;
  border-radius: 8px;
}
```

---

## TypeScript Rules

| Rule | Status |
|------|--------|
| Strict mode (`strict: true`) | MANDATORY |
| No `any` type | MANDATORY (prefer `unknown` or explicit type) |
| Prefer `readonly` for signals / decorator inputs | MANDATORY |
| Use template literals over concatenation | RECOMMENDED |
| Avoid non-null assertions (`!`) on values that can be null | RECOMMENDED |

---

## Checklist

- [ ] File names use kebab-case
- [ ] Correct selector prefix (`dx-`)
- [ ] Class members follow the ordering above
- [ ] Access modifiers correct (`private readonly` for deps; `protected` for template-only)
- [ ] Styling uses Material theme tokens or declared `--dx-*` design tokens (no hardcoded colors)
- [ ] No `any` type
- [ ] Tests co-located with source
- [ ] Component folder has `component`, `module`, and `index` files
