# Performance Rules

**Scope:** Bundle size, rendering efficiency, and runtime performance for ng-dijta.

---

## Core Requirements

| Requirement | Status |
|-------------|--------|
| `@for` with unique `track` expression (or `trackBy` on `*ngFor`) | **MANDATORY** |
| `OnPush` change detection on new components | **MANDATORY** |
| `computed()` (or memoized helper) for derived values | **RECOMMENDED** |
| Lazy-loaded routes for feature modules | **RECOMMENDED** |
| `@defer` for heavy optional content | **RECOMMENDED** |

---

## Bundle Size

### Tree-Shaking

- Avoid barrel exports that pull in unrelated code
- Use `import type` for type-only imports

### Avoid Large Imports

```typescript
// CORRECT - Import specific function
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// WRONG - Import entire library
import * as rxjs from 'rxjs';
```

---

## Rendering

### Track Expressions

Always use a unique identifier in `@for` / `trackBy`. Never use `$index` for mutable lists.

```html
<!-- CORRECT — @for with track -->
@for (item of items(); track item.id) {
  <dx-list-item [data]="item" />
}

<!-- CORRECT — *ngFor with trackBy (legacy) -->
<dx-list-item *ngFor="let item of items; trackBy: trackById" [data]="item" />

<!-- WRONG — $index changes on reorder -->
@for (item of items(); track $index) {
  <dx-list-item [data]="item" />
}
```

```typescript
trackById = (_: number, item: { id: string }) => item.id;
```

### Computed Memoization

`computed()` only recalculates when dependencies change. Prefer over methods in templates.

```typescript
// CORRECT - Cached, recalculates only when items() changes
readonly filteredItems = computed(() =>
  this.items().filter(i => i.active)
);

// WRONG - Recalculates every render cycle
getFilteredItems(): Item[] {
  return this.items().filter(i => i.active);
}
```

---

## Lazy Loading

### Route-Level

```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./features/dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
}
```

### Template-Level with @defer

Use `@defer` for heavy components:

```html
@defer (on viewport) {
  <dx-heavy-chart [data]="data()" />
} @placeholder {
  <div class="dx-skeleton" style="height: 200px"></div>
} @loading (minimum 200ms) {
  <mat-progress-spinner mode="indeterminate" />
}
```

**Triggers:** `on viewport`, `on interaction`, `on hover`, `on idle`, `on timer(ms)`, `when condition`

---

## Signal Best Practices (when used)

| Rule | Reason |
|------|--------|
| Cache `toSignal()` results | Avoid creating duplicate subscriptions |
| Don't create signals in loops | Signals are long-lived objects |
| Use `computed()` over methods | Memoization prevents unnecessary work |
| Avoid effects for state propagation | Use `computed()` instead |

---

## CSS Performance

```scss
// Use CSS containment for isolated components
:host {
  contain: content;
}

// Prefer transform over layout-triggering properties
.animated {
  // CORRECT — compositor-only property
  transform: translateX(100px);

  // AVOID — triggers layout
  // left: 100px;
}
```

---

## Angular Material Performance

- Use `cdk-virtual-scroll-viewport` (from `ScrollingModule`) for large lists.
- Use `mat-paginator` + server-side pagination for large tables instead of loading everything upfront.
- Prefer `MatProgressSpinnerModule` / `MatProgressBarModule` over custom spinners.
- Avoid animations on large Material lists when not needed (`@Component({ animations: [] })`).

---

## Checklist

- [ ] `@for` uses unique `track` expression (or `*ngFor` uses `trackBy`)
- [ ] `ChangeDetectionStrategy.OnPush` on new components
- [ ] Derived values use `computed()` (or a memoized helper) where practical
- [ ] Heavy optional content uses `@defer`
- [ ] `toSignal()` results are cached (no duplicate subscriptions)
- [ ] No wildcard `import * as` from large libraries
- [ ] Large Material tables / lists use server pagination or CDK virtual scrolling
