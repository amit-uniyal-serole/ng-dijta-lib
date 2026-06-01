import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DxUploadBtnComponent } from './upload-btn.component';
import { DxUploadListComponent } from './upload-list.component';
import { DxUploadComponent } from './upload.component';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
    imports: [
        BidiModule,
        CommonModule,
        FormsModule,
        PlatformModule,
        DxToolTipModule,
        MatMenuModule,
        MatProgressBarModule,
    ],
    declarations: [DxUploadComponent, DxUploadBtnComponent, DxUploadListComponent],
    exports: [DxUploadComponent]
})
export class DxUploadModule { }
