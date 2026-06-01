import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fileObject } from './upload-file.model';

@Component({
  selector: 'dx-upload-file-popup',
  templateUrl: './dx-upload-file-popup.component.html',
  styleUrls: ['./dx-upload-file-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxUploadFilePopupComponent implements OnInit {
  title: string = 'Upload File';
  hint!: string;
  busy$!: boolean;
  fileSizeError: boolean = false;
  fileFormatError: boolean = false;
  files: fileObject[] = [];
  displayedColumns: string[] = ['file_name', 'file_type', 'file_size'];
  filePATH: string = '';
  fileObject!: fileObject;
  uploadedFile!: FileList;
  wholeFiles!: FileList | any; //Type 'FileList' must have a '[Symbol.iterator]()';
  attachmentType!: string;
  defaultFileSize!: number; // 15728640
  fileFormat: string[] = []; // image/jpg,image/png,.pdf,
  defaultFileSizeMsg!: string;
  acceptFormat: string | undefined;

  constructor(private readonly dialogRef: MatDialogRef<DxUploadFilePopupComponent>) { }
  close(): void {
    this.dialogRef?.close();
  }

  ngOnInit(): void {
    this.acceptFormat = this.fileFormat.map((val) => `.${val}`).join(',')
  }
  // handle file from browsing
  fileBrowseHandler(event: Event): void {
    const target: HTMLInputElement = event?.target as HTMLInputElement;
    const files: FileList | any = target?.files as FileList;
    if (this.defaultFileSize) {
      if (files?.length >= 0) {
        for (let ele of files) {
          if (ele?.size > this.defaultFileSize) {
            this.fileSizeError = true;
            this.defaultFileSizeMsg = this.formatBytes(this.defaultFileSize);
            break;
          } else {
            this.fileSizeError = false;
          }
        }
      }
    }
    this.checkFormat(files);
    if (!this.fileSizeError && !this.fileFormatError) {
      this.uploadedFile = files[0];
      this.wholeFiles = files;
      this.prepareFilesList(event);
    }
  }

  checkFormat(files): void {
    if (this.acceptFormat && this.acceptFormat?.length > 0) {
      if (files?.length >= 0) {
        for (let ele of files) {
          if (!this.validateFile(ele.name)) {
            this.fileFormatError = true;
            this.defaultFileSizeMsg = this.fileFormat.map((val) => ` ${val}`).join(',');
            break;
          } else {
            this.fileFormatError = false;
          }
        }
      }
    }
  }


  // Convert Files list to normal array list
  prepareFilesList(event: Event): void {
    const target: HTMLInputElement = event?.target as HTMLInputElement;
    const files: FileList | any = target?.files as FileList;
    if (files && files[0]) {
      for (let ele of this.wholeFiles) {
        let fileObject: fileObject = {
          file_name: ele?.name,
          file_size: this.formatBytes(ele?.size),
          file_type: ele?.type,
        };
        this.files?.push(fileObject);
      }
      this.filePATH = URL.createObjectURL(files[0]);
    }
  }
  uploadAttachment(): void {
    this.dialogRef?.close(this.wholeFiles);
  }
  /**
   * @description formatting byte value
   * @param bytes
   * @param decimals
   * @returns
   */
  formatBytes(bytes: number, decimals?: number): string {
    const decimal: number = decimals ?? 2;
    if (bytes === 0) return '0 Bytes';
    const k: number = 1024;
    const dm: number = decimal < 0 ? 0 : decimal;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  validateFile(name: string) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (this.fileFormat.some((format) => ext.toLowerCase() === format)) {
      return true;
    }
    else {
      return false;
    }
  }
}
