---
category: Components
type: Data Entry
title: Input Date of Birth
---

A date-of-birth input that wraps Angular Material's `mat-datepicker` and adds an optional minimum-age validator, a leading `cake` icon, and the standard DX outline variants.

## When To Use

- When capturing a person's date of birth on a form.
- When the selection must satisfy a minimum age (e.g. 18+) via the built-in age validator.
- When the field must live inside a reactive or template-driven form as a `ControlValueAccessor`.
- When you need an outer-label / floating layout consistent with other DX inputs.

## Label Variants

`dx-input-dob` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-dob formControlName="dob">
  <dx-label>Display Label</dx-label>
</dx-input-dob>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-dob outline="outer-label" formControlName="dob">
  <p dxLabel>Display Label</p>
</dx-input-dob>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-dob
  formControlName="dob"
  [enableAgeValidator]="true"
  [dobConfig]="{ minAge: 18, error: 'Must be 18+' }"
  (onDateChange)="onDobChange($event)">
</dx-input-dob>
```

### dx-input-dob

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[minDate]` | Earliest selectable date | `Date` | - |
| `[maxDate]` | Latest selectable date | `Date` | today |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders as static display-only text | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[placeholder]` | Placeholder shown when empty | `string` | `'Date of Birth'` |
| `[icon]` | Material icon name shown as prefix | `string` | `'cake'` |
| `[enableAgeValidator]` | Turns on the built-in minimum-age validator | `boolean` | - |
| `[dobConfig]` | Config for the age validator (min age, error message) | `DobConfig` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDateChange)` | Emitted when the user picks or clears a date | `EventEmitter<InputDatePickerModel<D>>` |

### Types

```typescript
interface DobConfig {
  minAge?: number;
  error?: string;
}

interface InputDatePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
```

## Examples

### Basic

```html
<dx-input-dob formControlName="dob"></dx-input-dob>
```

### With minimum-age validator

```html
<dx-input-dob
  formControlName="dob"
  [required]="true"
  [enableAgeValidator]="true"
  [dobConfig]="{ minAge: 18, error: 'You must be 18 or older' }">
</dx-input-dob>
```

### Outer-label layout

```html
<dx-input-dob
  outline="outer-label"
  labelPosition="top"
  formControlName="dob">
  <span dxLabel>Date of Birth</span>
</dx-input-dob>
```

## Import

```typescript
import { DxInputDOBModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputDOBModule]
})
export class YourModule { }
```
