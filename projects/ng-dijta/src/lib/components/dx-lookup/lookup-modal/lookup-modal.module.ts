import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupModalComponent } from './lookup-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxLoaderModule } from '../../dx-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxInputModule } from '../../dx-input';
import { FlexTableModule } from '../../dx-table';
import { DxButtonModule } from '../../dx-button';
import { DxCardModule } from '../../dx-card';
import { DxSelectModule } from '../../dx-select';



@NgModule({
  declarations: [
    LookupModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    DxLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    DxInputModule,
    FlexTableModule,
    DxButtonModule,
    DxCardModule,
    DxSelectModule
  ],
  exports:[LookupModalComponent]
})
export class LookupModalModule { }
