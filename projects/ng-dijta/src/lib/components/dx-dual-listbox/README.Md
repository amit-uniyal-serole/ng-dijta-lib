---
category: Components
type: Data Entry
title: Dual Listbox
---

Two-column transfer list that lets the user move items between an "available" list and a "confirmed" list. Supports drag-and-drop, client-side and server-side filtering, single and bulk transfer, sorting, pinning, avatars and custom display formatters.

## When To Use

- When the user must select a subset of items from a larger pool (permissions, columns, tags, members).
- When ordering of selected items matters (manual move-up / move-down / drag to reorder).
- When the list of source items is large enough to require filtering.
- When source data is paged server-side and search must round-trip through an API.
- When items need to display an avatar, icon, or subtitle in addition to the name.

## API

```html
<dx-dual-listbox
  [source]="source"
  [destination]="destination"
  [config]="config"
  (onDestinationChange)="destination = $event">
</dx-dual-listbox>
```

### dx-dual-listbox

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[source]` | Items available for selection | `any[]` | `-` |
| `[destination]` | Selected items (two-way, updated via `(onDestinationChange)`) | `any[]` | `-` |
| `[config]` | Configuration object (see `DualListConfig`) | `DualListConfig` | `-` |
| `[compare]` | Custom compare function for sorting | `(a, b) => number` | `-` |
| `[displaySelectedCount]` | Toggles showing selected counts | `SelectedCount` | `-` |
| `[id]` | Unique id used when dragging between multiple lists | `string` | `dual-list-{n}` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onDestinationChange)` | Emitted when the selected list changes | `EventEmitter<any[]>` |
| `(onServiceFilterChange)` | Emitted when server-side filter input changes | `EventEmitter<ServerFilterModel>` |

### Types

```typescript
interface DualListConfig {
  key: string;                       // primary key property when items are objects
  display: string | string[] | ((item: any) => string); // display formatter
  height?: string;                   // list height (e.g. '200px')
  filter?: boolean;                  // show filter inputs
  sort?: boolean;                    // enable sorting
  disabled?: boolean;                // disable entire transfer UI
  format?: DefaultDualListFormat;    // direction, draggable, locale
  showAvatar?: boolean;              // render avatars in rows
  availableListTitle?: string;
  confirmedListTitle?: string;
  enableBulkTransfer?: boolean;      // show "move all" buttons
  hideDefaulLabel?: boolean;
  subtitleAsEmailFg?: boolean;
  serverFilter?: boolean;            // emit onServiceFilterChange instead of filtering locally
  enableSingleItemSort?: boolean;    // per-row up/down buttons
  enableColumnPinning?: boolean;     // allow pinning selected items
}

interface DefaultDualListFormat {
  direction?: 'left-to-right' | 'right-to-left';
  draggable?: boolean;
  locale?: undefined;
}

interface ServerFilterModel {
  event: ListBoxSearchEvent;
  search: string;
}
```

## Examples

### Basic transfer list

```typescript
source = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' }
];
destination = [];

config: DualListConfig = {
  key: 'id',
  display: 'name',
  filter: true,
  sort: true,
  height: '300px'
};
```

```html
<dx-dual-listbox
  [source]="source"
  [destination]="destination"
  [config]="config"
  (onDestinationChange)="destination = $event">
</dx-dual-listbox>
```

### With avatars, bulk transfer and custom titles

```typescript
config: DualListConfig = {
  key: 'id',
  display: 'name',
  showAvatar: true,
  enableBulkTransfer: true,
  availableListTitle: 'Team members',
  confirmedListTitle: 'Reviewers',
  height: '400px'
};
```

```html
<dx-dual-listbox
  [source]="users"
  [destination]="reviewers"
  [config]="config"
  (onDestinationChange)="reviewers = $event">
</dx-dual-listbox>
```

### Server-side filtering

```html
<dx-dual-listbox
  [source]="pagedUsers"
  [destination]="selected"
  [config]="{ key: 'id', display: 'name', serverFilter: true, filter: true }"
  (onServiceFilterChange)="loadPage($event)"
  (onDestinationChange)="selected = $event">
</dx-dual-listbox>
```

### Reorderable selection with pinning

```html
<dx-dual-listbox
  [source]="columns"
  [destination]="visibleColumns"
  [config]="{
    key: 'field',
    display: 'title',
    enableSingleItemSort: true,
    enableColumnPinning: true,
    height: '360px'
  }"
  (onDestinationChange)="visibleColumns = $event">
</dx-dual-listbox>
```

## Import

```typescript
import { DxDualListboxModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxDualListboxModule]
})
export class YourModule { }
```
