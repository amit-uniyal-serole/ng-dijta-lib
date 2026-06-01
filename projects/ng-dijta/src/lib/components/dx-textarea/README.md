---
category: Components
type: Data Entry
title: Textarea
---

Multi-line text field built on Angular Material `mat-form-field` + `matInput[textarea]`. Implements `ControlValueAccessor` and `Validator`, supports masked input, configurable outline and label position, mentions, and length validators.

## When To Use

- Collect free-form multi-line input such as comments, descriptions, or notes.
- Enforce minimum and maximum length via `minLength` / `maxLength` validators.
- Apply a mask with `ngx-mask` for structured multi-line data.
- Surface tooltips and outer-label error styles consistent with other `dx-*` form fields.

## Label Variants

`dx-textarea` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-textarea formControlName="description">
  <dx-label>Display Label</dx-label>
</dx-textarea>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-textarea outline="outer-label" formControlName="description">
  <p dxLabel>Display Label</p>
</dx-textarea>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-textarea
  formControlName="description"
  [row]="4"
  [maxLength]="500"
  outline="none-floating"
  labelPosition="top">
</dx-textarea>
```

### dx-textarea

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[row]` | Number of visible text rows | `number` | `2` |
| `[outline]` | Field outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement | `'left' \| 'top'` | `'top'` |
| `[noneBorder]` | Render the textarea without a border | `boolean` | `false` |
| `[noneLabel]` | Hide the field label | `boolean` | `false` |
| `[readonly]` | Makes the textarea read-only | `boolean` | `false` |
| `[viewOnly]` | Render as a plain value, no editing affordance | `boolean` | `false` |
| `[disabled]` | Disables the textarea | `boolean` | `false` |
| `[required]` | Marks the textarea as required | `boolean` | `false` |
| `[minLength]` | Minimum character count (registers a validator) | `number` | - |
| `[maxLength]` | Maximum character count (registers a validator) | `number` | - |
| `[outerLabelErrorType]` | Error style when `outline="outer-label"` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[tabIndex]` | HTML tab index | `number \| undefined` | - |
| `[tooltip]` | Tooltip shown on the field | `string \| undefined` | - |
| `[mask]` | `ngx-mask` pattern | `string \| undefined` | - |
| `[maskingPatterns]` | Custom `ngx-mask` patterns | `any` | - |
| `[dropSpecialCharacters]` | Strip special characters from the value | `boolean` | `false` |
| `[prefix]` | Prefix applied by `ngx-mask` | `string \| undefined` | - |
| `[specialCharacters]` | Mask special characters | `string[]` | `[]` |
| `[mentionConfigDetails]` | Configuration for the mentions directive | `MentionConfig` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted on textarea blur | `EventEmitter<FocusEvent>` |

### Methods

| Method | Description |
|--------|-------------|
| `addNewLine(event: KeyboardEvent)` | Insert a newline at the caret and scroll to the bottom |

## Examples

### Basic

```html
<dx-textarea formControlName="notes"></dx-textarea>
```

### With row count and max length

```html
<dx-textarea
  formControlName="description"
  [row]="6"
  [maxLength]="1000">
</dx-textarea>
```

### Outer label with required validation

```html
<dx-textarea
  formControlName="comments"
  outline="outer-label"
  labelPosition="left"
  [required]="true">
</dx-textarea>
```

### Read-only

```html
<dx-textarea formControlName="log" [readonly]="true" [row]="8"></dx-textarea>
```

### With mask

```html
<dx-textarea
  formControlName="code"
  mask="AAA-AAA-AAA"
  [dropSpecialCharacters]="false">
</dx-textarea>
```

## Import

```typescript
import { DxTextareaModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTextareaModule]
})
export class YourModule { }
```
