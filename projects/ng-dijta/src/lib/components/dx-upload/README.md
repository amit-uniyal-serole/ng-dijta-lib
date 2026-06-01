---
category: Components
type: Data Entry
title: Upload
---

A flexible file uploader that supports click and drag-and-drop modes, multiple list appearances (text / picture / picture-card), client-side filters (size, type, count), before-upload hooks, and custom XHR transport.

## When To Use

- When users need to attach one or many files to a form or workflow.
- When uploaded files must be validated (size, type, count) before transport.
- When the upload transport is non-standard and needs a `customRequest`.
- When a list of uploaded files (with preview / remove / download) must be shown inline.
- For drag-and-drop zones in document-heavy flows.

## API

```html
<dx-upload
  dxType="select"
  dxAction="/api/upload"
  [dxMultiple]="true"
  [dxLimit]="5"
  [dxSize]="1024"
  [(dxFileList)]="fileList"
  (dxChange)="onChange($event)">
</dx-upload>
```

### dx-upload

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[dxType]` | Upload trigger type | `'select' \| 'drag'` | `'select'` |
| `[dxListType]` | Built-in list appearance | `'text' \| 'picture' \| 'picture-card' \| 'multioption'` | `'text'` |
| `[dxAction]` | Upload URL or a function returning a URL | `string \| (file: DxUploadFile) => string \| Observable<string>` | - |
| `[dxAccept]` | Accepted MIME types / extensions | `string \| string[]` | - |
| `[dxFileType]` | Comma-separated list of allowed MIME types for the type filter | `string` | - |
| `[dxName]` | Form field name used when posting | `string` | `'file'` |
| `[dxMultiple]` | Allow selecting multiple files | `boolean` | `false` |
| `[dxLimit]` | Maximum number of files kept (when `dxMultiple` is `true`) | `number` | `0` |
| `[dxSize]` | Maximum file size in KB | `number` | `0` |
| `[dxFileMaxCount]` | Hard cap enforced by the button | `number` | - |
| `[dxDirectory]` | Allow directory selection | `boolean` | `false` |
| `[dxOpenFileDialogOnClick]` | Open the native picker on click | `boolean` | `true` |
| `[dxDisabled]` | Disable the uploader | `boolean` | `false` |
| `[dxWithCredentials]` | Send credentials with XHR | `boolean` | `false` |
| `[dxShowButton]` | Render the upload button | `boolean` | `true` |
| `[dxShowUploadList]` | Show the list of uploaded files (or per-action flags) | `boolean \| DxShowUploadList` | `true` |
| `[dxData]` | Extra form fields sent with the request | `object \| (file) => object \| Observable<object>` | - |
| `[dxHeaders]` | HTTP headers sent with the request | `object \| (file) => object \| Observable<object>` | - |
| `[dxFileList]` | Current list of files (two-way) | `DxUploadFile[]` | `[]` |
| `[dxFilter]` | Custom client-side filters | `UploadFilter[]` | `[]` |
| `[dxBeforeUpload]` | Guard called before each upload; return `false` to cancel | `(file, fileList) => boolean \| Observable<boolean>` | - |
| `[dxCustomRequest]` | Replace the built-in XHR with a custom transport | `(item: DxUploadXHRArgs) => Subscription` | - |
| `[dxRemove]` | Guard called before removing a file | `(file) => boolean \| Observable<boolean>` | - |
| `[dxPreview]` | Preview handler invoked on list preview icon | `(file) => void` | - |
| `[dxDownload]` | Download handler invoked on list download icon | `(file) => void` | - |
| `[dxTransformFile]` | Transform the file before upload | `(file) => DxUploadTransformFileType` | - |
| `[dxIconRender]` | Custom icon template for list items | `TemplateRef<{ $implicit: DxUploadFile }>` | `null` |
| `[dxFileListRender]` | Custom template for the whole list | `TemplateRef<{ $implicit: DxUploadFile[] }>` | `null` |
| `[dxUploadAction]` | Extra action entries shown alongside the uploader | `DxUploadAction[]` | `[{ label: 'WorkDrive', event: 'WORKDRIVE' }]` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(dxChange)` | Emitted on start / progress / success / error / removed | `EventEmitter<DxUploadChangeParam>` |
| `(dxFileListChange)` | Emitted when the file list changes | `EventEmitter<DxUploadFile[]>` |
| `(dxOtherAction)` | Emitted when a custom `dxUploadAction` entry is clicked | `EventEmitter<DxUploadAction>` |

### Types

```typescript
type DxUploadType = 'select' | 'drag';
type DxUploadListType = 'text' | 'picture' | 'picture-card' | 'multioption';
type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

interface DxUploadFile {
  uid: string;
  name: string;
  filename?: string;
  size?: number;
  type?: string;
  status?: UploadFileStatus;
  percent?: number;
  url?: string;
  thumbUrl?: string;
  originFileObj?: File;
  response?: any;
  error?: any;
}

interface DxUploadChangeParam {
  file: DxUploadFile;
  fileList: DxUploadFile[];
  event?: { percent: number };
  type?: string;
}

interface DxShowUploadList {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
}

interface UploadFilter {
  name: string;
  fn(fileList: DxUploadFile[]): DxUploadFile[] | Observable<DxUploadFile[]>;
}
```

## Examples

### Basic

```html
<dx-upload
  dxAction="/api/upload"
  (dxChange)="onChange($event)">
</dx-upload>
```

### Drag and drop

```html
<dx-upload
  dxType="drag"
  dxAction="/api/upload"
  [dxMultiple]="true"
  (dxChange)="onChange($event)">
  <p class="dx-upload-drag-icon"><i class="dx-icon-inbox"></i></p>
  <p class="dx-upload-text">Click or drag files to this area to upload</p>
</dx-upload>
```

### Picture-card with size and count limits

```html
<dx-upload
  dxListType="picture-card"
  dxAction="/api/upload"
  [dxMultiple]="true"
  [dxLimit]="5"
  [dxSize]="2048"
  dxAccept="image/*"
  [(dxFileList)]="fileList">
</dx-upload>
```

### Custom request

```typescript
customRequest = (item: DxUploadXHRArgs): Subscription => {
  const form = new FormData();
  form.append(item.name!, item.postFile as Blob);
  return this.http.post(item.action!, form).subscribe({
    next: res => item.onSuccess?.(res, item.file, null),
    error: err => item.onError?.(err, item.file),
  });
};
```

```html
<dx-upload
  dxAction="/api/upload"
  [dxCustomRequest]="customRequest">
</dx-upload>
```

### Before-upload guard

```typescript
beforeUpload = (file: DxUploadFile) =>
  file.size! < 5 * 1024 * 1024 || (alert('File too large'), false);
```

```html
<dx-upload
  dxAction="/api/upload"
  [dxBeforeUpload]="beforeUpload">
</dx-upload>
```

## Import

```typescript
import { DxUploadModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxUploadModule]
})
export class YourModule { }
```
