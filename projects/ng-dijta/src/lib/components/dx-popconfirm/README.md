# DxPopconfirm

An overlay-based popconfirm directive (work in progress — currently disabled).

## Overview

`DxPopconfirmModule` is an infrastructure module for a popconfirm overlay trigger. The component and directive declarations are currently commented out pending completion. The module imports CDK Overlay, Bidirectional layout, accessibility, and internal overlay utilities. Once released, it will provide an inline confirmation popover that can be attached to any host element via directive.

For a working inline confirmation today, use the `confirmationPopover` input on `<dx-button>`, which uses `DxConfirmComponent` as a Material dialog.

## Module Import

```typescript
import { DxPopconfirmModule } from 'ng-dijta';

@NgModule({
  imports: [DxPopconfirmModule]
})
```

## Status

> **Work in progress.** The `NzPopconfirmComponent` and `NzPopconfirmDirective` are defined but not yet exported from this module. No public API is available at this time.

## Alternative

Use the `confirmationPopover` input of `<dx-button>` for immediate inline confirmation functionality:

```typescript
confirmationPopover: ConfirmationPopover = {
  isShow: true,
  header: { title: 'Confirm Action', closeIcon: true },
  content: { message: 'Are you sure you want to proceed?' },
  actions: {
    secondary: { title: 'Cancel' },
    primary:   { title: 'Confirm' }
  }
};
```

```html
<dx-button
  title="Delete"
  [confirmationPopover]="confirmationPopover"
  (onActionSelect)="onDelete()">
</dx-button>
```

See the [dx-button README](../dx-button/README.md) for the full confirmation popover API.
