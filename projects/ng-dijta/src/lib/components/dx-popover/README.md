---
category: Components
type: Data Display
title: Popover
---

A floating panel that displays content anchored to a trigger element. Exposes both a directive (`[dx-popover]`) for attaching to any element and a component (`dx-popover`) rendered internally via CDK overlay, with optional title, action buttons, and close icon.

## When To Use

- When additional information or actions should be shown without navigating away from the current context.
- When hover/click-triggered secondary content is needed for help, previews, or quick forms.
- When a confirmation or lightweight form panel should float over the existing UI.
- Prefer `matTooltip` for short, text-only hints.

## API

```html
<button
  dx-popover
  dxPopoverTitle="Title"
  dxPopoverContent="Content text"
  dxPopoverTrigger="hover"
  dxPopoverPlacement="top">
  Hover me
</button>
```

### [dx-popover]

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dx-popover]` | Title shown when no `dxPopoverTitle` is set | `string \| TemplateRef<void>` | - |
| `[dxPopoverTitle]` | Popover header title | `string \| TemplateRef<void>` | - |
| `[dxPopoverContent]` | Popover body content | `string \| TemplateRef<void>` | - |
| `[dxPopoverTrigger]` | How the popover is opened | `'hover' \| 'focus' \| 'click' \| null` | `'hover'` |
| `[dxPopoverPlacement]` | Position relative to the origin | `string \| string[]` | `'top'` |
| `[dxPopoverOrigin]` | Element the popover should be anchored to | `ElementRef<HTMLElement>` | - |
| `[dxPopoverVisible]` | Controls visibility manually | `boolean` | - |
| `[dxPopoverMouseEnterDelay]` | Delay before opening on hover (s) | `number` | - |
| `[dxPopoverMouseLeaveDelay]` | Delay before closing on hover (s) | `number` | - |
| `[dxPopoverOverlayClassName]` | CSS class applied to the overlay | `string` | - |
| `[dxPopoverOverlayStyle]` | Inline styles applied to the overlay | `NgStyleInterface` | - |
| `[dxPopoverArrowPointAtCenter]` | Align the arrow with the center of the origin | `boolean` | `false` |
| `[dxPopoverBackdrop]` | Show a backdrop when trigger is `'click'` | `boolean` | `false` |
| `[dxPopoverContentContext]` | Context object for a content `TemplateRef` | `Object \| null` | `null` |
| `[dxPopoverTitleContext]` | Context object for a title `TemplateRef` | `Object \| null` | `null` |
| `[dxActionButton]` | Action buttons (primary/secondary) in the footer | `Actions` | - |
| `[dxHeader]` | Header configuration (close icon, etc.) | `Header` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(dxPopoverVisibleChange)` | Emitted when visibility changes | `EventEmitter<boolean>` |
| `(sendDetailData)` | Emitted when the primary action button is clicked | `EventEmitter<any>` |

### Types

```typescript
interface Actions {
  primary:   { title: string };
  secondary: { title: string };
}
```

## Examples

### Basic hover popover

```html
<button
  dx-popover
  dxPopoverTitle="Help"
  dxPopoverContent="This field is required for registration.">
  ?
</button>
```

### Click-triggered with action buttons

```typescript
popoverActions = {
  primary:   { title: 'Confirm' },
  secondary: { title: 'Cancel' }
};
```

```html
<button
  dx-popover
  dxPopoverTrigger="click"
  dxPopoverTitle="Confirm action"
  dxPopoverContent="Are you sure you want to continue?"
  [dxActionButton]="popoverActions"
  (sendDetailData)="onConfirm()">
  Continue
</button>
```

### With custom placement and close icon

```html
<button
  dx-popover
  dxPopoverPlacement="right"
  dxPopoverTitle="Details"
  dxPopoverContent="Additional information about this record."
  [dxHeader]="{ closeIcon: true }">
  Info
</button>
```

## Import

```typescript
import { DxPopoverModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxPopoverModule]
})
export class YourModule { }
```
