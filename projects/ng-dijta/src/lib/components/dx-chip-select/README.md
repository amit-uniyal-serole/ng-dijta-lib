---
category: Components
type: Data Entry
title: Chip Select
---

A chip-based selection input that presents options as clickable chips. Supports single or multiple selection and integrates with both template-driven and reactive forms via `ControlValueAccessor`.

## When To Use

- When you have a short, stable list of options that fit inline as chips.
- When chips are more scannable than a dropdown (status, priority, category pickers).
- For multi-select with a search field, use `dx-chip-autocomplete` instead.
- For a large list that must scroll, use `mat-select` / `dx-autocomplete-select` instead.

## Label Variants

`dx-chip-select` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-chip-select formControlName="categories">
  <dx-label>Display Label</dx-label>
</dx-chip-select>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-chip-select outline="outer-label" formControlName="categories">
  <p dxLabel>Display Label</p>
</dx-chip-select>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-chip-select [options]="options" [(ngModel)]="selected">
  <dx-label>Priority</dx-label>
</dx-chip-select>
```

### dx-chip-select

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | List of selectable options | `KeyValueModel[]` | `-` |
| `[multiSelect]` | Allow selecting multiple chips | `boolean` | `false` |
| `[multi]` | Alias for `multiSelect` | `boolean` | `false` |
| `[name]` | Form control name | `string` | `-` |
| `[disabled]` | Disables the control | `boolean` | `false` |
| `[readonly]` | Render as read-only | `boolean` | `false` |
| `[viewOnly]` | Render in view-only mode | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the floating label | `boolean` | `false` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[outline]` | Form-field outline variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error style when `outline='outer-label'` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[tabIndex]` | Custom tab index | `number` | `-` |

### Content Slots

- `dx-label` — Field label.
- `dx-error` — Validation error message.

### Types

```typescript
interface KeyValueModel {
  keyTt: string;
  valueTt: string;
}
```

## Examples

### Single-select chip group

```typescript
priorityOptions: KeyValueModel[] = [
  { keyTt: 'low',    valueTt: 'Low' },
  { keyTt: 'med',    valueTt: 'Medium' },
  { keyTt: 'high',   valueTt: 'High' }
];
```

```html
<dx-chip-select [options]="priorityOptions" [(ngModel)]="priority">
  <dx-label>Priority</dx-label>
</dx-chip-select>
```

### Multi-select

```html
<dx-chip-select
  [options]="categoryOptions"
  [multiSelect]="true"
  formControlName="categories">
  <dx-label>Categories</dx-label>
</dx-chip-select>
```

### View-only

```html
<dx-chip-select
  [options]="statusOptions"
  [(ngModel)]="status"
  [viewOnly]="true">
  <dx-label>Status</dx-label>
</dx-chip-select>
```

## Import

```typescript
import { DxChipSelectModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxChipSelectModule]
})
export class YourModule { }
```
