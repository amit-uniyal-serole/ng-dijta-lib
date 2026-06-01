# DxConfirm

A Material Dialog-based confirmation modal used internally by `DxButton` and openable directly via `MatDialog`.

## Overview

`DxConfirmComponent` renders a styled confirmation dialog with an optional header icon, title, message, and two action buttons (cancel and confirm). It is declared inside `DxButtonModule` and used automatically when `confirmationPopover.isShow` is `true` on a `<dx-button>`. It can also be opened directly using Angular Material's `MatDialog` service for standalone confirmation flows.

## Module

`DxConfirmComponent` is declared in `DxButtonModule`. Import `DxButtonModule` to make it available:

```typescript
import { DxButtonModule } from 'ng-dijta';

@NgModule({
  imports: [DxButtonModule]
})
```

To open it directly via `MatDialog`, also ensure `MatDialogModule` is imported in your module.

## Selector

`<dx-confirm>` (used as a dialog via `MatDialog.open()` — not typically placed directly in templates)

## Dialog Data Interface

The component receives its configuration through Angular Material's `MAT_DIALOG_DATA` injection token. Pass a `ConfirmationPopover`-shaped object when opening:

```typescript
interface DxConfirmData {
  header?: {
    title?: string;          // Dialog heading text
    closeIcon?: boolean;     // Show an X close icon in the top-right
    icon?: {
      isShow: boolean;       // Whether to show the icon circle
      icon?: string;         // Material Icons ligature name
      color?: string;        // Hex color for icon, border, and background (e.g. '#e53935')
    };
  };
  content: {
    message: string;         // Body message text
  };
  actions: {
    secondary: { title: string; }; // Cancel/dismiss button label
    primary:   { title: string; }; // Confirm/submit button label
  };
}
```

## API

### Inputs (via MAT_DIALOG_DATA)

| Property | Type | Description |
|----------|------|-------------|
| `data.header.title` | `string` | Optional dialog title displayed as a heading. |
| `data.header.closeIcon` | `boolean` | When `true`, renders an X icon that closes the dialog without confirming. |
| `data.header.icon.isShow` | `boolean` | Whether to render the header icon circle. |
| `data.header.icon.icon` | `string` | Material Icons ligature name for the header icon. |
| `data.header.icon.color` | `string` | Hex color applied to icon, border, and background (with opacity variants). |
| `data.content.message` | `string` | Confirmation message body text. |
| `data.actions.secondary.title` | `string` | Cancel button label. |
| `data.actions.primary.title` | `string` | Confirm button label. |

### Outputs (via MatDialogRef)

| Method | Returns | Description |
|--------|---------|-------------|
| `dialogRef.afterClosed()` | `Observable<boolean>` | Emits `true` when the user confirms (primary button), `false` when cancelled or dismissed. |

### Public Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `closeDialog(isConfirmed)` | `(isConfirmed: boolean): void` | Closes the dialog and emits the boolean result to `afterClosed()`. |

## Usage Examples

### Via dx-button (Recommended)

The simplest approach — `DxButton` handles opening and listening automatically:

```typescript
confirmationPopover: ConfirmationPopover = {
  isShow: true,
  header: {
    title: 'Delete Record',
    closeIcon: true,
    icon: { isShow: true, icon: 'warning', color: '#e53935' }
  },
  content: { message: 'This record will be permanently deleted.' },
  actions: {
    secondary: { title: 'Cancel' },
    primary:   { title: 'Delete' }
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

### Direct MatDialog Usage

```typescript
import { MatDialog } from '@angular/material/dialog';
import { DxConfirmComponent } from 'ng-dijta';

@Component({ ... })
export class MyComponent {
  constructor(private dialog: MatDialog) {}

  confirmAndDelete(): void {
    const dialogRef = this.dialog.open(DxConfirmComponent, {
      panelClass: ['lookout-modal-box'],
      id: 'confirm-dialog',
      data: {
        header: { title: 'Confirm Delete', closeIcon: true },
        content: { message: 'Are you sure?' },
        actions: {
          secondary: { title: 'Cancel' },
          primary:   { title: 'Confirm' }
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteRecord();
      }
    });
  }
}
```

## Features

- Material Dialog with `lookout-modal-box` panel class for consistent styling
- Optional header with title, close icon, and colored icon circle
- Hex-based icon coloring applied to icon, border, and background with opacity variants
- Boolean result via `MatDialogRef.afterClosed()` — `true` for confirm, `false` for cancel/dismiss
- Transloco i18n support on all text content (title, message, button labels)
- Used automatically by `DxButton` when `confirmationPopover.isShow` is `true`
