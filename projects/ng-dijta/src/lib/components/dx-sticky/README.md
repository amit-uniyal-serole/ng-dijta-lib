---
category: Components
type: Layout
title: Sticky
---

Pins projected content to the top of a scrollable container once the user scrolls past it, and releases it when the container leaves the viewport. Emits status transitions so callers can react to the pin state.

## When To Use

- Keep a toolbar, filter bar, or table header visible while the user scrolls a long page.
- Anchor an in-page navigation or action bar inside a scrollable container without using `position: sticky` directly.
- React to pin state changes (e.g. add a shadow while stuck) via the `statusChange` output.

## API

```html
<dx-sticky
  [zIndex]="10"
  [backgroundColor]="'#fff'"
  [boxShadow]="'0 2px 4px rgba(0,0,0,0.08)'"
  [view]="{ top: 64 }"
  (statusChange)="onStickyStatus($event)">
  <div class="toolbar">...</div>
</dx-sticky>
```

### dx-sticky

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[zIndex]` | Z-index applied to the sticky wrapper | `number` | - |
| `[backgroundColor]` | Background color applied while the content is stuck | `string` | - |
| `[boxShadow]` | Box shadow applied while the content is stuck | `string` | - |
| `[container]` | Scroll boundary element; defaults to the parent node | `Element` | parent node |
| `[view]` | Top / bottom offsets applied when the content is stuck | `{ top?: number; bottom?: number }` | - |
| `[scrollTarget]` | Element that fires the scroll events; defaults to `window` | `Element \| Window` | `window` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(statusChange)` | Emitted when the sticky state changes | `EventEmitter<StickyStatus>` |

### Methods

| Method | Description |
|--------|-------------|
| `recalculatePosition()` | Force a re-evaluation of the sticky status (useful after layout changes) |

### Types

```typescript
type StickyStatus = 'normal' | 'follow' | 'stay' | 'remain';
```

- `normal` — content sits in its natural position.
- `follow` — content is fixed to the viewport while scrolling.
- `stay` — content is offset relatively (e.g. during horizontal reflow).
- `remain` — content pinned to the bottom of its container as it scrolls out.

## Examples

### Sticky toolbar

```html
<dx-sticky [zIndex]="5" [backgroundColor]="'#fff'" [boxShadow]="'0 2px 6px rgba(0,0,0,0.1)'">
  <div class="toolbar">
    <button mat-button>Filter</button>
    <button mat-button>Sort</button>
  </div>
</dx-sticky>
```

### Sticky inside a custom scroll container

```html
<div #scrollHost class="scroll-host">
  <dx-sticky [scrollTarget]="scrollHost" [view]="{ top: 0 }">
    <h3>Section header</h3>
  </dx-sticky>
  <!-- long content -->
</div>
```

### React to pin state

```typescript
onStickyStatus(status: StickyStatus): void {
  this.isPinned = status === 'follow';
}
```

## Import

```typescript
import { DxStickyModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxStickyModule]
})
export class YourModule { }
```
