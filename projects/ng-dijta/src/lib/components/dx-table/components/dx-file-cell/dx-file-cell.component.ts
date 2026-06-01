import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
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

  get displayFile(): FileCellDto | undefined {
    return this._files?.recordFile;
  }

  get images(): string[] | undefined {
    return this._files?.otherImages?.map((image) => image.imageSizeUrl?.lg ?? '');
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
    this.customSub.next(this.elementRef.nativeElement.querySelector('img'));
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
