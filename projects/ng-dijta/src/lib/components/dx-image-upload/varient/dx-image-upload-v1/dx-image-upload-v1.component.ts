import { Component, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FilePickerComponent } from '../../core/file-picker.component';
import { FilePreviewModel } from '../../core/file-preview.model';
import { AdapterDataModel } from '../../model/dx-image-upload.model';

@Component({
  selector: 'dx-image-upload-v1',
  templateUrl: './dx-image-upload-v1.component.html',
  styleUrls: ['./dx-image-upload-v1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxImageUploadV1Component implements AfterViewInit {
  @Input() files: FilePreviewModel[] = [];

  /** Whether to enable cropper. Default: disabled */
  @Input() enableCropper: boolean = false;

  /** Single or multiple. Default: multi */
  @Input() uploadType = 'multi';

  /** Total Max size limit of all files in MB. Default: no limit */
  @Input()
  totalMaxSize!: number;

  /** Max count of file in multi-upload. Default: no limit */
  @Input()
  fileMaxCount!: number;

  /** Max size of selected file in MB. Default: no limit */
  @Input()
  fileMaxSize!: number;

  @Input() fileTypes:string[]=[]

  @Input()
  enableAutoUpload: boolean = true;
  @Input()
  adapterData!: AdapterDataModel;

  /** Emitted when file is added and passed validations. Not uploaded yet */
  @Output() readonly fileAdded = new EventEmitter<FilePreviewModel>();
  @Output() readonly validationError = new EventEmitter<string>();
  /** Which file types to show on choose file dialog. Default: show all */
  @Input()
  accept!: string;

  /** Emitted when file is removed from fileList */
  @Output() readonly fileRemoved = new EventEmitter<FilePreviewModel>();

  /** Cropper options. */
  @Input()
  cropperOptions: object = {
    minContainerWidth: '300',
    minContainerHeight: '300',
  };

  @ViewChild('uploader', { static: false }) uploader!: FilePickerComponent;

  ngAfterViewInit(): void {
    if (this.files?.length > 0) {
      this.uploader.setFiles(this.files)
    }
  }
 
 
  onRemoveSuccess(e: FilePreviewModel) {
    this.fileRemoved.emit(e);
  }
  onFileAdded(file: FilePreviewModel) {
    this.fileAdded.emit(file);
  }
}
