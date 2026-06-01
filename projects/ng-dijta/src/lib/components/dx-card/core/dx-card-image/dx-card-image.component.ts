import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { FilePickerAdapter } from '../../../dx-image-upload/core/file-picker.adapter';
import { FilePreviewModel } from '../../../dx-image-upload/core/file-preview.model';
import { UploaderAdapter } from '../../../dx-image-upload/core/uploader-adapter';
import { DxImpageUploadPopupComponent } from '../../../dx-image-upload/varient/dx-impage-upload-popup/dx-impage-upload-popup.component';


@Component({
  selector: 'dx-card-image',
  templateUrl: './dx-card-image.component.html',
  styleUrls: ['./dx-card-image.component.scss']
})
export class DxCardImageComponent {
  @Input() data: any;
  adapter!: FilePickerAdapter;
  public safeUrls: SafeResourceUrl[] | undefined;
  customSub = new Subject<HTMLElement>();
  constructor(private readonly http: HttpClient, private dialog: MatDialog,
    private elementRef: ElementRef,) { }

  ngOnInit(): void {
    this.safeUrls = [];
    if (this.data?.value?.length > 0) {
      this.data?.value?.map((value) => {
        this.safeUrls?.push(value?.thumbnailUrl);
      })
    }
  }

  open(): void {
    this.customSub.next(this.elementRef?.nativeElement?.querySelector('img'));
  }
  /**
   * 
   * @param index as number
   *  
   */
  public remove(index: number): void {
    const files: FilePreviewModel[] | null = this.data.value;
    if (this.data?.adapterData?.removeFileUrl) {
      this.adapter = new UploaderAdapter(this.http, this.data?.adapterData);
      this.adapter.removeFile(files?.[index]?.pkId!).subscribe((res: any) => {
        if (res) {
          files?.splice(index, 1);
          this.data.value = files;
        }
      });
    }
  }

  /**
  * 
  * @param index as number
  *  
  */
  public download(index: number): void {
    const files: FilePreviewModel[] | null = this.data.value;
    if (this.data?.adapterData?.downloadUrl) {
      this.adapter = new UploaderAdapter(this.http, this.data?.adapterData);
      this.adapter.downloadFile().subscribe((res: any) => {
        this.downloadFile(res, files?.[index]?.fileName ?? '')
      });
    }
  }
  private downloadFile(blob: Blob, fileName: string): void {
    const aElement = document.createElement('a');
    aElement.setAttribute('download', fileName);
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
  }

  public openImageUploader(): void {
    const dialogRef: MatDialogRef<DxImpageUploadPopupComponent, FilePreviewModel[]> = this.dialog.open(DxImpageUploadPopupComponent, {
      panelClass: ['lookout-modal-box'],
      width: '60%',
      data: this.data.value
    });
    dialogRef.componentInstance.adapterData = this.data.adapterData;
    dialogRef.componentInstance.enableAutoUpload = true;
    dialogRef.afterClosed().pipe(
      filter((val: FilePreviewModel[] | undefined) => !!val && val?.length > 0),
      first()
    ).subscribe((files: FilePreviewModel[] | undefined) => {
      if (files) {
        this.data.value = files;
      }
    });
  }
}
