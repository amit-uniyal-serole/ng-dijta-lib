---
category: Components
type: Navigation
title: Tabs
---

A tab navigation component with multiple visual types (tabs / pills / options / wrapped / slider), horizontal scroll mode, size variants, closeable and addable tabs, and a `beforeChange` guard for tab switching.

## When To Use

- When a view is logically divided into sibling panels and only one should be visible at a time.
- When the tab list is too wide to fit and needs horizontal scrolling.
- When tabs can be added / closed by the user (IDE-style tab strips).
- When tab switching must be gated by a confirmation (unsaved changes).

## API

```html
<d-tabs [(activeTab)]="active" (activeTabChange)="onTabChange($event)">
  <d-tab tabId="overview" title="Overview">
    <p>Overview content</p>
  </d-tab>
  <d-tab tabId="details" title="Details">
    <p>Details content</p>
  </d-tab>
  <d-tab tabId="activity" title="Activity" [disabled]="true">
    <p>Activity content</p>
  </d-tab>
</d-tabs>
```

### d-tabs

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[type]` | Visual type | `'tabs' \| 'pills' \| 'options' \| 'wrapped' \| 'slider'` | `'tabs'` |
| `[size]` | Size variant | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` |
| `[activeTab]` | Currently active tab id | `number \| string` | - |
| `[showContent]` | Render the content panel under the strip | `boolean` | `true` |
| `[scrollMode]` | Enable horizontal scroll when tabs overflow | `boolean \| 'normal' \| 'auto'` | `false` |
| `[customWidth]` | Explicit width | `string` | - |
| `[reactivable]` | Allow re-emitting when the same tab is clicked | `boolean` | `false` |
| `[closeable]` | Show a close icon on each tab | `boolean` | `false` |
| `[closeableIds]` | Ids of tabs that can be closed individually | `Array<number \| string>` | `[]` |
| `[addable]` | Show an "add tab" button | `boolean` | `false` |
| `[addTabTpl]` | Custom template for the "add" button | `TemplateRef<any>` | - |
| `[vertical]` | Render tabs vertically | `boolean` | `false` |
| `[isHidden]` | Hide the tab strip | `boolean` | `false` |
| `[beforeChange]` | Guard called before switching; return `false` to cancel | `(current, previous) => boolean \| Promise<boolean> \| Observable<boolean>` | - |

### d-tab

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[id]` / `[tabId]` | Tab identifier | `number \| string` | - |
| `[title]` | Tab label | `string` | - |
| `[disabled]` | Disable the tab | `boolean` | `false` |

### Events (d-tabs)

| Event | Description | Type |
|-------|-------------|------|
| `(activeTabChange)` | Emitted when the active tab changes | `EventEmitter<number \| string>` |
| `(addOrDeleteTabChange)` | Emitted when the add button is clicked or a tab is closed | `EventEmitter<ITabOperation>` |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `select` | Programmatically activate a tab | `(id: number \| string, callback?: Function) => void` |
| `scroll` | Scroll the tab strip to a direction or index | `(direction?: string, index?: number) => void` |

### Types

```typescript
interface ITabOperation {
  id: number | string | undefined;
  operation: 'add' | 'delete' | string;
}
```

## Examples

### Basic tabs

```html
<d-tabs [(activeTab)]="active">
  <d-tab tabId="one" title="One">Panel one</d-tab>
  <d-tab tabId="two" title="Two">Panel two</d-tab>
</d-tabs>
```

### Pills variant

```html
<d-tabs type="pills" size="sm" [(activeTab)]="active">
  <d-tab tabId="today" title="Today">...</d-tab>
  <d-tab tabId="week"  title="This week">...</d-tab>
  <d-tab tabId="month" title="This month">...</d-tab>
</d-tabs>
```

### Closeable / addable with scroll

```html
<d-tabs
  [closeable]="true"
  [addable]="true"
  scrollMode="auto"
  [(activeTab)]="active"
  (addOrDeleteTabChange)="onAddOrDelete($event)">
  <d-tab *ngFor="let t of tabs" [tabId]="t.id" [title]="t.title">
    {{ t.content }}
  </d-tab>
</d-tabs>
```

### Guarded tab switching

```typescript
beforeChange = (current: string) =>
  this.isDirty ? confirm('Discard changes?') : true;
```

```html
<d-tabs [(activeTab)]="active" [beforeChange]="beforeChange">
  <d-tab tabId="form" title="Form">...</d-tab>
  <d-tab tabId="preview" title="Preview">...</d-tab>
</d-tabs>
```

## Import

```typescript
import { TabsModule } from '@ngdx/dijta';

@NgModule({
  imports: [TabsModule]
})
export class YourModule { }
```
