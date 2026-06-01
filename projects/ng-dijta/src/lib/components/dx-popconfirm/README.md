---
category: Components
type: Feedback
title: Popconfirm
---

A compact confirmation prompt anchored to a trigger element. The module re-exports CDK overlay, outlet, and no-animation primitives to support confirmation popovers throughout the library.

## When To Use

- When an action is potentially destructive or irreversible and a lightweight inline confirmation is preferred over a full modal dialog.
- When the confirmation can be expressed in a single sentence with simple accept/decline actions.
- Prefer `dx-popover` or `dx-button`'s built-in `confirmationPopover` configuration to render confirmation UI today.

## API

```html
<!-- Confirmation UI is typically driven via dx-popover or dx-button [confirmationPopover] -->
<dx-button
  title="Delete"
  [confirmationPopover]="confirmConfig"
  (onActionSelect)="onDelete()">
</dx-button>
```

### DxPopconfirmModule

This module provides the infrastructure (CDK overlay, outlet, and no-animation directives) used by confirmation flows in the library. It does not currently declare a public component directly — use it in combination with `DxPopoverModule` or `DxButtonModule`.

## Examples

### Using a confirmation popover on a button

```typescript
confirmConfig: ConfirmationPopover = {
  isShow: true,
  header: {
    title: 'Delete Item',
    closeIcon: true,
    icon: { isShow: true, icon: 'warning', color: '#ff0000' }
  },
  content: { message: 'Are you sure you want to delete this item?' },
  actions: {
    confirm: { label: 'Delete', color: 'warn' },
    cancel:  { label: 'Cancel' }
  }
};
```

```html
<dx-button
  title="Delete"
  class="secondary-btn"
  [confirmationPopover]="confirmConfig"
  (onActionSelect)="onDelete()">
</dx-button>
```

### Using a popover as a confirmation surface

```html
<button
  dx-popover
  dxPopoverTitle="Confirm"
  dxPopoverContent="Proceed with this action?"
  dxPopoverTrigger="click"
  [dxActionButton]="{ primary: { title: 'Yes' }, secondary: { title: 'No' } }"
  (sendDetailData)="onConfirm()">
  Submit
</button>
```

## Import

```typescript
import { DxPopconfirmModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxPopconfirmModule]
})
export class YourModule { }
```
