---
category: Components
type: Data Display
title: Tooltip
---

A small contextual overlay that shows additional information on hover, focus, or click. Applied as an attribute directive on any host element and backed by an overlay component that handles positioning, animation, and RTL.

## When To Use
- When a control needs a short hint that does not fit in the visible UI.
- When icon-only buttons need a label visible to sighted users on hover.
- When help text should appear near a trigger without stealing layout space.
- When the text must be translatable or bound to a dynamic string.

## API

```html
<button mat-icon-button dx-tooltip="Save changes">
  <mat-icon aria-hidden="true">save</mat-icon>
</button>
```

### [dx-tooltip]

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dx-tooltip]` | Shorthand tooltip title (string or template) | `string \| TemplateRef<void> \| null` | - |
| `[dxTooltipTitle]` | Tooltip title (takes precedence over the shorthand) | `string \| TemplateRef<void> \| null` | - |
| `[dxTooltipTitleContext]` | Context object forwarded to a title template | `Object \| null` | `null` |
| `[dxTooltipTrigger]` | Event that opens the tooltip; `null` for programmatic control | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[dxTooltipPlacement]` | Overlay placement(s) (fallbacks allowed) | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| string[]` | `'top'` |
| `[dxTooltipOrigin]` | Alternate origin element to anchor the overlay to | `ElementRef<HTMLElement>` | host element |
| `[dxTooltipVisible]` | Controlled visibility flag | `boolean` | - |
| `[dxTooltipMouseEnterDelay]` | Delay before showing on hover (seconds) | `number` | `0.15` |
| `[dxTooltipMouseLeaveDelay]` | Delay before hiding after hover-out (seconds) | `number` | `0.1` |
| `[dxTooltipOverlayClassName]` | Extra CSS class applied to the overlay | `string` | - |
| `[dxTooltipOverlayStyle]` | Extra inline styles applied to the overlay | `NgStyleInterface` | - |
| `[dxTooltipArrowPointAtCenter]` | Align the arrow with the origin's center | `boolean` | `false` |
| `[dxTooltipColor]` | Background color (preset keyword or CSS color) | `string` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(dxTooltipVisibleChange)` | Emitted when the tooltip opens or closes | `EventEmitter<boolean>` |

### Methods

Available on the exported directive reference (`#tip="dxTooltip"`):

| Method | Description |
|--------|-------------|
| `show()` | Programmatically show the tooltip |
| `hide()` | Programmatically hide the tooltip |
| `updatePosition()` | Recalculate the overlay position |

## Examples

### Hover trigger (default)

```html
<button mat-button dx-tooltip="More information">Info</button>
```

### Placement and color

```html
<button
  mat-icon-button
  dx-tooltip="Delete"
  dxTooltipPlacement="bottom"
  dxTooltipColor="red">
  <mat-icon aria-hidden="true">delete</mat-icon>
</button>
```

### Click trigger with programmatic control

```html
<button
  #tip="dxTooltip"
  mat-button
  [dx-tooltip]="'Click to read the full text'"
  dxTooltipTrigger="click">
  Help
</button>

<button mat-button (click)="tip.show()">Show tooltip</button>
<button mat-button (click)="tip.hide()">Hide tooltip</button>
```

### Template content

```html
<ng-template #tipContent>
  <strong>Pro tip</strong>
  <p>You can drag to reorder.</p>
</ng-template>

<button mat-button [dxTooltipTitle]="tipContent">Reorder</button>
```

### Translated text

```html
<button
  mat-icon-button
  [attr.aria-label]="'dx.aria.close' | transloco"
  [dx-tooltip]="'dx.aria.close' | transloco">
  <mat-icon aria-hidden="true">close</mat-icon>
</button>
```

## Import

```typescript
import { DxToolTipModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxToolTipModule]
})
export class YourModule { }
```
