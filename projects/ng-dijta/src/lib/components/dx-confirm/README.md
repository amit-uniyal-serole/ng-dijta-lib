---
category: Components
type: Feedback
title: Confirm Dialog
---

An opinionated confirmation dialog content component designed to be opened via `MatDialog`. Renders an icon, title, message, and primary/secondary action buttons from a structured `data` payload, closing the dialog with a boolean result.

## When To Use

- When you need to confirm a destructive or irreversible action (delete, discard, sign out).
- As the content component for a `MatDialog` opened from buttons, menus, or row actions.
- When `dx-button`'s built-in `confirmationPopover` is not appropriate (e.g., triggered outside a button).

## API

```typescript
this.dialog.open(DxConfirmComponent, {
  data: {
    header: {
      title: 'Confirm Delete',
      closeIcon: true,
      icon: { isShow: true, icon: 'warning', color: '#d32f2f' }
    },
    content: { message: 'Are you sure you want to delete this record?' },
    actions: {
      primary:   { title: 'Delete' },
      secondary: { title: 'Cancel' }
    }
  }
}).afterClosed().subscribe((confirmed: boolean) => {
  if (confirmed) { this.delete(); }
});
```

### dx-confirm

This component is not placed in a template directly; open it via `MatDialog.open(DxConfirmComponent, { data })`.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `data` | Dialog payload (injected via `MAT_DIALOG_DATA`) | `DxConfirmData` | `-` |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `closeDialog` | Closes the dialog, emitting the confirmation result | `closeDialog(isConfirmed: boolean): void` |

### Types

```typescript
interface DxConfirmData {
  header?: {
    title?: string;
    closeIcon?: boolean;
    icon?: { isShow: boolean; icon?: string; color?: string };
  };
  content: { message: string };
  actions: {
    primary:   { title: string };
    secondary: { title: string };
  };
}
```

## Examples

### Open from a service

```typescript
confirmDelete(): Observable<boolean> {
  return this.dialog.open(DxConfirmComponent, {
    data: {
      header: { title: 'Delete item?', closeIcon: true },
      content: { message: 'This action cannot be undone.' },
      actions: {
        primary:   { title: 'Delete' },
        secondary: { title: 'Cancel' }
      }
    }
  }).afterClosed();
}
```

### Warning variant with icon

```typescript
this.dialog.open(DxConfirmComponent, {
  data: {
    header: {
      title: 'Sign out?',
      icon: { isShow: true, icon: 'logout', color: '#f57c00' }
    },
    content: { message: 'You will need to sign in again to continue.' },
    actions: {
      primary:   { title: 'Sign out' },
      secondary: { title: 'Stay signed in' }
    }
  }
});
```

## Import

`DxConfirmComponent` is exported from the library and opened via `MatDialog`. Ensure `MatDialogModule` is available in the application.

```typescript
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DxConfirmComponent } from '@ngdx/dijta';

@NgModule({
  imports: [MatDialogModule]
})
export class YourModule { }
```
