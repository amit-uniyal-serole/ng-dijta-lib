---
category: Components
type: Form
title: Input
---

Text / number form field built on Angular Material `mat-form-field` + `matInput`. Adds currency formatting, input masking (via `ngx-mask`), autocomplete options, mention support, outer-label layouts and integrates with Reactive Forms through `ControlValueAccessor` and `Validator`.

## When To Use

- Any time a single-line text or number input is required inside a form.
- Use `isCurrency` for monetary values with locale-aware formatting.
- Use `isAutoComplete` with `options` for suggest-as-you-type selections.
- Use `mask` for pattern-driven inputs (phone numbers, ids, tax codes).

## Label Variants

`dx-input` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input
  mask="000-000-0000"
  [dropSpecialCharacters]="false"
  formControlName="phone">
  <dx-label>Display Label</dx-label>
</dx-input>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input
  outline="outer-label"
  mask="000-000-0000"
  [dropSpecialCharacters]="false"
  formControlName="phone">
  <p dxLabel>Display Label</p>
</dx-input>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input
  [(ngModel)]="value"
  placeholder="Name"
  [required]="true">
  <dx-label>Name</dx-label>
</dx-input>
```

### dx-input

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[type]` | Native input type | `'text' \| 'number'` | `'text'` |
| `[value]` | Current value | `string` | - |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input as read-only | `boolean` | `false` |
| `[viewOnly]` | Read-only view mode used for detail screens | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[outline]` | Field appearance | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement when `outline = 'outer-label'` | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error display strategy for outer-label layout | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[noneLabel]` | Hide the label row | `boolean` | `false` |
| `[noneBorder]` | Remove the field border | `boolean` | `false` |
| `[noErrorSpace]` | Remove the reserved error space below the field | `boolean` | `false` |
| `[tooltip]` | Tooltip shown on the field | `string` | - |
| `[minLength]` | Minimum allowed length | `number` | - |
| `[maxLength]` | Maximum allowed length | `number` | - |
| `[tabIndex]` | Tab index of the input | `number` | - |
| `[applyTrim]` | Trim whitespace on value change | `boolean` | `false` |
| `[isCurrency]` | Enable currency formatting | `boolean` | `false` |
| `[currencyFormat]` | Currency symbol width | `'wide' \| 'narrow'` | `'narrow'` |
| `[currencyPosition]` | Currency symbol placement | `'left' \| 'right'` | `'left'` |
| `[isAutoComplete]` | Enable Material autocomplete | `boolean` | `false` |
| `[options]` | Options shown when autocomplete is enabled | `KeyValueModel[]` | - |
| `[mask]` | `ngx-mask` pattern | `string` | - |
| `[maskingPatterns]` | Custom mask pattern definitions | `object` | - |
| `[dropSpecialCharacters]` | Strip mask delimiters from the emitted value | `boolean` | `false` |
| `[specialCharacters]` | Allowed special characters | `string[]` | `[]` |
| `[prefix]` | Prefix displayed before the value | `string` | - |
| `[mentionConfigData]` | Configuration for the mentions directive | `MentionConfig` | - |
| `[id]` | Unique element id (auto-generated when omitted) | `string` | `dx-input-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onInputChange)` | Emitted on every input value change | `EventEmitter<string>` |
| `(onEnter)` | Emitted when the user presses Enter | `EventEmitter<void>` |
| `(onClickOption)` | Emitted when an autocomplete option is picked | `EventEmitter<KeyValueModel>` |
| `(blur)` | Emitted on field blur | `EventEmitter<FocusEvent>` |

## Examples

### Basic with Reactive Forms

```html
<dx-input formControlName="name" placeholder="Name" [required]="true">
  <dx-label>Name</dx-label>
</dx-input>
```

### Currency

```html
<dx-input
  type="number"
  [isCurrency]="true"
  currencyFormat="wide"
  currencyPosition="left"
  formControlName="amount">
  <dx-label>Amount</dx-label>
</dx-input>
```

### Autocomplete

```typescript
options: KeyValueModel[] = [
  { key: 'US', value: 'United States' },
  { key: 'CA', value: 'Canada' },
  { key: 'MX', value: 'Mexico' }
];
```

```html
<dx-input
  [isAutoComplete]="true"
  [options]="options"
  (onClickOption)="onPick($event)"
  formControlName="country">
  <dx-label>Country</dx-label>
</dx-input>
```

### With mask (none-floating — default)

```html
<dx-input
  mask="000-000-0000"
  [dropSpecialCharacters]="false"
  formControlName="phone">
  <dx-label>Phone</dx-label>
</dx-input>
```

### Outer label

```html
<dx-input
  outline="outer-label"
  labelPosition="left"
  formControlName="taxId">
  <p dxLabel>Tax ID</p>
</dx-input>
```

## Import

```typescript
import { DxInputModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputModule]
})
export class YourModule { }
```
