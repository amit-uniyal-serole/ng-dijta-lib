import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { fadeIn, fadeOut } from './error.animation';
import { ErrorUtils } from './error.utils';
import { FileCellDto, FileStorageDto } from '../../interfaces/dx-additional.interface';
@Component({
  selector: 'dx-file-cell',
  templateUrl: './dx-file-cell.component.html',
  styleUrls: ['./dx-file-cell.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class DxFileCellComponent {

  customSub = new Subject<HTMLElement>();
  isLoading = false;
  error: HttpErrorResponse | undefined;
  message: string | undefined;

  private _files: FileStorageDto | undefined;

  @Input()
  set files(file: FileStorageDto | undefined) {
    this._files = file;
  }

  @Output() fileView: EventEmitter<{ file: FileCellDto; element: HTMLImageElement }> = new EventEmitter();

  get displayFile(): FileCellDto | undefined {
    return this._files?.recordFile;
  }

  get images(): string[] {
    const recordLg = this._files?.recordFile?.imageSizeUrl?.lg;
    const otherLgs = this._files?.otherImages?.map((image) => image.imageSizeUrl?.lg ?? '') ?? [];
    return recordLg ? [recordLg, ...otherLgs] : otherLgs;
  }
  constructor(
    private elementRef: ElementRef,
    private http: HttpClient
  ) { }
  view(): void {
    if (this.displayFile?.imageSizeUrl) {
      this.open();
    } else {
      window.open(this.displayFile?.displayUrl);
    }
  }

  download(): void {
    if (this.displayFile?.downloadUrl) {
      this.isLoading = true;

      this.http.get(this.displayFile.downloadUrl, { responseType: 'blob' }).subscribe({
        next: (value: any) => {
          if (value && this.displayFile?.fileOriginalName) {
            this.downloadFile(value, this.displayFile?.fileOriginalName);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = err;
          const errorMessage = JSON.stringify(this.error?.error);
          this.message = ErrorUtils.getErrorMessage(errorMessage);
          if (!this.message) {
            this.message = this.error?.error?.error?.message
          }
          this.isLoading = false;
          this.resetErrorMessage();
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }

  }

  open() {
    const lgUrl = this.displayFile?.imageSizeUrl?.lg;
    const allPreviewImgs = this.elementRef.nativeElement.querySelectorAll('div[dImagePreview] img') as NodeListOf<HTMLImageElement>;
    let imgElement: HTMLImageElement | null = null;
    if (lgUrl) {
      for (const img of Array.from(allPreviewImgs)) {
        if (img.src?.includes(lgUrl)) {
          imgElement = img;
          break;
        }
      }
    }
    if (imgElement) {
      this.customSub.next(imgElement);
    }
    if (this.displayFile && imgElement) {
      this.fileView.emit({ file: this.displayFile, element: imgElement });
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
  private resetErrorMessage() {
    setTimeout(() => {
      this.error = undefined;
    }, 3000);
  }
}
