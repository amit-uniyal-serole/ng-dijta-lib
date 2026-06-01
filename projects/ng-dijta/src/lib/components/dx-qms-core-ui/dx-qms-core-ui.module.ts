import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { DxCheckboxModule } from '../dx-checkbox';
import { DxInputModule } from '../dx-input';
import { DxSectionTitleModule } from '../dx-section-title';
import { DxSelectModule } from '../dx-select';
import { DxSkeletonLoaderModule } from '../dx-skeleton-loader';
import { DxStatusModule } from '../dx-status';
import { DxTextareaModule } from '../dx-textarea';
import { LoadingModule } from '../loading';
import { DxEvidenceUploadComponent } from './components/dx-evidence-upload/dx-evidence-upload.component';
import { DxToolTipModule } from '../dx-tooltip';


@NgModule({
  declarations: [
    DxEvidenceUploadComponent    
  ],
  imports: [
    CommonModule,
    LoadingModule,
    ReactiveFormsModule,
    DxSelectModule,
    DxInputModule,
    DxTextareaModule,
    DxCheckboxModule,
    MatProgressSpinnerModule,
    DxSkeletonLoaderModule,
    TranslocoModule,
    DxStatusModule,
    DxSectionTitleModule,
    DxToolTipModule
  ],
  exports:[    
    DxEvidenceUploadComponent
  ]
})
export class DxQmsCoreUiModule { }
