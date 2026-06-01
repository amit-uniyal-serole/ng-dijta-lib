---
category: Components
type: Data Display
title: Timeline
---

A vertical display of a series of events in chronological order. Items are projected as `<dx-timeline-item>` children and can be laid out left, right, alternating, or fully custom.

## When To Use
- When events need to be displayed in chronological order (activity feeds, audit logs, history views).
- When a process has multiple stages and you want to show progress visually.
- When an item stream needs a "pending" placeholder at the tail for in-flight work.
- When each event has rich content (title, description, custom dot icon) rather than a simple list row.

## API

```html
<dx-timeline dxMode="left">
  <dx-timeline-item>Created a new account.</dx-timeline-item>
  <dx-timeline-item dxColor="green">Verified email address.</dx-timeline-item>
  <dx-timeline-item dxColor="red">Password changed.</dx-timeline-item>
</dx-timeline>
```

### dx-timeline

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dxMode]` | Layout mode for timeline items | `'left' \| 'right' \| 'alternate' \| 'custom'` | `'left'` |
| `[dxPending]` | Pending state indicator; `true` shows a default spinner, string/template shows custom content | `string \| boolean \| TemplateRef<void>` | - |
| `[dxPendingDot]` | Custom dot for the pending item | `string \| TemplateRef<void>` | - |
| `[dxReverse]` | Reverse the order of items | `boolean` | `false` |
| `[outline]` | Visual variant of the timeline | `'calender' \| 'timeline-detail-view' \| 'none'` | `'none'` |

### dx-timeline-item

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dxColor]` | Color of the item dot (preset keyword or CSS color) | `'red' \| 'blue' \| 'green' \| 'grey' \| 'gray' \| 'transprant' \| string` | `'blue'` |
| `[dxPosition]` | Forces the item onto a side (only meaningful in `dxMode="custom"`) | `'left' \| 'right'` | - |
| `[dxDot]` | Custom dot content (icon name or template) | `string \| TemplateRef<void>` | - |
| `[dxCustom]` | Custom item template | `string \| TemplateRef<void>` | - |
| `[dxLabel]` | Optional label rendered opposite the content | `string \| TemplateRef<void>` | - |
| `[timelineItemTileLabel]` | Secondary tile label | `string` | `''` |
| `[backgroundNone]` | Remove the item background | `boolean` | `false` |
| `[calenderData]` | Data model used by the calendar timeline variant | `TimeLineCalenderBoxModel` | - |

### Types

```typescript
type DxTimelineMode      = 'left' | 'right' | 'alternate' | 'custom';
type DxTimelinePosition  = 'left' | 'right';
type DxTimelineItemColor = 'red' | 'blue' | 'green' | 'grey' | 'gray' | 'transprant';
```

## Examples

### Alternating layout

```html
<dx-timeline dxMode="alternate">
  <dx-timeline-item>Step 1</dx-timeline-item>
  <dx-timeline-item dxColor="green">Step 2</dx-timeline-item>
  <dx-timeline-item dxColor="red">Step 3</dx-timeline-item>
</dx-timeline>
```

### With pending state

```html
<dx-timeline [dxPending]="'Uploading attachments...'">
  <dx-timeline-item>File selected</dx-timeline-item>
  <dx-timeline-item dxColor="green">Validated</dx-timeline-item>
</dx-timeline>
```

### Custom dot

```html
<dx-timeline>
  <dx-timeline-item dxDot="check_circle" dxColor="green">
    Deployment succeeded
  </dx-timeline-item>
  <dx-timeline-item dxDot="error" dxColor="red">
    Rollback triggered
  </dx-timeline-item>
</dx-timeline>
```

### Reversed order

```html
<dx-timeline [dxReverse]="true">
  <dx-timeline-item>Oldest</dx-timeline-item>
  <dx-timeline-item>Middle</dx-timeline-item>
  <dx-timeline-item>Newest</dx-timeline-item>
</dx-timeline>
```

## Import

```typescript
import { DxTimelineModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTimelineModule]
})
export class YourModule { }
```
