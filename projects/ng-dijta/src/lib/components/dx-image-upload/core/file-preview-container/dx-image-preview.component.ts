import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FilePickerService } from '../file-picker.service';
import { FilePreviewModel } from '../file-preview.model';
import { GET_FILE_TYPE, IS_IMAGE_FILE } from '../file-upload.utils';

@Component({
  selector: 'dx-image-preview',
  template: `
    
    <div class="file-preview-thumbnail">
      <div class="img-preview-thumbnail" *ngIf="isImageFile && (fileItem?.file || fileItem?.thumbnailUrl)">
              <img
          [src]="safeUrl"
          (click)="openPreview()"
          alt="image"
        />
      </div>
      <div
        class="other-preview-thumbnail"
        *ngIf="!isImageFile || (!fileItem?.file && !fileItem?.thumbnailUrl)"
        [ngClass]="fileItem.fileName.split('.').pop()"
      >
        {{ fileType }}
      </div>
    </div>
    <preview-lightbox *ngIf="lightboxFile && isShowPreview" [file]="lightboxFile" (previewClose)="closeLightbox()"></preview-lightbox>
  `,
  styleUrls: ["./dx-image-preview.component.scss"]
})
export class DxImagePreviewComponent {
  @Input()
  public fileItem!: FilePreviewModel;
  public isImageFile!: boolean;
  public safeUrl: SafeResourceUrl | undefined;
  public lightboxFile!: FilePreviewModel | undefined;
  fileType!: string;
  @Input() isShowPreview: boolean = true;
  @Output() onClickImage: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fileService: FilePickerService) { }
  public ngOnInit() {
    this.safeUrl = this.fileItem?.file ? this.getSafeUrl(this.fileItem?.file) : this.fileItem?.thumbnailUrl!;
    this.fileType = GET_FILE_TYPE(this.fileItem?.fileName);
    this.isImageFile = IS_IMAGE_FILE(GET_FILE_TYPE(this.fileItem.fileName));
  }
  public getSafeUrl(file: File | Blob): SafeResourceUrl {
    return this.fileService.createSafeUrl(file);
  }
  public openPreview(): void {
    this.lightboxFile = this.fileItem;
    if (!this.isShowPreview) {
      this.onClickImage.emit(true);
    }
  }

  public closeLightbox(): void {
    this.lightboxFile = undefined;
  }
}
