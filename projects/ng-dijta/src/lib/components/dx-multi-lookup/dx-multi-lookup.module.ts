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
import { MatButtonModule } from '@angular/material/button';
import { DxButtonModule } from '../dx-button';
import { DxInputModule } from '../dx-input';
import { MatIconModule } from '@angular/material/icon';
import { DxSelectModule } from '../dx-select';
import { ToastrModule } from '../dx-toastr';
import { DxAutocompleteSelectModule } from '../dx-autocomplete-select';
import { NgxMaskDirective } from 'ngx-mask';
import {MatChipsModule} from '@angular/material/chips';
import { DxTabGroupModule } from '../dx-tab-group';
import { DxToastrModule } from '../dx-toastr/dx-toastr.module';
import { DxRadioButtonModule } from '../dx-radio-button';
import { LoadingModule } from '../loading';


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
    DxInputModule,
    MatIconModule,
    DxSelectModule,
    ToastrModule,
    DxAutocompleteSelectModule,
    NgxMaskDirective,
    MatChipsModule,
    DxTabGroupModule,
    DxToastrModule,
    DxRadioButtonModule,
    MatButtonModule,
    LoadingModule
  ],
  exports: [DxMultiLookupComponent, MultiLookupModalComponent]
})
export class DxMultiLookupModule { }
