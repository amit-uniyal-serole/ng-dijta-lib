---
category: Components
type: Data Entry
title: Select
---

A feature-rich dropdown select with single / multiple selection, built-in search, async search function, virtual scrolling, lazy loading, select-all, template customization, and `ControlValueAccessor` support for reactive / template-driven forms.

## When To Use

- When users choose one (or many) values from a known list.
- When the list is large and needs virtual scrolling or server-side search.
- When the select must appear in a form and bind via `[(ngModel)]` or `formControlName`.
- When selected values must be shown as chips with an overflow indicator.
- When the menu needs to be anchored to the body to escape overflow-hidden ancestors.

## API

```html
<d-select
  [(ngModel)]="value"
  [options]="options"
  filterKey="name"
  valueKey="id"
  placeholder="Select an option"
  [isSearch]="true"
  (valueChange)="onChange($event)">
</d-select>
```

### d-select

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[options]` | Source list for the menu | `any[]` | `[]` |
| `[filterKey]` | Property used for rendering and filtering objects | `string` | - |
| `[valueKey]` | Property used as the control value when options are objects | `string` | - |
| `[multiple]` | Allow selecting multiple values | `boolean` | - |
| `[isSelectAll]` | Show a "Select all" option (multiple only) | `boolean` | `false` |
| `[isSearch]` | Show an inline search input | `boolean` | `false` |
| `[searchPlaceholder]` | Placeholder for the search input | `string` | `''` |
| `[searchFn]` | Custom search function (e.g. server-side) | `(term: string) => Observable<Array<{ id; option }>>` | - |
| `[placeholder]` | Placeholder shown when no value is selected | `string` | `''` |
| `[disabled]` | Disable the control | `boolean` | `false` |
| `[readonly]` | Mark the input as readonly | `boolean` | `true` |
| `[size]` | Size variant | `'' \| 'sm' \| 'lg'` | - |
| `[width]` | Explicit dropdown width | `number` | - |
| `[scrollHight]` | Max height of the dropdown | `string` | `'300px'` |
| `[allowClear]` | Show a clear icon for single-select | `boolean` | `false` |
| `[appendToBody]` | Render the dropdown in the document body (escapes overflow) | `boolean` | `false` |
| `[appendToBodyDirections]` | Preferred CDK overlay positions when `appendToBody` is `true` | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` |
| `[appendToBodyScrollStrategy]` | CDK overlay scroll strategy | `AppendToBodyScrollStrategyType` | - |
| `[direction]` | Menu opening direction | `'up' \| 'down' \| 'auto'` | `'down'` |
| `[overview]` | Visual style | `'border' \| 'underlined'` | `'border'` |
| `[enableLazyLoad]` | Emit `loadMore` on scroll to end | `boolean` | `false` |
| `[virtualScroll]` | Use CDK virtual scroll | `boolean` | - |
| `[templateItemSize]` | Explicit item size when using virtual scroll | `number` | - |
| `[toggleOnFocus]` | Open the menu when the trigger is focused | `boolean` | `false` |
| `[autoFocus]` | Auto-focus the trigger on init | `boolean` | `false` |
| `[autoScrollIntoActive]` | Scroll the active option into view on open | `boolean` | `false` |
| `[optionDisabledKey]` | Property flagging an option as disabled | `string` | `''` |
| `[optionImmutableKey]` | Property flagging an option as immutable (select-all) | `string` | `''` |
| `[keepMultipleOrder]` | Ordering strategy for selected chips | `'origin' \| 'user-select'` | `'user-select'` |
| `[customViewTemplate]` | Extra template shown alongside the menu | `TemplateRef<any>` | - |
| `[customViewDirection]` | Position of `customViewTemplate` relative to the menu | `'bottom' \| 'right' \| 'left' \| 'top'` | `'bottom'` |
| `[noResultItemTemplate]` | Template shown when no results match | `TemplateRef<any>` | - |
| `[loadingTemplateRef]` | Template shown while lazy-loading | `TemplateRef<any>` | - |
| `[inputItemTemplate]` | Template for the selected value in the trigger | `TemplateRef<any>` | - |
| `[valueParser]` | Function converting an option to its display value | `(item: any) => any` | `item => item[filterKey]` |
| `[formatter]` | Function returning the display string for an option | `(item: any) => string` | `item => item[filterKey]` |
| `[extraConfig]` | Advanced feature flags (labelization, focus first filtered, etc.) | `object` | - |
| `[showItemTitle]` | Render the item text as the native `title` attribute | `boolean` | `false` |
| `[highlightItemClass]` | CSS class applied to the active option | `string` | `'active'` |
| `[showAnimation]` | Play the open / close animation | `boolean` | `true` |
| `[styleType]` | Visual style preset | `string` | `'default'` |
| `[showGlowStyle]` | Apply the glow focus style | `boolean` | `true` |
| `[beforeChange]` | Guard called before selection changes; return `false` to cancel | `(index, option, action) => boolean \| Promise<boolean> \| Observable<boolean>` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(valueChange)` | Emitted when the selected value changes | `EventEmitter<any>` |
| `(toggleChange)` | Emitted when the menu opens / closes | `EventEmitter<boolean>` |
| `(loadMore)` | Emitted when the user scrolls to the bottom (when `enableLazyLoad` is `true`) | `EventEmitter<any>` |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `toggle` | Open / close the menu programmatically | `() => void` |
| `selectAll` | Toggle all options (multiple mode) | `() => void` |
| `forceSearchNext` | Re-run the current search | `() => void` |
| `loadStart` / `loadFinish` | Show / hide the lazy-load indicator | `() => void` |

## Examples

### Single select with object options

```typescript
options = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
];
```

```html
<d-select
  [(ngModel)]="value"
  [options]="options"
  filterKey="name"
  valueKey="id"
  placeholder="Pick a fruit">
</d-select>
```

### Multi-select with select-all and search

```html
<d-select
  [(ngModel)]="selected"
  [options]="options"
  filterKey="name"
  valueKey="id"
  [multiple]="true"
  [isSelectAll]="true"
  [isSearch]="true">
</d-select>
```

### Async search

```typescript
searchFn = (term: string) =>
  this.http.get<User[]>(`/api/users?q=${term}`).pipe(
    map(users => users.map((u, id) => ({ id, option: u })))
  );
```

```html
<d-select
  [(ngModel)]="user"
  [isSearch]="true"
  [searchFn]="searchFn"
  filterKey="fullName"
  valueKey="id"
  placeholder="Search users...">
</d-select>
```

### Virtual scroll with lazy load

```html
<d-select
  [(ngModel)]="value"
  [options]="options"
  filterKey="name"
  valueKey="id"
  [virtualScroll]="true"
  [enableLazyLoad]="true"
  (loadMore)="loadNextPage($event)">
</d-select>
```

### Append to body (escapes overflow-hidden)

```html
<d-select
  [(ngModel)]="value"
  [options]="options"
  filterKey="name"
  [appendToBody]="true">
</d-select>
```

## Import

```typescript
import { SelectModule } from '@ngdx/dijta';

@NgModule({
  imports: [SelectModule]
})
export class YourModule { }
```
