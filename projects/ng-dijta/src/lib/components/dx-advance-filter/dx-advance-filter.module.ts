import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAdvanceFilterComponent } from './dx-advance-filter.component';
import { DxSelectModule } from '../dx-select/dx-select.module';
import { DxAutocompleteSelectModule } from '../dx-autocomplete-select/dx-autocomplete-select.module';
import { DxInputModule } from '../dx-input/dx-input.module';
import { DxButtonModule } from '../dx-button/dx-button.module';
import { DxTitleModule } from '../dx-title/dx-title.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FilterAddButtonComponent } from './filter-add-button/filter-add-button.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [
    DxAdvanceFilterComponent,
    FilterAddButtonComponent,

  ],
  imports: [
    CommonModule,
    DxSelectModule,
    DxAutocompleteSelectModule,
    DxInputModule,
    DxButtonModule,
    DxTitleModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule
  ],
  exports: [DxAdvanceFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DxAdvanceFilterModule { }
