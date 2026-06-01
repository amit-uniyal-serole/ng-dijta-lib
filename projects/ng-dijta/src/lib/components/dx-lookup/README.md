---
category: Components
type: Data Entry
title: Lookup
---

Single-select lookup field that opens a searchable modal table for picking a record. Implements `ControlValueAccessor` and `Validator`, so it participates in both template-driven and reactive forms.

## When To Use

- When the user must select one record from a paginated or filterable list that is too large for a `mat-select`.
- When the selection needs richer context (multiple columns, custom headers, server-side search).
- When the input should be usable inside Angular forms with validation.
- When configuration (columns, API, filters) needs to be reused across multiple forms.

## Label Variants

`dx-lookup` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-lookup formControlName="owner">
  <dx-label>Display Label</dx-label>
</dx-lookup>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-lookup outline="outer-label" formControlName="owner">
  <p dxLabel>Display Label</p>
</dx-lookup>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-lookup
  formControlName="owner"
  [lookupModalConfig]="ownerLookupConfig"
  placeholder="Select an owner">
</dx-lookup>
```

### dx-lookup

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[lookupModalConfig]` | Configuration for the lookup modal (columns, API, headers, etc.) | `DxLookupModalConfig` | `-` |
| `[disabled]` | Whether the field is disabled | `boolean` | `false` |
| `[readonly]` | Whether the field is read-only | `boolean` | `false` |
| `[viewOnly]` | Render as plain text (no input UI) | `boolean` | `false` |
| `[required]` | Whether the field is required | `boolean` | `false` |
| `[noneLabel]` | Hide the floating label | `boolean` | `false` |
| `[outline]` | Label / outline style | `'floating' \| 'none-floating' \| 'outer-label'` | `'none-floating'` |
| `[labelPosition]` | Label placement relative to the input | `'left' \| 'top'` | `'top'` |
| `[outerLabelErrorType]` | Error rendering style when using `outer-label` | `'astrict-error' \| 'filled-error'` | `'filled-error'` |
| `[tooltip]` | Tooltip text | `string` | `-` |
| `[tabIndex]` | DOM tab index | `number` | `-` |
| `[id]` | Host id (auto-generated when omitted) | `string` | `dx-input-lookup-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |
| `(actionEmitted)` | Emitted when a filter action is triggered inside the modal | `EventEmitter<DxFilter>` |

## Examples

### Reactive-form lookup

```typescript
ownerLookupConfig: DxLookupModalConfig = {
  isGenericService: true,
  idName: { id: 'ownerId', name: 'ownerName' },
  columns: [
    { columnDef: 'ownerId',   header: 'ID' },
    { columnDef: 'ownerName', header: 'Name' }
  ],
  lookupApiConfig: { url: '/api/owners/search' },
  tableSettings: { pageSize: 10 },
  lookUpHeaderSettings: { title: 'Select Owner' }
};
```

```html
<form [formGroup]="form">
  <dx-lookup
    formControlName="owner"
    [lookupModalConfig]="ownerLookupConfig">
  </dx-lookup>
</form>
```

### Read-only lookup

```html
<dx-lookup
  [readonly]="true"
  [lookupModalConfig]="ownerLookupConfig"
  [(ngModel)]="selectedOwner">
</dx-lookup>
```

## Import

```typescript
import { DxLookupModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxLookupModule]
})
export class YourModule { }
```
