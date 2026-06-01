import { HttpClient, HttpEvent, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FilePreviewModel } from '../../core/file-preview.model';
import { FileValidatorService } from '../../core/services/file-validator/file-validator.service';
import { AdapterDataModel, DxAttachmentConfigModel, DxFileUploadType } from '../../model/dx-image-upload.model';
import { DxImageUploadV1Component } from '../dx-image-upload-v1/dx-image-upload-v1.component';


@Component({
  selector: 'dx-impage-upload-popup',
  templateUrl: './dx-impage-upload-popup.component.html',
  styleUrls: ['./dx-impage-upload-popup.component.scss']
})
export class DxImpageUploadPopupComponent implements OnInit {
  files: FilePreviewModel[] = [];
  adapterData!: AdapterDataModel;
  enableAutoUpload: boolean = false;
  enableAutoAttachment: boolean = false;
  uploadType: DxFileUploadType = 'multi';
  isUploading$: Observable<boolean> = of(false);
  /** Max size of selected file in MB. Default: no limit */
  fileMaxSize!: number;
  /** Max count of file in multi-upload. Default: no limit */
  fileMaxCount!: number;
  /** Total Max size limit of all files in MB. Default: no limit */
  totalMaxSize!: number;

  @ViewChild('uploader1', { static: false }) uploader1!: DxImageUploadV1Component;
  getErrorMessageList$: Observable<string[]> = of([]);
  fileTypes: string[] = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
    "image/gif",
    "image/avif"
  ];
  /**
   * Attachment Request Config
   */
  requestConfig!: DxAttachmentConfigModel;
  uploadProgress!: number;
  isFilesAttaching: boolean = false;
  title: string = 'Upload Images'
  constructor(
    public dialogRef: MatDialogRef<DxImpageUploadPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedFiles: FilePreviewModel[],
    public readonly fileValidatorService: FileValidatorService,
    private readonly http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.files = this.selectedFiles;
    this.isUploading$ = this.fileValidatorService?.getUploadingProgressData();
    this.getErrorMessageList$ = this.fileValidatorService?.getErrorMessageList();
  }

  onFileAdd(file: FilePreviewModel): void {

    if (!this.files) {
      this.files = [];
    }
    this.files.push(file);
  }

  onSubmit(): void {
    let files: FilePreviewModel[] = []
    if (this.adapterData && this.enableAutoUpload) {
      files = this.uploader1?.uploader?.files?.filter((file: FilePreviewModel) => file?.pkId);
    } else {
      files = this.uploader1?.uploader?.files;
    }

    if (this.enableAutoAttachment && this.requestConfig) {
      this.attachFilesOnSubmit(files);
    } else {
      this.dialogRef.close(files);
    }

  }

  /**
   * @description Attach Files On Click Submit
   * @param files FilePreviewModel[]
   */
  private attachFilesOnSubmit(files: FilePreviewModel[]): void {
    this.isFilesAttaching = true;
    let queryParams: HttpParams = new HttpParams();
    this.requestConfig = this.requestConfig?.requestPayloadTransformCallBack ? this.requestConfig?.requestPayloadTransformCallBack(files, this.requestConfig) : this.requestConfig;
    const config = this.requestConfig;
    if (config?.params) {
      queryParams = queryParams?.appendAll(config?.params!);
    }
    const req: HttpRequest<any> = new HttpRequest(config?.method, config?.api, config?.body, {
      params: queryParams ?? undefined,
      reportProgress: true,
    });

    this.http.request(req).subscribe(
      (res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          this.isFilesAttaching = false;
          const responseFromBackend = res.body;
          this.dialogRef.close(responseFromBackend);
        }
      },
      (err) => {
        this.isFilesAttaching = false;
      }
    )
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
