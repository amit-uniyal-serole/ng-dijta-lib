import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxImageUploadV1Component } from './varient/dx-image-upload-v1/dx-image-upload-v1.component';
import { FilePickerModule } from './core/file-picker.module';
import { DxImageInputComponent } from './varient/dx-image-input/dx-image-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxImageComponent } from './varient/dx-image/dx-image.component';
import { DxImpageUploadPopupComponent } from './varient/dx-impage-upload-popup/dx-impage-upload-popup.component';
import { DxButtonModule } from '../dx-button';
@NgModule({
  declarations: [
    DxImageUploadV1Component,
    DxImageInputComponent,
    DxImageComponent,
    DxImpageUploadPopupComponent,
  ],
  imports: [
    CommonModule,
    FilePickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DxButtonModule
  ],
  exports: [
    FilePickerModule,
    DxImageUploadV1Component,
    DxImageInputComponent,
    DxImpageUploadPopupComponent
  ]
})
export class DxImageUploadModule { }
