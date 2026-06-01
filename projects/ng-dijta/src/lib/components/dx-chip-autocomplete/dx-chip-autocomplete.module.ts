import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChipAutocompleteComponent } from './dx-chip-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { DxMatSelectSearchModule } from '../dx-autocomplete-select/mat-select-search/ngx-mat-select-search.module';


@NgModule({
  declarations: [
    DxChipAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    TranslocoModule,
    DxMatSelectSearchModule
  ],
  exports: [DxChipAutocompleteComponent]
})
export class DxChipAutocompleteModule { }
