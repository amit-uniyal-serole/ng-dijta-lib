---
category: Components
type: Data Entry
title: Input Email
---

An email text input that wraps Angular Material's `mat-form-field` + `matInput`, applies a built-in email regex validator, and participates in Angular forms as both a `ControlValueAccessor` and a `Validator`.

## When To Use

- When capturing an email address (sign-in, sign-up, profile, contact forms).
- When the field must enforce email format on top of the form's own validators.
- When the layout needs a floating / none-floating / outer-label outline consistent with other DX inputs.
- When min/max length or input masking is required alongside email validation.

## Label Variants

`dx-input-email` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-email formControlName="email">
  <dx-label>Display Label</dx-label>
</dx-input-email>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-email outline="outer-label" formControlName="email">
  <p dxLabel>Display Label</p>
</dx-input-email>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-email
  formControlName="email"
  placeholder="Work Email"
  [required]="true">
</dx-input-email>
```

### dx-input-email

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders as static display-only text | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[placeholder]` | Placeholder shown when empty | `string` | `'Email'` |
| `[pattern]` | Override regex pattern applied to the value | `string` | - |
| `[icon]` | Material icon name shown as prefix | `string` | `'mail'` |
| `[minLength]` | Minimum character length | `number` | - |
| `[maxLength]` | Maximum character length | `number` | - |
| `[tabIndex]` | Native `tabindex` applied to the input | `number` | - |
| `[tooltip]` | Tooltip text rendered on the field | `string` | - |
| `[id]` | Unique id applied to the input | `string` | - |
| `[mask]` | ngx-mask pattern applied to the input | `string` | - |
| `[maskingPatterns]` | Custom masking patterns | `unknown` | - |
| `[dropSpecialCharacters]` | Strip mask special characters from the model value | `boolean` | `false` |
| `[prefix]` | Static prefix string | `string` | - |
| `[specialCharacters]` | Characters allowed in the mask | `string[]` | `[]` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Basic

```html
<dx-input-email formControlName="email"></dx-input-email>
```

### Required with tooltip

```html
<dx-input-email
  formControlName="email"
  [required]="true"
  tooltip="We'll only use this to contact you">
</dx-input-email>
```

### Outer-label layout

```html
<dx-input-email
  outline="outer-label"
  labelPosition="top"
  formControlName="email">
  <span dxLabel>Work Email</span>
</dx-input-email>
```

## Import

```typescript
import { DxInputEmailModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputEmailModule]
})
export class YourModule { }
```
