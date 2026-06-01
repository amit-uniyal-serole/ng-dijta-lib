---
category: Components
type: Data Entry
title: Datetime Picker
---

Combined date + time picker built on the Material datetime picker stack, with spinner controls, optional seconds and meridian (AM/PM), min/max bounds, and shared `dx-*` field styling. Integrates with Angular `ReactiveForms` via `ControlValueAccessor` and `Validator`.

## When To Use

- When the user needs to pick both a date and a time on a form.
- When the time portion may include seconds or use 12-hour (AM/PM) formatting.
- When min / max datetime bounds must be enforced.
- When step sizes for hour, minute or second must be customized.
- When a default starting datetime must be preset when the picker opens.

## Label Variants

`dx-datetime-picker` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-datetime-picker formControlName="scheduledAt">
  <dx-label>Display Label</dx-label>
</dx-datetime-picker>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-datetime-picker outline="outer-label" formControlName="scheduledAt">
  <p dxLabel>Display Label</p>
</dx-datetime-picker>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-datetime-picker
  formControlName="scheduledAt"
  [minDate]="now"
  [maxDate]="maxDate"
  [showSeconds]="true"
  [enableMeridian]="true"
  (onDateChange)="onChange($event)">
  <dx-label>Scheduled at</dx-label>
</dx-datetime-picker>
```

### dx-datetime-picker

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[date]` | Initial value | `Date` | `-` |
| `[startAt]` | Datetime the picker is anchored to when first opened | `Date` | `-` |
| `[minDate]` | Earliest selectable datetime | `Date` | `-` |
| `[maxDate]` | Latest selectable datetime | `Date` | `-` |
| `[showSpinners]` | Show up / down spinners on hour / minute / second | `boolean` | `true` |
| `[showSeconds]` | Show the seconds field | `boolean` | `false` |
| `[enableMeridian]` | Use 12-hour format with AM / PM | `boolean` | `true` |
| `[touchUi]` | Use touch-friendly modal UI | `boolean` | `false` |
| `[stepHour]` | Hour spinner step | `number` | `1` |
| `[stepMinute]` | Minute spinner step | `number` | `1` |
| `[stepSecond]` | Second spinner step | `number` | `1` |
| `[color]` | Material theme palette | `ThemePalette` | `'primary'` |
| `[defaultTime]` | Default time applied when no value is present | `number[]` | `[]` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error style for outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[noneLabel]` | Hide the label slot | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[disabled]` | Disabled state | `boolean` | `false` |
| `[readonly]` | Read-only mode | `boolean` | `false` |
| `[viewOnly]` | Display-only mode | `boolean` | `false` |
| `[tabIndex]` | Native tab index | `number` | `-` |
| `[id]` | Host element id | `string` | `dx-input-datetime-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDateChange)` | Emitted when the datetime value changes | `EventEmitter<DatetimePickerModel<D>>` |

### Types

```typescript
interface DatetimePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
```

## Examples

### Basic

```html
<dx-datetime-picker formControlName="when">
  <dx-label>When</dx-label>
</dx-datetime-picker>
```

### With seconds and 24-hour clock

```html
<dx-datetime-picker
  formControlName="runAt"
  [showSeconds]="true"
  [enableMeridian]="false">
  <dx-label>Run at</dx-label>
</dx-datetime-picker>
```

### Min / max bounds and custom step sizes

```html
<dx-datetime-picker
  formControlName="slot"
  [minDate]="now"
  [maxDate]="endOfWeek"
  [stepMinute]="15">
  <dx-label>Slot</dx-label>
</dx-datetime-picker>
```

### Required, outer label

```html
<dx-datetime-picker
  formControlName="scheduledAt"
  outline="outer-label"
  [required]="true">
  <dx-label>Scheduled at</dx-label>
</dx-datetime-picker>
```

## Import

```typescript
import { DxDatetimePickerModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxDatetimePickerModule]
})
export class YourModule { }
```
