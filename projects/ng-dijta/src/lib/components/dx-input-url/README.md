---
category: Components
type: Data Entry
title: Input URL
---

A URL text input that wraps Angular Material's `mat-form-field` + `matInput`, applies the `dxUrlValidator` directive and a no-leading/trailing-spaces rule, and integrates with Angular Forms as both a `ControlValueAccessor` and a `Validator`.

## When To Use

- When capturing a website / link URL on a form.
- When the value must reject malformed URLs and extraneous whitespace.
- When min/max length constraints are needed alongside URL validation.
- When the field should share the same outline / error / label behavior as other DX inputs.

## API

```html
<dx-input-url
  formControlName="website"
  [required]="true"
  placeholder="https://example.com">
</dx-input-url>
```

### dx-input-url

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[value]` | Current value of the input | `string` | - |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders as static display-only text | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[minLength]` | Minimum character length | `number` | - |
| `[maxLength]` | Maximum character length | `number` | - |
| `[tabIndex]` | Native `tabindex` applied to the input | `number` | - |
| `[tooltip]` | Tooltip / placeholder text rendered on the input | `string` | - |
| `[mask]` | ngx-mask pattern applied to the input | `string` | `''` |
| `[customUrlValidation]` | Enables the extended URL validation path | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |
| `(onClickOption)` | Emitted when an option is selected in consumer-provided projection | `EventEmitter<KeyValueModel>` |

## Examples

### Basic

```html
<dx-input-url formControlName="website"></dx-input-url>
```

### Required with length validation

```html
<dx-input-url
  formControlName="website"
  [required]="true"
  [minLength]="10"
  [maxLength]="255"
  tooltip="Full URL including https://">
</dx-input-url>
```

### Outer-label with custom URL validation

```html
<dx-input-url
  outline="outer-label"
  formControlName="website"
  [customUrlValidation]="true">
  <span dxLabel>Company Website</span>
  <dx-error>Please enter a valid URL</dx-error>
</dx-input-url>
```

## Import

```typescript
import { DxInputUrlModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputUrlModule]
})
export class YourModule { }
```
