---
category: Components
type: Data Entry
title: TimePicker
---

A time-entry form control with a clock-face dialog. Implements `ControlValueAccessor` + `Validator` so it works with template-driven and reactive forms, supports 12h/24h modes, and stores values as `HH:mm:ss` strings.

## When To Use
- When the user needs to pick a time of day as part of a form (appointments, shift scheduling, reminders).
- When a visual analog clock face makes the interaction clearer than a free-form text input.
- When you need strict 12h or 24h mode enforcement with am/pm labels.
- When the time value must participate in Angular form validation (`required`, `min`, `max`).

## API

```html
<dx-time-picker-input
  [(ngModel)]="time"
  mode="12h"
  outline="none-floating"
  [required]="true"
  (blur)="onBlur($event)">
</dx-time-picker-input>
```

### dx-time-picker-input

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Whether the input is disabled | `boolean` | `false` |
| `[readonly]` | Whether the input is read-only | `boolean` | `false` |
| `[viewOnly]` | Render the field as a static view-only value | `boolean` | `false` |
| `[noneLabel]` | Hide the floating/outer label | `boolean` | `false` |
| `[noneBorder]` | Remove the input border | `boolean` | `false` |
| `[outline]` | Field outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Placement of the outer label | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error display variant when `outline="outer-label"` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[mode]` | Clock mode | `'12h' \| '24h'` | `'12h'` |
| `[color]` | Material theme color for the dialog | `string` | `'primary'` |
| `[anteMeridiemAbbreviation]` | AM abbreviation | `string` | `'am'` |
| `[postMeridiemAbbreviation]` | PM abbreviation | `string` | `'pm'` |
| `[okLabel]` | Ok button label | `string` | `'Ok'` |
| `[cancelLabel]` | Cancel button label | `string` | `'Cancel'` |
| `[okButtonTemplate]` | Custom template for the Ok button | `TemplateRef<DxTimePickerInputComponent> \| null` | `null` |
| `[cancelButtonTemplate]` | Custom template for the Cancel button | `TemplateRef<DxTimePickerInputComponent> \| null` | `null` |
| `[disableDialogOpenOnClick]` | Prevent the dialog from opening on input click | `boolean` | `true` |
| `[strict]` | Enforce strict time parsing | `boolean` | `true` |
| `[minDate]` | Minimum selectable time (as `HH:mm:ss` string or `Date`) | `string \| Date` | - |
| `[maxDate]` | Maximum selectable time | `Date` | - |
| `[required]` | Whether the field is required | `boolean` | `false` |
| `[tooltip]` | Help-text tooltip for the input | `string` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

### Types

```typescript
type ClockMode = '12h' | '24h';
type ClockViewType = 'hours' | 'minutes';
```

## Examples

### Basic (template-driven)

```html
<dx-time-picker-input [(ngModel)]="time"></dx-time-picker-input>
```

### 24-hour mode with floating label

```html
<dx-time-picker-input
  [(ngModel)]="time"
  mode="24h"
  outline="floating">
</dx-time-picker-input>
```

### Reactive form with required validation

```typescript
form = new FormGroup({
  startTime: new FormControl('', Validators.required),
});
```

```html
<form [formGroup]="form">
  <dx-time-picker-input
    formControlName="startTime"
    outline="outer-label"
    [required]="true">
  </dx-time-picker-input>
</form>
```

### View-only

```html
<dx-time-picker-input
  [(ngModel)]="time"
  [viewOnly]="true">
</dx-time-picker-input>
```

## Import

```typescript
import { DxTimepickerModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTimepickerModule]
})
export class YourModule { }
```
