---
category: Components
type: Data Entry
title: Datepicker
---

Single-date input built on Angular Material's `mat-datepicker`, wrapped to match the shared `dx-*` field styling, outer-label modes, and reactive-forms validation. Reads the default date format from the library-wide `UI_COMPONENT_CONFIG`.

## When To Use

- When the user needs to pick a single calendar date on a form.
- When min / max date ranges must be enforced.
- When the label, outline and error treatment must match other `dx-*` form controls.
- When the date format should follow a global configuration.

## Label Variants

`dx-datepicker` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-datepicker formControlName="date">
  <dx-label>Display Label</dx-label>
</dx-datepicker>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-datepicker outline="outer-label" formControlName="date">
  <p dxLabel>Display Label</p>
</dx-datepicker>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-datepicker
  formControlName="dob"
  [minDate]="minDate"
  [maxDate]="today"
  (onDateChange)="onChange($event)">
  <dx-label>Date of birth</dx-label>
</dx-datepicker>
```

### dx-datepicker

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[minDate]` | Earliest selectable date | `Date` | `-` |
| `[maxDate]` | Latest selectable date | `Date` | `-` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[noneLabel]` | Hide the label slot | `boolean` | `false` |
| `[noneBorder]` | Render without field border | `boolean` | `false` |
| `[tooltip]` | Tooltip / placeholder | `string` | `-` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[disabled]` | Disabled state | `boolean` | `false` |
| `[readonly]` | Read-only mode | `boolean` | `false` |
| `[viewOnly]` | Display-only mode | `boolean` | `false` |
| `[tabIndex]` | Native tab index | `number` | `-` |
| `[id]` | Host element id | `string` | `dx-input-date-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDateChange)` | Emitted when the picker value changes | `EventEmitter<DatePickerModel<D>>` |

### Types

```typescript
interface DatePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
```

## Examples

### Basic

```html
<dx-datepicker formControlName="date">
  <dx-label>Date</dx-label>
</dx-datepicker>
```

### With min / max range

```html
<dx-datepicker
  formControlName="deliveryDate"
  [minDate]="today"
  [maxDate]="maxDeliveryDate">
  <dx-label>Delivery date</dx-label>
</dx-datepicker>
```

### Required, outer label

```html
<dx-datepicker
  formControlName="startDate"
  outline="outer-label"
  labelPosition="top"
  [required]="true">
  <dx-label>Start date</dx-label>
</dx-datepicker>
```

### View-only display

```html
<dx-datepicker
  formControlName="createdOn"
  [viewOnly]="true">
  <dx-label>Created</dx-label>
</dx-datepicker>
```

## Import

```typescript
import { DxDatepickerModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxDatepickerModule]
})
export class YourModule { }
```
