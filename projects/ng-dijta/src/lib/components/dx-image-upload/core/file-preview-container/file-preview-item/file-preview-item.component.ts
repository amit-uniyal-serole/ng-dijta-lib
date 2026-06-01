import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AdapterDataModel } from '../../../model/dx-image-upload.model';
import { FilePickerAdapter, UploadResponse, UploadStatus } from '../../file-picker.adapter';
import { GET_FILE_TYPE, IS_IMAGE_FILE } from '../../file-upload.utils';
import { UploaderAdapter } from '../../uploader-adapter';
import { UploaderCaptions } from '../../uploader-captions';
import { FilePickerService } from './../../file-picker.service';
import { FilePreviewModel } from './../../file-preview.model';
import { FileValidatorService } from '../../services/file-validator/file-validator.service';

@Component({
  selector: 'file-preview-item',
  templateUrl: './file-preview-item.component.html',
  styleUrls: ['./file-preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewItemComponent implements OnInit, OnChanges {
  @Output() public readonly removeFile = new EventEmitter<FilePreviewModel>();
  @Output() public readonly uploadSuccess = new EventEmitter<FilePreviewModel>();
  @Output() public readonly uploadFail = new EventEmitter<HttpErrorResponse>();
  @Output() public readonly imageClicked = new EventEmitter<FilePreviewModel>();

  @Input()
  public fileItem!: FilePreviewModel;
  @Input() adapterData!: AdapterDataModel;
  adapter!: FilePickerAdapter;
  @Input()
  itemTemplate!: TemplateRef<any>;
  @Input()
  captions!: UploaderCaptions;
  @Input()
  enableAutoUpload!: boolean;
  @Input() isUpload: boolean = false;
  public uploadProgress!: number | undefined;
  public isImageFile!: boolean;
  public fileType!: string;
  public safeUrl!: SafeResourceUrl;
  public uploadError!: boolean | undefined;
  public uploadResponse: any;
  private _uploadSubscription!: Subscription;
  uploadProgressTimeout: any;
  constructor(
    private fileService: FilePickerService,
    private changeRef: ChangeDetectorRef,
    private http: HttpClient,
    private readonly fileValidatorService: FileValidatorService
  ) { }

  public ngOnInit() {
    if (this.fileItem) {
      this._uploadFile(this.fileItem);

      this.safeUrl = this.fileItem?.file ? this.getSafeUrl(this.fileItem.file) : this.fileItem?.thumbnailUrl!
    }
    this.fileType = GET_FILE_TYPE(this.fileItem.fileName);
    this.isImageFile = IS_IMAGE_FILE(this.fileType);
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['adapterData']?.previousValue != changes['adapterData']?.currentValue) {
      this.adapter = new UploaderAdapter(this.http, this.adapterData);
    }
    if (changes['isUpload']?.previousValue != changes['isUpload']?.currentValue) {
      this.isUpload = changes['isUpload']?.currentValue;
    }
  }

  public getSafeUrl(file: File | Blob): SafeResourceUrl {
    return this.fileService.createSafeUrl(file);
  }
  /** Converts bytes to nice size */
  public niceBytes(x): string {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0;
    let n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    // include a decimal point and a tenths-place digit if presenting
    // less than ten of KB or greater units
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }
  /** Retry file upload when upload was unsuccessfull */
  public onRetry(): void {
    this.uploadError = undefined;
    this._uploadFile(this.fileItem);
  }

  public onRemove(fileItem: FilePreviewModel): void {
    this._uploadUnsubscribe();
    this.removeFile.next({
      ...fileItem
    });
  }

  private _uploadFile(fileItem: FilePreviewModel): void {
    if (!this.enableAutoUpload) {
      return;
    }
    if (this.adapter && this.isUpload) {
      this._uploadSubscription =
        this.adapter.uploadFile(fileItem)
          .pipe(
            filter((data: UploadResponse | undefined) => !!data),
            tap((res: UploadResponse | undefined) => {
              if (res?.status === UploadStatus.UPLOADED) {
                this.uploadProgress = 100;
              }
            })
          ).subscribe((res: UploadResponse | undefined) => {
            if (res && res.status === UploadStatus.UPLOADED) {
              this._onUploadSuccess(res.body, fileItem);
              this.fileValidatorService.isUploadInprogress(false);
              this.uploadProgress = undefined;
            }
            if ((res && res.status === UploadStatus.IN_PROGRESS) && res.progress !== 100) {
              this.fileValidatorService.isUploadInprogress(true)
              this.uploadProgress = res.progress;
              this.changeRef.detectChanges();
            }
            if (res && res.status === UploadStatus.ERROR) {
              this.uploadError = true;
              this.uploadFail.next(res.body);
              this.uploadProgress = undefined;              
              this.fileValidatorService.isUploadInprogress(false)
            }
            this.changeRef.detectChanges();
          }, (er: HttpErrorResponse) => {

            this.uploadError = true;
            this.uploadFail.next(er);
            this.uploadProgress = undefined;            
            this.fileValidatorService.isUploadInprogress(false)
            this.changeRef.detectChanges();
          });
    } else {
      console.warn('no adapter was provided');
    }
  }
  /** Emits event when file upload api returns success  */
  private _onUploadSuccess(uploadResponse: any, fileItem: FilePreviewModel): void {
    this.uploadResponse = uploadResponse;
    this.fileItem.uploadResponse = uploadResponse;
    this.fileItem.pkId = Number(uploadResponse?.map(res => res?.pkId).join());
    this.uploadSuccess.next({ ...fileItem, uploadResponse });
  }

  /** Cancel upload. Cancels request  */
  private _uploadUnsubscribe(): void {
    if (this._uploadSubscription) {
      this._uploadSubscription.unsubscribe();
    }
  }

}
