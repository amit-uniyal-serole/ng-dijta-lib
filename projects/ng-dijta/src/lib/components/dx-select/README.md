---
category: Components
type: Data Entry
title: Select
---

A form-ready dropdown that wraps Angular Material's `mat-select` with searchable options, multi-select, floating/outer label layouts, and per-option background color. Implements `ControlValueAccessor` and `Validator` for reactive and template-driven forms.

## When To Use

- When a user must pick one or more values from a list of discrete options.
- When options need inline search/filtering.
- When the dropdown should support different label layouts (floating / outer / none-floating).
- Prefer `dx-radio-button` when there are only 2-3 options.

## Label Variants

`dx-select` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-select formControlName="status">
  <dx-label>Display Label</dx-label>
</dx-select>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-select outline="outer-label" formControlName="status">
  <p dxLabel>Display Label</p>
</dx-select>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-select
  [options]="options"
  [(ngModel)]="selectedValue"
  (onSelectChange)="onChange($event)">
</dx-select>
```

### dx-select

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | Options available in the dropdown | `KeyValueModel[]` | - |
| `[value]` | Current selected value(s) | `string \| string[]` | `''` |
| `[multiSelect]` | Enables multi-select mode | `boolean` | `false` |
| `[emptyOption]` | Shows an empty/none option at the top | `boolean` | `false` |
| `[noneLabel]` | Hides the floating label | `boolean` | `false` |
| `[noneBorder]` | Removes the form field border | `boolean` | `false` |
| `[viewOnly]` | Renders the selected value in read-only mode | `boolean` | `false` |
| `[readonly]` | Prevents user interaction but keeps the control enabled | `boolean` | `false` |
| `[required]` | Marks the control as required | `boolean` | `false` |
| `[disabled]` | Disables the control | `boolean` | `false` |
| `[labelPosition]` | Label position relative to the field | `'left' \| 'top'` | `'top'` |
| `[outline]` | Label/border layout style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error rendering style for outer-label layout | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[id]` | Unique id for the field (auto-generated when omitted) | `string` | `dx-input-select-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onSelectChange)` | Emitted when the selected value changes | `EventEmitter<OnSelectChange>` |
| `(onUserChange)` | Emitted only when the user interacts to change the selection | `EventEmitter<string \| number>` |

### Types

```typescript
interface OnSelectChange {
  value: string | number | string[];
}

interface KeyValueModel {
  keyTt: string | number;
  valueTt: string;
  color?: string;
  // ...additional optional fields
}
```

## Examples

### Basic single-select

```typescript
options: KeyValueModel[] = [
  { keyTt: 'IN', valueTt: 'India' },
  { keyTt: 'US', valueTt: 'United States' },
  { keyTt: 'UK', valueTt: 'United Kingdom' }
];
```

```html
<dx-select
  [options]="options"
  [(ngModel)]="country"
  (onSelectChange)="onCountryChange($event)">
</dx-select>
```

### Multi-select with floating label

```html
<dx-select
  [options]="tagOptions"
  [multiSelect]="true"
  outline="floating"
  [formControl]="tagsCtrl">
</dx-select>
```

### Outer label with required validation

```html
<dx-select
  [options]="statusOptions"
  [required]="true"
  outline="outer-label"
  outerLabelErrorType="astrict-error"
  [formControl]="statusCtrl">
</dx-select>
```

### Read-only

```html
<dx-select
  [options]="options"
  [viewOnly]="true"
  [(ngModel)]="country">
</dx-select>
```

## Import

```typescript
import { DxSelectModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxSelectModule]
})
export class YourModule { }
```
