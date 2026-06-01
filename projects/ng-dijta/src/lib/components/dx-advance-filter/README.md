---
category: Components
type: Data Entry
title: Advance Filter
---

A grouped, condition-based filter builder that lets users compose complex AND/OR queries with nestable groups and sections. Designed for driving advanced search and report filters.

## When To Use

- Building advanced search forms where users combine multiple conditions.
- Letting users group conditions with AND / OR logic across multiple levels.
- Driving saved-filter editors in reports, lists, and grid-heavy screens.

## API

```html
<dx-advance-filter
  [title]="'Filter Items'"
  [filterButtons]="buttons"
  [filterData]="filterData"
  (onClickAction)="onFilter($event)">
</dx-advance-filter>
```

### dx-advance-filter

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Panel title shown above the builder | `string` | - |
| `[filterButtons]` | Primary / secondary action button config | `FilterButtons` | - |
| `[filterData]` | Columns and their allowed conditions | `FilterData` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickAction)` | Emitted on primary/secondary click; payload is the action key or the full form value | `EventEmitter<string>` |

### Types

```typescript
interface FilterData {
  columns: Columns[];
}

interface Columns {
  keyTt: string;
  valueTt: string;
  conditions: Conditions[];
}

interface Conditions {
  keyTt: string;
  valueTt: string;
}

interface FilterButtons {
  primaryBtn: BtnSettings;
  secondaryBtn: BtnSettings;
}

interface BtnSettings {
  show: boolean;
  title: string;
}

interface OnClickAddNewButton {
  actionType: string | number;
  isAddNew: boolean;
}
```

## Examples

### Basic filter builder

```typescript
filterData: FilterData = {
  columns: [
    {
      keyTt: 'name', valueTt: 'Name',
      conditions: [
        { keyTt: 'eq', valueTt: 'Equals' },
        { keyTt: 'contains', valueTt: 'Contains' },
      ],
    },
    {
      keyTt: 'status', valueTt: 'Status',
      conditions: [{ keyTt: 'eq', valueTt: 'Equals' }],
    },
  ],
};

buttons: FilterButtons = {
  primaryBtn: { show: true, title: 'Apply' },
  secondaryBtn: { show: true, title: 'Reset' },
};
```

```html
<dx-advance-filter
  title="Filter Items"
  [filterButtons]="buttons"
  [filterData]="filterData"
  (onClickAction)="handleFilter($event)">
</dx-advance-filter>
```

### Minimal single-column filter

```html
<dx-advance-filter
  [filterButtons]="{ primaryBtn: { show: true, title: 'Search' }, secondaryBtn: { show: false, title: '' } }"
  [filterData]="{ columns: [{ keyTt: 'q', valueTt: 'Query', conditions: [{ keyTt: 'contains', valueTt: 'Contains' }] }] }"
  (onClickAction)="onSearch($event)">
</dx-advance-filter>
```

## Import

```typescript
import { DxAdvanceFilterModule } from '@ngdx/dijta';

@NgModule({ imports: [DxAdvanceFilterModule] })
export class YourModule { }
```
