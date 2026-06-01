---
category: Components
type: Form
title: Input Company
---

Specialised input for company / organisation names. Wraps Angular Material `mat-form-field` + `matInput`, supports input masking and ships with a default `apartment` icon. Integrates with Reactive Forms via `ControlValueAccessor` and `Validator`.

## When To Use

- When a form collects a legal entity / company name with consistent iconography.
- When the value needs a pattern or mask (e.g. tax ID combined with name).
- When the field must participate in reactive forms validation and view-only flows.

## Label Variants

`dx-input-company` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-company formControlName="company">
  <dx-label>Display Label</dx-label>
</dx-input-company>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-company outline="outer-label" formControlName="company">
  <p dxLabel>Display Label</p>
</dx-input-company>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-company formControlName="company" placeholder="Company"></dx-input-company>
```

### dx-input-company

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[value]` | Current value | `string` | - |
| `[disabled]` | Disables the field | `boolean` | `false` |
| `[readonly]` | Renders the field as read-only | `boolean` | `false` |
| `[viewOnly]` | Read-only view mode used for detail screens | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hide the label row | `boolean` | `false` |
| `[outline]` | Field appearance | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[placeholder]` | Placeholder text | `string` | - |
| `[pattern]` | Validation pattern (regex) | `string` | - |
| `[mask]` | Input mask pattern | `string` | `''` |
| `[icon]` | Material icon shown on the field | `string` | `'apartment'` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted on field blur | `EventEmitter<FocusEvent>` |

## Examples

### Basic

```html
<form [formGroup]="form">
  <dx-input-company
    formControlName="company"
    placeholder="Company name"
    [required]="true">
  </dx-input-company>
</form>
```

### With mask and custom icon

```html
<dx-input-company
  formControlName="company"
  mask="AAA-000000"
  icon="business">
</dx-input-company>
```

### View-only (detail screen)

```html
<dx-input-company
  formControlName="company"
  [viewOnly]="true">
</dx-input-company>
```

## Import

```typescript
import { DxInputCompanyModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputCompanyModule]
})
export class YourModule { }
```
