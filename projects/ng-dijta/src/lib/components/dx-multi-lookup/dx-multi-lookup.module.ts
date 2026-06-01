import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxMultiLookupComponent } from './dx-multi-lookup.component';
import { MultiLookupModalComponent } from './multi-lookup-modal/multi-lookup-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxLoaderModule } from '../dx-loader';
import { FlexTableModule } from '../dx-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DxButtonModule } from '../dx-button';
import { DxInputModule } from '../dx-input';



@NgModule({
  declarations: [
    DxMultiLookupComponent,
    MultiLookupModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    DxLoaderModule,
    FlexTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DxButtonModule,
    DxInputModule
  ],
  exports:[DxMultiLookupComponent,MultiLookupModalComponent]
})
export class DxMultiLookupModule { }
