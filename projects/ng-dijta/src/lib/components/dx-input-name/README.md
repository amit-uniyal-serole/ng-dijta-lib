---
category: Components
type: Data Entry
title: Input Name
---

A person-name text input that wraps Angular Material's `mat-form-field` + `matInput` and enforces a built-in name pattern (letters, accented characters, hyphen, dot, space, minimum 2 chars). Integrates with Angular Forms as both a `ControlValueAccessor` and a `Validator`.

## When To Use

- When capturing a person's name (first name, last name, full name) on a form.
- When the value must reject digits and most punctuation while allowing accented characters.
- When the field should share the same outline / error / label behavior as other DX inputs.

## Label Variants

`dx-input-name` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-name formControlName="name">
  <dx-label>Display Label</dx-label>
</dx-input-name>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-name outline="outer-label" formControlName="name">
  <p dxLabel>Display Label</p>
</dx-input-name>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-name
  formControlName="firstName"
  placeholder="First Name"
  [required]="true">
</dx-input-name>
```

### dx-input-name

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
| `[placeholder]` | Placeholder shown when empty | `string` | `'Name'` |
| `[pattern]` | Override regex pattern applied to the value | `string` | - |
| `[icon]` | Material icon name shown as prefix | `string` | `'account_circle'` |
| `[mask]` | ngx-mask pattern applied to the input | `string` | `''` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Basic

```html
<dx-input-name formControlName="firstName"></dx-input-name>
```

### Required with outer label

```html
<dx-input-name
  outline="outer-label"
  labelPosition="top"
  formControlName="firstName"
  [required]="true">
  <span dxLabel>First Name</span>
</dx-input-name>
```

### View-only

```html
<dx-input-name
  [formControl]="nameControl"
  [viewOnly]="true">
</dx-input-name>
```

## Import

```typescript
import { DxInputNameModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputNameModule]
})
export class YourModule { }
```
