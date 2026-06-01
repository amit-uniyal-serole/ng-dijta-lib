import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DImagePreviewComponent } from './image-preview.component';
import { ImagePreviewDirective } from './image-preview.directive';
import { DxToolTipModule } from '../dx-tooltip';
import { SafePipe } from './safe.pipe'
import { ModalModule } from '../modal';

@NgModule({
    declarations: [DImagePreviewComponent, ImagePreviewDirective, SafePipe],
    imports: [
        CommonModule,
        ModalModule,
        DxToolTipModule,
        FormsModule,
        // InputNumberModule
    ],
    exports: [
        ImagePreviewDirective,
        SafePipe
    ],
})

export class ImagePreviewModule { }