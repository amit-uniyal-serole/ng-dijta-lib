---
category: Components
type: Navigation
title: Breadcrumb
---

A PrimeNG-style breadcrumb trail, themed entirely with dx theme variables and typography. Either pass an explicit trail via `[items]`, or let it read `data.breadcrumb` from the active route tree (interpolating `:param` / `{{token}}` values) and render the path as navigable links. Dynamic labels are resolved via `DxBreadcrumbService`.

## When To Use

- Showing a hierarchical path to the current page in app shells.
- When breadcrumbs must update automatically as the router navigates.
- When breadcrumb segments include dynamic names resolved at runtime (record titles, dates).

## API

```html
<dx-breadcrumb
  [items]="[
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Laptops', url: '' }
  ]"
  align="left"
  separatorIcon="chevron_right">
</dx-breadcrumb>
```

### dx-breadcrumb

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[items]` | Explicit trail; overrides route-derived breadcrumbs | `DxBreadcrumb[]` | `null` |
| `[align]` | Horizontal alignment of the trail | `'left' \| 'center' \| 'right'` | `'left'` |
| `[separatorIcon]` | Material icon used between items | `string` | `'chevron_right'` |

Colours and typography follow the dx theme variables (`--primary-base` for links, `--color-text-*` for labels/separators) — there are no per-instance colour inputs. The last entry (or any entry with an empty `url`) is rendered as the current, non-linked page with `aria-current="page"`. The bar is a `nav` landmark labelled `Breadcrumb`.

### Types

```typescript
interface DxBreadcrumb {
  label: string;  // may contain {{paramName}} placeholders
  url: string;    // may contain :paramName segments; empty = current page
}
```

## Examples

### Route configuration

```typescript
const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    data: { breadcrumb: [{ label: 'Customers', url: '/customers' }] },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        data: {
          breadcrumb: [
            { label: 'Customers', url: '/customers' },
            { label: '{{id}}', url: '/customers/:id' },
          ],
        },
      },
    ],
  },
];
```

```html
<dx-breadcrumb></dx-breadcrumb>
```

### Updating a dynamic label

```typescript
constructor(private readonly breadcrumb: DxBreadcrumbService) {}

ngOnInit() {
  this.api.getCustomer(id).subscribe(c =>
    this.breadcrumb.updateBreadcrumbLabels({ id: c.name })
  );
}
```

## Import

```typescript
import { DxBreadcrumbModule } from '@ngdx/dijta';

@NgModule({ imports: [DxBreadcrumbModule] })
export class YourModule { }
```
