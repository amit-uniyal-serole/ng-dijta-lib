import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { AdapterDataModel } from '../../model/dx-image-upload.model';
import { FilePickerAdapter } from '../file-picker.adapter';
import { FilePreviewModel } from '../file-preview.model';
import { UploaderAdapter } from '../uploader-adapter';
import { UploaderCaptions } from '../uploader-captions';

@Component({
  selector: 'file-preview-container',
  templateUrl: './file-preview-container.component.html',
  styleUrls: ['./file-preview-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewContainerComponent implements  OnChanges {
  @Input()
  previewFiles!: FilePreviewModel[];
  @Input()
  itemTemplate!: TemplateRef<any>;
  @Input()
  enableAutoUpload!: boolean;
  @Output() public readonly removeFile = new EventEmitter<FilePreviewModel>();
  @Output() public readonly uploadSuccess = new EventEmitter<FilePreviewModel>();
  @Output() public readonly uploadFail = new EventEmitter<HttpErrorResponse>();
  /** Max count of file in multi-upload. Default: no limit */
  @Input()
  fileMaxCount!: number;
  @Input()
  totalMaxSize!: number;
  public lightboxFile!: FilePreviewModel | undefined;
  @Input() adapterData!: AdapterDataModel;
  @Input()
  adapter: FilePickerAdapter = new UploaderAdapter(this.http, this.adapterData);
  @Input()
  captions!: UploaderCaptions;
  displaySize: string | undefined;
  @Input() isUpload: boolean = false;
  constructor(private http: HttpClient
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isUpload']?.previousValue !== changes['isUpload']?.currentValue) {
      this.isUpload = changes['isUpload']?.currentValue;
    }
  }

  public openLightbox(file: FilePreviewModel): void {
    this.lightboxFile = file;
  }

  public closeLightbox(): void {
    this.lightboxFile = undefined;
  }

  calculateTotal(): string {
    const totalSize = this.previewFiles.reduce((acc, person) => acc + person?.file?.size!, 0);
    return this.niceBytes(totalSize)
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
}
