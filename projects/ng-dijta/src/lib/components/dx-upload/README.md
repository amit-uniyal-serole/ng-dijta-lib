Upload file by selecting or dragging.

## When To Use

Uploading is publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

```ts
import { DxUploadModule } from '@ngdx/dijta';
```

## API

> You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki) about how to implement server-side upload interface.

### dx-upload

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[dxAccept]` | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | `string` | - |
| `[dxAction]` | Required. Uploading URL | `string \| ((file: DxUploadFile) => string \| Observable<string>)` | - |
| `[dxDirectory]` | support uploading the whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | `boolean` | `false` |
| `[dxBeforeUpload]` | Hook function, which will be executed before uploading. Uploading will be stopped with `false` or an Observable. **Warning： this function is not supported in IE9**. NOTICE: Must use `=>` to define the method. | `(file: DxUploadFile, fileList: DxUploadFile[]) => boolean \| Observable<boolean>` | - |
| `[dxCustomRequest]` | Override for the default XHR behavior allowing for additional customization and the ability to implement your own XMLHttpRequest. NOTICE: Must use `=>` to define the method. | `(item) => Subscription` | - |
| `[dxData]` | Uploading params or function which can return uploading params. NOTICE: Must use `=>` to define the method. | `Object \| ((file: DxUploadFile) => Object \| Observable<{}>)` | - |
| `[dxDisabled]` | disable upload button | `boolean` | `false` |
| `[dxFileList]` | List of files, two-way data-binding | `DxUploadFile[]` | - |
| `[dxLimit]` | limit single upload count when `dxMultiple` has opened. `0` unlimited | `number` | `0` |
| `[dxSize]` | limit file size (KB). `0` unlimited | `number` | `0` |
| `[dxFileType]` | limit file type, e.g: `image/png,image/jpeg,image/gif,image/bmp` | `string` | - |
| `[dxFilter]` | Custom filter when choosed file | `UploadFilter[]` | - |
| `[dxHeaders]` | Set request headers, valid above IE10. NOTICE: Must use `=>` to define the method.  | `Object \| ((file: DxUploadFile) => Object \| Observable<{}>)` | - |
| `[dxListType]` | Built-in stylesheets, support for three types: `text`, `picture` or `picture-card` | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| `[dxMultiple]` | Whether to support selected multiple files. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | `boolean` | `false` |
| `[dxName]` | The name of the uploading file | `string` | `'file'` |
| `[dxShowUploadList]` | Whether to show the default upload list, could be an object to specify `showPreviewIcon`, `showRemoveIcon` and `showDownloadIcon` individually | `boolean \| { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean }` | `true` |
| `[dxShowButton]` | Show upload button | `boolean` | `true` |
| `[dxWithCredentials]` | ajax upload with cookie sent | `boolean` | `false` |
| `[dxOpenFileDialogOnClick]` | click open file dialog | `boolean` | `true` |
| `[dxPreview]` | A callback function will be executed when the file link or preview icon is clicked. NOTICE: Must use `=>` to define the method. | `(file: DxUploadFile) => void` | - |
| `[dxPreviewFile]` | Customize preview file logic. NOTICE: Must use `=>` to define the method. | `(file: DxUploadFile) => Observable<dataURL: string>` | - |
| `[dxPreviewIsImage]` | Customize the preview file is an image, generally used when the image URL is in a non-standard format. NOTICE: Must use `=>` to define the method. | `(file: DxUploadFile) => boolean` | - |
| `[dxRemove]` | A callback function will be executed when the removing file button is clicked, remove event will be prevented when the return value is `false` or an Observable. NOTICE: Must use `=>` to define the method.  | `(file: DxUploadFile) => boolean \| Observable<boolean>` | - |
| `(dxChange)` | A callback function, can be executed when uploading state is changing | `EventEmitter<DxUploadChangeParam>` | - |
| `[dxDownload]`   | Click the method to download the file, pass the method to perform the method logic, do not pass the default jump to the new TAB. | `(file: DxUploadFile) => void` | Jump to new TAB |
| `[dxTransformFile]`   | Customize transform file before request  | `(file: DxUploadFile) => DxUploadTransformFileType` | -  |
| `[dxIconRender]`   | Custom show icon  | `TemplateRef<{ $implicit: DxUploadFile }>` | -  |
| `[dxFileListRender]`   | Custom file list | `TemplateRef<{ $implicit: DxUploadFile[] }>` | -  |

#### dxChange

> The function will be called when uploading is in progress, completed or failed

When uploading state changes, it returns:

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` File object for the current operation.

   ```js
   {
      uid: 'uid',      // unique identifier
      name: 'xx.png'   // file name
      status: 'done', // options：uploading, done, error, removed
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional html props of file link
   }
   ```

2. `fileList` current list of files
3. `event` response from server, including uploading progress, supported by advanced browsers.

#### dxCustomRequest

Allows for advanced customization by overriding default behavior in `HttpClient`. Provide your own XMLHttpRequest calls to interface with custom backend processes or interact with AWS S3 service through the `aws-sdk` package.

`dxCustomRequest` callback is passed an object with:

- `onProgress: (event: { percent: number }): void`
- `onError: (event: Error): void`
- `onSuccess: (body: Object, xhr?: Object): void`
- `data: Object`
- `filename: String`
- `file: File`
- `withCredentials: Boolean`
- `action: String`
- `headers: Object`
