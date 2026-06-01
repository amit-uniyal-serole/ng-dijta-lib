---
category: Components
type: Data Entry
title: Cascader
---

A multi-level selection input that lets users drill through a hierarchical tree of options to pick a single value or multiple values. Wraps the internal `d-cascader` primitive in a Material `mat-form-field` shell for label, hint, and error handling.

## When To Use

- Selecting a value from a hierarchical dataset (category trees, org charts, region/city pickers).
- When the option tree is too deep for a flat `mat-select` but flatter than a full tree view.
- When large children lists must be fetched lazily via `loadChildrenFn`.
- When the user may need to pick multiple leaf (or parent) nodes with checkboxes.

## API

```html
<dx-cascader-input
  [options]="options"
  [multi]="false"
  formControlName="region">
  <dx-label>Region</dx-label>
</dx-cascader-input>
```

### dx-cascader-input

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | Hierarchical list of cascader items | `CascaderItem[]` | `[]` |
| `[multi]` | Allow selecting multiple values | `boolean` | `false` |
| `[multiSelect]` | Alias flag for multi-select mode | `boolean` | `false` |
| `[disabled]` | Whether the control is disabled | `boolean` | `false` |
| `[readonly]` | Render as read-only | `boolean` | `false` |
| `[viewOnly]` | Render in view-only display mode | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hide the outer label slot | `boolean` | `false` |
| `[name]` | Form control name | `string` | - |
| `[outline]` | Field label/outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Outer label placement | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error-display style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[loadChildrenFn]` | Async loader for lazy child nodes | `(item: CascaderItem) => Promise<CascaderItem[]> \| Observable<CascaderItem[]>` | - |

### Types

```typescript
interface CascaderItem {
  label: string;
  value: number | string;
  isLeaf?: boolean;
  children?: CascaderItem[];
  disabled?: boolean;
  checked?: boolean;
  halfChecked?: boolean;
  active?: boolean;
  color?: string;
  icon?: string;
  parent?: string;
  pageNo?: number;
  _loading?: boolean;
  [prop: string]: any;
}
```

## Examples

### Basic single-select

```html
<dx-cascader-input
  [options]="regions"
  formControlName="region">
  <dx-label>Region</dx-label>
</dx-cascader-input>
```

### Multi-select with required validation

```html
<dx-cascader-input
  [options]="categories"
  [multi]="true"
  [required]="true"
  formControlName="categories">
  <dx-label>Categories</dx-label>
  <dx-error>Please pick at least one category</dx-error>
</dx-cascader-input>
```

### Lazy-loaded children

```typescript
loadChildren = (item: CascaderItem): Promise<CascaderItem[]> =>
  this.api.getChildren(item.value);
```

```html
<dx-cascader-input
  [options]="rootNodes"
  [loadChildrenFn]="loadChildren"
  formControlName="node">
  <dx-label>Node</dx-label>
</dx-cascader-input>
```

## Import

```typescript
import { CascaderModule } from '@ngdx/dijta';

@NgModule({ imports: [CascaderModule] })
export class YourModule { }
```
