---
category: Components
type: Data Entry
title: Input Icon
---

An icon-selection input that opens `DxIconSelectionPopupComponent` in a `MatDialog` to let the user pick a Material icon and writes the selected icon name back to the form control.

## When To Use

- When a form field captures a Material icon name (theming tools, entity-type editors, module configuration).
- When the user should browse / search icons in a dialog rather than type the name.
- When the control must integrate with reactive forms as both a `ControlValueAccessor` and a `Validator`.

## Label Variants

`dx-input-icon` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-input-icon formControlName="value">
  <dx-label>Display Label</dx-label>
</dx-input-icon>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-input-icon outline="outer-label" formControlName="value">
  <p dxLabel>Display Label</p>
</dx-input-icon>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-input-icon
  formControlName="icon"
  [iconConfig]="iconConfig"
  placeholder="Pick an icon">
</dx-input-icon>
```

### dx-input-icon

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[value]` | Current selected icon name | `string` | - |
| `[disabled]` | Disables the input | `boolean` | `false` |
| `[readonly]` | Renders the input read-only | `boolean` | `false` |
| `[viewOnly]` | Renders as static display-only text | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[noneLabel]` | Hides the field label | `boolean` | `false` |
| `[outline]` | Label / outline rendering variant | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error-indicator style for outer labels | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer-label placement | `'left' \| 'top'` | `'top'` |
| `[placeholder]` | Placeholder shown when empty | `string` | `'Select Icon'` |
| `[icon]` | Material icon name shown as prefix | `string` | `'search'` |
| `[mask]` | ngx-mask pattern applied to the input | `string` | `''` |
| `[iconConfig]` | Config forwarded to the icon-selection popup | `IconConfig` | - |
| `[currencyFormat]` | Icon name display style passed to the popup | `'wide' \| 'narrow'` | `'narrow'` |
| `[currencyPosition]` | Icon position passed to the popup | `'left' \| 'right'` | `'left'` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Basic

```html
<dx-input-icon formControlName="icon"></dx-input-icon>
```

### With icon-picker config

```html
<dx-input-icon
  formControlName="icon"
  [iconConfig]="{ pageSize: 24 }"
  placeholder="Choose module icon">
</dx-input-icon>
```

### Outer-label layout

```html
<dx-input-icon
  outline="outer-label"
  [required]="true"
  formControlName="icon">
  <span dxLabel>Module Icon</span>
</dx-input-icon>
```

## Import

```typescript
import { DxInputIconModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxInputIconModule]
})
export class YourModule { }
```
