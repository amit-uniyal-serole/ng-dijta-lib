import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadAttributeComponent } from './components/attribute/file-upload-attr.component';
import { FileUploadDropZoneComponent } from './components/drop-zone/file-upload-drop-zone.component';
import { FileUploadIconComponent } from './components/file-list/file-upload-icon.component';
import { FileUploadListItemComponent } from './components/file-list/file-upload-list-item.component';
import { FileUploadComponent } from './components/multiple-file-upload/file-upload.component';
import { SimpleFileUploadComponent } from './components/simple-file-upload/simple-file-upload.component';
import { FilesAcceptDirective } from './directives/attribute.directive';
import { FilesDiscardDirective } from './directives/discard.directive';
import { FilesNativeDirective } from './directives/native.directive';
import { FileSizeValidator, FilesLimitValidator, FilesAcceptValidator } from './directives/validators.directive';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  imports: [
    CommonModule,
    TranslocoModule
  ],
  declarations: [
    FileUploadComponent,
    FileUploadListItemComponent,
    FileUploadIconComponent,
    FileUploadDropZoneComponent,
    FileUploadAttributeComponent,
    FileSizeValidator,
    FilesLimitValidator,
    FilesAcceptValidator,
    FilesAcceptDirective,
    FilesDiscardDirective,
    FilesNativeDirective,
    SimpleFileUploadComponent
  ],
  exports: [
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    FileUploadAttributeComponent,
    FileSizeValidator,
    FilesLimitValidator,
    FilesAcceptValidator,
    FilesAcceptDirective,
    FilesDiscardDirective,
    SimpleFileUploadComponent
  ]
})
export class DxFileUploadModule { }
