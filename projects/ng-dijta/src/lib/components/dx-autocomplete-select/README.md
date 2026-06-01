---
category: Components
type: Data Entry
title: Autocomplete Select
---

A searchable select field that combines `mat-select` with an inline search input, optional "create new" action, multi-select, and form-field layout variants. Implements `ControlValueAccessor` for use in reactive and template-driven forms.

## When To Use

- Picking a value from a long, searchable list of options.
- Letting users quickly filter the dropdown by typing.
- Allowing users to create a new option inline when none of the existing options match.
- Multi-select scenarios where tags aren't needed but checkboxes are acceptable.

## Label Variants

`dx-autocomplete-select` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-autocomplete-select formControlName="country">
  <dx-label>Display Label</dx-label>
</dx-autocomplete-select>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-autocomplete-select outline="outer-label" formControlName="country">
  <p dxLabel>Display Label</p>
</dx-autocomplete-select>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-autocomplete-select
  [options]="options"
  formControlName="country">
  <dx-label>Country</dx-label>
</dx-autocomplete-select>
```

### dx-autocomplete-select

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | List of selectable options | `KeyValueModel[]` | - |
| `[loading]` | Show a loading spinner | `boolean` | `false` |
| `[multiple]` | Enable multi-select | `boolean` | `false` |
| `[disabled]` | Disable the control | `boolean` | `false` |
| `[required]` | Marks the field as required | `boolean` | `false` |
| `[readonly]` | Render as read-only | `boolean` | `false` |
| `[viewOnly]` | Render in view-only mode | `boolean` | `false` |
| `[noneBorder]` | Hide the field border | `boolean` | `false` |
| `[noneLabel]` | Hide the outer label slot | `boolean` | `false` |
| `[showToolTip]` | Show tooltip on long options | `boolean` | `true` |
| `[country]` | Render options with country-flag styling | `boolean` | `false` |
| `[emptyOption]` | Include an empty "clear" option | `boolean` | `false` |
| `[outline]` | Field outline / label style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error display in outer-label mode | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[labelPosition]` | Outer label placement | `'left' \| 'top'` | `'top'` |
| `[createOption]` | Inline "create new" action config | `CreateOption` | `{}` |
| `[value]` | Currently selected value | `string` | `''` |
| `[tabIndex]` | Tab index on the input | `number` | - |
| `[id]` | Control id | `string` | auto |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onSelectChange)` | Emitted when a dropdown value is chosen | `EventEmitter<string>` |
| `(onUserChange)` | Emitted on user-initiated Material change | `EventEmitter<string>` |
| `(onBlur)` | Emitted when the dropdown value commits on blur | `EventEmitter<string>` |
| `(onautoCompleteSelect)` | Emitted on every search-input keystroke | `EventEmitter<string>` |
| `(onClickCreateOption)` | Emitted when the "create new option" row is clicked | `EventEmitter<void>` |

### Types

```typescript
interface CreateOption {
  label?: string;    // defaults to 'Create New Option'
  isShow?: boolean;
}

interface KeyValueModel {
  keyTt: string;
  valueTt: string;
  [prop: string]: any;
}
```

## Examples

### Basic autocomplete

```html
<dx-autocomplete-select
  [options]="countries"
  formControlName="country">
  <dx-label>Country</dx-label>
</dx-autocomplete-select>
```

### Multi-select with loading state

```html
<dx-autocomplete-select
  [options]="tags"
  [multiple]="true"
  [loading]="loadingTags"
  formControlName="tags">
  <dx-label>Tags</dx-label>
</dx-autocomplete-select>
```

### Inline "create new" option

```typescript
createOption: CreateOption = { isShow: true, label: 'Add new category' };
```

```html
<dx-autocomplete-select
  [options]="categories"
  [createOption]="createOption"
  formControlName="category"
  (onClickCreateOption)="openCreateDialog()">
  <dx-label>Category</dx-label>
</dx-autocomplete-select>
```

## Import

```typescript
import { DxAutocompleteSelectModule } from '@ngdx/dijta';

@NgModule({ imports: [DxAutocompleteSelectModule] })
export class YourModule { }
```
