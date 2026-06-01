import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule } from '../dx-button';
import { DxChipAutocompleteModule } from '../dx-chip-autocomplete';
import { DxDatepickerModule } from '../dx-datepicker';
import { DxDaterangeModule } from '../dx-daterange';
import { DxDatetimePickerModule } from '../dx-datetime-picker';
import { DxInputModule } from '../dx-input';
import { DxNumberModule } from '../dx-number';
import { DxSelectModule } from '../dx-select';
import { DxTextareaModule } from '../dx-textarea';
import { DxCriteriaFilterComponent } from './components/dx-criteria-filter/dx-criteria-filter.component';
import { BalancedBracketsDirective } from './directive/balanced-brackets.directive';
import { DxAutocompleteSelectModule } from '../dx-autocomplete-select';
import { DxLookupModule } from '../../components/dx-lookup';
import { FilterOperatorBasedType } from './directive/filter-fields.pipe';
import { DxToolTipModule } from '../dx-tooltip';
import { ExpressionDirective } from './directive/expression.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxServerSideAutocompleteModule } from '../dx-server-side-autocomplete';
import { LookupConfigPipe } from './pipe/lookup-config.pipe';



@NgModule({
  declarations: [
    DxCriteriaFilterComponent,
    BalancedBracketsDirective,
    FilterOperatorBasedType,
    ExpressionDirective,
    LookupConfigPipe
  ],
  imports: [
    CommonModule,
    DxInputModule,
    DxSelectModule,
    ReactiveFormsModule,
    DxTextareaModule,
    DxDatepickerModule,
    DxDaterangeModule,
    DxDatetimePickerModule,
    DxNumberModule,
    DxChipAutocompleteModule,
    DxButtonModule,
    DxAutocompleteSelectModule,
    DxLookupModule,
    DxToolTipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DxServerSideAutocompleteModule
  ],
  exports: [DxCriteriaFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DxCriteriaFilterModule { }
