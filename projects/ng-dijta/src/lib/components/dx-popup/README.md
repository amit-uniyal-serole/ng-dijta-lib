---
category: Components
type: Feedback
title: Popup
---

A simple dialog component opened via `MatDialog` that displays a translated title and a bulleted list of descriptive lines with a close icon.

## When To Use

- When showing a quick informational popup with a title and a list of instructions or bullet points.
- When the content is short enough that a full page or form is unnecessary.
- Prefer `MatDialog` with a custom template for rich, form-driven dialogs.

## API

```typescript
const ref = this.dialog.open(DxPopupComponent, {
  width: '480px'
});
ref.componentInstance.title = 'dx.popup.instructions.title';
ref.componentInstance.description = ['First bullet', 'Second bullet'];
```

### dx-popup

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `title` | Translation key (or literal) displayed as the dialog title | `string` | - |
| `description` | Lines rendered as an ordered list in the dialog body | `string[]` | - |

### Methods

| Method | Description |
|--------|-------------|
| `onClose()` | Closes the dialog. |
| `onKeyDown(event)` | Handles `Enter` / `Space` on the close icon to dismiss. |

## Examples

### Opening the popup

```typescript
import { MatDialog } from '@angular/material/dialog';
import { DxPopupComponent } from '@ngdx/dijta';

constructor(private readonly dialog: MatDialog) {}

showInstructions(): void {
  const ref = this.dialog.open(DxPopupComponent, { width: '480px' });
  ref.componentInstance.title = 'dx.popup.instructions.title';
  ref.componentInstance.description = [
    'Upload a clear copy of the document.',
    'Ensure all fields are filled in.',
    'Submit the form when complete.'
  ];
}
```

### With a translation key

```typescript
ref.componentInstance.title = 'dx.popup.termsAndConditions';
ref.componentInstance.description = [
  'Read all terms carefully.',
  'Contact support if anything is unclear.'
];
```

## Import

```typescript
import { DxPopupComponent } from '@ngdx/dijta';

@NgModule({
  imports: [/* MatDialogModule */]
})
export class YourModule { }
```
