# Signal-Based State Management (Optional Pattern)

**Scope:** Guidance for when Angular Signals **may** be used in the ng-dijta Angular 18 codebase.

**Status:** OPTIONAL, not required. The existing 274 components are overwhelmingly decorator-and-RxJS-based (`@Input()`, `@Output()`, `BehaviorSubject`, `Subscription`). Do NOT convert working components to signals without a specific reason.

---

## When to Use Signals

Reach for signals when **starting a brand-new component** and the team agrees. Don't mix signals into an existing decorator-based component just because signals are available — the resulting API surface becomes inconsistent. Match the surrounding pattern.

Good signal candidates:
- A new standalone component with no legacy dependencies.
- A new pure display component whose state is fully derived (`computed()` fits naturally).
- A new component where RxJS overhead would be disproportionate.

Do **not** introduce signals:
- In any existing component that already uses `@Input()` / `@Output()` / `BehaviorSubject`.
- When the component talks to an HTTP service returning `Observable` — stick with the existing RxJS style (`subscribe()` + `takeUntilDestroyed()`).
- For the sole purpose of "modernizing" working code.

---

## Patterns (when signals ARE being used)

### Basic signals

```typescript
private readonly _loading = signal(false);
private readonly _items = signal<Item[]>([]);

readonly loading = this._loading.asReadonly();
```

### Derived state with `computed()`

```typescript
readonly isEmpty = computed(() => this._items().length === 0);
readonly selectedItem = computed(() =>
  this._items().find(i => i.id === this._selectedId())
);
```

### Updating signals

```typescript
// set()  — replace value
this._loading.set(true);

// update() — transform immutably
this._items.update(items => [...items, newItem]);
this._items.update(items => items.filter(i => i.id !== id));

// NEVER mutate
this._items().push(newItem);        // WRONG
this.items = [...this.items, ...];  // WRONG if `items` is a signal
```

### Signal-based inputs/outputs

```typescript
readonly pageSize = input(20);
readonly itemId = input.required<string>();
readonly disabled = input(false, { transform: booleanAttribute });

readonly saved = output<Item>();
readonly cancelled = output<void>();
```

### Two-way binding

```typescript
readonly selectedTab = model<string>('overview');
// Template: [(selectedTab)]="activeTab"
```

### RxJS → signal bridge

```typescript
// Convert an Observable into a signal
readonly items = toSignal(
  this.itemService.list().pipe(map(page => page.content)),
  { initialValue: [] }
);
```

### Cleanup

```typescript
private readonly destroyRef = inject(DestroyRef);

this.someObservable$
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(value => this._data.set(value));
```

---

## Mixing with decorator components

If you MUST extend a decorator-based component with a small signal, document why in a comment and keep the boundary tight. Do not half-migrate a component.

---

## Template rules (when consuming signals)

```html
<!-- Always call signals with () in templates -->
@if (loading()) { <mat-progress-spinner mode="indeterminate" /> }
<span>{{ item().name }}</span>
```

---

## Checklist (for new signal-based components only)

- [ ] Component is new, not a conversion of existing decorator code
- [ ] No `@Input()` / `@Output()` mixed with `input()` / `output()` in the same class
- [ ] State mutations use `set()` or `update()` (never direct assignment)
- [ ] Derived values use `computed()`, not methods
- [ ] Signals called with `()` in templates
- [ ] `toSignal()` result is cached (not duplicated)
- [ ] `takeUntilDestroyed()` for manual RxJS subscriptions

---

## For existing code

Use the project's established pattern:
- `@Input()` / `@Output()` with `EventEmitter`
- `BehaviorSubject` / `Subject` for component state, exposed as `Observable`
- `Subscription` + `ngOnDestroy` or `takeUntil(this.destroyed$)` for teardown

Neither style is "wrong". Consistency within a component (and within a feature area) matters more than the particular flavor of reactivity.
