---
category: Components
type: Feedback
title: Upload File Popup
---

A modal dialog for selecting, validating, and confirming file attachments. Validates file size and extension, shows a summary table of chosen files, and returns the raw `FileList` on confirm.

## When To Use

- When file uploads must be confirmed in a dedicated dialog rather than inline.
- When uploaded files need pre-validation (size and extension) before being posted.
- When the user should review a list of selected files before committing.
- As a reusable popup opened via `MatDialog` from any feature module.

## API

```typescript
import { MatDialog } from '@angular/material/dialog';
import { DxUploadFilePopupComponent } from '@ngdx/dijta';

const ref = this.dialog.open(DxUploadFilePopupComponent, {
  width: '560px',
  data: {}
});
Object.assign(ref.componentInstance, {
  title: 'Upload Document',
  hint: 'PDF, JPG or PNG up to 15 MB',
  defaultFileSize: 15 * 1024 * 1024,
  fileFormat: ['pdf', 'jpg', 'png']
});

ref.afterClosed().subscribe((files: FileList | undefined) => {
  if (files) {
    this.upload(files);
  }
});
```

### dx-upload-file-popup

Properties are set directly on the component instance after opening via `MatDialog`; the component is not typically used as an inline selector.

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `title` | Dialog title | `string` | `'Upload File'` |
| `hint` | Helper text shown under the drop zone | `string` | - |
| `busy$` | Whether the dialog shows the busy indicator | `boolean` | - |
| `defaultFileSize` | Maximum file size in bytes | `number` | - |
| `fileFormat` | Allowed file extensions (without the dot), e.g. `['pdf','png']` | `string[]` | `[]` |
| `attachmentType` | Semantic type of the attachment (for caller context) | `string` | - |
| `files` | Internal array of file descriptors shown in the summary table | `fileObject[]` | `[]` |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `fileBrowseHandler` | Handles a file input `change` event and runs validation | `(event: Event) => void` |
| `uploadAttachment` | Closes the dialog and returns the selected `FileList` | `() => void` |
| `close` | Closes the dialog without returning a result | `() => void` |
| `formatBytes` | Formats a byte count into a human readable string | `(bytes: number, decimals?: number) => string` |

### Types

```typescript
interface fileObject {
  file_name: string;
  file_size: string;
  file_type: string;
}
```

## Examples

### Opening the popup

```typescript
openPopup(): void {
  const ref = this.dialog.open(DxUploadFilePopupComponent, { width: '560px' });
  Object.assign(ref.componentInstance, {
    title: 'Attach Document',
    defaultFileSize: 10 * 1024 * 1024,
    fileFormat: ['pdf', 'jpg', 'png']
  });
  ref.afterClosed().subscribe((files: FileList | undefined) => {
    if (files) {
      this.attach(files);
    }
  });
}
```

### Restricting to a single format

```typescript
Object.assign(ref.componentInstance, {
  title: 'Upload CSV',
  fileFormat: ['csv'],
  defaultFileSize: 2 * 1024 * 1024
});
```

## Import

```typescript
import { DxUploadFilePopupModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxUploadFilePopupModule]
})
export class YourModule { }
```
