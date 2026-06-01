import { CloseIconComponent } from './icons/close-icon/close-icon.component';
import { FilePreviewItemComponent } from './file-preview-container/file-preview-item/file-preview-item.component';
import { FilePreviewContainerComponent } from './file-preview-container/file-preview-container.component';
import { NgModule } from '@angular/core';
import { FilePickerComponent } from './file-picker.component';
import { CommonModule } from '@angular/common';
import { FilePickerService } from './file-picker.service';
import { FileDropModule } from './file-drop/file-drop.module';
import { PreviewLightboxComponent } from './file-preview-container/preview-lightbox/preview-lightbox.component';
import { RefreshIconComponent } from './file-preview-container/file-preview-item/refresh-icon/refresh-icon.component';
import { DxImagePreviewComponent } from './file-preview-container/dx-image-preview.component';
import { DxUploadModule } from '../../dx-upload';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  imports: [
    CommonModule,
    FileDropModule,
    DxUploadModule,
    TranslocoModule
  ],
  declarations: [
    FilePickerComponent,
    FilePreviewContainerComponent,
    FilePreviewItemComponent,
    PreviewLightboxComponent,
    RefreshIconComponent,
    CloseIconComponent,
    DxImagePreviewComponent
  ],
  exports: [FilePickerComponent, FilePreviewItemComponent, DxImagePreviewComponent],
  providers: [FilePickerService]
})
export class FilePickerModule { }
