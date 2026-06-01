import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DxSafeAny } from '../../core/outlet/type/any';
import { IndexableObject } from '../../utils/types/indexable';


/** Status */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export type DxUploadType = 'select' | 'drag';

/** Built-in styles of the uploading list. */
export type DxUploadListType = 'text' | 'picture' | 'picture-card' | 'multioption';

export interface DxUploadFile {
  uid: string;
  size?: number;
  name: string;
  filename?: string;
  lastModified?: string;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  originFileObj?: File;
  file?: File | Blob;
  percent?: number;
  thumbUrl?: string;
  response?: DxSafeAny;
  error?: DxSafeAny;
  linkProps?: { download: string };
  type?: string;

  [key: string]: DxSafeAny;
}

export interface DxUploadChangeParam {
  file: DxUploadFile;
  fileList: DxUploadFile[];
  event?: { percent: number };
  /** Callback type. */
  type?: string;
}

export interface DxShowUploadList {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
}

export type DxUploadTransformFileType = string | Blob | DxUploadFile | Observable<string | Blob | File>;

export interface ZipButtonOptions {
  disabled?: boolean;
  accept?: string | string[];
  action?: string | ((file: DxUploadFile) => string | Observable<string>);
  directory?: boolean;
  openFileDialogOnClick?: boolean;
  beforeUpload?(file: DxUploadFile, fileList: DxUploadFile[]): boolean | Observable<DxSafeAny>;
  customRequest?(item: DxSafeAny): Subscription;
  data?: {} | ((file: DxUploadFile) => {} | Observable<{}>);
  headers?: {} | ((file: DxUploadFile) => {} | Observable<{}>);
  name?: string;
  multiple?: boolean;
  withCredentials?: boolean;
  filters?: UploadFilter[];
  transformFile?(file: DxUploadFile): DxUploadTransformFileType;
  onStart?(file: DxUploadFile): void;
  onProgress?(e: DxSafeAny, file: DxUploadFile): void;
  onSuccess?(ret: DxSafeAny, file: DxUploadFile, xhr: DxSafeAny): void;
  onError?(err: DxSafeAny, file: DxUploadFile): void;
  dxFileMaxCount?:number
}

export interface UploadFilter {
  name: string;
  fn(fileList: DxUploadFile[]): DxUploadFile[] | Observable<DxUploadFile[]>;
}

export interface DxUploadXHRArgs {
  action?: string;
  name?: string;
  headers?: IndexableObject;
  file: DxUploadFile;
  postFile: string | Blob | File | DxUploadFile;
  data?: IndexableObject;
  withCredentials?: boolean;
  onProgress?(e: DxSafeAny, file: DxUploadFile): void;
  onSuccess?(ret: DxSafeAny, file: DxUploadFile, xhr: DxSafeAny): void;
  onError?(err: DxSafeAny, file: DxUploadFile): void;
}

export type DxIconRenderTemplate = TemplateRef<{ $implicit: DxUploadFile }>;


export interface DxUploadAction {
  label?: string;
  event?: string;
}