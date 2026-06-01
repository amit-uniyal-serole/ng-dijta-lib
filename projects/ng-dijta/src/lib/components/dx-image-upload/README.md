---
category: Components
type: Data Entry
title: Image Upload
---

Image and file uploader with drag-and-drop, preview, optional cropping (via `cropperjs`) and a pluggable HTTP adapter for upload / download / delete. Supports single and multi-file modes and validates size, count and extensions.

## When To Use

- When a form collects user-uploaded images or documents.
- When uploaded files should be cropped before being sent to the server.
- When the API layer for upload / remove varies across apps and needs an adapter.
- Use the `v1` variant for a standard tile layout; the module also exports input and popup variants for contextual flows.

## API

```html
<dx-image-upload-v1
  [adapterData]="adapterData"
  [uploadType]="'multi'"
  [fileMaxCount]="5"
  [fileMaxSize]="10"
  [fileTypes]="['image/png','image/jpeg']"
  (fileAdded)="onAdded($event)"
  (fileRemoved)="onRemoved($event)">
</dx-image-upload-v1>
```

### dx-image-upload-v1

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[files]` | Pre-populated file list rendered on init | `FilePreviewModel[]` | `[]` |
| `[enableCropper]` | Show cropper after image selection | `boolean` | `false` |
| `[uploadType]` | Single- or multi-file mode | `'single' \| 'multi'` | `'multi'` |
| `[totalMaxSize]` | Combined max size of all files in MB | `number` | - |
| `[fileMaxCount]` | Max number of files allowed | `number` | - |
| `[fileMaxSize]` | Max size per file in MB | `number` | - |
| `[fileTypes]` | Allowed MIME types | `string[]` | `[]` |
| `[accept]` | Native `accept` attribute value | `string` | - |
| `[enableAutoUpload]` | Automatically upload files through the adapter after selection | `boolean` | `true` |
| `[adapterData]` | HTTP URLs and payload used by the built-in uploader adapter | `AdapterDataModel` | - |
| `[cropperOptions]` | Options forwarded to `cropperjs` | `object` | `{ minContainerWidth: '300', minContainerHeight: '300' }` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(fileAdded)` | Emitted after validation when a file is added to the list | `EventEmitter<FilePreviewModel>` |
| `(fileRemoved)` | Emitted when a file is removed from the list | `EventEmitter<FilePreviewModel>` |
| `(validationError)` | Emitted on validation failure | `EventEmitter<string>` |

### Types

```typescript
interface AdapterDataModel {
  downloadUrl?:    string;
  uploadUrl:       string;
  removeFileUrl?:  string;
  thumbnailUrl?:   string;
  payload?: { [key: string]: any };
  params?:  { [key: string]: any };
}

interface FilePreviewModel {
  file:      File;
  fileName:  string;
  pkId?:     number | string;
}

type DxFileUploadType = 'multi' | 'single';
```

### Additional variants (exported by the module)

| Selector | Purpose |
|----------|---------|
| `dx-image-upload-v1` | Standard tile with drop zone + preview list |
| `dx-image-input` | Compact inline input-style uploader |
| `dx-impage-upload-popup` | Dialog variant to be opened inside `MatDialog` |
| `dx-awesome-uploader` | Low-level `FilePickerComponent` consumed by the variants |

## Examples

### Multi-file upload

```typescript
adapterData: AdapterDataModel = {
  uploadUrl:     '/api/files',
  removeFileUrl: '/api/files/{id}'
};
```

```html
<dx-image-upload-v1
  [adapterData]="adapterData"
  [fileMaxCount]="5"
  [fileMaxSize]="10"
  [fileTypes]="['image/png', 'image/jpeg']"
  (fileAdded)="onAdded($event)"
  (fileRemoved)="onRemoved($event)">
</dx-image-upload-v1>
```

### Single image with cropper

```html
<dx-image-upload-v1
  [adapterData]="adapterData"
  [uploadType]="'single'"
  [enableCropper]="true"
  [cropperOptions]="{ aspectRatio: 1, viewMode: 1 }"
  (fileAdded)="onAdded($event)">
</dx-image-upload-v1>
```

## Import

```typescript
import { DxImageUploadModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxImageUploadModule]
})
export class YourModule { }
```
