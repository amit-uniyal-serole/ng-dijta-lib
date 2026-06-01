# JSDoc Rules

**Scope:** JSDoc requirements for all public components, directives, services, and pipes exported from `projects/ng-dijta/src/public-api.ts`.

ng-dijta uses [compodoc](https://compodoc.app/) (`npm run doc`) to generate API documentation from JSDoc. Missing or vague JSDoc degrades the generated docs.

---

## Core Requirements

| Requirement | Status |
|-------------|--------|
| Class-level JSDoc on every public `@Component`, `@Directive`, `@Pipe`, `@Injectable` | **MANDATORY** |
| Public member JSDoc on every `@Input()`, `@Output()`, `input()`, `output()`, `model()` | **MANDATORY** |
| `@default` tag on every optional input with a default value | **MANDATORY** |
| `@example` block on every class-level JSDoc for components | **MANDATORY** |

---

## When This Rule Applies

Claude MUST add or update JSDoc when:

- **Creating** a new component, directive, or pipe
- **Modifying** an existing component or directive (add missing JSDoc to any signals touched or introduced)
- **Reviewing** a PR — missing JSDoc is a blocking finding

---

## Class-Level JSDoc

Place immediately **before** `export class` (after the `@Component`/`@Directive`/`@Pipe` decorator).

### Format

```typescript
@Component({ ... })
/**
 * One-sentence description of what the component does and its primary use case.
 * Second sentence for important behavioural details (optional).
 *
 * @example
 * ```html
 * <dx-component input="value">Content</dx-component>
 * ```
 */
export class MyComponent { ... }
```

### Rules

- First sentence: what it is and what it does (imperative, concise)
- Mention key design patterns if not obvious (e.g., "Wraps Angular Material `MatSelect`")
- `@example` must show the minimal real-world usage in HTML
- Multiple `@example` blocks allowed when variants differ significantly

### Good vs. Bad

```typescript
// GOOD
/**
 * Icon button with optional badge dot — wraps `mat-icon-button`.
 *
 * @example
 * ```html
 * <dx-icon-action icon="notifications" ariaLabel="Notifications" [dot]="hasNew"></dx-icon-action>
 * ```
 */

// BAD — vague, no @example
/**
 * Icon action component.
 */
```

---

## Input / Output JSDoc

Place immediately **before** each `@Input() / @Output()` (legacy) or `readonly ... = input(...) / output(...) / model(...)` (signal API) declaration.

### Signal-API Format (new code)

```typescript
/** Description of what this input controls. @default 'value' */
readonly size = input<'sm' | 'md' | 'lg'>('md');

/** Description with no default (required input). */
readonly label = input.required<string>();

/** Emitted when the user selects a value. */
readonly valueChange = output<string>();

/** Two-way binding for the open/closed state. @default false */
readonly opened = model(false);
```

### Decorator-API Format (existing code)

```typescript
/** Description of what this input controls. @default 'md' */
@Input() size: 'sm' | 'md' | 'lg' = 'md';

/** Description with no default (required input). */
@Input() label!: string;

/** Emitted when the user selects a value. */
@Output() readonly valueChange = new EventEmitter<string>();
```

### Rules

| Member | Rule |
|--------|------|
| `@Input() name = default` / `input(default)` | Description + `@default 'value'` |
| `@Input() name!: T` / `input.required<T>()` | Description only — no `@default` |
| `@Output() / output<T>()` | "Emitted when..." description |
| `model(default)` | Description of state + `@default 'value'` |

### What NOT to Document

| Member | Action |
|--------|--------|
| `private readonly _signal = signal(...)` | Do NOT add JSDoc |
| `readonly computed = computed(...)` | Do NOT add JSDoc (internal derived state) |
| `readonly viewChild = viewChild(...)` | Do NOT add JSDoc |
| `readonly contentChildren = contentChildren(...)` | Do NOT add JSDoc |
| Lifecycle hooks (`ngOnInit`, etc.) | Do NOT add JSDoc |
| Private/protected methods | Do NOT add JSDoc |

**Exception:** Public `computed()` signals that are part of the component's public API MAY have JSDoc.

---

## Examples by Input Type

### Required input (signal API)

```typescript
/** The list of items to render in the table. */
readonly items = input.required<Item[]>();
```

### Optional input with default (signal API)

```typescript
/** Display mode for the component. @default 'full' */
readonly mode = input<'full' | 'compact'>('full');
```

### Decorator input (existing code)

```typescript
/** Whether the field is disabled. @default false */
@Input() disabled = false;
```

### Boolean input with transform

```typescript
/** Shows a notification dot on the icon. @default false */
readonly dot = input(false, { transform: booleanAttribute });
```

### Output

```typescript
/** Emitted when the user clicks the logout menu item. */
readonly logoutClicked = output<void>();

/** Emitted with the search query when the user presses Enter. */
readonly submitted = output<string>();
```

### Model (two-way binding)

```typescript
/** Two-way binding for the search input value. @default '' */
readonly value = model('');
```

---

## Checklist

Before marking component work complete:

- [ ] Class has a JSDoc comment immediately before `export class`
- [ ] JSDoc includes a description sentence
- [ ] JSDoc includes at least one `@example` block (for components)
- [ ] Every `@Input()` / `input()` has a JSDoc comment
- [ ] Required inputs (no default) have description only — no `@default`
- [ ] Every optional input has `@default value` in its JSDoc
- [ ] Every `@Output()` / `output()` has a JSDoc starting with "Emitted when..."
- [ ] Every `model()` has a JSDoc with `@default value`
- [ ] No JSDoc on private members, internal `computed()`, or `viewChild()` / `contentChildren()`
- [ ] `npm run doc` still generates cleanly
