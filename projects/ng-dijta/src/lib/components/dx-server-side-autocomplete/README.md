---
category: Components
type: Data Entry
title: Server Side Autocomplete
---

A server-driven autocomplete/lookup field backed by Angular Material's autocomplete. Supports debounced search against a paginated API, single or multi selection, an optional full-screen lookup modal (via `dx-lookup` / `dx-multi-lookup`), and integration with reactive forms.

## When To Use

- When the list of selectable records is too large to load up-front (requires server search/pagination).
- When users should optionally open an advanced lookup modal for complex filtering.
- When multi-selection of records fetched from the server is required.
- Prefer `dx-select` for small, fully-loaded option lists.

## Label Variants

`dx-server-side-autocomplete` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-server-side-autocomplete formControlName="country">
  <dx-label>Display Label</dx-label>
</dx-server-side-autocomplete>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-server-side-autocomplete outline="outer-label" formControlName="country">
  <p dxLabel>Display Label</p>
</dx-server-side-autocomplete>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-server-side-autocomplete
  [lookupModalConfig]="lookupConfig"
  [formControl]="ctrl">
</dx-server-side-autocomplete>
```

### dx-server-side-autocomplete

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[value]` | Current selected value(s) | `KeyValueModel \| KeyValueModel[]` | - |
| `[lookupModalConfig]` | Lookup API + modal configuration | `DxLookupModalConfig` | - |
| `[placeholder]` | Placeholder text shown in the input | `string` | - |
| `[disabled]` | Disables the control | `boolean` | `false` |
| `[readonly]` | Prevents user interaction but keeps the control enabled | `boolean` | `false` |
| `[viewOnly]` | Renders the selected value in read-only mode | `boolean` | `false` |
| `[hideLookup]` | Hides the button that opens the lookup modal | `boolean` | `false` |
| `[row]` | Number of visible rows for multi-select chips | `number` | `2` |
| `[emptyOption]` | Shows an empty option | `boolean` | `false` |
| `[disableAutoCompleteSearch]` | Disables inline search (only the lookup modal is available) | `boolean` | `false` |
| `[noneBorder]` | Removes the form-field border | `boolean` | `false` |
| `[noneLabel]` | Hides the floating label | `boolean` | `false` |
| `[tabIndex]` | Tab index applied to the input | `number` | - |
| `[standardDropdown]` | Uses a simplified single-field search payload | `boolean` | `false` |
| `[required]` | Marks the control as required | `boolean` | `false` |
| `[labelPosition]` | Label position relative to the field | `'left' \| 'top'` | `'top'` |
| `[outline]` | Label/border layout style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[outerLabelErrorType]` | Error rendering style for outer-label layout | `'astrict-error' \| 'filled-error'` | `'filled-error'` |

### Types

```typescript
interface DxServerSideAutoCompleteConfig {
  method: 'POST' | 'GET';
  api: string;
  paginationRequest?: PaginationRequest;
  params?: { [key: string]: any };
  body?: any;
  headers?: { [name: string]: string | string[] };
  displayLabel: string;
  actualValue: string;
  searchPlaceholder?: string;
}
```

See `DxLookupModalConfig` in `dx-lookup` for the full lookup-modal configuration surface (columns, pagination, transforms, header settings, etc.).

## Examples

### Single-select with server search

```typescript
lookupConfig: DxLookupModalConfig = {
  idName: { id: 'customerId', name: 'customerName', subtitle: 'email' },
  recordIdentifier: 'Customer',
  lookupApiConfig: {
    method: 'GET',
    api: '/api/v1/customers',
    searchBasedOn: 'customerName'
  },
  tableSettings: { multiSelect: false },
  columns: [
    { title: 'Name',  field: 'customerName' },
    { title: 'Email', field: 'email' }
  ]
};
customerCtrl = new FormControl();
```

```html
<dx-server-side-autocomplete
  [lookupModalConfig]="lookupConfig"
  [formControl]="customerCtrl">
</dx-server-side-autocomplete>
```

### Multi-select with lookup modal

```html
<dx-server-side-autocomplete
  [lookupModalConfig]="multiLookupConfig"
  [formControl]="productsCtrl"
  [row]="3">
</dx-server-side-autocomplete>
```

### Autocomplete search disabled (modal-only)

```html
<dx-server-side-autocomplete
  [lookupModalConfig]="lookupConfig"
  [disableAutoCompleteSearch]="true"
  [formControl]="ctrl">
</dx-server-side-autocomplete>
```

## Import

```typescript
import { DxServerSideAutocompleteModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxServerSideAutocompleteModule]
})
export class YourModule { }
```
