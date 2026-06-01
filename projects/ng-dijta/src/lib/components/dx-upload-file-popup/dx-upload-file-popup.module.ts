import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxUploadFilePopupComponent } from './dx-upload-file-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxTitleModule } from '../dx-title/dx-title.module';
import { MatTableModule } from '@angular/material/table';
import { DxButtonModule } from '../dx-button';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
    declarations: [DxUploadFilePopupComponent],
    exports: [DxUploadFilePopupComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        DxTitleModule,
        MatTableModule,
        DxButtonModule,
        TranslocoModule
    ]
})
export class DxUploadFilePopupModule { }
