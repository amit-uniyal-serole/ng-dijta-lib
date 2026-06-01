---
category: Components
type: Data Entry
title: Table Filter
---

Dialog-based advanced filter form for tables. The component is designed to be opened inside a `MatDialog`; it builds a reactive form from a declarative field list and returns the collected values when the user clicks *Search*.

## When To Use

- Offer a dedicated advanced-filter experience for table columns (text, number, select, date).
- Collect a group of filter values at once and apply them to a server-side query.
- Reset, close, or submit the form via the three fixed dialog actions.

## API

```typescript
import { MatDialog } from '@angular/material/dialog';
import { DxTableFilterComponent, DxTableFilterSettings } from '@ngdx/dijta';

const filterSettings: DxTableFilterSettings[] = [
  { label: 'Name',   name: 'name',   type: 'input',  width: 'col-md-6' },
  { label: 'Status', name: 'status', type: 'select', width: 'col-md-6',
    options: [{ keyTt: 'ACTIVE', valueTt: 'Active' }, { keyTt: 'CLOSED', valueTt: 'Closed' }] },
  { label: 'Opened', name: 'opened', type: 'date',   width: 'col-md-12' }
];

const ref = this.dialog.open(DxTableFilterComponent, { width: '560px' });
ref.componentInstance.title = 'Filter';
ref.componentInstance.filterSettings = filterSettings;

ref.afterClosed().subscribe(values => {
  if (values) this.applyFilters(values);
});
```

### dx-table-filter

The component is opened programmatically via `MatDialog`; inputs are set on the dialog instance rather than through template bindings.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `title` | Dialog title | `string` | `'Search'` |
| `filterSettings` | Declarative list of filter fields | `DxTableFilterSettings[] \| undefined` | - |

### Methods

| Method | Description |
|--------|-------------|
| `onSearch()` | Closes the dialog and returns the current form value |
| `onClear()` | Resets the form and closes the dialog with the cleared value |
| `onClose()` | Closes the dialog without returning a value |
| `resetFilterForm()` | Resets the form without closing the dialog |

### Types

```typescript
type FIELD_TYPE = 'input' | 'number' | 'select' | 'date';
type FIELD_WIDTH = 'col-md-4' | 'col-md-6' | 'col-md-8' | 'col-md-12';

interface DxTableFilterSettings {
  label?: string;
  name: string;
  error?: string;
  type: FIELD_TYPE;
  multiselect?: boolean;
  options?: KeyValueModel[];
  width?: FIELD_WIDTH;
  defaultValue?: string;
}
```

## Examples

### Text + select fields

```typescript
const settings: DxTableFilterSettings[] = [
  { label: 'Policy Number', name: 'policyNumber', type: 'input',  width: 'col-md-6' },
  { label: 'Status',        name: 'status',       type: 'select', width: 'col-md-6',
    options: statusOptions }
];
```

### Date range with defaults

```typescript
const settings: DxTableFilterSettings[] = [
  { label: 'From', name: 'from', type: 'date', width: 'col-md-6', defaultValue: '2026-01-01' },
  { label: 'To',   name: 'to',   type: 'date', width: 'col-md-6' }
];
```

### Handling the result

```typescript
openFilter(): void {
  const ref = this.dialog.open(DxTableFilterComponent, { width: '560px' });
  ref.componentInstance.title = 'Advanced Filter';
  ref.componentInstance.filterSettings = this.filterSettings;
  ref.afterClosed().subscribe(result => {
    if (result) {
      this.loadData(result);
    }
  });
}
```

## Import

```typescript
import { DxTableFilterModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTableFilterModule]
})
export class YourModule { }
```
