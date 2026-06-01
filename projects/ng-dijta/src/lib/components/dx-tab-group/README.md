---
category: Components
type: Navigation
title: Tab Group
---

Declarative tab navigation that wraps Angular Material `mat-tab-group`. Tabs, headers, and tab content are projected as child components, giving you full control of the label template while keeping Material's built-in keyboard navigation and accessibility.

## When To Use

- Group related content into discrete panels where only one is visible at a time.
- Display rich tab headers (icons, badges, translated labels) via the `dx-tab-header` slot.
- Switch between presentation styles (filled, underlined top or bottom) without forking Material.
- React to the focused or selected tab index via the `selectFocusedIndex` / `selectedTabChange` outputs.

## API

```html
<dx-tab-group (selectedTabChange)="onTab($event)">
  <dx-tab>
    <dx-tab-header title="Overview" icon="info"></dx-tab-header>
    <dx-tab-content>Overview panel content</dx-tab-content>
  </dx-tab>
  <dx-tab>
    <dx-tab-header title="Activity" icon="history"></dx-tab-header>
    <dx-tab-content>Activity panel content</dx-tab-content>
  </dx-tab>
</dx-tab-group>
```

### dx-tab-group

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[tabsAlign]` | Horizontal alignment of the tab strip | `'start' \| 'center' \| 'end'` | `'start'` |
| `[outline]` | Visual style variant | `'filled' \| 'top_underline' \| 'bottom_underline_bg' \| 'none'` | `'none'` |
| `[animationDuration]` | Animation duration for tab transitions | `string` | `'500ms'` |
| `[headerPosition]` | Position of the tab header strip | `'below' \| ''` | `''` |
| `[color]` | Material theme color applied to the tab indicator | `string` | `''` |
| `[backgroundColor]` | Material theme background color | `string` | `'red'` |
| `[selectedIndex]` | Index of the initially selected tab | `number` | `0` |
| `[show]` | Whether to render the tab group (toggled internally after init) | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(selectedTabChange)` | Emitted when the active tab changes | `EventEmitter<MatTabChangeEvent>` |
| `(selectFocusedIndex)` | Emitted when the focused tab index changes | `EventEmitter<number>` |

### dx-tab

Wraps a single tab and projects its content into `mat-tab`.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Tab title (used when no `dx-tab-header` is projected) | `string` | `''` |
| `[disabled]` | Disables the tab | `boolean` | `false` |
| `[isActive]` | Marks the tab as initially active | `boolean` | `false` |

### dx-tab-header

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[title]` | Header text | `string` | `''` |
| `[icon]` | Material icon name rendered before the title | `string \| undefined` | - |
| `[tabView]` | Header visual variant | `'top_bottom' \| 'line_border_flat_icon'` | `'line_border_flat_icon'` |
| `[data]` | Arbitrary payload attached to the header | `any` | - |

### dx-tab-content

Content slot rendered inside the active tab. Accepts arbitrary projected content via `<ng-content>`.

## Examples

### Basic

```html
<dx-tab-group>
  <dx-tab>
    <dx-tab-header title="Summary"></dx-tab-header>
    <dx-tab-content>Summary content</dx-tab-content>
  </dx-tab>
  <dx-tab>
    <dx-tab-header title="Details"></dx-tab-header>
    <dx-tab-content>Detail content</dx-tab-content>
  </dx-tab>
</dx-tab-group>
```

### With icons and selected index

```html
<dx-tab-group [selectedIndex]="1" tabsAlign="center" outline="top_underline">
  <dx-tab>
    <dx-tab-header title="Profile" icon="person"></dx-tab-header>
    <dx-tab-content>...</dx-tab-content>
  </dx-tab>
  <dx-tab>
    <dx-tab-header title="Security" icon="lock"></dx-tab-header>
    <dx-tab-content>...</dx-tab-content>
  </dx-tab>
</dx-tab-group>
```

### Disabled tab

```html
<dx-tab-group>
  <dx-tab>
    <dx-tab-header title="General"></dx-tab-header>
    <dx-tab-content>...</dx-tab-content>
  </dx-tab>
  <dx-tab [disabled]="true">
    <dx-tab-header title="Admin" icon="admin_panel_settings"></dx-tab-header>
    <dx-tab-content>...</dx-tab-content>
  </dx-tab>
</dx-tab-group>
```

### Reacting to tab change

```typescript
onTab(event: MatTabChangeEvent): void {
  this.activeIndex = event.index;
}
```

```html
<dx-tab-group (selectedTabChange)="onTab($event)">
  ...
</dx-tab-group>
```

## Import

```typescript
import { DxTabGroupModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTabGroupModule]
})
export class YourModule { }
```
