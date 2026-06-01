---
category: Components
type: Navigation
title: Dropdown
---

A directive-driven dropdown primitive that opens a panel on click or hover. Built on Angular CDK `Overlay`; used to power menus, multi-action buttons, and custom popovers inside the library.

## When To Use

- Attaching a menu or contextual panel to a trigger element.
- Building custom floating panels where `mat-menu` is too opinionated.
- Driving hover-open behavior (submenus, nested flyouts).
- Appending overlay content to the document body to escape overflow clipping.

## API

```html
<div dDropDown #dd="d-dropdown" trigger="click">
  <button dDropDownToggle mat-button>Menu</button>
  <ul dDropDownMenu>
    <li dDropDownMenuItem>Action 1</li>
    <li dDropDownMenuItem>Action 2</li>
  </ul>
</div>
```

### [dDropDown]

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[isOpen]` | Controls open/closed state | `boolean` | `false` |
| `[disabled]` | Disable trigger interactions | `boolean` | `false` |
| `[showAnimation]` | Animate open/close | `boolean` | `true` |
| `[trigger]` | Interaction that opens the panel | `'click' \| 'hover' \| 'manually'` | `'click'` |
| `[closeScope]` | Which outside clicks close it | `'all' \| 'blank' \| 'none'` | `'all'` |
| `[closeOnMouseLeaveMenu]` | Close when pointer leaves the menu | `boolean` | `false` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(toggleEvent)` | Emitted when open state changes | `EventEmitter<boolean>` |

### [dDropDown][appendToBody]

Variant that renders the menu through a CDK overlay attached to the document body.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[alignOrigin]` | Element to anchor the overlay to | `ElementRef` | - |
| `[appendToBodyDirections]` | Preferred open directions | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` |
| `[appendToBodyScrollStrategy]` | CDK scroll strategy name | `AppendToBodyScrollStrategyType` | - |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `toggle()` | Flip the open state | `(): boolean` |
| `focusToggleElement()` | Focus the associated toggle element | `(): void` |
| `updateCdkConnectedOverlayOrigin()` | Recompute overlay origin when toggle moves | `(): void` |

### [dDropDownToggle]

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[toggleOnFocus]` | Open when the toggle is focused | `boolean` | `false` |
| `[autoFocus]` | Focus the toggle after view init | `boolean` | `false` |

## Examples

### Click-triggered menu

```html
<div dDropDown trigger="click">
  <button dDropDownToggle mat-stroked-button>Actions</button>
  <ul dDropDownMenu class="dx-menu">
    <li dDropDownMenuItem (click)="onEdit()">Edit</li>
    <li dDropDownMenuItem (click)="onDelete()">Delete</li>
  </ul>
</div>
```

### Hover-triggered, appended to body

```html
<div dDropDown appendToBody trigger="hover"
     [appendToBodyDirections]="['rightDown', 'leftDown']">
  <button dDropDownToggle mat-icon-button aria-label="More">
    <mat-icon aria-hidden="true">more_vert</mat-icon>
  </button>
  <ul dDropDownMenu>
    <li dDropDownMenuItem>Rename</li>
    <li dDropDownMenuItem>Archive</li>
  </ul>
</div>
```

### Programmatic control

```html
<div dDropDown #dd="d-dropdown" trigger="manually" [isOpen]="open">
  <button dDropDownToggle mat-button (click)="dd.toggle()">Toggle</button>
  <div dDropDownMenu>Panel content</div>
</div>
```

## Import

```typescript
import { DropDownModule } from '@ngdx/dijta';

@NgModule({ imports: [DropDownModule] })
export class YourModule { }
```
