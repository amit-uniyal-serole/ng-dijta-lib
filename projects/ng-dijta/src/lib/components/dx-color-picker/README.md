---
category: Components
type: Data Entry
title: Color Picker
---

A color picker panel that attaches to a trigger element via the `dxColorsTrigger` directive and displays a color-picking UI. The selected color is synchronized two-way through the trigger directive.

## When To Use

- When users need to select a custom color (hex, rgb, hsl) from a visual picker.
- When the picker should appear anchored to a trigger element (button, swatch, input).
- For a preset palette only, consider building a simpler chip list instead.

## API

```html
<button dxColorsTrigger [(color)]="selectedColor">
  <dx-colors></dx-colors>
</button>
```

### dx-colors

The `<dx-colors>` component is projected inside an element that has the `dxColorsTrigger` directive applied. The directive owns the current color value; the component reacts to changes and renders the picker panel.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `color` | Current color value, read from the host `dxColorsTrigger` directive | `string` | `-` |

### dxColorsTrigger (directive)

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[color]` | Two-way bound color value (hex / rgb / hsl string) | `string` | `-` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(colorChange)` | Emitted when the selected color changes (two-way-binding output) | `EventEmitter<string>` |

## Examples

### Basic trigger + picker

```typescript
selectedColor = '#1976d2';
```

```html
<button dxColorsTrigger [(color)]="selectedColor" class="color-swatch">
  <span [style.background]="selectedColor"></span>
  <dx-colors></dx-colors>
</button>
```

### React to color changes

```html
<div
  dxColorsTrigger
  [color]="themeColor"
  (colorChange)="applyTheme($event)">
  <dx-colors></dx-colors>
</div>
```

## Import

```typescript
import { DxColorsModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxColorsModule]
})
export class YourModule { }
```
