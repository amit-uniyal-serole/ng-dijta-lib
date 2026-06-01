---
category: Components
type: Data Entry
title: Input Datepicker
---

A date input control that wraps Angular Material's `mat-datepicker` and exposes min/max date, required, and floating / outer-label outline variants. Integrates with Angular Forms as a `ControlValueAccessor`.

## When To Use

- When the user needs to pick a single calendar date (due date, appointment, report start/end date).
- When the selection must be constrained to a `minDate` / `maxDate` range.
- When the date field must participate in a `FormGroup` / `FormControl` through `ngModel` or `formControlName`.
- When you need a borderless or floating-label variant consistent with other DX inputs.

## API

```html
<dx-input-datepicker
  formControlName="startDate"
  [minDate]="today"
  [maxDate]="maxAllowed"
  placeholder="Start Date"
  (onDateChange)="onDateChange($event)">
</dx-input-datepicker>
```

### dx-input-datepicker

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[minDate]` | Earliest selectable date | `Date` | - |
| `[maxDate]` | Latest selectable date | `Date` | - |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | - |
| `[noneBorder]` | Removes the form-field outline | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[placeholder]` | Placeholder shown when empty | `string` | `'Select Date'` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDateChange)` | Emitted when the user picks or clears a date | `EventEmitter<InputDatePickerModel<D>>` |

### Types

```typescript
interface InputDatePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
```

## Examples

### Basic

```html
<dx-input-datepicker
  [(ngModel)]="startDate"
  placeholder="Start Date">
</dx-input-datepicker>
```

### With min / max range

```html
<dx-input-datepicker
  formControlName="dueDate"
  [minDate]="today"
  [maxDate]="endOfYear"
  placeholder="Due Date"
  (onDateChange)="onDueDate($event)">
</dx-input-datepicker>
```

### Outer-label layout

```html
<dx-input-datepicker
  outline="outer-label"
  [required]="true"
  formControlName="issuedOn">
  <span dxLabel>Issued On</span>
</dx-input-datepicker>
```

## Import

```typescript
import { DxInputDatePickerModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputDatePickerModule]
})
export class YourModule { }
```
