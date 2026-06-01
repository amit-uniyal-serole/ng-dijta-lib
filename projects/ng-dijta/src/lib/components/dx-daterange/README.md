---
category: Components
type: Data Entry
title: Date Range
---

Start / end date range input built on Angular Material's `mat-date-range-input`, wrapped with the shared `dx-*` field styling and reactive-forms validation. Exposes a `{ start, end }` value through `ControlValueAccessor` and normalizes the end-of-day time on the `end` boundary.

## When To Use

- When the user needs to select a date range (from / to) on a form.
- When min / max bounds must apply to both ends of the range.
- When start or end may be individually required.
- When the label, outline and error treatment must match other `dx-*` form controls.

## Label Variants

`dx-daterange` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-daterange formControlName="dateRange">
  <dx-label>Display Label</dx-label>
</dx-daterange>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-daterange outline="outer-label" formControlName="dateRange">
  <p dxLabel>Display Label</p>
</dx-daterange>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-daterange
  formControlName="period"
  [minDate]="minDate"
  [maxDate]="today"
  [startDateRequird]="true"
  [endDateRequird]="true">
  <dx-label>Reporting period</dx-label>
</dx-daterange>
```

### dx-daterange

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[minDate]` | Earliest selectable date | `Date` | `-` |
| `[maxDate]` | Latest selectable date | `Date` | `-` |
| `[startDateRequird]` | Marks the start date as required | `boolean` | `-` |
| `[endDateRequird]` | Marks the end date as required | `boolean` | `-` |
| `[required]` | Marks the whole range as required | `boolean` | `false` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[noneLabel]` | Hide the label slot | `boolean` | `false` |
| `[noneBorder]` | Render without field border | `boolean` | `false` |
| `[disabled]` | Disabled state | `boolean` | `false` |
| `[readonly]` | Read-only mode | `boolean` | `false` |
| `[viewOnly]` | Display-only mode | `boolean` | `false` |
| `[id]` | Host element id | `string` | `dx-input-daterange-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDateChange)` | Emitted when either end of the range changes | `EventEmitter<DatePickerModel<D>>` |

### Types

```typescript
interface DatePickerModel<D> {
  start: string;
  data: MatDatepickerInputEvent<D>;
}

interface DaterangeValue {
  start: Date | null;
  end: Date | null;
}
```

## Examples

### Basic

```html
<dx-daterange formControlName="range">
  <dx-label>Range</dx-label>
</dx-daterange>
```

### With min / max bounds

```html
<dx-daterange
  formControlName="bookingWindow"
  [minDate]="today"
  [maxDate]="maxBookingDate">
  <dx-label>Booking window</dx-label>
</dx-daterange>
```

### Both ends required, outer label

```html
<dx-daterange
  formControlName="reportPeriod"
  outline="outer-label"
  [startDateRequird]="true"
  [endDateRequird]="true">
  <dx-label>Report period</dx-label>
</dx-daterange>
```

### View-only

```html
<dx-daterange
  formControlName="contractPeriod"
  [viewOnly]="true">
  <dx-label>Contract period</dx-label>
</dx-daterange>
```

## Import

```typescript
import { DxDaterangeModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxDaterangeModule]
})
export class YourModule { }
```
