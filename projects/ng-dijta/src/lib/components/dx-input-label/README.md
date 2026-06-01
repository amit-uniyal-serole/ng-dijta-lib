---
category: Components
type: Data Entry
title: Input Label
---

A short-text label input that wraps Angular Material's `mat-form-field` + `matInput` and applies a built-in label-name pattern validator (alphanumeric + spaces, no `|` or `=`). Integrates with Angular Forms as a `ControlValueAccessor`.

## When To Use

- When capturing a short label / tag name (category, chip, filter label).
- When the value must reject separators like `|` and `=` that conflict with downstream serialization.
- When you want a consistent icon-prefixed text input matching other DX inputs.

## API

```html
<dx-input-label
  formControlName="label"
  placeholder="Add Label">
</dx-input-label>
```

### dx-input-label

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[placeholder]` | Placeholder shown when empty | `string` | `'Add Label'` |
| `[pattern]` | Override regex pattern applied to the value | `string` | - |
| `[icon]` | Material icon name shown as prefix | `string` | `'label'` |
| `[mask]` | ngx-mask pattern applied to the input | `string` | `''` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Basic

```html
<dx-input-label formControlName="label"></dx-input-label>
```

### Required with custom pattern

```html
<dx-input-label
  formControlName="label"
  [required]="true"
  pattern="^[A-Za-z0-9_-]{3,}$"
  placeholder="Tag name">
</dx-input-label>
```

### Outer-label layout

```html
<dx-input-label
  outline="outer-label"
  formControlName="label">
  <span dxLabel>Category Label</span>
</dx-input-label>
```

## Import

```typescript
import { DxInputLabelModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputLabelModule]
})
export class YourModule { }
```
