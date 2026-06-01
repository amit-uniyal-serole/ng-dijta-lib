# dx-number

A numeric input field with decimal precision, thousands separator, input masking, and shorthand suffixes (K, M, B, T).

## Overview

`dx-number` is the dedicated numeric input component in ng-dijta. It implements `ControlValueAccessor` and `Validator`, working seamlessly with both reactive and template-driven forms. Use it for any whole number or decimal input that requires formatting — it supports thousands separators, configurable decimal precision, ngx-mask patterns, and shorthand entry (e.g., type `5K` to enter 5,000). An internal pattern validator ensures only numeric characters are accepted.

## Module Import

```typescript
import { DxNumberModule } from 'ng-dijta';

@NgModule({
  imports: [DxNumberModule]
})
export class AppModule {}
```

## Selector

`<dx-number>`

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables the input |
| `readonly` | `boolean` | `false` | Sets the input to read-only (border visible) |
| `viewOnly` | `boolean` | `false` | View-only mode — no border, no interaction |
| `required` | `boolean` | `false` | Marks the field as required; also auto-detected from FormControl validators |
| `noneLabel` | `boolean` | `false` | Hides the label |
| `noneBorder` | `boolean` | `false` | Removes the input border |
| `placeholder` | `string` | `'Number'` | Placeholder text |
| `mask` | `string` | `''` | ngx-mask pattern string |
| `pattern` | `string` | — | Custom regex pattern for validation |
| `precision` | `number` | `0` | Number of decimal places to display |
| `seprater` | `boolean` | `false` | Enables thousands separator formatting |
| `outline` | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` | Label style; can be set globally via `UI_COMPONENT_CONFIG` |
| `labelPosition` | `'left' \| 'top'` | `'top'` | Position of outer label (used with `outer-label` outline) |
| `outerLabelErrorType` | `'astrict-error' \| 'filled-error'` | `'filled-error'` | Error display style for outer-label mode |
| `tooltip` | `string` | — | Tooltip text |
| `minLength` | `number` | — | Minimum character length (adds `Validators.minLength`) |
| `maxLength` | `number` | — | Maximum character length (adds `Validators.maxLength`) |
| `tabIndex` | `number` | — | Tab order index |
| `id` | `string` | auto | Unique element ID (auto-generated) |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EventEmitter<FocusEvent>` | Emitted when the input loses focus |

## Usage Examples

### Basic Reactive Form

```typescript
// component.ts
import { FormBuilder, Validators } from '@angular/forms';

form = this.fb.group({
  quantity: [null, [Validators.required, Validators.min(1)]]
});

constructor(private fb: FormBuilder) {}
```

```html
<!-- component.html -->
<form [formGroup]="form">
  <dx-number formControlName="quantity">
    <dx-label>Quantity</dx-label>
    <dx-error *ngIf="form.get('quantity')?.invalid && form.get('quantity')?.touched">
      Quantity is required
    </dx-error>
  </dx-number>
</form>
```

### Template-Driven Form

```html
<dx-number [(ngModel)]="amount" required>
  <dx-label>Amount</dx-label>
</dx-number>
```

### With Thousands Separator and Decimal Precision

```html
<!-- Display 1234567.89 as 1,234,567.89 -->
<dx-number
  formControlName="revenue"
  [seprater]="true"
  [precision]="2"
  placeholder="0.00">
  <dx-label>Revenue</dx-label>
</dx-number>
```

### With Shorthand Suffixes (K/M/B/T)

Users can type `5K` (=5,000), `2M` (=2,000,000), `1B` (=1,000,000,000), or `3T` (=3,000,000,000,000). The value is automatically converted.

```html
<dx-number
  formControlName="budget"
  placeholder="e.g. 5K, 2M, 1B"
  tooltip="Supports shorthand: K, M, B, T">
  <dx-label>Budget</dx-label>
</dx-number>
```

### With Input Mask

```html
<!-- 6-digit PIN -->
<dx-number
  formControlName="pin"
  mask="000000"
  [maxLength]="6">
  <dx-label>PIN</dx-label>
</dx-number>
```

### Outer Label Style

```html
<dx-number
  formControlName="price"
  outline="outer-label"
  labelPosition="top"
  [seprater]="true"
  [precision]="2">
  <div dxLabel>Unit Price</div>
</dx-number>
```

## Content Slots

| Slot | Selector | Description |
|------|----------|-------------|
| Label (floating) | `dx-label` | Label inside the Material form field |
| Label (outer) | `[dxLabel]` | Label shown above the field in outer-label mode |
| Hint | `dx-hint` | Helper text below the field |
| Error | `dx-error` | Validation error message |

> **Note:** Use `schemas: [CUSTOM_ELEMENTS_SCHEMA]` in your module if `dx-label`, `dx-hint`, and `dx-error` report unknown element errors.

## Global Configuration

The `outline` default can be set application-wide using `UI_COMPONENT_CONFIG`:

```typescript
import { UI_COMPONENT_CONFIG } from 'ng-dijta';

@NgModule({
  providers: [
    {
      provide: UI_COMPONENT_CONFIG,
      useValue: { value: { outline: 'floating' } }
    }
  ]
})
export class AppModule {}
```

## Features

- Implements `ControlValueAccessor` and `Validator` — works with reactive and template-driven forms
- Auto-detects `Validators.required` from FormControl
- Built-in numeric pattern validator — only digits and shorthand letters (K, M, T, Q) accepted
- Shorthand entry: `5K` = 5,000 | `2M` = 2,000,000 | `1B` = 1,000,000,000 | `3T` = 3,000,000,000,000
- Configurable decimal precision via `precision` input
- Optional thousands separator via `seprater` input
- Input masking with ngx-mask
- `disabled`, `readonly`, and `viewOnly` modes with distinct visual styles
- Auto-generated unique `id` for accessibility
