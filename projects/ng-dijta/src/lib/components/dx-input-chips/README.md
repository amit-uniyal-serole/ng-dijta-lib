---
category: Components
type: Form
title: Input Chips
---

Multi-value tag input built on Angular Material `mat-chips` and `mat-form-field`. Accepts free-form text separated by *Enter* or *comma* and exposes the resulting string array through `ControlValueAccessor`.

## When To Use

- When a form field collects a list of short string values (tags, keywords, emails).
- When users should be able to type and commit tokens with Enter / comma or by blurring the input.
- When each chip needs to be individually removable.

## Label Variants

`dx-input-chips` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-chips formControlName="keywords">
  <dx-label>Display Label</dx-label>
</dx-input-chips>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-chips outline="outer-label" formControlName="keywords">
  <p dxLabel>Display Label</p>
</dx-input-chips>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-chips formControlName="tags"></dx-input-chips>
```

### dx-input-chips

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[disabled]` | Disables the field | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[readonly]` | Renders the field as read-only | `boolean` | `false` |
| `[viewOnly]` | Read-only view mode used for detail screens | `boolean` | `false` |
| `[noneLabel]` | Hide the label row | `boolean` | `false` |
| `[noneBorder]` | Remove the field border | `boolean` | `false` |
| `[noErrorSpace]` | Remove the reserved error space below the field | `boolean` | `false` |
| `[outline]` | Field appearance | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement when `outline = 'outer-label'` | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error display strategy for outer-label layout | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[addOnBlur]` | Commit the current text as a chip when the input blurs | `boolean` | `true` |
| `[visible]` | Whether chips are visible | `boolean` | `true` |
| `[selectable]` | Whether chips are selectable | `boolean` | `true` |
| `[removable]` | Whether chips can be removed | `boolean` | `true` |
| `[currencyFormat]` | Currency symbol width (inherited styling option) | `'wide' \| 'narrow'` | `'narrow'` |
| `[currencyPosition]` | Currency symbol placement (inherited styling option) | `'left' \| 'right'` | `'left'` |
| `[id]` | Unique element id (auto-generated when omitted) | `string` | `dx-input-chips-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted on field blur | `EventEmitter<FocusEvent>` |

Separator keys: `Enter`, `,`.

## Examples

### Basic

```html
<dx-input-chips formControlName="tags"></dx-input-chips>
```

### Pre-populated

```typescript
form = this.fb.group({
  tags: [['angular', 'material', 'dijta']]
});
```

```html
<dx-input-chips
  formControlName="tags"
  outline="outer-label"
  labelPosition="top">
</dx-input-chips>
```

### Read-only

```html
<dx-input-chips
  formControlName="tags"
  [readonly]="true"
  [removable]="false">
</dx-input-chips>
```

## Import

```typescript
import { DxInputChipsModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputChipsModule]
})
export class YourModule { }
```
