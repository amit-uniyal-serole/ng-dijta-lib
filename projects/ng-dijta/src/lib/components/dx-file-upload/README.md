---
category: Components
type: Data Entry
title: File Upload
---

A drag-and-drop file upload component with validation, previews and support for single or multiple selection. Integrates with Angular Reactive Forms through a `FileUploadControl` instance.

## When To Use

- When users need to upload one or more files (documents, archives, media) with drag-and-drop support.
- When file selection requires validation (size, count, accepted types / extensions).
- Use the **simple** variant for a minimal button-driven upload with no drop zone.
- Use the **multiple** variant for a full drag-and-drop surface with file list and animations.

## API

```html
<file-upload [control]="fileUploadControl"></file-upload>
```

The library exposes two components sharing one host element:

| Selector | Component |
|----------|-----------|
| `file-upload:not([simple])` | `FileUploadComponent` (drag-and-drop + list) |
| `file-upload[simple]` | `SimpleFileUploadComponent` (button only) |

### file-upload

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[control]` | File upload control instance carrying files, validators and state | `FileUploadControl` | new `FileUploadControl()` |
| `[animation]` | Enable / disable internal zoom and list animations | `boolean \| string` | `true` |
| `[multiple]` | Whether multiple files can be selected | `boolean \| string` | `true` |
| `[tabIndex]` | Tab index for the underlying input | `number` | - |
| `[simple]` (attribute selector) | Renders the minimal simple variant | `boolean` | `false` |

### Content Slots

| Slot | Description |
|------|-------------|
| `#placeholder` | Template for the drop-zone placeholder (inside `<file-upload>`) |
| `#item` | Template for each uploaded file row |
| `#button` | Template for the trigger button (simple variant) |

### Methods

`FileUploadControl` exposes an RxJS-driven API:

| Method | Description |
|--------|-------------|
| `addFiles(files: FileList \| File[])` | Add files through code |
| `setValue(files: File[])` | Replace the current file list |
| `removeFile(file: File)` | Remove a specific file |
| `clear()` | Remove all files |
| `enable()` / `disable(isDisabled?: boolean)` | Toggle disabled state |
| `multiple(isMultiple: boolean)` | Toggle multi-file mode |
| `setValidators(validators: ValidatorFn[])` | Attach validators |

Observable streams: `valueChanges`, `statusChanges`, `eventsChanges`, `acceptChanges`, `multipleChanges`.

### Directives (exported by the module)

| Directive | Description |
|-----------|-------------|
| `filesAccept` | Declarative wrapper for the `accept` attribute |
| `FileSizeValidator` | Per-file max size validator |
| `FilesLimitValidator` | Maximum number of files validator |
| `FilesAcceptValidator` | Accepted MIME / extension validator |

## Examples

### Basic drag-and-drop

```typescript
fileUploadControl = new FileUploadControl();
```

```html
<file-upload [control]="fileUploadControl"></file-upload>
```

### Simple button variant

```html
<file-upload simple [control]="fileUploadControl">
  <ng-template #button>Choose file</ng-template>
</file-upload>
```

### With validators

```typescript
fileUploadControl = new FileUploadControl()
  .setValidators([
    FileUploadValidators.accept(['image/png', 'image/jpeg']),
    FileUploadValidators.fileSize(5 * 1024 * 1024),
    FileUploadValidators.filesLimit(3),
  ]);
```

```html
<file-upload [control]="fileUploadControl" accept="image/*"></file-upload>
```

### Single file mode

```html
<file-upload [control]="fileUploadControl" [multiple]="false"></file-upload>
```

## Import

```typescript
import { DxFileUploadModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxFileUploadModule]
})
export class YourModule { }
```
