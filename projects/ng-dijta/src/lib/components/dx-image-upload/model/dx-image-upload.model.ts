import { FilePreviewModel } from "../core/file-preview.model";

export interface AdapterDataModel {
  downloadUrl?: string;
  uploadUrl: string;
  removeFileUrl?: string;
  payload?: {
    [key: string]: any;
  }
  params?: {
    [key: string]: any;
  },
  thumbnailUrl?: string;
}

export type DxFileUploadType = 'multi' | 'single';

export interface DxAttachmentConfigModel {
  method: 'POST' | 'PUT',
  api: string;
  params?: any;
  body?: any;
  requestPayloadTransformCallBack?(files: FilePreviewModel[], payload: DxAttachmentConfigModel): DxAttachmentConfigModel;
}