---
category: Components
type: Data Entry
title: Multi Lookup
---

Multi-select lookup field that opens a searchable modal table for picking multiple records. Supports add-more, unassign, and two-step confirmation flows, and implements `ControlValueAccessor` / `Validator`.

## When To Use

- When the user must select several records from a large, filterable list.
- When selections must be built up across multiple modal interactions (add more, unassign).
- When two-step confirmation is needed before selections commit to the form.
- When the field must integrate with Angular reactive or template-driven forms.

## Label Variants

`dx-multi-lookup` supports two label layouts, selected via the `outline` input. The label content is projected — use the correct projection slot for the variant.

### `none-floating` (default) — label above the field

Project the label through a `<dx-label>` element.

```html
<dx-multi-lookup formControlName="owners">
  <dx-label>Display Label</dx-label>
</dx-multi-lookup>
```

### `outer-label` — label rendered outside the Material form field

Set `outline="outer-label"` and project the label via the `dxLabel` attribute on any host element (e.g. `<p>`, `<span>`).

```html
<dx-multi-lookup outline="outer-label" formControlName="owners">
  <p dxLabel>Display Label</p>
</dx-multi-lookup>
```

> Picking the wrong slot silently drops the label. `<dx-label>` is only read when `outline !== 'outer-label'`; `[dxLabel]` is only read when `outline === 'outer-label'`.

## API

```html
<dx-multi-lookup
  formControlName="owners"
  [lookupModalConfig]="ownersLookupConfig">
</dx-multi-lookup>
```

### dx-multi-lookup

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
| `[id]` | Host id (auto-generated when omitted) | `string` | `dx-input-multilookup-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(blur)` | Emitted when the input loses focus | `EventEmitter<FocusEvent>` |

## Examples

### Reactive-form multi-lookup

```typescript
ownersLookupConfig: DxLookupModalConfig = {
  isGenericService: true,
  idName: { id: 'ownerId', name: 'ownerName' },
  columns: [
    { columnDef: 'ownerId',   header: 'ID' },
    { columnDef: 'ownerName', header: 'Name' }
  ],
  lookupApiConfig: { url: '/api/owners/search' },
  tableSettings: { pageSize: 10 },
  lookUpHeaderSettings: { title: 'Select Owners' }
};
```

```html
<form [formGroup]="form">
  <dx-multi-lookup
    formControlName="owners"
    [lookupModalConfig]="ownersLookupConfig">
  </dx-multi-lookup>
</form>
```

### Disabled multi-lookup

```html
<dx-multi-lookup
  [disabled]="true"
  [lookupModalConfig]="ownersLookupConfig"
  [(ngModel)]="selectedOwners">
</dx-multi-lookup>
```

## Import

```typescript
import { DxMultiLookupModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxMultiLookupModule]
})
export class YourModule { }
```
