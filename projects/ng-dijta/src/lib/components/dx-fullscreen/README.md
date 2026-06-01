---
category: Components
type: Layout
title: Fullscreen
---

Wraps an arbitrary element and provides a click-to-toggle fullscreen control. Supports both the browser's native Fullscreen API (*immersive*) and a CSS-based full-viewport mode (*normal*), and honours `Escape` to exit.

## When To Use

- When a chart, table, image or pane benefits from temporarily filling the viewport.
- Use *immersive* mode for true browser fullscreen.
- Use *normal* mode when you need to stay inside the app chrome (header / sidebar remain rendered).
- Use `beforeChange` to ask the user to confirm or to veto the transition.

## API

```html
<dx-fullscreen mode="immersive" (fullscreenLaunch)="onToggle($event)">
  <div fullscreen-target>...content...</div>
  <button fullscreen-launch>Toggle</button>
</dx-fullscreen>
```

The component looks for two attribute markers inside its projected content:

- `fullscreen-target` — the element that becomes fullscreen.
- `fullscreen-launch` — the element whose click toggles fullscreen.

### dx-fullscreen

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[mode]` | Fullscreen implementation | `'immersive' \| 'normal'` | `'immersive'` |
| `[zIndex]` | z-index applied to the target in *normal* mode | `number` | `10` |
| `[container]` | Optional host element that receives a `dx-container-fullscreen` class instead of `<html>` | `HTMLElement` | - |
| `[beforeChange]` | Guard hook; return `false` to cancel the transition | `(isFullscreen: boolean, trigger: string) => boolean \| Promise<boolean> \| Observable<boolean>` | - |
| `[target]` | **Deprecated** — use the `fullscreen-target` attribute marker instead | `HTMLElement` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(fullscreenLaunch)` | Emitted whenever fullscreen state changes with `{ isFullscreen: boolean }` | `EventEmitter<{ isFullscreen: boolean }>` |

### Types

```typescript
type FullscreenMode = 'immersive' | 'normal';
```

## Examples

### Immersive (browser fullscreen)

```html
<dx-fullscreen mode="immersive">
  <div fullscreen-target class="chart-wrapper">
    <my-chart></my-chart>
  </div>
  <button fullscreen-launch mat-icon-button aria-label="Fullscreen">
    <mat-icon aria-hidden="true">fullscreen</mat-icon>
  </button>
</dx-fullscreen>
```

### Normal (in-app fullscreen)

```html
<dx-fullscreen mode="normal" [zIndex]="1000">
  <div fullscreen-target class="panel">
    <h2>Report</h2>
    <my-report></my-report>
  </div>
  <button fullscreen-launch>Expand</button>
</dx-fullscreen>
```

### Guarded transition

```typescript
beforeChange = (isFullscreen: boolean): boolean => {
  if (isFullscreen && this.hasUnsavedChanges) {
    return confirm('Exit fullscreen and discard unsaved changes?');
  }
  return true;
};
```

```html
<dx-fullscreen
  mode="immersive"
  [beforeChange]="beforeChange"
  (fullscreenLaunch)="isFull = $event.isFullscreen">
  <div fullscreen-target>...</div>
  <button fullscreen-launch>Toggle</button>
</dx-fullscreen>
```

## Import

```typescript
import { DxFullscreenModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxFullscreenModule]
})
export class YourModule { }
```
