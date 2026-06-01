---
category: Components
type: Data Entry
title: Number
---

Numeric input field with optional masking, precision, length constraints, and a short-form suffix parser for `K`, `M`, `B`, `T`, `Q`. Implements `ControlValueAccessor` and `Validator` so it works in reactive and template-driven forms.

## When To Use

- When the user must enter a number with a specific precision, length, or mask.
- When a single field should accept short-form input like `1.5M` or `2K`.
- When the form needs Material-style labels (floating, outer, or non-floating) with consistent error rendering.
- When thousands separators are required on the displayed value.

## Label Variants

`dx-number` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-number formControlName="amount">
  <dx-label>Display Label</dx-label>
</dx-number>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-number outline="outer-label" formControlName="amount">
  <p dxLabel>Display Label</p>
</dx-number>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-number
  formControlName="amount"
  placeholder="Amount"
  [precision]="2"
  [seprater]="true">
</dx-number>
```

### dx-number

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[placeholder]` | Input placeholder / label text | `string` | `'Number'` |
| `[disabled]` | Whether the field is disabled | `boolean` | `false` |
| `[readonly]` | Whether the field is read-only | `boolean` | `false` |
| `[viewOnly]` | Render as plain text (no input UI) | `boolean` | `false` |
| `[noneBorder]` | Remove the border around the input | `boolean` | `false` |
| `[noneLabel]` | Hide the floating label | `boolean` | `false` |
| `[required]` | Whether the field is required | `boolean` | `false` |
| `[mask]` | Input mask pattern (`ngx-mask` syntax) | `string` | `''` |
| `[pattern]` | Regex pattern used for validation | `string` | `-` |
| `[precision]` | Number of decimal places to allow | `number` | `0` |
| `[minLength]` | Minimum length validator | `number` | `-` |
| `[maxLength]` | Maximum length validator | `number` | `-` |
| `[seprater]` | Show thousands separator on the displayed value | `boolean` | `false` |
| `[outline]` | Label / outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement relative to the input | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error rendering style when using `outer-label` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[tooltip]` | Tooltip text | `string` | `-` |
| `[tabIndex]` | DOM tab index | `number` | `-` |
| `[id]` | Host id (auto-generated when omitted) | `string` | `dx-input-number-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Reactive-form number

```html
<form [formGroup]="form">
  <dx-number
    formControlName="quantity"
    placeholder="Quantity"
    [precision]="0"
    [maxLength]="6">
  </dx-number>
</form>
```

### Number with separator and decimals

```html
<dx-number
  [(ngModel)]="amount"
  placeholder="Amount"
  [precision]="2"
  [seprater]="true"
  outline="floating">
</dx-number>
```

### Read-only view

```html
<dx-number
  [readonly]="true"
  [(ngModel)]="totalValue"
  [precision]="2"
  [seprater]="true">
</dx-number>
```

## Import

```typescript
import { DxNumberModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxNumberModule]
})
export class YourModule { }
```
