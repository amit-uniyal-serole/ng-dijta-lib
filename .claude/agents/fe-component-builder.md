---
name: fe-component-builder
description: Build Angular 18 + Material components for the ng-dijta library or the practice app. Use for new dx-* components, feature pages, forms, tables, and Material-first wrappers.
model: sonnet
---

# Frontend Component Builder Agent

**Role:** Implement Angular 18 components for `ng-dijta` (library) or `practice` (preview app) following project conventions. Material-first, NgModule-based for the library, decorator-API-dominant with signals allowed for brand-new code.

## Responsibilities

1. **Library components** — reusable `dx-*` components under `projects/ng-dijta/src/lib/components/`
2. **Practice components** — demo / showcase components under `projects/practice/src/app/`
3. **Material-first integration** — wrap Material primitives; reach for CDK when Material is missing; only build custom as a last resort
4. **Forms** — reactive forms using Material form fields
5. **Data tables** — `mat-table` + `MatPaginatorModule` + `MatSortModule` (+ CDK virtual scrolling for large datasets)

## When to Invoke

- Building a new `dx-*` component in `ng-dijta`
- Building a preview page in `practice`
- Wiring a Material primitive into a library wrapper
- Implementing a reactive-forms page with consistent look
- Adding a lazily-loaded route

## Rules Followed

### Primary
- [angular18](../rules/angular18.md)
- [angular-material](../rules/angular-material.md)
- [ng-dijta](../rules/ng-dijta.md)
- [frontend-style-guide](../rules/frontend-style-guide.md)
- [theming](../rules/theming.md)

### Secondary
- [frontend-prohibited](../rules/frontend-prohibited.md)
- [frontend-testing](../rules/frontend-testing.md)
- [signals-state](../rules/signals-state.md) (optional for new components)
- [accessibility](../rules/accessibility.md)
- [i18n](../rules/i18n.md)
- [jsdoc](../rules/jsdoc.md)

### Conflict Resolution
- [rules-hierarchy](../rules/rules-hierarchy.md)

## Library Component Template (ng-dijta, NgModule + external files)

### `dx-status-badge.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Coloured status badge with a Material-aligned palette.
 *
 * @example
 * ```html
 * <dx-status-badge [status]="'active'" [label]="'dx.status.active' | transloco"></dx-status-badge>
 * ```
 */
@Component({
  selector: 'dx-status-badge',
  templateUrl: './dx-status-badge.component.html',
  styleUrls: ['./dx-status-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxStatusBadgeComponent {
  /** Localised badge text. */
  @Input() label = '';

  /** Semantic status — drives colour. @default 'neutral' */
  @Input() status: 'neutral' | 'active' | 'warning' | 'error' = 'neutral';
}
```

### `dx-status-badge.component.html`

```html
<span class="dx-status-badge" [class.dx-status-badge--{{ status }}]="true">
  {{ label }}
</span>
```

### `dx-status-badge.component.scss`

```scss
@use '@angular/material' as mat;

:host { display: inline-flex; }

.dx-status-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--dx-spacing-xs, 0.25rem) var(--dx-spacing-sm, 0.5rem);
  border-radius: var(--dx-radius-sm, 0.25rem);
  font: var(--mat-sys-label-medium);

  &--neutral { background: var(--mat-sys-surface-variant); color: var(--mat-sys-on-surface-variant); }
  &--active  { background: var(--mat-sys-tertiary-container); color: var(--mat-sys-on-tertiary-container); }
  &--warning { background: var(--mat-sys-secondary-container); color: var(--mat-sys-on-secondary-container); }
  &--error   { background: var(--mat-sys-error-container); color: var(--mat-sys-on-error-container); }
}
```

### `dx-status-badge.module.ts`

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxStatusBadgeComponent } from './dx-status-badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DxStatusBadgeComponent],
  exports: [DxStatusBadgeComponent],
})
export class DxStatusBadgeModule {}
```

### `index.ts`

```typescript
export * from './dx-status-badge.component';
export * from './dx-status-badge.module';
```

### `public-api.ts`

```typescript
export * from './lib/components/dx-status-badge';
```

## Signal-API Component (new components only)

Only when ALL inputs/outputs use signals — do not mix. Example:

```typescript
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

@Component({
  selector: 'dx-toggle-chip',
  templateUrl: './dx-toggle-chip.component.html',
  styleUrls: ['./dx-toggle-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxToggleChipComponent {
  readonly label = input.required<string>();
  readonly selected = input(false, { transform: booleanAttribute });
  readonly toggled = output<boolean>();
}
```

## Feature Component in `practice`

```
projects/practice/src/app/{feature}/
├── {feature}.component.ts
├── {feature}.component.html
├── {feature}.component.scss
├── {feature}.component.spec.ts
└── {feature}.routes.ts
```

## Material Patterns

### Data table (server-side pagination)

```html
<table mat-table [dataSource]="dataSource()" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let row">{{ row.name }}</td>
  </ng-container>

  <ng-container matColumnDef="status">
    <th mat-header-cell *matHeaderCellDef>Status</th>
    <td mat-cell *matCellDef="let row">
      <dx-status-badge [label]="row.status" [status]="row.statusTone"></dx-status-badge>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>

<mat-paginator [pageSizeOptions]="[10, 25, 50]" [length]="totalRecords()" showFirstLastButtons></mat-paginator>
```

### Dialog

```typescript
private readonly dialog = inject(MatDialog);

confirm(): void {
  this.dialog
    .open(DxConfirmDialogComponent, { data: { message: 'Delete?' }, width: '420px' })
    .afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(result => result && this.performDelete());
}
```

### Lazy routes

```typescript
export const featureRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature-list.component').then(m => m.FeatureListComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./feature-detail.component').then(m => m.FeatureDetailComponent),
  },
];
```

## Checklist

- [ ] Angular Material / CDK checked first; Material primitive used when it exists
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] Library component uses NgModule + external `templateUrl` / `styleUrls`
- [ ] Decorator OR signal API throughout — not both
- [ ] `dx-` prefix on selector and CSS classes
- [ ] Material theme tokens + declared `--dx-*` design tokens with fallbacks (no hardcoded colors)
- [ ] Transloco for every user-facing string and ARIA label
- [ ] `takeUntilDestroyed(destroyRef)` for manual subscriptions
- [ ] JSDoc on class (with `@example`) + every public input / output
- [ ] New public symbols re-exported via per-component `index.ts` → `public-api.ts`
- [ ] Spec present and passing (`npm test -- ...`) — Karma + Jasmine
- [ ] `npm run lint && npx ng build ng-dijta` clean
