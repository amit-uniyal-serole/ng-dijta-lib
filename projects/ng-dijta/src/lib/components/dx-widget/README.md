---
category: Components
type: Data Display
title: List Widget
---

A dashboard widget that renders a titled card containing projected content (a list, chart, or summary) and optional header actions. Actions emit a typed payload so a parent container can route to the relevant view.

## When To Use

- When building a dashboard composed of titled widget tiles with projected content.
- When a widget needs a header icon, title, and one or more actions (e.g. *View all*).
- When you want a consistent bordered vs. borderless look across widget grids.

## API

```html
<dx-list-widget
  [widgetSource]="widget"
  outline="list"
  (onClickAction)="onAction($event)">
  <ul>
    <li *ngFor="let item of items">{{ item.name }}</li>
  </ul>
</dx-list-widget>
```

### dx-list-widget

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[widgetSource]` | Widget title, icon, and action configuration | `WidgetModel` | - |
| `[outline]` | Visual outline style | `'list' \| 'none'` | `'list'` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(onClickAction)` | Emitted when a header action is clicked | `EventEmitter<WidgetListingActionModel>` |

### Types

```typescript
interface WidgetModel {
  title?: string;
  icon?: string;
  action?: WidgetListingActionModel[];
}

interface WidgetListingActionModel {
  label?: string;
  type?: string;
}
```

## Examples

### Basic widget with a list

```typescript
widget: WidgetModel = {
  title: 'Recent Activity',
  icon: 'history',
  action: [{ label: 'View all', type: 'viewAll' }]
};
```

```html
<dx-list-widget
  [widgetSource]="widget"
  (onClickAction)="onAction($event)">
  <ul>
    <li *ngFor="let item of items">{{ item.name }}</li>
  </ul>
</dx-list-widget>
```

### Borderless variant

```html
<dx-list-widget [widgetSource]="widget" outline="none">
  <app-mini-chart [data]="data"></app-mini-chart>
</dx-list-widget>
```

## Import

```typescript
import { DxWidgetModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxWidgetModule]
})
export class YourModule { }
```
