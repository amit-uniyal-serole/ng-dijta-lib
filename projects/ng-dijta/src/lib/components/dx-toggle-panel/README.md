---
category: Components
type: Layout
title: TogglePanel
---

A sliding panel that animates open and closed from either the left or right edge. Content is projected inside and animated via the `panelToggle` state.

## When To Use
- When a secondary panel (filter pane, detail drawer, context actions) needs to slide in and out.
- When two regions should share screen space alternately instead of using a modal overlay.
- When the slide animation should be driven by a parent component rather than by an internal toggle.

## API

```html
<dx-toggle-panel [panelToggle]="state" direction="right">
  <p>Panel content goes here.</p>
</dx-toggle-panel>
```

### dx-toggle-panel

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[panelToggle]` | Current open/closed state of the panel (required) | `'open' \| 'close'` | - |
| `[direction]` | Edge the panel slides from (required) | `'right' \| 'left'` | - |

### Types

```typescript
type PANEL_TOGGLE    = 'open' | 'close';
type PANEL_DIRECTION = 'right' | 'left';
```

## Examples

### Right-side panel

```html
<button mat-button (click)="state = state === 'open' ? 'close' : 'open'">
  Toggle
</button>

<dx-toggle-panel [panelToggle]="state" direction="right">
  <h3>Filters</h3>
  <p>Panel body.</p>
</dx-toggle-panel>
```

### Left-side panel

```html
<dx-toggle-panel [panelToggle]="navState" direction="left">
  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/settings">Settings</a>
  </nav>
</dx-toggle-panel>
```

## Import

```typescript
import { DxTogglePanelModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxTogglePanelModule]
})
export class YourModule { }
```
